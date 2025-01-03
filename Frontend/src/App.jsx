import React, { useEffect, useState } from 'react'
import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import SignUp from './Components/SignUp.jsx'
import Login from './Components/Login.jsx'
import Home from './Components/Home.jsx'
import { useDispatch, useSelector } from 'react-redux'
import io from 'socket.io-client'
import { setSocket } from './Redux/SocketSlice.jsx'
import { setOnlineUsers } from './Redux/UserSlice.jsx'
import store from './Redux/Store.jsx'
import ProtectedRoute from './Components/ProtectedRoute.jsx'

const App = () => {
  
  const {authUser} = useSelector(store=>store.user);
  const {socket} = useSelector(store=>store.Sockett);
  const dispatch = useDispatch();

  useEffect(()=>{
    if(authUser){
      const sockk = io('https://chat-application-with-redux.onrender.com',{query:{userId:authUser?._id}});
      dispatch(setSocket(sockk));
      
      sockk.on('getOnlineUsers',(onlineUsersINChat)=>{
        dispatch(setOnlineUsers(onlineUsersINChat));
      })

      // clean up function..
      return ()=>{
        sockk?.close();
      }

    }
    else if(socket){
        socket?.close();
        dispatch(setSocket(null));
    }
  },[authUser]);

  return (
    <div className='h-screen w-screen flex items-center justify-center mx-auto'>
      <BrowserRouter>
        <Routes>
          <Route path='/register' element={<SignUp/>}/>
          <Route path='/login' element={<Login/>}/>
          <Route path='/' element={<ProtectedRoute> <Home/></ProtectedRoute>}/>
        </Routes>
      </BrowserRouter>
      <p className='text-white bg-transparent backdrop-blur-md w-full fixed bottom-0 px-3 py-1 font-mono md:text-sm text-xs md:text-left text-center'>Created with &#x2764;  by <a href='https://www.instagram.com/khandelwal0024/'>@khandelwal0024</a></p>
    </div>
  )
}

export default App
