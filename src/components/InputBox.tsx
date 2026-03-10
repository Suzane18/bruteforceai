import { useState, KeyboardEvent } from "react";
import { Send, Sparkles } from "lucide-react";

interface InputBoxProps {
  onSend: (message: string) => void;
  isLoading: boolean;
}

export function InputBox({ onSend, isLoading }: InputBoxProps) {
  const [value, setValue] = useState("");

  const handleSend = () => {
    if (!value.trim() || isLoading) return;
    onSend(value.trim());
    setValue("");
  };

  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="border-t border-white/10 bg-[hsl(220,30%,8%)] px-6 py-4" data-ui-chrome>
      <div className="max-w-3xl mx-auto">
        <div className="flex items-center gap-3 bg-white/5 border border-white/10 rounded-2xl px-4 py-2 focus-within:border-primary/50 focus-within:ring-1 focus-within:ring-primary/30 transition-all">
          <Sparkles className="w-4 h-4 text-primary/60 shrink-0" />
          <input
            type="text"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Ask anything..."
            disabled={isLoading}
            className="flex-1 bg-transparent font-mono text-sm outline-none placeholder:text-white/30 text-white/90 disabled:opacity-50 caret-primary py-1.5"
          />
          <button
            onClick={handleSend}
            disabled={isLoading || !value.trim()}
            className="w-9 h-9 flex items-center justify-center bg-primary text-primary-foreground rounded-xl disabled:opacity-20 transition-all hover:opacity-90 active:scale-95 shrink-0"
          >
            <Send className="w-3.5 h-3.5" />
          </button>
        </div>
        <p className="text-center font-mono text-[10px] text-white/20 mt-2 tracking-wider">
          Powered by Oblique AI
        </p>
      </div>
    </div>
  );
}
