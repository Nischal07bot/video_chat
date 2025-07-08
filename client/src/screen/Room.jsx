import React,{useEffect} from "react";
import {useSocket} from "../Context/SocketProvide";
import {useCallback} from "react";
const Room=()=>{
    const socket=useSocket();
    const handleUserJoined=useCallback((data)=>{
        const {email,Id}=data;
        console.log(`email:${email},Id:${Id} joined the room `);
    },[])
    useEffect(()=>{
        socket.on("userjoined",handleUserJoined);
        return()=>{
            socket.off("userjoined",handleUserJoined);
        }
    },[socket,handleUserJoined])
    return(
    <div>
        <h1>Room</h1>
    </div>
    )
}
export default Room;

