import { createContext, ReactNode, useEffect, useState } from "react";

interface SocketContextValue {
}

export const SocketContext = createContext<SocketContextValue | undefined>(undefined);

interface SocketContextProviderProps {
    children: ReactNode;
}

export const SocketContextProvider = ({ children }: SocketContextProviderProps) => {
    // const [socket, setSocket] = useState<WebSocket | undefined>();

    return (
        <SocketContext.Provider value={{}}>
            {children}
        </SocketContext.Provider>
    );
};
