import { AlertCircle, FileText, FileUp, Github, Send, X } from "lucide-react";
import Chat from "./Chat";
import {
  type ClipboardEvent,
  type DragEvent,
  type FormEvent,
  useEffect,
  useRef,
  useState,
} from "react";
import Logo from "./Logo";
import BG_SVG from "./BG_SVG";
import { Toaster } from "@/components/ui/sonner";
import { toast } from "sonner";

const App = () => {
  // --- State for handling Messages
  const [messages, setMessages] = useState<
    {
      by: "user" | "ai";
      message: string;
    }[]
  >([]);
  const [newUserMessage, setNewUserMessage] = useState("");

  // --- State for User Session ID Handling ---
  const [sessionId, setSessionId] = useState("");

  // --- State for File Handling ---
  const [selectedFiles, setSelectedFiles] = useState<File[] | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // --- Messages Div Ref to handle Auto Scroll ---
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // --- Handling Auto Scroll ---
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // --- File Handlers ---
  const handleFileSelect = (newFile: File) => {
    if (newFile && newFile.type === "application/pdf") {
      if (newFile.size > 10 * 1024 * 1024) {
        toast.error("Please upload a PDF file.");
      }
      setSelectedFiles((prev) => (prev ? [...prev, newFile] : [newFile]));
    } else {
      toast.error("Please upload a PDF file.");
    }
  };

  const onFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleFileSelect(e.target.files[0]);
    }
  };

  // Drag and Drop
  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    // Only set false if we are leaving the main container, not entering a child
    if (e.currentTarget.contains(e.relatedTarget as Node)) return;
    setIsDragging(false);
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileSelect(e.dataTransfer.files[0]);
    }
  };

  // Paste
  const handlePaste = (e: ClipboardEvent<HTMLTextAreaElement>) => {
    if (e.clipboardData.files && e.clipboardData.files.length > 0) {
      e.preventDefault(); // Prevent pasting the file name as text
      handleFileSelect(e.clipboardData.files[0]);
    }
  };

  const removeFile = (indexToRemove: number) => {
    setSelectedFiles((prev) =>
      prev ? prev.filter((_, index) => index !== indexToRemove) : null,
    );
    // Only reset input if we removed the last file
    if (selectedFiles?.length === 1 && fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleMessageSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!newUserMessage && (!selectedFiles || selectedFiles.length === 0)) {
      return;
    }

    const messageContent =
      selectedFiles && selectedFiles.length > 0
        ? `[Uploaded PDF's: ${selectedFiles
            .map((f) => f.name)
            .join(", ")}]\n\n${newUserMessage}`
        : newUserMessage;

    setMessages((prev) => [...prev, { by: "user", message: messageContent }]);
    setNewUserMessage("");
    const filesToUpload = selectedFiles;
    setSelectedFiles(null);

    try {
      let newSessionId = "";
      // Start session
      if (!sessionId) {
        const sessionResponse = await fetch(
          `${import.meta.env.VITE_API_URL}/start-session`,
          {
            method: "POST",
          },
        );
        if (!sessionResponse.ok) {
          throw new Error("Failed to start session");
        }
        const { sessionId: newId } = await sessionResponse.json();
        setSessionId(newId);
        newSessionId = newId;
      } else {
        newSessionId = sessionId;
      }

      // Upload file if present
      if (filesToUpload && filesToUpload.length > 0) {
        const uploadPromises = filesToUpload.map(async (file) => {
          const formData = new FormData();
          formData.append("file", file);

          const res = await fetch(
            `${import.meta.env.VITE_API_URL}/${newSessionId}/upload`,
            {
              method: "POST",
              body: formData,
            },
          );
          if (!res.ok) {
            throw new Error(`Failed to upload ${file.name}`);
          }
          return res;
        });

        // Wait for all uploads to finish
        await Promise.all(uploadPromises);
      }
      if (newUserMessage) {
        // Send query
        const aiResponse = await fetch(
          `${import.meta.env.VITE_API_URL}/${newSessionId}`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ query: newUserMessage }), // Stringify entire body
          },
        );
        if (!aiResponse) {
          throw new Error("Failed to get AI response");
        }
        const { answer } = await aiResponse.json();

        if (answer) {
          setMessages((p) => [...p, { by: "ai", message: answer }]);
        }
      }
    } catch (error) {
      console.error("Failed to send message:", error);
      setMessages((p) => [
        ...p,
        {
          by: "ai",
          message:
            error instanceof Error
              ? error.message
              : "Sorry, something went wrong. Please try again.",
        },
      ]);
    }
  };

  return (
    <>
      <Toaster />
      <main
        className="w-full min-h-screen flex flex-col relative"
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        {/* --- Drag Overlay --- */}
        {isDragging && (
          <div className="absolute inset-0 z-50 bg-background/80 backdrop-blur-sm flex items-center justify-center border-2 border-accent m-4 rounded-xl animate-in fade-in duration-200">
            <div className="flex flex-col items-center gap-4 text-foreground/80">
              <div className="p-4 bg-accent/20 rounded-full">
                <FileUp className="size-12" />
              </div>
              <p className="text-2xl font-medium">Drop PDF here</p>
            </div>
          </div>
        )}

        {/* Header */}
        <header className="sticky top-0 border-b shrink-0 z-40 bg-background">
          <div className="p-2 w-full max-w-3xl mx-auto border-b md:border-x flex items-center justify-center text-sm text-muted-foreground">
            <AlertCircle className="size-4 mr-2" /> V1 - Current Only Read Text
            Based PDF's
          </div>
          <div className="h-16 w-full max-w-3xl mx-auto md:border-x flex items-center justify-between p-4">
            <div className="flex items-center">
              <Logo />
              <span className="text-2xl font-medium">PDF Chatbot</span>
            </div>
            <div className="flex items-center justify-end gap-3">
              <a
                href={"https://github.com/yash-ag-online/pdf-chatbot"}
                target="_blank"
                className="rounded-sm bg-accent p-2"
              >
                <Github className="size-5 text-background" />
              </a>
            </div>
          </div>
        </header>

        {/* BG */}
        <div className="fixed h-screen w-full max-w-3xl mx-auto size-full inset-0 -z-40 flex items-center justify-center bg-background">
          <BG_SVG />
        </div>

        {/* Chat */}
        <div className="size-full flex-1 max-w-3xl mx-auto md:border-x bg-card/20 p-4">
          <Chat messages={messages} />
          <div ref={messagesEndRef}></div>
        </div>

        {/* Input */}
        <div className="backdrop-blur-3xl sticky bottom-14 border-y md:bottom-10 shrink-0 flex flex-col justify-end">
          {/* --- Claude-style File Preview --- */}
          {selectedFiles && selectedFiles.length > 0 && (
            <div className="w-full max-w-3xl mx-auto pb-2 px-2 pt-2 md:border-x flex gap-2 overflow-x-auto">
              {selectedFiles.map((file, index) => (
                <div
                  key={index}
                  className="flex items-center gap-2 bg-background border rounded-md p-2 w-fit animate-in slide-in-from-bottom-2 fade-in shrink-0"
                >
                  <div className="bg-accent/10 p-1.5 rounded-sm">
                    <FileText className="size-4 text-accent" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-xs font-medium max-w-37.5 truncate text-foreground/80">
                      {file.name}
                    </span>
                    <span className="text-[10px] text-foreground/50">
                      PDF Document
                    </span>
                  </div>
                  <button
                    onClick={() => removeFile(index)}
                    className="ml-2 hover:bg-foreground/10 p-1 rounded-full transition-colors"
                  >
                    <X className="size-3 text-foreground/50" />
                  </button>
                </div>
              ))}
            </div>
          )}

          {/* Hidden Input for File Button */}
          <input
            type="file"
            accept=".pdf"
            ref={fileInputRef}
            className="hidden"
            onChange={onFileInputChange}
          />

          <form className="w-full max-w-3xl mx-auto bg-accent/70 p-2 flex items-end border-x">
            <div className="shrink-0 bg-background size-fit rounded-full">
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="size-14 rounded-full flex items-center justify-center hover:bg-accent/10 focus:bg-accent/5 transition-colors duration-200 ease-in-out cursor-pointer"
              >
                <FileUp />
              </button>
            </div>
            <textarea
              name=""
              id=""
              placeholder="Ask anything here..."
              className="w-full bg-background rounded-l-sm field-sizing-content p-4 min-h-14 max-h-56 placeholder:font-light font-light block outline-none ring-0 ml-2"
              value={newUserMessage}
              onChange={(e) => setNewUserMessage(e.currentTarget.value)}
              onPaste={handlePaste}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  handleMessageSubmit(e);
                }
              }}
            ></textarea>
            <div className="shrink-0 bg-foreground/80 hover:bg-foreground size-fit rounded-r-sm overflow-hidden transition-colors duration-200 ease-in-out cursor-pointer">
              <button
                className="size-14 flex items-center justify-center"
                onClick={handleMessageSubmit}
                type="submit"
              >
                <Send className="text-background" />
              </button>
            </div>
          </form>
        </div>

        {/* Footer */}
        <footer className="sticky bottom-0 shrink-0 z-40 bg-background">
          <div className="h-14 md:h-10 w-full max-w-3xl mx-auto md:border-x flex items-center justify-between p-4 gap-8 text-foreground/50 font-light text-sm ">
            <p className="text-balance">
              © 2025 Yash Agrawal - Full-stack Software Engineer
            </p>
            <a href="https://github.com/yash-ag-online" target="_blank">
              <Github className="size-5" />
            </a>
          </div>
        </footer>
      </main>
    </>
  );
};

export default App;
