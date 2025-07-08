import React from "react";
import {createContext,useContext,useMemo} from "react";
import {io} from "socket.io-client";
const SocketContext=createContext(null);
export const useSocket=()=>{
    const socket=useContext(SocketContext);
    if(!socket){
        throw new Error("SocketContext is not available");
    }
    return socket;
}
export const SocketProvider=(props)=>{

    const socket=useMemo(()=>io("http://localhost:3000"),[])
     return(
        <SocketContext.Provider value={socket}>
            {props.children}
        </SocketContext.Provider>
     )
}