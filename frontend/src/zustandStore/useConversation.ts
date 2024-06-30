import { create } from "zustand";

interface Conversation {
    _id: string;
    fullname: string;
    profilePic: string;
    username: string;
}

interface Message {
  _id: string;
  message: string;
  timestamp: number;
}

interface ConversationState {
  selectedConversation: Conversation | null;
  setSelectedConversation: (selectedConversation: Conversation | null) => void;
  message: Message[];
  setMessage: (message: Message[]) => void;
}

const useConversation = create<ConversationState>((set) => ({
  selectedConversation: null,
  setSelectedConversation: (selectedConversation) => set({ selectedConversation }),
  message: [],
  setMessage: (message) => set({ message })
}));

export default useConversation;
