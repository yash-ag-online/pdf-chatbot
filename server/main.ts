import { Hono } from "@hono/hono";
import { cors } from "@hono/hono/cors";
import { QdrantVectorStore } from "@langchain/qdrant";
import { WebPDFLoader } from "@langchain/community/document_loaders/web/pdf";
import { Embeddings } from "@langchain/core/embeddings";
import { Document } from "@langchain/core/documents";

// Custom Gemini embeddings class
class GeminiEmbeddings extends Embeddings {
  constructor(private apiKey: string) {
    super({});
  }

  async embedDocuments(texts: string[]): Promise<number[][]> {
    const res = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/text-embedding-004:batchEmbedContents?key=${this.apiKey}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          requests: texts.map((text) => ({
            model: "models/text-embedding-004",
            content: { parts: [{ text }] },
          })),
        }),
      },
    );
    const data = await res.json();
    return data.embeddings.map((emb: { values: number[] }) => emb.values);
  }

  async embedQuery(text: string): Promise<number[]> {
    const res = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/text-embedding-004:embedContent?key=${this.apiKey}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          content: { parts: [{ text }] },
        }),
      },
    );
    const data = await res.json();
    return data.embedding.values;
  }
}

// Environment variables
const GEMINI_API_KEY = Deno.env.get("GEMINI_API_KEY")!;
const QDRANT_URL = Deno.env.get("QDRANT_URL")!;
const GROQ_API_KEY = Deno.env.get("GROQ_API_KEY")!;

const app = new Hono();
app.use(
  "/*",
  cors({
    origin: Deno.env.get("FRONTEND_URL")!,
    allowMethods: ["POST", "GET", "OPTIONS"],
    credentials: true,
  }),
);

const chatSessions = new Map<
  string,
  {
    vectorStore: QdrantVectorStore | null;
  }
>();

// Health check endpoint
app.get("/health", (c) => {
  return c.json({ status: "ok" });
});

app.post("/start-session", (c) => {
  try {
    const sessionId = crypto.randomUUID();
    chatSessions.set(sessionId, {
      vectorStore: null,
    });
    return c.json({ message: "Session started", sessionId });
  } catch (error) {
    return c.json(
      {
        message: error instanceof Error
          ? error.message
          : "Internal Server Error",
        error: error,
      },
      500,
    );
  }
});

app.post("/:sessionId/upload", async (c) => {
  try {
    const { sessionId } = c.req.param();
    const session = chatSessions.get(sessionId);
    if (!session) {
      return c.json({ error: "Invalid sessionId" }, 400);
    }

    const body = await c.req.parseBody();
    const file = body["file"] as File;

    if (!file || file.type !== "application/pdf") {
      return c.json({ error: "Please upload a valid PDF file" }, 400);
    }

    if (file.size > 10 * 1024 * 1024) {
      return c.json({ error: "File upload limit - 10mb" }, 400);
    }

    const loader = new WebPDFLoader(file);
    const docs = await loader.load();

    const embeddings = new GeminiEmbeddings(GEMINI_API_KEY);
    const vectorStore = await QdrantVectorStore.fromDocuments(
      docs,
      embeddings,
      {
        url: QDRANT_URL,
        collectionName: `session-${sessionId}`,
      },
    );

    session.vectorStore = vectorStore;

    return c.json({
      sessionId,
      message: "PDF uploaded and processed successfully",
      filename: file.name,
    });
  } catch (error) {
    return c.json(
      {
        message: error instanceof Error
          ? error.message
          : "Internal Server Error",
        error: error,
      },
      500,
    );
  }
});

app.post("/:sessionId", async (c) => {
  try {
    const { sessionId } = c.req.param();
    const session = chatSessions.get(sessionId);
    if (!session) {
      return c.json({ answer: "Invalid sessionId" }, 400);
    }
    if (!session.vectorStore) {
      return c.json({ answer: "Please upload any pdf first" }, 400);
    }

    const { query } = await c.req.json();

    if (!query) {
      return c.json({ answer: "Query is required" }, 400);
    }

    const retriever = session.vectorStore.asRetriever({ k: 5 });
    const relevantDocs = await retriever.invoke(query);

    const systemPrompt = `
    You are an expert AI assistant who answers questions based on the provided PDF document context.
    
    Context from document:
    ${
      relevantDocs
        .map((doc, i) => `[${i + 1}] ${doc.pageContent}`)
        .join("\n\n")
    }
  
    Based on the context above, answer the following question accurately and concisely. If the answer cannot be found in the context, say so.`;

    const res = await fetch(
      "https://api.groq.com/openai/v1/chat/completions",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${GROQ_API_KEY}`,
        },
        body: JSON.stringify({
          model: "openai/gpt-oss-120b",
          messages: [
            {
              role: "system",
              content: systemPrompt,
            },
            {
              role: "user",
              content: query,
            },
          ],
          temperature: 0.5,
          max_tokens: 2048,
        }),
      },
    );

    const data = await res.json();
    const answer = data.choices?.[0]?.message?.content ||
      "No response generated";

    // After getting the answer, store the Q&A as a new document
    const qaDocument = new Document({
      pageContent: `Question: ${query}\nAnswer: ${answer}`,
      metadata: {
        type: "conversation",
        timestamp: new Date().toISOString(),
        sessionId: sessionId,
      },
    });

    await session.vectorStore.addDocuments([qaDocument]);

    return c.json({
      sessionId,
      query,
      answer,
      sources: relevantDocs.map((doc) => ({
        content: doc.pageContent.substring(0, 200) + "...",
        metadata: doc.metadata,
      })),
    });
  } catch (error) {
    return c.json(
      {
        message: error instanceof Error
          ? error.message
          : "Internal Server Error",
        error: error,
      },
      500,
    );
  }
});

Deno.serve(app.fetch);
