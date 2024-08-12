import { useCallback, useEffect } from 'react';
import { useSocketContext } from "../context/SocketContext";
import { UserJoinedDataRequest } from "../types/types";
import { useNavigate } from 'react-router-dom';
<<<<<<< HEAD
=======
import {useAuthContext} from "../context/AuthContext";
>>>>>>> 5e467ffbfb89e0c299b479cdfefd104107ede6ad

const useCallingHook = () => {
  const { socket, onlineUsers } = useSocketContext();
  console.log("Online user- ", onlineUsers);
  const navigate = useNavigate();
<<<<<<< HEAD
=======
  const {setCallingUserName} =  useAuthContext();
>>>>>>> 5e467ffbfb89e0c299b479cdfefd104107ede6ad

  const handleUserJoined = useCallback(async(data: UserJoinedDataRequest) => {
    console.log("User connecting request =-- ", data);
    const {username, userId, room, video} = data;
<<<<<<< HEAD
    let userroom = room;
    console.log("userroom = authUser._id", userroom, "userId - ", userId, " video -", video);
    // console.log("User joined-- ",email, userroom);

    socket?.emit("room:join", { userId, room : userroom, username, video });
=======
    setCallingUserName(username);
>>>>>>> 5e467ffbfb89e0c299b479cdfefd104107ede6ad

    let userroom = room;
    console.log("userroom = authUser._id", userroom, "userId - ", userId, " video -", video);
    socket?.emit("room:join", { userId, room : userroom, username, video });
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
