        import React from "react";
        import {useState} from "react";
        import {useSocket} from "./Context/SocketProvide";
        const Lobby=()=>{
            const [email,setEmail]=useState("");
            const [room,setRoom]=useState("");
            const socket=useSocket();
            const handleSubmit=(e)=>{
                e.preventDefault();
                console.log({
                    email:email,
                    room:room,
                });
                socket.emit("room:join",{email,room});           
            }
            return(
                <div>
                    <h1>Lobby</h1>
                    <form onSubmit={handleSubmit}>
                        <label htmlFor="email">Email Id</label>
                        <input type="email" placeholder="Enter your email id" id="email" value={email} onChange={(e)=>setEmail(e.target.value)} />
                        <br />
                        <label htmlFor="room">Room Number</label>
                        <input type="text" placeholder="Enter your room number" id="room" value={room} onChange={(e)=>setRoom(e.target.value)} />
                        <br />
                        <button type="submit">Join</button>
                    </form>
                </div>
            )
        }
        export default Lobby;