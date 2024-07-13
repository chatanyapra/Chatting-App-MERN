import { createContext, ReactNode, SetStateAction, useEffect, useState, useContext } from "react";
import { useAuthContext } from "./AuthContext";
import { io, Socket } from "socket.io-client";

interface SocketContextValue {
}
interface SocketContextProviderProps {
    children: ReactNode;
}

const SocketContext = createContext<SocketContextValue | undefined>(undefined);

export const useSocketContext = () => {
    const context = useContext(SocketContext);
    if (context === undefined) {
        throw new Error('useAuthContext must be used within an AuthContextProvider');
    }
    return context;
};

export const SocketContextProvider = ({ children }: SocketContextProviderProps) => {
    const [socket, setSocket] = useState<Socket | null>(null);
    const [onlineUsers, setOnlineUsers] = useState<string[]>([]);
    const { authUser } = useAuthContext();

    useEffect(() => {
        if (authUser) {
            const socketnew = io("http://localhost:5001", {
                query : {
                    userId : authUser._id,
                }
            });
            console.log(socketnew);
            setSocket(socketnew);
            // -----------------
            socketnew.on("getOnlineUsers",(users: SetStateAction<string[]>) => {
                setOnlineUsers(users)
            })
            return () => {
                socketnew.close();
            };
        } else {
            if (socket) {
                socket.close();
                setSocket(null);
            }
        }
        
    }, []);

    return (
        <SocketContext.Provider value={{ socket, onlineUsers }}>
            {children}
        </SocketContext.Provider>
    );
};
