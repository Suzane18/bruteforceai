import { Chat } from "@/lib/gemini";
import { Plus, MessageSquare, Trash2 } from "lucide-react";
import botAvatar from "@/assets/bot-avatar.png";

interface SidebarProps {
  chats: Chat[];
  activeChatId: string;
  onSelectChat: (id: string) => void;
  onNewChat: () => void;
}

export function AppSidebar({ chats, activeChatId, onSelectChat, onNewChat }: SidebarProps) {
  return (
    <aside className="w-64 border-r border-border bg-card flex flex-col shrink-0" data-ui-chrome>
      {/* Logo */}
      <div className="h-[60px] border-b border-border flex items-center gap-3 px-4">
        <img src={botAvatar} alt="Oblique AI" className="w-7 h-7" />
        <span className="font-mono font-bold text-sm tracking-wider text-primary">OBLIQUE_AI</span>
      </div>

      {/* New Chat */}
      <button
        onClick={onNewChat}
        className="flex items-center gap-2 mx-3 mt-3 mb-2 px-3 py-2.5 bg-primary text-primary-foreground rounded-lg font-mono text-xs tracking-wide hover:opacity-90 transition-all active:scale-[0.98]"
      >
        <Plus className="w-4 h-4" />
        <span>New Chat</span>
      </button>

      {/* Chat History */}
      <div className="flex-1 overflow-y-auto px-3 py-1">
        <span className="font-mono text-[10px] text-muted-foreground tracking-widest uppercase px-2 mb-1 block">
          History
        </span>
        {chats.map((chat) => (
          <button
            key={chat.id}
            onClick={() => onSelectChat(chat.id)}
            className={`w-full text-left flex items-center gap-2 px-3 py-2.5 rounded-lg font-mono text-xs truncate transition-all mb-0.5 ${
              chat.id === activeChatId
                ? "bg-primary/10 text-primary border border-primary/20"
                : "hover:bg-secondary text-foreground"
            }`}
          >
            <MessageSquare className="w-3.5 h-3.5 shrink-0" />
            <span className="truncate">{chat.title}</span>
          </button>
        ))}
      </div>
    </aside>
  );
}
