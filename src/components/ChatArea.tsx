import { useEffect, useRef } from "react";
import ReactMarkdown from "react-markdown";
import { Message } from "@/lib/gemini";

interface ChatAreaProps {
  messages: Message[];
  isLoading: boolean;
}

export function ChatArea({ messages, isLoading }: ChatAreaProps) {
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  if (messages.length === 0) {
    return (
      <div className="flex-1 flex items-center justify-center bg-background">
        <p className="font-mono text-sm text-muted-foreground">// Ready for input</p>
      </div>
    );
  }

  return (
    <div className="flex-1 overflow-y-auto bg-background">
      {messages.map((msg, i) => (
        <div
          key={i}
          className={`border-b border-border px-6 py-4 ${
            msg.role === "ai" ? "ai-response-enter" : "bg-background"
          }`}
        >
          <span className="font-mono text-xs font-semibold text-muted-foreground block mb-2">
            {msg.role === "user" ? "User:" : "AI:"}
          </span>
          <div className="font-body text-sm leading-relaxed prose prose-sm max-w-none text-foreground">
            <ReactMarkdown>{msg.content}</ReactMarkdown>
          </div>
        </div>
      ))}
      {isLoading && (
        <div className="border-b border-border px-6 py-4">
          <span className="font-mono text-xs font-semibold text-muted-foreground block mb-2">AI:</span>
          <span className="font-mono text-sm text-muted-foreground animate-pulse">// Computing...</span>
        </div>
      )}
      <div ref={endRef} />
    </div>
  );
}
