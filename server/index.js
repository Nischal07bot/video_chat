import express from "express";
import http from "http";
import { Server } from "socket.io";
import { createServer } from "http";
import cors from "cors";
const app=express();
const server=createServer(app);
const io=new Server(server);
io.on("Connection",(socket)=>{
    console.log("socket connected",socket.id);
})