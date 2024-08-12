import React, { useEffect, useCallback, useState, useRef } from "react";
import peerService from "../peerService/peer";
import { useSocketContext } from "../context/SocketContext";
import "./callingComponent.css";
import userImage from "../assets/userimage.png";
import { UserJoinedData, IncommingCallData, CallAcceptedData, NegoNeededData, NegoNeedFinalData } from "../types/types";
import { useAuthContext } from "../context/AuthContext";
import { LuPhoneCall, LuPhoneOff } from "react-icons/lu";
import { useNavigate } from "react-router-dom";
import CallSoundManager from "./CallSoundManager";

const CallingRoom: React.FC = () => {
  const navigate = useNavigate();
  const { socket } = useSocketContext();
  const { callingUserName, setCallingUserName, authUser } = useAuthContext();
  const [videoCall, setVideoCall] = useState<boolean>(false);
  const [remoteSocketId, setRemoteSocketId] = useState<string | null>(null);
  const [remoteUserId, setRemoteUserId] = useState<string | null>(null);
  const [sameUser, setSameUser] = useState<boolean>(false);
  const [callingUser, setCallingUser] = useState<string>("");
  const [myStream, setMyStream] = useState<MediaStream | null>(null);
  const [remoteStream, setRemoteStream] = useState<MediaStream | null>(null);
  const [isCallSoundPlaying, setIsCallSoundPlaying] = useState(false);

  // Refs for video elements
  const myVideoRef = useRef<HTMLVideoElement>(null);
  const remoteVideoRef = useRef<HTMLVideoElement>(null);
  const remoteAudioRef = useRef<HTMLAudioElement>(null);

<<<<<<< HEAD
=======
  // Calling ringtone----------
  const playCallSound = useCallback((type: string) => {
    console.log("Sound play - ", type);
    setCallingUser(type);
    setIsCallSoundPlaying(true);
  }, []);
  
  const stopCallSound = useCallback(() => {
    console.log("Sound pause");
    setIsCallSoundPlaying(false);
  }, []);

>>>>>>> 5e467ffbfb89e0c299b479cdfefd104107ede6ad
  const handleCallUser = useCallback(async (id: string, username: string, video: boolean) => {
    if (id) {
      setRemoteSocketId(id);
      console.log("if remoteSocketId--", id);
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: true,
        video: video,
      });
<<<<<<< HEAD
=======
      playCallSound("caller");
>>>>>>> 5e467ffbfb89e0c299b479cdfefd104107ede6ad
      setVideoCall(video);
      const offer = await peerService.getOffer();
      socket?.emit("user:call", { username, to: id, offer, video });
      setMyStream(stream);
    }
<<<<<<< HEAD
  }, [setRemoteSocketId, socket, setCallingUserName, setVideoCall]);

=======
  }, [setRemoteSocketId, socket, setCallingUserName, setVideoCall, playCallSound]);
