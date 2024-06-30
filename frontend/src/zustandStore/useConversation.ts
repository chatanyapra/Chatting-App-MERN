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
}

interface ConversationState {
  selectedConversation: Conversation | null;
  setSelectedConversation: (selectedConversation: Conversation | null) => void;
  message: Message[];
  setMessage: (message: Message[]) => void;
}

const useConversation = create<ConversationState>((set) => ({
  selectedConversation: null,
  setSelectedConversation: (selectedConversation :Conversation | null) => set({ selectedConversation }),
  message: [],
  setMessage: (message : Message[]) => set({ message })
}));

export default useConversation;
