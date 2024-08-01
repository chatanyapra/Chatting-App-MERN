import React, { useEffect, useCallback, useState, useRef } from "react";
import peerService from "../peerService/peer";
import { useSocketContext } from "../context/SocketContext";
import "./callingComponent.css";
import { UserJoinedData, IncommingCallData, CallAcceptedData, NegoNeededData, NegoNeedFinalData } from "../types/types";
import { useAuthContext } from "../context/AuthContext";
import { LuPhoneCall, LuPhoneOff  } from "react-icons/lu";
import { useNavigate } from "react-router-dom";

const CallingRoom: React.FC = () => {
  const navigate = useNavigate();
  const { socket } = useSocketContext();
  const { authUser } = useAuthContext();
  const [remoteSocketId, setRemoteSocketId] = useState<string | null>(null);
  const [remoteUserId, setRemoteUserId] = useState<string | null>(null);
  const [sameUser, setSameUser] = useState<boolean>(false);
  const [myStream, setMyStream] = useState<MediaStream | null>(null);
  const [remoteStream, setRemoteStream] = useState<MediaStream | null>(null);

  // Refs for video elements
  const myVideoRef = useRef<HTMLVideoElement>(null);
  const remoteVideoRef = useRef<HTMLVideoElement>(null);

  
  const handleCallUser = useCallback(async (id : string) => {
    if (id) {
      setRemoteSocketId(id);
      console.log("if remoteSocketId--", id);
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: true,
        video: true,
      });
      const offer = await peerService.getOffer();
      socket?.emit("user:call", { to: id, offer });
      setMyStream(stream);
    }
  }, [setRemoteSocketId, socket]);


  const handleUserJoined = useCallback(async(data: UserJoinedData) => {
    const { id, userId } = data;
    console.log(`setRemoteUserId room (userId) - `, userId, ", setRemoteSocketId - ", id);
    setRemoteSocketId(id);
    setRemoteUserId(userId);
    await handleCallUser(id);
  }, [setRemoteSocketId, setRemoteUserId, handleCallUser, remoteSocketId]);

  const handleIncommingCall = useCallback(
    async ({ from, offer }: IncommingCallData) => {
      setRemoteSocketId(from);
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: true,
        video: true,
      });
      setMyStream(stream);
      console.log(`Incoming Call`, from, offer);
      const ans = await peerService.getAnswer(offer);
      socket?.emit("call:accepted", { to: from, ans });
    },
    [socket, setMyStream]
  );

  const sendStreams = useCallback(() => {
    console.log("send stream-----------");
    
    if (myStream && peerService.peer) {
      for (const track of myStream.getTracks()) {
        peerService.peer.addTrack(track, myStream);
      }
    }
  }, [myStream, peerService.peer]);

  const handleCallAccepted = useCallback(async({from, ans }: CallAcceptedData) => {
      console.log("call:accepted --= ", ans,"from - ", from);
      
      await peerService.setLocalDesc(ans);
      console.log("remoteUseriiId - ", remoteUserId," authUser._id - ", authUser._id);
      
      if(remoteUserId != authUser._id){
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
    console.log("final - ",ans);
    await peerService.setLocalDesc(ans);
    
  }, [peerService]);


  const handleTrack = useCallback((ev: RTCTrackEvent) => {
    const remoteStream = ev.streams[0];
    console.log("GOT TRACKS!!");
    setRemoteStream(remoteStream);
  },[setRemoteStream]);

  const handleCallingAccept = useCallback(() => {
    setSameUser(true);
    sendStreams();
  }, [sendStreams, setSameUser]);
  // Call end------------------
  const handleCallingEnd = useCallback(() => {
    peerService.closeConnection();
    console.log("calend");
    setSameUser(false);
    navigate("/message");
    window.location.reload();
  }, [navigate, setSameUser]);

  const handleEndCall = useCallback(() => {
    peerService.closeConnection();
    setSameUser(false);
    socket?.emit("call:end", { to: remoteSocketId });
    navigate("/message");
    window.location.reload();
  }, [navigate, remoteSocketId, socket]);

  useEffect(() => {

    peerService.peer?.addEventListener("track", handleTrack);
    return () => {
      peerService.peer?.removeEventListener("track", handleTrack);
    };
  }, [peerService, handleTrack]);

  
  useEffect(() => {
    socket?.on("user:joined", handleUserJoined);
    socket?.on("incomming:call", handleIncommingCall);
    socket?.on("call:accepted", handleCallAccepted);
    socket?.on("peer:nego:needed", handleNegoNeedIncomming);
    socket?.on("peer:nego:final", handleNegoNeedFinal);
    socket?.on("call:end", handleCallingEnd);

    return () => {
      socket?.off("user:joined", handleUserJoined);
      socket?.off("incomming:call", handleIncommingCall);
      socket?.off("call:accepted", handleCallAccepted);
      socket?.off("peer:nego:needed", handleNegoNeedIncomming);
      socket?.off("peer:nego:final", handleNegoNeedFinal);
      socket?.off("call:end", handleCallingEnd);
    };
  }, [
    socket,
    setRemoteSocketId,
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
  }, [myStream, remoteStream]);


  return (
    <div className="bg-gray-100 flex flex-col items-center justify-center min-h-screen">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-lg max-sm:h-screen">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-semibold">Video Calling</h2>
          <button className="text-gray-500 hover:text-gray-700">
            <i className="fas fa-times-circle fa-2x"></i>
          </button>
        </div>
        <div className="video-container mb-4">
          {remoteStream && (
            <video autoPlay ref={remoteVideoRef} className="videoMainPlayer"></video>
          )}
          <div className="user-video">
            {myStream && (
              <video ref={myVideoRef} autoPlay muted className="videoplayer" />
            )}
          </div>
        </div>
        <div className="text-center mb-4">
          <h3 className="text-xl font-medium">John Doe</h3>
          {/* <p className="text-gray-500">{remoteSocketId ? "Connected" : "Connecting..."}</p> */}
        </div>
        <div className="flex justify-center space-x-4">
          {myStream && (
            <>
              {!sameUser && (
                <button className="bg-green-500 hover:bg-green-600 text-white p-4 rounded-full" onClick={handleCallingAccept}>
                  <LuPhoneCall className="text-2xl"/>
                </button>
              )}
              <button className="bg-red-500 hover:bg-red-600 text-white p-4 rounded-full" onClick={handleEndCall}>
                <LuPhoneOff className="text-2xl"/>
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default CallingRoom;
