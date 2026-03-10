import { useState, KeyboardEvent } from "react";
import { Send } from "lucide-react";

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
    <div className="border-t border-border bg-card px-6 py-4" data-ui-chrome>
      <div className="max-w-3xl mx-auto flex items-center gap-3">
        <div className="flex-1 relative">
          <input
            type="text"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Ask anything..."
            disabled={isLoading}
            className="w-full bg-secondary/50 border border-border rounded-lg px-4 py-3 font-mono text-sm outline-none placeholder:text-muted-foreground text-foreground disabled:opacity-50 caret-primary focus:border-primary focus:ring-1 focus:ring-primary transition-all"
          />
        </div>
        <button
          onClick={handleSend}
          disabled={isLoading || !value.trim()}
          className="w-11 h-11 flex items-center justify-center bg-primary text-primary-foreground rounded-lg disabled:opacity-30 transition-all hover:opacity-90 active:scale-95"
        >
          <Send className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
