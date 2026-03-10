import { AppSidebar } from "@/components/AppSidebar";
import { DashboardHeader } from "@/components/DashboardHeader";
import { ChatArea } from "@/components/ChatArea";
import { InputBox } from "@/components/InputBox";
import { useChats } from "@/hooks/use-chats";

const Index = () => {
  const { chats, activeChat, activeChatId, setActiveChatId, createNewChat, send, isLoading } = useChats();

  return (
    <div className="h-screen flex">
      <AppSidebar
        chats={chats}
        activeChatId={activeChatId}
        onSelectChat={setActiveChatId}
        onNewChat={createNewChat}
      />
      <div className="flex-1 flex flex-col min-w-0">
        <DashboardHeader title={activeChat.title} />
        <ChatArea messages={activeChat.messages} isLoading={isLoading} />
        <InputBox onSend={send} isLoading={isLoading} />
      </div>
    </div>
  );
};

export default Index;
