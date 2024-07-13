import React from 'react';
import { useAuthContext } from "../context/AuthContext";
import { formatTime } from "../utils/extractTime.ts"
// import useConversation from '../zustandStore/useConversation.ts';

interface MessageType {
  shouldShake ?: boolean;
  _id: string;
  message: string;
  senderId: string;
  receiverId: string;
  createdAt: string;
}

interface MessageTextSmallProps {
  message: MessageType;
}

const MessageTextSmall: React.FC<MessageTextSmallProps> = ({ message }: MessageTextSmallProps) => {
  const { authUser } = useAuthContext();
  // const {selectedConversation} = useConversation();
  // const isSelected = selectedConversation?._id === message._id;
  // console.log('messanger id: - ',message._id);
  // console.log('selected: - ',selectedConversation?._id);
  // console.log('senderId: - ',message.senderId);
  // console.log('receivId: - ',message.receiverId);
  
  const fromMe = message.senderId === authUser._id;
  const chatClassName = fromMe ? "justify-end" : "justify-start";
  const bgColor = fromMe ? "bg-cyan-200" : "bg-slate-50";
  const formattedTime = formatTime(message.createdAt);
  const shakeClass= message.shouldShake ? "shake" : '';  

  return (
    <div className='w-full flex flex-col py-1.5'>
      {/* <small className='text-center w-full mt-4 mb-2 '><span className='bg-blue-100 py-2 px-3 rounded-md'></span></small> */}
      <div className={`flex ${chatClassName}`}>
        <div className="w-3/5 max-md:w-10/12 ml-4">
          <div className={`flex ${bgColor} text-gray-800 rounded-lg rounded-br-none shadow-md relative pb-2 ${shakeClass}`}>
            <span className="px-3 py-2 break-all">{message.message}</span>
            <small className="text-gray-400 absolute bottom-0 right-1">{formattedTime}</small>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MessageTextSmall;
