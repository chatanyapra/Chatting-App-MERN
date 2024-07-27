import React, { useEffect, useCallback, useState, useRef } from "react";
import peerService from "../peerService/peer";
import { useSocketContext } from "../context/SocketContext";
import "./callingComponent.css";
import { UserJoinedData, IncommingCallData, CallAcceptedData, NegoNeededData, NegoNeedFinalData } from "../types/types";

const CallingRoom: React.FC = () => {
  const { socket } = useSocketContext();
  const [remoteSocketId, setRemoteSocketId] = useState<string | null>(null);
  const [myStream, setMyStream] = useState<MediaStream | null>(null);
  const [remoteStream, setRemoteStream] = useState<MediaStream | null>(null);

  // Refs for video elements
  const myVideoRef = useRef<HTMLVideoElement>(null);
  const remoteVideoRef = useRef<HTMLVideoElement>(null);

  const handleUserJoined = useCallback(({ email, id }: UserJoinedData) => {
    console.log(`Email ${email} joined room`);
    setRemoteSocketId(id);
  }, []);

  const handleCallUser = useCallback(async () => {
    if (remoteSocketId) {
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: true,
        video: true,
      });
      const offer = await peerService.getOffer();
      socket?.emit("user:call", { to: remoteSocketId, offer });
      setMyStream(stream);
    }
  }, [remoteSocketId, socket]);

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
    [socket, peerService]
  );

  const sendStreams = useCallback(() => {
    if (myStream && peerService.peer) {
      for (const track of myStream.getTracks()) {
        peerService.peer.addTrack(track, myStream);
      }
    }
  }, [myStream]);

  const handleCallAccepted = useCallback(
    ({ ans }: CallAcceptedData) => {
      peerService.setLocalDescription(ans);
      console.log("Call Accepted!");
      // sendStreams();
    },
    [peerService]
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
    await peerService.setLocalDescription(ans);
  }, [peerService]);

  useEffect(() => {
    const handleTrack = (ev: RTCTrackEvent) => {
      const remoteStream = ev.streams[0];
      console.log("GOT TRACKS!!");
      setRemoteStream(remoteStream);
    };

    peerService.peer?.addEventListener("track", handleTrack);
    return () => {
      peerService.peer?.removeEventListener("track", handleTrack);
    };
  }, [peerService]);

  useEffect(() => {
    socket?.on("user:joined", handleUserJoined);
    socket?.on("incomming:call", handleIncommingCall);
    socket?.on("call:accepted", handleCallAccepted);
    socket?.on("peer:nego:needed", handleNegoNeedIncomming);
    socket?.on("peer:nego:final", handleNegoNeedFinal);

    return () => {
      socket?.off("user:joined", handleUserJoined);
      socket?.off("incomming:call", handleIncommingCall);
      socket?.off("call:accepted", handleCallAccepted);
      socket?.off("peer:nego:needed", handleNegoNeedIncomming);
      socket?.off("peer:nego:final", handleNegoNeedFinal);
    };
  }, [
    socket,
    peerService,
    handleUserJoined,
    handleIncommingCall,
    handleCallAccepted,
    handleNegoNeedIncomming,
    handleNegoNeedFinal,
  ]);

  // Set srcObject for video elements
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      handleCallUser();
    }, 1000); 

    return () => clearTimeout(timeoutId);
  }, [handleCallUser]);

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
      <h1>Room Page</h1>
      <h4>{remoteSocketId ? "Connected" : "No one in room"}</h4>
      {myStream && <button onClick={sendStreams}>Send Stream</button>}
      {/* {remoteSocketId && <button onClick={handleCallUser}>CALL</button>} */}
      {/* <div>
        {myStream && (
          <>
            <h1>My Stream</h1>
            <video ref={myVideoRef} autoPlay muted loop />
          </>
        )}
        {remoteStream && (
          <>
            <h1>Remote Stream</h1>
            <video ref={remoteVideoRef} autoPlay loop />
          </>
        )}
      </div> */}
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-lg">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-semibold">Video Calling...</h2>
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
          <p className="text-gray-500">Connected</p>
        </div>
        <div className="flex justify-center space-x-4">
          <button className="bg-green-500 hover:bg-green-600 text-white p-4 rounded-full">
            <i className="fas fa-phone-alt fa-2x"></i>
          </button>
          <button className="bg-red-500 hover:bg-red-600 text-white p-4 rounded-full">
            <i className="fas fa-phone-slash fa-2x"></i>
          </button>
        </div>
      </div>
    </div>
  );
};

export default CallingRoom;
