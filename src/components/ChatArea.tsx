import { useEffect, useRef } from "react";
import ReactMarkdown from "react-markdown";
import { Message } from "@/lib/gemini";
import botAvatar from "@/assets/bot-avatar.png";
import userAvatar from "@/assets/user-avatar.png";

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
      <div className="flex-1 flex flex-col items-center justify-center bg-background gap-4">
        <img src={botAvatar} alt="Oblique AI" className="w-16 h-16 opacity-40" />
        <p className="font-mono text-sm text-muted-foreground">// Ready for input</p>
      </div>
    );
  }

  return (
    <div className="flex-1 overflow-y-auto bg-background">
      {messages.map((msg, i) => (
        <div
          key={i}
          className={`border-b border-border px-6 py-5 ${
            msg.role === "ai" ? "ai-response-enter" : "bg-background"
          }`}
        >
          <div className="flex items-start gap-3 max-w-3xl mx-auto">
            <img
              src={msg.role === "user" ? userAvatar : botAvatar}
              alt={msg.role === "user" ? "User" : "AI"}
              className="w-8 h-8 rounded-full mt-0.5 shrink-0 bg-muted p-1"
            />
            <div className="flex-1 min-w-0">
              <span className="font-mono text-[10px] font-bold tracking-widest text-muted-foreground uppercase block mb-1.5">
                {msg.role === "user" ? "You" : "Oblique AI"}
              </span>
              <div className="text-sm leading-relaxed prose prose-sm max-w-none text-foreground">
                <ReactMarkdown>{msg.content}</ReactMarkdown>
              </div>
            </div>
          </div>
        </div>
      ))}
      {isLoading && messages[messages.length - 1]?.role !== "ai" && (
        <div className="border-b border-border px-6 py-5">
          <div className="flex items-start gap-3 max-w-3xl mx-auto">
            <img src={botAvatar} alt="AI" className="w-8 h-8 rounded-full mt-0.5 shrink-0 bg-muted p-1" />
            <div>
              <span className="font-mono text-[10px] font-bold tracking-widest text-muted-foreground uppercase block mb-1.5">
                Oblique AI
              </span>
              <span className="font-mono text-sm text-muted-foreground animate-pulse">● Thinking...</span>
            </div>
          </div>
        </div>
      )}
      <div ref={endRef} />
    </div>
  );
}
