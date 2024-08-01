import { useCallback, useEffect } from 'react';
import { useSocketContext } from "../context/SocketContext";
import { UserJoinedDataRequest } from "../types/types";
import { useNavigate } from 'react-router-dom';

const useCallingHook = () => {
  const { socket, onlineUsers } = useSocketContext();
  console.log("Online user- ", onlineUsers);
  const navigate = useNavigate();

  const handleUserJoined = useCallback(async(data: UserJoinedDataRequest) => {
    console.log("User connecting request =-- ", data);
    const { userId, room} = data;
    let userroom = room;
    console.log("userroom = authUser._id", userroom, "userId - ", userId);
    // console.log("User joined-- ",email, userroom);

    socket?.emit("room:join", { userId, room : userroom });

    navigate(`/room/${userroom}`);

  },[socket]);


  useEffect(() => {
    socket?.on("user:request", handleUserJoined);
    return () => {
      socket?.off("user:request", handleUserJoined);
    };
  }, [socket, handleUserJoined]);
}

export default useCallingHook;
