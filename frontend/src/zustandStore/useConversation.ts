import { create } from "zustand";

interface Conversation {
    _id: string;
    fullname: string;
    profilePic: string;
    username: string;
}

interface MessageType {
  _id: string;
  message: string;
  senderId: string;
  receiverId: string;
}

interface ConversationState {
  selectedConversation: Conversation | null;
  setSelectedConversation: (selectedConversation: Conversation | null) => void;
  messages: MessageType[];
  setMessages: (messages: MessageType[]) => void;
}

const useConversation = create<ConversationState>((set) => ({
  selectedConversation: null,
  setSelectedConversation: (selectedConversation: Conversation | null) => set({ selectedConversation }),
  messages: [],
  setMessages: (messages: MessageType[]) => set({ messages })
}));

export default useConversation;
