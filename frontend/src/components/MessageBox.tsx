import React, { useState , useCallback} from 'react';
import InputEmoji from 'react-input-emoji';
import { FormEvent } from 'react';
import { LuSendHorizonal } from "react-icons/lu";
import useSendMessage from '../hooks/useSendMessage';
import MessageText from './MessageText';
import { useEffect, useRef } from 'react';
import useGetMessages from "../hooks/useGetMessages";
import { useSocketContext } from '../context/SocketContext';
import {MyComponentProps} from "../types/types";
import { useAuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import peerService from "../peerService/peer";

const MessageBox: React.FC<MyComponentProps> = ({ conversation, visibility }: MyComponentProps) => {
  const [newMessage, setNewMessage] = useState<string>('');
  const { loading, sendMessage } = useSendMessage();
  const { messages } = useGetMessages();
  const {socket, onlineUsers } = useSocketContext();
  const isOnline = onlineUsers.includes(conversation._id);
  const { authUser } = useAuthContext();
  const navigate= useNavigate();

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!newMessage) return;
    await sendMessage(newMessage);
    setNewMessage('');
  };

  const handleOnEnter = async (text: string) => {
    await sendMessage(text);
  };
  
  const handleVideoCall = useCallback(() => {
    if(authUser){
      peerService.restartConnection();
      const room = conversation._id;
      const userName= conversation.fullname;
      socket?.emit("room:join", { email: userName, room });
      navigate(`/room/${room}`);
    }
  },[socket]);


  const lastMessageRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    setTimeout(() => {
      if (lastMessageRef.current) {
        lastMessageRef.current.scrollTop = lastMessageRef.current.scrollHeight;
      }
    }, 100);
  }, [messages]);

  let textColor = '';
  return (
    <div className={`w-full shadow-md bg-white rounded-xl dark:bg-black mt-0 max-md:${visibility ? 'visible' : 'hidden'}`}>
      {/* <!-- chat heading --> */}
      <div className="flex items-center justify-between gap-2 px-6 z-10 border-b dark:border-slate-700 uk-animation-slide-top-medium">
        <div className="flex items-center sm:gap-4 gap-2 md:py-4 py-2">
          <div className="relative cursor-pointer max-md:hidden">
            <img src={conversation.profilePic} alt="" className="w-8 h-8 rounded-full shadow" />
            {isOnline && (<div className="w-2 h-2 bg-teal-500 rounded-full absolute right-0 bottom-0 m-px"></div>)}
          </div>
          <div className="cursor-pointer">
            <div className="text-base font-bold">{conversation.fullname}</div>
            <div className="text-xs text-green-500 font-semibold h-3"> {isOnline ? 'Online' : ''}</div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button type="button" className="button__ico hover:bg-slate-100 p-1.5 rounded-full">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className={`w-6 h-6 ${textColor}`}>
              <path fillRule="evenodd" d="M2 3.5A1.5 1.5 0 013.5 2h1.148a1.5 1.5 0 011.465 1.175l.716 3.223a1.5 1.5 0 01-1.052 1.767l-.933.267c-.41.117-.643.555-.48.95a11.542 11.542 0 006.254 6.254c.395.163.833-.07.95-.48l.267-.933a1.5 1.5 0 011.767-1.052l3.223.716A1.5 1.5 0 0118 15.352V16.5a1.5 1.5 0 01-1.5 1.5H15c-1.149 0-2.263-.15-3.326-.43A13.022 13.022 0 012.43 8.326 13.019 13.019 0 012 5V3.5z" clipRule="evenodd" />
            </svg>
          </button>
          <button type="button" className="hover:bg-slate-100 p-1.5 rounded-full" onClick={handleVideoCall}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className={`w-6 h-6 ${textColor}`}>
              <path strokeLinecap="round" d="M15.75 10.5l4.72-4.72a.75.75 0 011.28.53v11.38a.75.75 0 01-1.28.53l-4.72-4.72M4.5 18.75h9a2.25 2.25 0 002.25-2.25v-9a2.25 2.25 0 00-2.25-2.25h-9A2.25 2.25 0 002.25 7.5v9a2.25 2.25 0 002.25 2.25z" />
            </svg>
          </button>
          <button type="button" className="hover:bg-slate-100 p-1.5 rounded-full">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className={`w-6 h-6 ${textColor}`}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z" />
            </svg>
          </button>
        </div>
      </div>

      {/* <!-- chats bubble --> */}
      <div className="small-scroll w-full p-5 py-10 overflow-y-auto md:h-[calc(100vh-260px)] h-[calc(100vh-195px)]" ref={lastMessageRef} style={{ overflowY: 'auto' }}>
        <div className="py-5 text-center text-sm lg:pt-8 h-auto overflow-hidden">
          <img src={conversation.profilePic} className="w-24 h-24 rounded-full mx-auto mb-3" alt="" />
          <div className="mt-8">
            <div className="md:text-xl text-base font-medium text-black dark:text-white"> {conversation.fullname} </div>
            <div className="text-gray-500 text-sm dark:text-white/80"> {conversation.username} </div>
          </div>
        </div>
        <div className="text-sm font-medium space-y-6">
          <MessageText />
        </div>
      </div>

      {/* <!-- sending message area --> */}
      <form onSubmit={handleSubmit} className="flex items-center justify-center md:px-2 min-h-14 p-2">
        <div className="w-full flex justify-between">
          <InputEmoji
            value={newMessage}
            onChange={setNewMessage}
            cleanOnEnter
            onEnter={handleOnEnter}
            placeholder="Write your message"
            borderRadius={10}
            borderColor={"#e2e8f0"} shouldReturn={false} shouldConvertEmojiToImage={false}          />
          <button
            type="submit"
            className="text-white w-10 h-10 shrink-0 p-2 border-t border-gray-400 rounded-full bg-green-200 mt-1 mx-2 shadow-md text-center"
            disabled={loading}
          >
            {loading ? <div className="loader"></div> : <LuSendHorizonal className="text-xl ml-0.5 flex text-blue-600" />}
          </button>
        </div>
      </form>
    </div>
  );
};

export default MessageBox;
