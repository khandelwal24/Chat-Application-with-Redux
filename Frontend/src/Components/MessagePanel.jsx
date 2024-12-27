import React, { useEffect, useState } from 'react'
import { IoMdSend } from "react-icons/io";
import { useDispatch, useSelector } from 'react-redux';
import { setSelectedUser } from '../Redux/UserSlice.jsx';
import { toast } from 'react-toastify';
import axios from 'axios';
import { setMessages } from '../Redux/MessageSlice.jsx';
import store from '../Redux/Store.jsx';
import Messagess from './Messagess.jsx';

const MessagePanel = () => {
 
  const dispatch = useDispatch();
  const {SelectedUser,authUser,OnlineUsers} = useSelector(store=>store.user);
  const [inputMessage,setInputMessage] = useState('');

  const {Messages} = useSelector(store=>store.Mesa);
  // if(!Messages) return console.log('Nhi mila message');
  // else console.log('Message Mila Kya from Message Panel: ',Messages);


  
  
  const SendMessageHandler = async() => {
    // e.preventDefault();
    try{
      const res = await axios.post(`http://localhost:1000/api/v1/message/send/${SelectedUser?._id}`,{inputMessage},{headers:{"Content-Type":'application/json'},withCredentials:true});
      // console.log("Message Panel wala res : ",res);
      if(res.data.success){
        toast.success(res.data.message);
        dispatch(setMessages([...Messages,res.data.newMessage]));
      }
      }
      catch(error){
        console.log('Error Occured',error);
        toast.error(error.response.data.message);
      }
      setInputMessage('');
  }

 

  return (
    <div className='mx-auto w-[100%] h-full relative overflow-auto ll'>
        

        {SelectedUser ?
        
         <section>
        <div className='flex items-center w-full gap-1 my-3 overflow-hidden hover:bg-gray-800 hover:bg-opacity-70 rounded-full px-2 py-1'>
            <img src={SelectedUser?.profilePic} className='h-10 w-10 rounded-full' />
            <p className='flex flex-col items-start w-full p-1'>
            <span className='text-sm md:text-md break-words'>{SelectedUser?.fullname}</span>
            <span className={`text-xs font-semibold ${OnlineUsers.includes(SelectedUser?._id) ? 'text-green-600':'text-red-600'}`}>{OnlineUsers.includes(SelectedUser?._id) ? 'Online':'Offline'}</span>
            </p>
        </div>

        <div className='overflow-auto h-80 ll px-3'>
             <Messagess/>
        </div>

   
   <div className='absolute bottom-0 w-full'>
           <input value={inputMessage} onChange={(e)=>setInputMessage(e.target.value)} type='text' placeholder='Send Message' className='p-1.5 w-full bg-transparent outline-none  rounded-full border px-3' />
           <button onClick={SendMessageHandler}> <IoMdSend className='right-2 bottom-[10px] absolute'/></button>
   </div>

        </section>

         : 
         
         <section className='flex justify-center items-center h-full'>
         <div>
         <h1 className='font-bold text-2xl'>Hello, {authUser?.fullname}</h1>
         <p> Message Anyone to start a chat...</p>
         </div>
        </section> 
      }
       

      
    </div>
  )


}

export default MessagePanel
