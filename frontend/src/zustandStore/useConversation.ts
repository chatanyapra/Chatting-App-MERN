// import { create } from "zustand";

// interface Conversation {
//   id: string;
//   name: string;
//   // add other fields as necessary
// }

// interface Message {
//   id: string;
//   text: string;
//   timestamp: number;
//   // add other fields as necessary
// }

// interface ConversationState {
//   selectedConversation: Conversation | null;
//   setSelectedConversation: (selectedConversation: Conversation | null) => void;
//   message: Message[];
//   setMessage: (message: Message[]) => void;
// }

// const useConversation = create<ConversationState>((set) => ({
//   selectedConversation: null,
//   setSelectedConversation: (selectedConversation) => set({ selectedConversation }),
//   message: [],
//   setMessage: (message) => set({ message })
// }));

// export default useConversation;
