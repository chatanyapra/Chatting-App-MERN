import React, { useState, useCallback, useEffect, useRef, ChangeEvent } from 'react';
import { LuSendHorizonal, LuLink2, LuX } from "react-icons/lu";
import useSendMessage from '../hooks/useSendMessage';
import MessageText from './MessageText';
import useGetMessages from "../hooks/useGetMessages";
import { useSocketContext } from '../context/SocketContext';
import { MyComponentProps } from "../types/types";
import AiLoader from './AiLoader';
import axios from 'axios';

const AuramicAi: React.FC<MyComponentProps> = ({ conversation, visibility }: MyComponentProps) => {
    const [newMessageText, setNewMessageText] = useState<string>('');
    const { loading, sendMessage } = useSendMessage();
    const [formattedText, setFormattedText] = useState<JSX.Element[] | string>([]); // Corrected initialization
    const { messages } = useGetMessages();
    const { onlineUsers } = useSocketContext();
    const isOnline = onlineUsers.includes(conversation._id);
    const [selectedMedia, setSelectedMedia] = useState<string | null>(null);
    const [mediaType, setMediaType] = useState<string | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const uploadData = async (base64Image?: string | null) => {
        try {
            const response = await axios.post('api/users/extract-text', {
                image: base64Image ? `data:image/jpeg;base64,${base64Image}` : null,
                question: newMessageText || ""
            });

            const text = response.data.response;

            // Split text into paragraphs or bullet points
            const paragraphs = text.split('\n').map((line: string, index: number) => (
                <p key={index} style={{ marginBottom: '10px' }}>{line}</p>
            ));
            console.log("formattedText----------", paragraphs);
            
            setFormattedText(paragraphs.length ? paragraphs : 'No response received'); // Corrected assignment
            setSelectedMedia(null);
            setNewMessageText('');
        } catch (error) {
            console.error('Error uploading image:', error);
        }
    };

    const handleMediaChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files.length > 0) {
            const file = event.target.files[0];
            const reader = new FileReader();
            reader.onloadend = () => {
                if (typeof reader.result === "string") {
                    setSelectedMedia(reader.result);
                    setMediaType(file.type);
                }
            };
            reader.readAsDataURL(file);
        }
    };

    const handleRemoveFile = useCallback(() => {
        setSelectedMedia(null);
        setMediaType(null);
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
    }, []);

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        console.log("newMessageText--- ", newMessageText);

        const form = event.target as HTMLFormElement;
        const fileInput = form.elements.namedItem('file') as HTMLInputElement;

        if (!newMessageText && !selectedMedia) return;
        
        let file = fileInput?.files?.[0];

        await sendMessage(newMessageText, file);

        if (!selectedMedia && !newMessageText) {
            alert('Please select an image or provide a question.');
            return;
        }

        let base64Image = null;

        if (selectedMedia) {
            base64Image = selectedMedia.split(',')[1]; // Corrected: No need to use FileReader again
            await uploadData(base64Image);
        } else {
            await uploadData(null);
        }
        setNewMessageText('');
        handleRemoveFile();
        fileInput.value = '';
    };

    const handleChangeInput = (text: string) => {
        setNewMessageText(text);
    };

    const lastMessageRef = useRef<HTMLDivElement>(null);
    useEffect(() => {
        setTimeout(() => {
            if (lastMessageRef.current) {
                lastMessageRef.current.scrollTop = lastMessageRef.current.scrollHeight;
            }
        }, 100);
    }, [messages]);

    return (
        <div className={`w-full max-w-screen-lg shadow-md overflow-hidden bg-white relative mt-0 max-md:${visibility ? 'visible' : 'hidden'} border-solid border-2 border-gray-400 max-sm:rounded-lg rounded-r-lg`}>
            {/* <!-- chat heading --> */}
            <div className="flex items-center justify-between gap-2 px-6 z-10 border-b dark:border-slate-700 uk-animation-slide-top-medium">
                <div className="flex items-center sm:gap-4 gap-2 md:py-4 py-2">
                    <div className="relative cursor-pointer">
                        <div>
                            <AiLoader />
                        </div>
                        {isOnline && (<div className="w-2 h-2 bg-teal-500 rounded-full absolute right-0 bottom-0 m-px"></div>)}
                    </div>
                    <div className="cursor-pointer">
                        <div className="text-2xl font-bold">{conversation.fullname}</div>
                    </div>
                </div>
                <div className="flex items-center gap-2">
                    <div>
                    </div>
                </div>
            </div>

            {/* <!-- chats bubble --> */}
            <div className="small-scroll w-full p-3 py-10 overflow-y-auto md:h-[calc(100vh-260px)] h-[calc(100vh-120px)]" ref={lastMessageRef} style={{ overflowY: 'auto' }}>
                <div className="text-sm font-medium space-y-6">
                    <MessageText />
                </div>
                {formattedText && formattedText}
            </div>

            {/* <!-- sending message area --> */}
            <form onSubmit={handleSubmit} encType="multipart/form-data" className="flex items-center justify-center pb-1 pt-2 absolute bottom-0 left-0 w-full">
                <div className="w-full flex justify-between items-center z-10 rounded-full">
                    <input type="text" className='w-full py-2 px-3 ml-3 mr-2 rounded-full border border-gray-500' value={newMessageText} placeholder='Write the message...' onChange={(e: ChangeEvent<HTMLInputElement>) => handleChangeInput(e.target.value)} />
                    <div title='Attach' className='mb-3'>
                        <label htmlFor="file">
                            <LuLink2 className='text-2xl mx-0.5 text-gray-500 mt-3.5 hover:text-blue-600 cursor-pointer' />
                        </label>
                        <input type="file" id="file" name="file" className='hidden' accept="image/*" onChange={handleMediaChange} ref={fileInputRef}></input>
                    </div>
                    <button
                        type="submit"
                        className="text-white w-10 h-10 shrink-0 p-2 border-t border-gray-400 rounded-full bg-green-200 mx-2 shadow-md text-center"
                        disabled={loading}
                    >
                        {loading ? <div className="loader"></div> : <LuSendHorizonal className="text-xl ml-0.5 flex text-blue-600" />}
                    </button>
                </div>
            </form>
            {selectedMedia && (
                <div className='absolute bottom-0 w-full h-60 bg-blue-200 rounded-md overflow-hidden'>
                    <div className='relative flex w-full h-full '>
                        <div className='w-[calc(100%-75px)] m-3 mb-8 border-2 border-gray-400 border-dashed rounded-md'>
                            <>
                                {mediaType && mediaType.startsWith("image/") ? (
                                    <img src={selectedMedia} alt="Selected Image" className="h-full" />
                                ) : (
                                    <video controls className="h-full w-full">
                                        <source src={selectedMedia} type={mediaType || "video/mp4"} className=' h-full w-full' />
                                        Your browser does not support the video tag.
                                    </video>
                                )}
                            </>
                        </div>
                        <LuX
                            type="button"
                            className="absolute right-6 top-20 text-2xl text-gray-500 outline-dashed outline-2 outline-offset-4 rounded-full cursor-pointer"
                            onClick={handleRemoveFile}
                        />
                    </div>
                </div>
            )}
        </div>
    );
};

export default AuramicAi;
