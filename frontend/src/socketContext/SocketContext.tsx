// import React, { createContext, useMemo, useContext, ReactNode } from "react";
// import { io, Socket } from "socket.io-client";

// const SocketContext1 = createContext<Socket | null>(null);

// export const useSocket = (): Socket => {
//   const socket = useContext(SocketContext1);
//   if (!socket) throw new Error("Socket is not provided");
//   return socket;
// };

// interface SocketProviderProps {
//   children: ReactNode;
// }

// export const SocketProvider: React.FC<SocketProviderProps> = (props) => {
//   const socket = useMemo(() => io("http://localhost:3000"), []);

//   return (
//     <SocketContext1.Provider value={socket}>
//       {props.children}
//     </SocketContext1.Provider>
//   );
// };
