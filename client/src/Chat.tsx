import ReactMarkdown from "react-markdown";

const Chat = ({
  messages,
}: {
  messages: { by: "user" | "ai"; message: string }[];
}) => {
  return (
    <div className="py-2 flex flex-col gap-8">
      {messages &&
        messages.length > 0 &&
        messages.map((m, idx) => (
          <div
            key={`message-${m.by}-${idx}`}
            className={`${
              m.by === "user" ? "justify-end" : "justify-start"
            } flex`}
          >
            <div
              className={`${
                m.by === "user"
                  ? "text-right bg-card border border-accent/70"
                  : "text-left bg-foreground text-background"
              } w-[90%] overflow-hidden relative p-4 shrink-0 block text-wrap rounded-md text-lg font-light leading-relaxed`}
            >
              <div
                className={`prose ${
                  m.by === "ai" ? "prose-invert" : ""
                } max-w-none wrap-break-word`}
              >
                <ReactMarkdown
                  components={{
                    // eslint-disable-next-line @typescript-eslint/no-unused-vars
                    pre: ({ node: _node, ...props }) => (
                      <pre
                        className="overflow-auto w-full my-2 bg-black/10 p-2 rounded-md"
                        {...props}
                      />
                    ),
                    // eslint-disable-next-line @typescript-eslint/no-unused-vars
                    code: ({ node: _node, ...props }) => (
                      <code
                        className="bg-black/10 rounded-sm px-1"
                        {...props}
                      />
                    ),
                  }}
                >
                  {m.message}
                </ReactMarkdown>
              </div>
            </div>
          </div>
        ))}
    </div>
  );
};

export default Chat;
