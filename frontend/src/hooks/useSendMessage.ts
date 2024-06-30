import { useState } from 'react';
import toast from 'react-hot-toast';
import useConversation from '../zustandStore/useConversation';


const useSendMessage = () => {
    const [loading, setLoading] = useState<boolean>(false);
    const {message, setMessage, selectedConversation} = useConversation();

    const sendMessage = async (usermessage : string) => {
        setLoading(true);
        try {
            const res = await fetch(`/api/message/send/${selectedConversation?._id}`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({message: usermessage}),
            });

            const data = await res.json();
            if(data.error){
                throw new Error(data.error);
            }
            setMessage([...message, data])

        } catch (error: any) {
            toast.error(error.message);
        } finally {
            setLoading(false);
        }
    }

    return { loading, sendMessage };
}

export default useSendMessage;
