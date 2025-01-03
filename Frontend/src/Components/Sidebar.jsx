import React, { useEffect, useState } from 'react'
import OtherUser from './OtherUser'
import OtherUsers from './OtherUsers'
import '../App.css'
import { GiCatapult } from 'react-icons/gi'
import { ImSearch } from "react-icons/im";
import axios from 'axios'
import { toast ,ToastContainer} from 'react-toastify'

import { NavLink, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux'
import { setAuthUser, setSelectedUser } from '../Redux/UserSlice'

const Sidebar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const logOutHandler = async(e) =>{
    try{
      const res = await axios.get('https://chat-application-with-redux-backend.onrender.com/api/v1/user/logout',{headers:{"Content-Type":'application/json'},withCredentials:true})
      if(res.data.success){
        dispatch(setAuthUser(null));
        toast.success(res.data.message);
        setTimeout(()=>navigate('/login'),1000);
        dispatch(setSelectedUser(null));
      }
    }
    catch(error){
      console.log('Error Occured',error);
      toast.error(error.response.data.message);
    }
    
  }

 
  return (
    <div>
    <ToastContainer theme='dark' position='top-center' autoClose={1000}/>
      <div className='w-[100%] h-96 p-4 border-r mb-4 overflow-auto ll'>
      <div className='flex flex-col gap-3 mx-auto'>
      <input  type='search' placeholder='Search' className='py-1.5 sticky backdrop-blur-md top-0 px-2 bg-transparent text-green-500 rounded-full outline-none border ' />
      <div className='px-3 divider'></div>
      <div><OtherUsers/></div>
      </div>

      </div>
      <button onClick={logOutHandler} className='bg-white text-black w-full my-1 text-sm hover:bg-black hover:text-white  rounded-md p-1.5 text-center font-semibold'>LogOut</button>
    </div>
  )
}

export default Sidebar
