import { useEffect } from "react";
import useConversation from "../zustandStore/useConversation";
import { useSocketContext } from "../context/SocketContext";
import sound from "../utils/notificationsound.wav";
import useGetConversation from "./useGetConversation";

const useListenMessage = () => {
    const { messages, setMessages } = useConversation();
    const { conversations } = useGetConversation();
    const { socket } = useSocketContext();
    let newSendMessage ='';

    useEffect(() => {
        if (!socket) return;

        socket.on("newMessage", (newMessage) => {
            console.log('NewMes- ', newMessage);
            const matchedConversation = conversations.find(conv => conv._id === newMessage.senderId);
            if (matchedConversation) {
                newSendMessage = newMessage.senderId;
                console.log(newSendMessage);
                
            }            
            const notiSound = new Audio(sound);
            notiSound.play();
            setMessages([...messages, newMessage]);
        });

        return () => {
            socket.off("newMessage");
        };
    }, [socket, messages, setMessages]);

    return { newSendMessage };
};

export default useListenMessage;
