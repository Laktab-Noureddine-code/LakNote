import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface AIMessage {
  id: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
  timestamp: Date;
}

interface AIState {
  messages: AIMessage[];
  addMessage: (message: Omit<AIMessage, 'id' | 'timestamp'>) => void;
  clearMessages: () => void;
  getMessageHistory: () => AIMessage[];
}

export const useAIStore = create<AIState>()(
  persist(
    (set, get) => ({
      messages: [],
      addMessage: (message) => {
        const newMessage: AIMessage = {
          ...message,
          id: Date.now().toString(),
          timestamp: new Date(),
        };
        set((state) => ({
          messages: [...state.messages, newMessage],
        }));
      },
      clearMessages: () => set({ messages: [] }),
      getMessageHistory: () => get().messages,
    }),
    {
      name: 'ai-chat-storage',
    }
  )
);
