import React,{useEffect,useState,useRef} from "react";
import ReactPlayer from "react-player";
import {useSocket} from "../Context/SocketProvide";
import {useCallback} from "react";
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
    useEffect(()=>{
        socket.on("userjoined",handleUserJoined);
        return()=>{
            socket.off("userjoined",handleUserJoined);
        }
    },[socket,handleUserJoined])
    const handleCall=useCallback(async()=>{
        const stream=await navigator.mediaDevices.getUserMedia({video:true,audio:true});
        setLocalStream(stream);
        },[])
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
            LocalStream &&  (
              <video ref={localStreamRef} autoPlay playsInline muted style={{width:"200px",
                height:"200px",//here the ref assigns the video element to the localstreamref.current thus after the useeffect it is then assigned the new video 
                
              }}/>
            )
        }
    </div>
    )
}
export default Room;

