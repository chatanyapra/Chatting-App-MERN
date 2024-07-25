import React from 'react';
import { useAuthContext } from "../context/AuthContext";
import { formatTime } from "../utils/extractTime.ts"
import {MessageTextSmallProps} from "../types/types.ts"
// import useConversation from '../zustandStore/useConversation.ts';

const MessageTextSmall: React.FC<MessageTextSmallProps> = ({ message }: MessageTextSmallProps) => {
  const { authUser } = useAuthContext();
  
  const fromMe = message.senderId === authUser._id;
  const chatClassName = fromMe ? "justify-end" : "justify-start";
  const arrowClass = fromMe ? "triangle-right-message" : "triangle-left-message";
  const bgColor = fromMe ? "bg-cyan-200" : "bg-slate-200";
  const formattedTime = formatTime(message.createdAt);

  return (
    <div className='w-full flex flex-col py-1.5'>
      <div className={`flex ${chatClassName}`}>
        <div className="w-3/5 max-md:w-10/12 mx-4">
          <div className={`flex ${bgColor} text-gray-800 rounded-lg rounded-br-none shadow-md relative pb-1`}>
            <div className={`${arrowClass}`}></div>
            <span className="px-3 py-2 break-all">{message.message}</span>
            <small className="text-gray-400 absolute -bottom-0.5 right-1">{formattedTime}</small>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MessageTextSmall;
