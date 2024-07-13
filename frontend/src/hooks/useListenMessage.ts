import { useEffect } from "react";
import useConversation from "../zustandStore/useConversation";
import { useSocketContext } from "../context/SocketContext";
import sound from "../utils/notificationsound.wav";

const useListenMessage = () => {
    const {messages, setMessages} = useConversation();
    const { socket } = useSocketContext();

    useEffect(() => {
        socket?.on("newMessage", (newMessage) => {
            newMessage.shouldShake = true;
            const notiSound = new Audio(sound);
            notiSound.play();
            setMessages([...messages, newMessage]);
        });

        return () => {
            socket?.off("newMessage");
        };
    },[socket, messages, setMessages]);
}

export default useListenMessage
