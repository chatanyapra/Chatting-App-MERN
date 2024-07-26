import { useCallback, useEffect} from 'react';
import { useSocketContext } from "../context/SocketContext";
import { JoinRoomData } from "../types/types";
// import { useAuthContext } from '../context/AuthContext';

const useCallingHook = () => {
    const {socket, onlineUsers } = useSocketContext();
    console.log("Online user- ", onlineUsers);
    
    // const { authUser } = useAuthContext();

    const handleJoinRoom = useCallback(
        (data: JoinRoomData) => {
          console.log(data);
          
          const {room } = data;
        //   if (onlineUsers.includes(authUser._id)) {
            window.open(`/room/${room}`, '_blank', 'width=350,height=450');
        //   }
          if(onlineUsers.includes(room)){
            console.log("Exist me");
            
            window.open(`/room/${room}`, '_blank', 'width=350,height=450');
          }
        },
        []
      );
    
      useEffect(() => {
        socket?.on("room:join", handleJoinRoom);
        return () => {
          socket?.off("room:join", handleJoinRoom);
        };
      }, [socket, handleJoinRoom]);
}

export default useCallingHook;
