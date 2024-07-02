import React from 'react';
import { useAuthContext } from "../context/AuthContext";

interface MessageType {
  _id: string;
  message: string;
  senderId: string;
  receiverId: string;
}

interface MessageTextSmallProps {
  message: MessageType;
}

const MessageTextSmall: React.FC<MessageTextSmallProps> = ({ message } : MessageTextSmallProps) => {
  const { authUser } = useAuthContext();
  const fromMe = message.senderId === authUser._id;
  const chatClassName = fromMe ? "justify-end" : "justify-start";
  const bgColor = fromMe ? "bg-cyan-200" : "bg-slate-50";

  return (
    <div className={`flex ${chatClassName}`}>
      <div className="w-3/5 max-md:w-11/12 ml-4">
        <div className={`flex ${bgColor} text-gray-800 rounded-lg rounded-br-none shadow-md relative pb-2`}>
          <span className="px-3 py-2 break-all">{message.message}</span>
          <small className="text-gray-400 w-12 absolute bottom-0 right-1">12:45 PM</small>
        </div>
      </div>
    </div>
  );
}

export default MessageTextSmall;
