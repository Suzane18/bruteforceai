import { useState, KeyboardEvent } from "react";
import { ArrowRight } from "lucide-react";

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
    <div className="h-20 border-t border-border bg-card flex items-center px-6 gap-4" data-ui-chrome>
      <input
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="// Type a prompt"
        disabled={isLoading}
        className="flex-1 bg-transparent font-mono text-sm outline-none placeholder:text-muted-foreground text-foreground disabled:opacity-50 caret-primary"
      />
      <button
        onClick={handleSend}
        disabled={isLoading || !value.trim()}
        className="w-10 h-10 flex items-center justify-center bg-primary text-primary-foreground disabled:opacity-30 transition-opacity"
      >
        <ArrowRight className="w-4 h-4" />
      </button>
    </div>
  );
}
