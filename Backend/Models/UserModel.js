import mongoose from "mongoose";

//****User Schema*****//

const UserSchema = new mongoose.Schema({
    username:{type:String, required:true, unique:true},
    fullname:{type:String, required:true},
    email:{type:String, required:true},
    password:{type:String, required:true},
    gender:{type:String, enum:['Male','Female'], required:true},
    profilePic:{type:String, default:''}
},{timestamps:true})

export const User_Model = mongoose.model('User',UserSchema);




//****Message Schema*****//

const MessageSchema = new mongoose.Schema({
        senderId:{type:mongoose.Schema.Types.ObjectId, ref:'User', required:true},
        receiverId:{type:mongoose.Schema.Types.ObjectId, ref:'User', required:true},
        message:{type:String, required:true},
},{timestamps:true})

export const Message_Model = mongoose.model('Message',MessageSchema);




//****Convo Schema*****//

const ConvoSchema = new mongoose.Schema({
    participants:[{type:mongoose.Schema.Types.ObjectId, ref:'User'}],
    messages:[{type:mongoose.Schema.Types.ObjectId, ref:'Message'}]
},{timestamps:true})

export const Convo_Model = mongoose.model('Conversation',ConvoSchema);