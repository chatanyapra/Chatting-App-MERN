import { useEffect, useState } from 'react';
import MessageBox from '../../components/MessageBox';
import '../../components/components.css'; // Adjust this based on your CSS file location
import useLogout from '../../hooks/useLogout';
import SidebarUsers from '../../components/SidebarUsers';
import useGetConversation from '../../hooks/useGetConversation';
import ChattingStart from '../../components/ChattingStart';
import useConversation from '../../zustandStore/useConversation';

interface Conversation {
    _id: string;
    username: string;
    fullname: string;
    profilePic: string;
}

export default function Message() {
    let textColor = 'black';
    let darkMode = false;

    const { logout } = useLogout();
    const { loading, conversations } = useGetConversation();
    const { selectedConversation, setSelectedConversation } = useConversation()
    const [ visibilityChat, setVisibilityChat ] = useState(false)
    
    useEffect(() => {
        return () => setSelectedConversation(null)
    },[setSelectedConversation])

    const [windowSize, setWindowSize] = useState({
        width: window.innerWidth,
        height: window.innerHeight
    });
    useEffect(() => {
        // Handler to call on window resize
        const handleResize = () => {
            setWindowSize({
                width: window.innerWidth,
                height: window.innerHeight
            });
        };
        window.addEventListener('resize', handleResize);
        handleResize();
        return () => window.removeEventListener('resize', handleResize);
    }, []);
    useEffect(() => {
        if (windowSize.width <= 768 && selectedConversation !== null) {
            setVisibilityChat(true);
            // console.log(visibilityChat, " value");
        }else{
            setVisibilityChat(false);
            // console.log(visibilityChat,"value");
        }
    },[selectedConversation])

    return (
        <>
            <div className='absolute right-5 top-5 text-white border border-blue-600 rounded-md px-2 py-1 bg-blue-500 cursor-pointer'
                onClick={logout}>
                Logout
            </div>
            <div className="flex px-14 mt-24 max-md:px-0  max-md:mt-20  max-md:w-full">
                <div className={`max-md:w-full relative ${visibilityChat ? "hidden" : ""}`}>

                    <div id="side-chat" className="shadow-md rounded-xl w-full bg-white z-50 max-md:shadow dark:bg-black">

                        {/* <!-- heading title --> */}
                        <div className="p-4 border-b dark:border-slate-700 ">

                            <div className="flex mt-2 items-center justify-between">

                                <h2 className={`text-2xl font-bold text-black ml-1 ${textColor === "" ? (darkMode ? 'text-white' : 'text-black') : textColor}`}> Chats </h2>
                                
                            </div>

                        </div>
                        <div className="small-scroll space-y-2 p-2 overflow-y-auto md:h-[calc(100vh-204px)] h-[calc(100vh-80px)]">

                            {conversations && conversations.map((conversation) => (
                                <SidebarUsers
                                    key={conversation._id}
                                    conversation={conversation as Conversation} // Type assertion here
                                />
                            ))}

                        </div>
                    </div>
                </div>                
                {selectedConversation !== null ? <MessageBox conversation={selectedConversation} visibility={visibilityChat} /> : <ChattingStart visibility={false} />}
            </div>
        </>
    );
}