>>>>>>> 5e467ffbfb89e0c299b479cdfefd104107ede6ad

  const handleUserJoined = useCallback(async (data: UserJoinedData) => {
    const { username, id, userId, video } = data;
    console.log(`setRemoteUserId room (userId) - `, userId, ", setRemoteSocketId - ", id, " username - ", username, " video - ", video);
    setRemoteSocketId(id);
    setRemoteUserId(userId);
    await handleCallUser(id, username, video);
  }, [setRemoteSocketId, setRemoteUserId, handleCallUser, remoteSocketId]);

  const setCallingNameFunction = useCallback(async (username: string) => {
    await setCallingUserName(username);
  }, [setCallingUserName, callingUserName]);

  const handleIncommingCall = useCallback(
    async ({ username, from, offer, video }: IncommingCallData) => {
      setRemoteSocketId(from);
      setCallingNameFunction(username);
<<<<<<< HEAD
      console.log("etCallingUserName(username)", username, " video ", video);
=======
      console.log("setCallingUserName(username)", username, " video ", video);
>>>>>>> 5e467ffbfb89e0c299b479cdfefd104107ede6ad

      const stream = await navigator.mediaDevices.getUserMedia({
        audio: true,
        video: video,
      });
      setVideoCall(video);
      setMyStream(stream);
      playCallSound("calley");
      console.log(`Incoming Call`, from, offer);
      const ans = await peerService.getAnswer(offer);
      socket?.emit("call:accepted", { to: from, ans });
    },
<<<<<<< HEAD
    [socket, setMyStream, setCallingNameFunction, setVideoCall]
=======
    [socket, setMyStream, setCallingNameFunction, setVideoCall, playCallSound]
>>>>>>> 5e467ffbfb89e0c299b479cdfefd104107ede6ad
  );

  const sendStreams = useCallback(() => {
    console.log("send stream-----------");
<<<<<<< HEAD
=======
    if (callingUser == "calley") {
      stopCallSound();
    }
>>>>>>> 5e467ffbfb89e0c299b479cdfefd104107ede6ad

    if (myStream && peerService.peer) {
      for (const track of myStream.getTracks()) {
        peerService.peer.addTrack(track, myStream);
      }
    }
  }, [myStream, peerService.peer, stopCallSound]);

  const handleCallAccepted = useCallback(async ({ from, ans }: CallAcceptedData) => {
    console.log("call:accepted --= ", ans, "from - ", from);

    await peerService.setLocalDesc(ans);
    console.log("remoteUseriiId - ", remoteUserId, " authUser._id - ", authUser._id);

    if (remoteUserId != authUser._id) {
      sendStreams();
      setSameUser(true);
    }
  },
    [peerService, remoteUserId, remoteSocketId, sendStreams, setSameUser]
  );

  const handleNegoNeeded = useCallback(async () => {
    const offer = await peerService.getOffer();
    if (remoteSocketId) {
      socket?.emit("peer:nego:needed", { offer, to: remoteSocketId });
    }
  }, [remoteSocketId, socket]);

  useEffect(() => {
    peerService.peer?.addEventListener("negotiationneeded", handleNegoNeeded);
    return () => {
      peerService.peer?.removeEventListener("negotiationneeded", handleNegoNeeded);
    };
  }, [handleNegoNeeded, peerService]);

  const handleNegoNeedIncomming = useCallback(
    async ({ from, offer }: NegoNeededData) => {
      const ans = await peerService.getAnswer(offer);
      socket?.emit("peer:nego:done", { to: from, ans });
    },
    [socket, peerService]
  );

  const handleNegoNeedFinal = useCallback(async ({ ans }: NegoNeedFinalData) => {
    console.log("final - ", ans);
    await peerService.setLocalDesc(ans);
<<<<<<< HEAD

  }, [peerService]);
=======
>>>>>>> 5e467ffbfb89e0c299b479cdfefd104107ede6ad

  }, []);

  const handleTrack = useCallback((ev: RTCTrackEvent) => {
    const remoteStream = ev.streams[0];
    console.log("GOT TRACKS!!");
    setRemoteStream(remoteStream);
<<<<<<< HEAD
  }, [setRemoteStream]);
=======
  }, [setRemoteStream, stopCallSound]);
>>>>>>> 5e467ffbfb89e0c299b479cdfefd104107ede6ad

  const handleCallingAccept = useCallback(() => {
    stopCallSound();
    setSameUser(true);
    sendStreams();
    console.log("remoteSocketId --- ", remoteSocketId);
    socket?.emit("call:accept:calley", { to: remoteSocketId });
  }, [sendStreams, setSameUser, stopCallSound]);

  // Call end------------------
  const handleCalleyAccept = useCallback(() => {
    stopCallSound();
  }, [stopCallSound]);
  
  const handleCallingEnd = useCallback(() => {
    stopCallSound();
    peerService.closeConnection();
    setCallingUserName("");
    setSameUser(false);
    setVideoCall(false);
    navigate("/message");
    window.location.reload();
<<<<<<< HEAD
  }, [navigate, setSameUser, setCallingUserName]);
=======
  }, [navigate, setSameUser, setCallingUserName, stopCallSound]);
>>>>>>> 5e467ffbfb89e0c299b479cdfefd104107ede6ad

  const handleEndCall = useCallback(() => {
    stopCallSound();
    peerService.closeConnection();
    setCallingUserName("");
    setSameUser(false);
    setVideoCall(false);
    socket?.emit("call:end", { to: remoteSocketId });
    navigate("/message");
    window.location.reload();
<<<<<<< HEAD
  }, [navigate, remoteSocketId, socket, setCallingUserName]);
