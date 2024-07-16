import { useEffect, useState } from "react";
import toast from "react-hot-toast";

interface Conversation {
    _id: string;
    fullname: string;
    profilePic: string;
    username: string;
}

interface UseGetConversation {
    loading: boolean;
    conversations: Conversation[];
}

const useGetConversation = (): UseGetConversation => {
    const [loading, setLoading] = useState<boolean>(false);
    const [conversations, setConversations] = useState<Conversation[]>([]);

    useEffect(() => {
        const getConversations = async () => {
            setLoading(true);
            try {
                const res = await fetch(`${window.location.origin}/backend/api/users`);
                const data = await res.json();

                if (data.error) {
                    throw new Error(data.error);
                }
                // console.log(data);
                
                setConversations(data as Conversation[]); // Ensure data is cast to Conversation[]

            } catch (error: any) {
                toast.error(error.message);
            } finally {
                setLoading(false);
            }
        };

        getConversations();
    }, []);

    return { loading, conversations };
};

export default useGetConversation;
