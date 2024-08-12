
export interface UserJoinedData {
<<<<<<< HEAD
    video: boolean;
    username: string;
    id: string;
    userId: string;
  }
export interface UserJoinedDataRequest {
    video: boolean;
    username: string;
    userId: string;
    room: string;
  }
  
  export interface IncommingCallData {
    video: boolean;
    username: string;
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
  
=======
  video: boolean;
  username: string;
  id: string;
  userId: string;
}
export interface UserJoinedDataRequest {
  video: boolean;
  username: string;
  userId: string;
  room: string;
}

export interface IncommingCallData {
  video: boolean;
  username: string;
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

>>>>>>> 5e467ffbfb89e0c299b479cdfefd104107ede6ad
export interface Conversation {
  _id: string;
  username: string;
  fullname: string;
  profilePic: string;
}

export interface MessageType {
<<<<<<< HEAD
    shouldShake ?: boolean;
    _id: string;
    message: string;
    senderId: string;
    receiverId: string;
    createdAt: string;
    fileUrl ?: string;
=======
  shouldShake ?: boolean;
  _id: string;
  message: string;
  senderId: string;
  receiverId: string;
  createdAt: string;
  fileUrl ?: string;
<<<<<<< HEAD
=======
>>>>>>> 5e467ffbfb89e0c299b479cdfefd104107ede6ad
>>>>>>> 5595cb75eeac1ede1d77a60d535057a8651c9ff8
}

export interface UseGetMessagesReturn {
loading: boolean;
messages: MessageType[];
}

export interface MyComponentProps {
  visibility: boolean;
  conversation : Conversation;
}

export interface GroupedMessages {
  date: string;
  messages: MessageType[];
}

export interface UseGetConversation {
loading: boolean;
conversations: Conversation[];
}

export interface MessageTextSmallProps {
  message: MessageType;
}
