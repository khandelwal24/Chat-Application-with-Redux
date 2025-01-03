import { Server } from 'socket.io'
import express from 'express'
import http from 'http'

const app = express();
const server = http.createServer(app);
const io = new Server(server,{cors:{origin:'https://chat-application-with-redux.onrender.com', methods:['GET','POST']}})

export const getReceiverSocketId = (receivedId) =>{
    return userSockMap[receivedId];
}

const userSockMap = {}; // {userId--->SockId};

io.on('connection',(sock)=>{
    // console.log('User Connected',sock.id);
    const userId = sock.handshake.query.userId;
    if(userId) userSockMap[userId] = sock.id;
    
    // to get online users...// used to communicate b/w backend and frontend
    io.emit('getOnlineUsers',Object.keys(userSockMap));

    sock.on('disconnect',()=>{
        // console.log('User Disconnected',sock.id);
        delete userSockMap[userId];
        io.emit('getOnlineUsers',Object.keys(userSockMap));
    });
})


export {app,io,server};