import { useState, useCallback } from "react";
import { Chat, Message, sendMessage } from "@/lib/gemini";

function generateId() {
  return Date.now().toString(36) + Math.random().toString(36).slice(2);
}

export function useChats() {
  const [chats, setChats] = useState<Chat[]>([
    { id: generateId(), title: "New Chat", messages: [] },
  ]);
  const [activeChatId, setActiveChatId] = useState(chats[0].id);
  const [isLoading, setIsLoading] = useState(false);

  const activeChat = chats.find((c) => c.id === activeChatId) || chats[0];

  const createNewChat = useCallback(() => {
    const newChat: Chat = { id: generateId(), title: "New Chat", messages: [] };
    setChats((prev) => [newChat, ...prev]);
    setActiveChatId(newChat.id);
  }, []);

  const send = useCallback(
    async (prompt: string) => {
      if (!prompt.trim() || isLoading) return;

      const userMsg: Message = { role: "user", content: prompt };

      setChats((prev) =>
        prev.map((c) =>
          c.id === activeChatId
            ? {
                ...c,
                messages: [...c.messages, userMsg],
                title: c.messages.length === 0 ? prompt.slice(0, 30) : c.title,
              }
            : c
        )
      );

      setIsLoading(true);
      try {
        const history = activeChat.messages;
        const response = await sendMessage(history, prompt);
        const aiMsg: Message = { role: "ai", content: response };

        setChats((prev) =>
          prev.map((c) =>
            c.id === activeChatId
              ? { ...c, messages: [...c.messages, userMsg, aiMsg].filter((m, i, arr) => 
                  // dedupe the userMsg we already added
                  !(m.role === "user" && m.content === prompt && i < arr.length - 2)
                )}
              : c
          )
        );
      } catch (e) {
        const errMsg: Message = {
          role: "ai",
          content: `Error: ${e instanceof Error ? e.message : "Unknown error"}`,
        };
        setChats((prev) =>
          prev.map((c) =>
            c.id === activeChatId
              ? { ...c, messages: [...c.messages, errMsg] }
              : c
          )
        );
      } finally {
        setIsLoading(false);
      }
    },
    [activeChatId, activeChat.messages, isLoading]
  );

  return { chats, activeChat, activeChatId, setActiveChatId, createNewChat, send, isLoading };
}
