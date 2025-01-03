import path from 'path'
import express from 'express'
import mongoose from "mongoose"
import 'dotenv/config'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { User_Model, Message_Model,Convo_Model } from "../Models/UserModel.js";
import {getReceiverSocketId, io} from '../Socket/Socket.js'

// Sign up Controls
export const Regsiter = async(req,res)=>{
    try{
        const {username,fullname,email,password,gender} = req.body;
        if(!username || !fullname || !email || !password || !gender) return res.status(400).json({message:'Please fill all feilds', success:false});
        let rsp = await User_Model.findOne({email});
        if(rsp) return res.status(401).json({message:'Email already Exists',success:false});
        rsp = await User_Model.findOne({username})
        if(rsp) return res.status(401).json({message:'Username already Exists',success:false});

        const hashPass = await bcrypt.hash(password,10);

        const maleProfilePic = `https://avatar.iran.liara.run/public/boy?username=${username}`
        const FemaleProfilePic = `https://avatar.iran.liara.run/public/girl?username=${username}`

        rsp = await User_Model.create({username,fullname,email,password:hashPass,gender,profilePic:(gender==='Male' ? maleProfilePic : FemaleProfilePic)});

        return res.status(200).json({message:'User Registered Successfully',success:true,rsp});
    }
    catch(error){
        console.log('Error Occured',error);
        res.json({Message:'Error Occured during Sign in',success:false})
    }
}


// login Controls
export const Login = async(req,res)=>{
    try{
        const {username,password} = req.body;
        if(!username || !password) return res.status(400).json({message:'Please fill all feilds',success:false});
        let rsp = await User_Model.findOne({username});
        if(!rsp) return res.status(400).json({message:'Username not exists in database Please Login',success:false});
    
        const validate = await bcrypt.compare(password, rsp.password);
        if(!validate) return res.status(400).json({message:'Invalid Password',success:false});
    
        const payload = {
            userId:rsp._id,
            email:rsp.email,
            gender:rsp.gender,
            profilePic:rsp.profilePic,
        }
        
        const token = await jwt.sign(payload,process.env.jwt_Secret,{expiresIn:'1d'})
    
        const Options = {
            httpOnly:true, // for security purpose like cross side scripting 
            sameSite:'strict', 
            maxAge: new Date(Date.now() + 2*24*60*60*1000),
        }
        
        rsp = rsp.toObject();
        rsp.password = undefined
        // rsp.token = token
    
        return res.status(200).cookie('CookieToken',token,Options).json({message:`Login Successful - Welcome ${rsp.fullname}`,success:true,rsp});
    }
    catch(error){
        console.log('Error Occured',error);
        res.json({message:'Error Occured Bro',success:false});
    }
}


//logout Controls...
export const Logout = async(req,res)=>{
    try{
        return res.cookie("CookieToken",'',{maxAge:0}).status(200).json({message:'Logged Out Successfully',success:true});;
    }
    catch(error){
        console.log('Error Occured',error);
        res.json({message:'Error Occured',success:false});
    }
}


// Get Other Users...
export const getOtherUser = async(req,res)=>{
    try{
        const LoggedInuserId = req.id; // auth se aa rha hai Middleware...
        const OtherUserId = await User_Model.find({_id:{$ne:LoggedInuserId}}).select('-password');
        if(!OtherUserId) return res.status(400).json({message:'No users Exists',success:false});
        res.status(200).json({messgae:'Other users Fetched Successfully',success:true,OtherUserId});
    }
    catch(error){
        console.log('error Occured',error);
        res.status(400).json({message:'Error Occured',success:false});
    }
}


///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////



// Message Controlerss //

export const sendMessage = async(req,res) =>{
    try{
        const senderId = req.id;
        const receiverId = req.params.id;
        const {inputMessage:message} = req.body;
        // console.log(message);
        
         // Kyuki Message Panel mae "const [inputMessage,setInputMessage] = useState('');" yeh use kiye hai issliye yaha bhi same naam aanaa chaiye nhi toh error marege...


        let gotConvo = await Convo_Model.findOne({
            participants:{$all:[senderId,receiverId]}
        });

        if(!gotConvo) gotConvo = await Convo_Model.create({participants:[senderId,receiverId]});

        const newMessage = await Message_Model.create({senderId,receiverId,message});

        if(newMessage) gotConvo.messages.push(newMessage._id);
        // await gotConvo.save();
        await Promise.all([gotConvo.save(),newMessage.save()]);

        // Implement Socket Io...
        const receiverSocketId = getReceiverSocketId(receiverId);
        if(receiverSocketId){
            io.to(receiverSocketId).emit('newMessage',newMessage);
        }

        res.status(200).json({message:'Message Sent Successfully',success:true,gotConvo,newMessage:newMessage});

    }
    catch(error){
        console.log('Error Occcured',error);
        res.status(400).json({message:'Error Occured',success:false});
    }
}


export const getAllMesages = async(req,res)=>{
    try{
        const senderId = new mongoose.Types.ObjectId(req.id);
        const receiverId = new mongoose.Types.ObjectId(req.params.id);

        // console.log("Sender Id",senderId)
        // console.log("Receiver Id",receiverId)

        const convo = await Convo_Model.findOne({
            participants:{$all:[senderId,receiverId]}
        }).populate('messages');

        // console.log("convo Hai Madarchod:",convo);

        if (!convo) {
            return res.status(404).json({
                message: 'No conversation found between the participants.',
                success: false
            });
        }
        
        if (!convo.messages?.length) {
            return res.status(200).json({
                message: 'Conversation found but no messages available.',
                success: true,
                convo: []
            });
        }
        
        // console.log("Convo message hai BSDK : ",convo?.messages);

        res.status(200).json({message:'All message B/w participants fetched Successfully',convo:convo?.messages,success:true});
    }
    catch(error){
        console.log('Error Occured',error);
        res.status(400).json({message:'Error Occured',success:false});
    }
}