=======
  }, [navigate, remoteSocketId, socket, setCallingUserName, stopCallSound]);
>>>>>>> 5e467ffbfb89e0c299b479cdfefd104107ede6ad

  useEffect(() => {
    peerService.peer?.addEventListener("track", handleTrack);
    return () => {
      peerService.peer?.removeEventListener("track", handleTrack);
    };
  }, [peerService, handleTrack]);

<<<<<<< HEAD

=======
>>>>>>> 5e467ffbfb89e0c299b479cdfefd104107ede6ad
  useEffect(() => {
    socket?.on("user:joined", handleUserJoined);
    socket?.on("incomming:call", handleIncommingCall);
    socket?.on("call:accepted", handleCallAccepted);
    socket?.on("peer:nego:needed", handleNegoNeedIncomming);
    socket?.on("peer:nego:final", handleNegoNeedFinal);
    socket?.on("call:end", handleCallingEnd);
    socket?.on("call:accept:calley", handleCalleyAccept);

    return () => {
      socket?.off("user:joined", handleUserJoined);
      socket?.off("incomming:call", handleIncommingCall);
      socket?.off("call:accepted", handleCallAccepted);
      socket?.off("peer:nego:needed", handleNegoNeedIncomming);
      socket?.off("peer:nego:final", handleNegoNeedFinal);
      socket?.off("call:end", handleCallingEnd);
      socket?.off("call:accept:calley", handleCalleyAccept);
    };
  }, [
    socket,
    setRemoteSocketId,
<<<<<<< HEAD
=======
    handleCalleyAccept,
>>>>>>> 5e467ffbfb89e0c299b479cdfefd104107ede6ad
    handleCallingEnd,
    handleUserJoined,
    handleIncommingCall,
    handleCallAccepted,
    handleNegoNeedIncomming,
    handleNegoNeedFinal,
  ]);

  useEffect(() => {
    if (myStream && myVideoRef.current) {
      myVideoRef.current.srcObject = myStream;
    }
    if (remoteStream && remoteVideoRef.current) {
      remoteVideoRef.current.srcObject = remoteStream;
    }
    if (remoteStream && remoteAudioRef.current) {
      remoteAudioRef.current.srcObject = remoteStream;
    }
  }, [myStream, remoteStream]);

  return (
    <div className="w-full h-screen">
<<<<<<< HEAD
=======
      <CallSoundManager isPlaying={isCallSoundPlaying} />
>>>>>>> 5e467ffbfb89e0c299b479cdfefd104107ede6ad
      <div className="bg-white p-6 rounded-lg shadow-lg w-full h-full">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-semibold">{videoCall ? "Video Calling" : "Voice Calling"} </h2>
          <span></span>
        </div>
        <div className="video-container mb-4">
          {!videoCall ?
            <>
              <div className="w-full mt-5 pt-20">
                <img src={userImage} className="m-auto" alt="" />
              </div>
              <audio ref={remoteAudioRef} autoPlay controls={false} />
            </>
            :
            <>
              {remoteStream && (
                <video autoPlay ref={remoteVideoRef} className="videoMainPlayer"></video>
              )}
              <div className="user-video">
                {myStream && (
                  <video ref={myVideoRef} autoPlay muted className="videoplayer" />
                )}
              </div>
            </>
          }
        </div>
        <div className="text-center mb-4">
          <h3 className="text-xl font-medium">{callingUserName != "" && callingUserName != null ? callingUserName : "Unknown"}</h3>
        </div>
        <div className="flex justify-center space-x-4">
          {myStream && (
            <>
              {!sameUser && (
                <button className="bg-green-500 hover:bg-green-600 text-white p-4 rounded-full" onClick={handleCallingAccept}>
                  <LuPhoneCall className="text-2xl" />
                </button>
              )}
            </>
          )}
          <button className="bg-red-500 hover:bg-red-600 text-white p-4 rounded-full" onClick={handleEndCall}>
            <LuPhoneOff className="text-2xl" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default CallingRoom;
