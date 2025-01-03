import path from 'path'
import express from 'express'
import mongoose from 'mongoose'
import 'dotenv/config'
import cors from 'cors'
import userR from './Routes/UserRoute.js'
import MessageR from './Routes/MessageRoute.js'
import cookieParser from 'cookie-parser'
import { app, io, server } from './Socket/Socket.js'


// const app = express();

// All middleWares..
// app.use(express.static(path.join(path.resolve(),'public')));
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());
app.use(cors({
    origin:'https://chat-application-with-redux.onrender.com',
    credentials:true,
    methods:['GET','POST','PUT','DELETE']
}))

// app.get('/',(req,res)=>{
//     res.json({Message:'Server Established Successfully Madarchod'})
// })


// Usser - Routes here...
app.use('/api/v1/user',userR);
// Mmessage - Route here...
app.use('/api/v1/message',MessageR);

// Deployment Task...

const _dirname = path.resolve();
app.use(express.static(path.join(_dirname,'/Frontend/dist')));
app.get('*',(_,res)=>{
    res.sendFile(path.resolve(_dirname,"Frontend","dist","index.html"));
});



mongoose.connect(process.env.Mongo_Url,{dbName:'Chat_Application'}).then(()=>console.log('MongoDB connected')).catch(()=>console.log('Errro Occured'));

const port = process.env.PORT || 9000;
server.listen(port,()=>console.log(`Server is Running on Port ${port}`));
