import { useEffect, useRef } from "react";
import ReactMarkdown from "react-markdown";
import { Message } from "@/lib/gemini";
import botAvatar from "@/assets/bot-avatar.png";
import userAvatar from "@/assets/user-avatar.png";
import starsBg from "@/assets/stars-bg.jpg";

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
      <div
        className="flex-1 flex flex-col items-center justify-center gap-6 relative overflow-hidden"
        style={{ backgroundImage: `url(${starsBg})`, backgroundSize: "cover", backgroundPosition: "center" }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/40" />
        <div className="relative z-10 flex flex-col items-center gap-4 animate-fade-in">
          <div className="w-20 h-20 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center shadow-lg shadow-primary/20">
            <img src={botAvatar} alt="Oblique AI" className="w-12 h-12" />
          </div>
          <h2 className="font-mono text-lg font-semibold text-white tracking-wide">
            What can I help you with?
          </h2>
          <p className="font-mono text-xs text-white/50 tracking-widest uppercase">
            Ask me anything to get started
          </p>
        </div>
      </div>
    );
  }

  return (
    <div
      className="flex-1 overflow-y-auto"
      style={{ backgroundImage: `url(${starsBg})`, backgroundSize: "cover", backgroundPosition: "center", backgroundAttachment: "fixed" }}
    >
      {messages.map((msg, i) => (
        <div
          key={i}
          className={`px-6 py-5 ${
            msg.role === "ai"
              ? "bg-white/5 backdrop-blur-sm border-b border-white/10"
              : "bg-transparent border-b border-white/5"
          }`}
        >
          <div className="flex items-start gap-3 max-w-3xl mx-auto">
            <div className={`w-9 h-9 rounded-full shrink-0 mt-0.5 flex items-center justify-center ${
              msg.role === "user" ? "bg-primary/20 ring-1 ring-primary/30" : "bg-white/10 ring-1 ring-white/20"
            }`}>
              <img
                src={msg.role === "user" ? userAvatar : botAvatar}
                alt={msg.role === "user" ? "User" : "AI"}
                className="w-6 h-6"
              />
            </div>
            <div className="flex-1 min-w-0">
              <span className="font-mono text-[10px] font-bold tracking-widest text-white/40 uppercase block mb-1.5">
                {msg.role === "user" ? "You" : "Oblique AI"}
              </span>
              <div className="text-sm leading-relaxed prose prose-sm prose-invert max-w-none text-white/90">
                <ReactMarkdown>{msg.content}</ReactMarkdown>
              </div>
            </div>
          </div>
        </div>
      ))}
      {isLoading && messages[messages.length - 1]?.role !== "ai" && (
        <div className="px-6 py-5 bg-white/5 backdrop-blur-sm border-b border-white/10">
          <div className="flex items-start gap-3 max-w-3xl mx-auto">
            <div className="w-9 h-9 rounded-full shrink-0 mt-0.5 flex items-center justify-center bg-white/10 ring-1 ring-white/20">
              <img src={botAvatar} alt="AI" className="w-6 h-6" />
            </div>
            <div>
              <span className="font-mono text-[10px] font-bold tracking-widest text-white/40 uppercase block mb-1.5">
                Oblique AI
              </span>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 bg-primary rounded-full animate-pulse" />
                <span className="w-2 h-2 bg-primary/70 rounded-full animate-pulse [animation-delay:150ms]" />
                <span className="w-2 h-2 bg-primary/40 rounded-full animate-pulse [animation-delay:300ms]" />
                <span className="font-mono text-xs text-white/50 ml-1">Thinking...</span>
              </div>
            </div>
          </div>
        </div>
      )}
      <div ref={endRef} />
    </div>
  );
}
