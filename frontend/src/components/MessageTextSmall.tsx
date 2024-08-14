import React from 'react';
import { useAuthContext } from "../context/AuthContext";
import { formatTime } from "../utils/extractTime.ts"
import { MessageTextSmallProps } from "../types/types.ts";

const MessageTextSmall: React.FC<MessageTextSmallProps> = ({ message }: MessageTextSmallProps) => {
  const { authUser } = useAuthContext();
  const openImageInNewTab = (url: string | URL | undefined) => {
    window.open(url, '_blank');
  };
  const fromMe = message.senderId === authUser._id;
  const chatClassName = fromMe ? "justify-end ml-4" : "justify-start mr-4";
  const arrowClass = fromMe ? "triangle-right-message" : "triangle-left-message";
  const bgColor = fromMe ? "bg-cyan-200" : "bg-slate-200";
  const formattedTime = formatTime(message.createdAt);

  const url = message.fileUrl;

  const isImageUpload = url?.includes("image/");
  const isVideoUpload = url?.includes("video/");

  return (
    <div className='w-full flex flex-col py-2'>
      {message.fileUrl == null ? (
        <div className={`flex ${chatClassName}`}>
          <div className="max-w-3/5 sm:max-w-screen-md min-w-20 mx-1">
            <div className={`flex ${bgColor} text-gray-800 rounded-lg rounded-br-none shadow-md relative pb-1`}>
              <div className={`${arrowClass}`}></div>
              <div className="block px-3 py-2 break-words" style={{ overflowWrap: 'break-word', wordBreak: 'break-word' }}>
                {message.message}
              </div>
              <small className="text-gray-400 absolute -bottom-0.5 right-1">{formattedTime}</small>
            </div>
          </div>
        </div>
      ) : (
        <div className={`flex ${chatClassName}`}>
          <div className="max-w-3/5 min-w-20 mx-1">
            <div className={`flex ${bgColor} text-gray-800 rounded-lg rounded-br-none shadow-md relative pb-1`}>
              <div className={`${arrowClass}`}></div>
              <div className="flex flex-col p-3 rounded-lg">
                {isImageUpload && (
                  <img className="w-80 min-h-40 max-h-60 rounded-t-lg object-cover cursor-pointer" src={message.fileUrl} alt="Sent Image" onDoubleClick={() => openImageInNewTab(message.fileUrl)} />
                )}
                {isVideoUpload && (
                  <video controls className="w-80 min-h-40 max-h-60 rounded-t-lg object-cover">
                    <source src={message.fileUrl} type={"video/mp4"} className=' h-full w-full' />
                    Your browser does not support the video tag.
                  </video>
                )}
                <div className="text-gray-800">
                  <p className="text-sm mt-2">{message.message}</p>
                </div>
              </div>
              <small className="text-gray-400 absolute -bottom-0.5 right-1">{formattedTime}</small>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default MessageTextSmall;
