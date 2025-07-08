import React,{useEffect,useState,useRef} from "react";
import ReactPlayer from "react-player";
import {useSocket} from "../Context/SocketProvide";
import {useCallback} from "react";
import PeerService from "../Service/peer";
const Room=()=>{
    const socket=useSocket();
    const [RemoteSocketId,setRemoteSocketId]=useState(null);
    const [LocalStream,setLocalStream]=useState();
    const localStreamRef=useRef(null);
    const handleUserJoined=useCallback((data)=>{
        const {email,Id}=data;    
        setRemoteSocketId(Id);
       
        console.log(`email:${email},Id:${Id} joined the room `);
    },[])
    
    const handleIncomingCall=useCallback(async (data)=>{
        const {from,offer}=data;
        setRemoteSocketId(from);
        console.log(`incoming call from ${from}`);
        const stream=await navigator.mediaDevices.getUserMedia({video:true,audio:true});
        setLocalStream(stream);
        const answer=await PeerService.getAnswer(offer);
        socket.emit("callaccepted",{to:from,answer});
    },[])
    
    const handleCallAccepted=useCallback(async(data)=>{
        const {from,answer}=data;
        PeerService.setLocalDescription(answer);
        console.log("call accepted");
    },[])
    useEffect(()=>{
        socket.on("userjoined",handleUserJoined);
        socket.on("incomingcall",handleIncomingCall);
        socket.on("callaccepted",handleCallAccepted);
        return()=>{
            socket.off("userjoined",handleUserJoined);
            socket.off("incomingcall",handleIncomingCall);
            socket.off("callaccepted",handleCallAccepted);
        }
    },[socket,handleUserJoined,handleIncomingCall,handleCallAccepted])

    const handleCall=useCallback(async()=>{
        const stream=await navigator.mediaDevices.getUserMedia({video:true,audio:true});
        setLocalStream(stream);
        const offer=await PeerService.getOffer();
        console.log(RemoteSocketId);
        socket.emit("calluser",{
            to:RemoteSocketId,
            offer
        })
        },[RemoteSocketId])

    useEffect(()=>{
            if(localStreamRef.current && LocalStream){
                localStreamRef.current.srcObject=LocalStream;
            }   
        },[LocalStream])

    return(
    <div>
        <h1>Room</h1>
        <h4>{RemoteSocketId ? `Remote Socket Id: ${RemoteSocketId}` : "No one joined yet"}</h4>
        {
            RemoteSocketId && !LocalStream && (
                <button onClick={handleCall}>CALL</button>
            )
        }
        {
            LocalStream && (
                <div style={{ display: "flex", flexDirection: "column", alignItems: "center", marginTop: "1rem" }}>
                    <span style={{ marginBottom: "0.5rem", fontWeight: "bold" }}>My video</span>
                    <video
                        ref={localStreamRef}
                        autoPlay
                        playsInline
                        muted
                        style={{
                            width: "200px",
                            height: "200px",
                            border: "1px solid #ccc",
                            borderRadius: "8px",
                            background: "#000"
                        }}
                    />
                </div>
            )
        }
    </div>
    )
}
export default Room;

