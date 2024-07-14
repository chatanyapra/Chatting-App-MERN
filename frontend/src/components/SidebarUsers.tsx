// import { useNavigate } from "react-router-dom";
import { useState, useEffect } from 'react';
import { useSocketContext } from "../context/SocketContext";
import useListenMessage from "../hooks/useListenMessage";
import useConversation from "../zustandStore/useConversation";
interface Conversation {
    _id: string;
    fullname: string;
    profilePic: string;
    username: string;
}

function SidebarUsers({ conversation }: { conversation: Conversation }) {

    const {selectedConversation, setSelectedConversation} = useConversation();
    const isSelected = selectedConversation?._id === conversation._id;
    const {onlineUsers} = useSocketContext();
    const isOnline = onlineUsers.includes(conversation._id);
    const [newSendMessage, setNewSendMessage] = useState<string[]>([]);
    const { newSendMessage: SendMessage } = useListenMessage(); // Assuming useListenMessage returns an object with newSendMessage
    console.log('ppp',SendMessage);
    
    useEffect(() => {
        if (SendMessage && SendMessage != '') {
            if (!newSendMessage.includes(SendMessage)) {
                setNewSendMessage(prevState => [...prevState, SendMessage]);
            }
            console.log('Yes user- ', SendMessage);
        }
    }, [SendMessage, newSendMessage]);
    
    return (
        <div className={`md:w-80 w-full relative flex items-center gap-4 p-2 ${ isSelected ? 'bg-gray-100' : "" } duration-200 rounded-xl hover:bg-secondery cursor-pointer`}
         onClick={()=> setSelectedConversation(conversation)}
        >
            <div className="relative w-14 h-14 shrink-0">
                <img src={conversation.profilePic} alt="" className="object-cover w-full h-full rounded-full" />
                {isOnline && (
                    <div className="w-4 h-4 absolute bottom-0 right-0  bg-green-500 rounded-full border border-white dark:border-slate-800">
                        <small className="text-cyan-50 font-bold relative bottom-2 left-1" style={{fontSize: '10px'}}></small>
                    </div>
                )}
            </div>
            <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1.5">
                    <div className="mr-auto text-sm text-black dark:text-white font-bold">{conversation.fullname}</div>
                    <div className="text-xs font-light text-gray-500 dark:text-white/70">09:40AM</div>
                </div>
                <div className="font-medium overflow-hidden text-gray-600 text-ellipsis text-sm whitespace-nowrap">Send the messages...💬</div>
            </div>
        </div>
    )
}

export default SidebarUsers
