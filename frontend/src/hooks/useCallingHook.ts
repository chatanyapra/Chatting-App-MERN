import { useCallback, useEffect } from 'react';
import { useSocketContext } from "../context/SocketContext";
import { UserJoinedDataRequest } from "../types/types";
import { useNavigate } from 'react-router-dom';
// import { useAuthContext } from '../context/AuthContext';

const useCallingHook = () => {
  const { socket, onlineUsers } = useSocketContext();
  console.log("Online user- ", onlineUsers);
  const navigate = useNavigate();
  // const authUser = useAuthContext();

  // const handleJoinRoom = useCallback(
  //   (data: JoinRoomData) => {
  //     console.log("user on- ", data);

  //     const { room } = data;
  //     navigate(`/room/${room}`);
  //     // const newWindow = window.open(`/room/${room}`, '_blank', 'width=450,height=550');
  //     // if (newWindow) {
  //     //   newWindow.onload = () => {
  //     //     (newWindow as any).room = room;
  //     //   };
  //     // }
  //   },
  //   []
  // );
  const handleUserJoined = useCallback((data: UserJoinedDataRequest) => {
    console.log("User connecting");
    const { email, room} = data;
    console.log("User joined-- ",email, room);

    socket?.emit("room:join", { email, room });

      navigate(`/room/${room}`);

  },[socket, navigate]);

  useEffect(() => {
    socket?.on("user:request", handleUserJoined);
    return () => {
      socket?.off("user:request", handleUserJoined);
    };
  }, [socket, handleUserJoined]);
}

export default useCallingHook;


// working on it--------------------------------------
// working on it--------------------------------------
// working on it--------------------------------------
// working on it--------------------------------------