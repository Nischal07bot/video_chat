import express from "express";
import http from "http";
import { Server } from "socket.io";
import { createServer } from "http";
import cors from "cors";
const app=express();
app.use(cors());
app.use(express.json());
const server=createServer(app);
const io=new Server(server,{
    cors:{
        origin:"http://localhost:5173",
        methods:["GET","POST","PUT","DELETE"],
        credentials:true,
    },
});
io.on("connection",(socket)=>{
    console.log("socket connected",socket.id);
    socket.on("room:join",(data)=>{
        console.log("room:join",data);
    })
})
server.listen(3000,()=>{
    console.log("server is running on port 3000");
})