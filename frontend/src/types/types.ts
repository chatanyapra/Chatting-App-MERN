import { ReactNode} from "react";

export interface UserJoinedData {
    email: string;
    id: string;
  }
  
  export interface IncommingCallData {
    from: string;
    offer: RTCSessionDescriptionInit;
  }
  
  export interface CallAcceptedData {
    from: string;
    ans: RTCSessionDescriptionInit;
  }
  
  export interface NegoNeededData {
    from: string;
    offer: RTCSessionDescriptionInit;
  }
  
  export interface NegoNeedFinalData {
    ans: RTCSessionDescriptionInit;
  }
  
  export interface JoinRoomData {
    email: string;
    room: string;
  }

export interface SocketContextProviderProps {
    children: ReactNode;
}
  
export interface Conversation {
    _id: string;
    username: string;
    fullname: string;
    profilePic: string;
}

export interface MessageType {
    shouldShake ?: boolean;
    _id: string;
    message: string;
    senderId: string;
    receiverId: string;
    createdAt: string;
}

export interface MyComponentProps {
    visibility: boolean;
    conversation : Conversation;
}

export interface GroupedMessages {
    date: string;
    messages: MessageType[];
}

export interface MessageTextSmallProps {
    message: MessageType;
  }
