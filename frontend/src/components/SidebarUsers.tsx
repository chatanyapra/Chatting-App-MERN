// import { useNavigate } from "react-router-dom";
// import { useState, useEffect } from 'react';
import useConversation from "../zustandStore/useConversation";
interface Conversation {
    _id: string;
    fullname: string;
    profilePic: string;
    username: string;
}

function SidebarUsers({ conversation }: { conversation: Conversation }) {
    // const [windowSize, setWindowSize] = useState({
    //     width: window.innerWidth,
    //     height: window.innerHeight
    // });

    // useEffect(() => {
    //     // Handler to call on window resize
    //     const handleResize = () => {
    //         setWindowSize({
    //             width: window.innerWidth,
    //             height: window.innerHeight
    //         });
    //     };
    //     window.addEventListener('resize', handleResize);
    //     handleResize();
    //     return () => window.removeEventListener('resize', handleResize);
    // }, []);

    const {selectedConversation, setSelectedConversation} = useConversation();
    const isSelected = selectedConversation?._id === conversation._id;

    return (
        <div className={`md:w-80 w-full relative flex items-center gap-4 p-2 ${ isSelected ? 'bg-gray-100' : "" } duration-200 rounded-xl hover:bg-secondery cursor-pointer`}
         onClick={()=> setSelectedConversation(conversation)}
        >
            <div className="relative w-14 h-14 shrink-0">
                <img src={conversation.profilePic} alt="" className="object-cover w-full h-full rounded-full" />
                <div className="w-4 h-4 absolute bottom-0 right-0  bg-green-500 rounded-full border border-white dark:border-slate-800"></div>
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
