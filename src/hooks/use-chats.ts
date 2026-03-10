import { useState, useCallback } from "react";
import { Chat, Message, streamChat } from "@/lib/gemini";

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

      // Add user message immediately
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

      // Build messages for the API (convert to assistant/user roles)
      const apiMessages = [...activeChat.messages, userMsg].map((m) => ({
        role: m.role === "user" ? ("user" as const) : ("assistant" as const),
        content: m.content,
      }));

      let assistantSoFar = "";

      const upsertAssistant = (nextChunk: string) => {
        assistantSoFar += nextChunk;
        setChats((prev) =>
          prev.map((c) => {
            if (c.id !== activeChatId) return c;
            const msgs = [...c.messages];
            const last = msgs[msgs.length - 1];
            if (last?.role === "ai") {
              msgs[msgs.length - 1] = { ...last, content: assistantSoFar };
            } else {
              msgs.push({ role: "ai", content: assistantSoFar });
            }
            return { ...c, messages: msgs };
          })
        );
      };

      try {
        await streamChat({
          messages: apiMessages,
          onDelta: (chunk) => upsertAssistant(chunk),
          onDone: () => setIsLoading(false),
        });
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
        setIsLoading(false);
      }
    },
    [activeChatId, activeChat.messages, isLoading]
  );

  return { chats, activeChat, activeChatId, setActiveChatId, createNewChat, send, isLoading };
}
