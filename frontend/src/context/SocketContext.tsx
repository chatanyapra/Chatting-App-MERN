import { createContext, ReactNode, useEffect, useState } from "react";
import { useAuthContext } from "./AuthContext";
import { io, Socket } from "socket.io-client";

interface SocketContextValue {
}

export const SocketContext = createContext<SocketContextValue | undefined>(undefined);

interface SocketContextProviderProps {
    children: ReactNode;
}

export const SocketContextProvider = ({ children }: SocketContextProviderProps) => {
    const [socket, setSocket] = useState<Socket | null>(null);
    const [onlineUsers, setOnlineUsers] = useState<string[]>([]);
    const { authUser } = useAuthContext();

    useEffect(() => {
        if (authUser) {
            const socketnew = io("http://localhost:5001");
            console.log(socketnew);
            setSocket(socketnew);
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
