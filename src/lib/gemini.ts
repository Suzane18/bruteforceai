import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI("AIzaSyDkwZ863oSX7WzIS596zyhDoX81g1PxZ7A");

export interface Message {
  role: "user" | "ai";
  content: string;
}

export interface Chat {
  id: string;
  title: string;
  messages: Message[];
}

export async function sendMessage(history: Message[], prompt: string): Promise<string> {
  const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

  const chatHistory = history.map((m) => ({
    role: m.role === "user" ? "user" as const : "model" as const,
    parts: [{ text: m.content }],
  }));

  const chat = model.startChat({ history: chatHistory });
  const result = await chat.sendMessage(prompt);
  const response = result.response;
  return response.text();
}
