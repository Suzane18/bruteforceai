import { Chat } from "@/lib/gemini";
import { Plus, MessageSquare } from "lucide-react";

interface SidebarProps {
  chats: Chat[];
  activeChatId: string;
  onSelectChat: (id: string) => void;
  onNewChat: () => void;
}

export function AppSidebar({ chats, activeChatId, onSelectChat, onNewChat }: SidebarProps) {
  return (
    <aside className="w-60 border-r border-border bg-card flex flex-col shrink-0" data-ui-chrome>
      {/* Logo */}
      <div className="h-[60px] border-b border-border flex items-center px-4">
        <span className="font-mono font-bold text-sm tracking-wider">OBLIQUE_AI</span>
      </div>

      {/* New Chat */}
      <button
        onClick={onNewChat}
        className="flex items-center gap-2 px-4 py-3 border-b border-border font-mono text-xs tracking-wide hover:bg-secondary transition-colors"
      >
        <Plus className="w-4 h-4" />
        <span>NEW_CHAT</span>
      </button>

      {/* Chat History */}
      <div className="flex-1 overflow-y-auto">
        {chats.map((chat) => (
          <button
            key={chat.id}
            onClick={() => onSelectChat(chat.id)}
            className={`w-full text-left flex items-center gap-2 px-4 py-3 border-b border-border font-mono text-xs truncate transition-colors ${
              chat.id === activeChatId
                ? "bg-primary text-primary-foreground"
                : "hover:bg-secondary"
            }`}
          >
            <MessageSquare className="w-3 h-3 shrink-0" />
            <span className="truncate">{chat.title}</span>
          </button>
        ))}
      </div>
    </aside>
  );
}
