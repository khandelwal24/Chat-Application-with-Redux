import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setMessages } from '../Redux/MessageSlice';

const UseGetRealtimeMessages = () => {
    const {socket} = useSelector(store=>store.Sockett);
    const {Messages} = useSelector(store=>store.Mesa);
    // console.log("Kuch kuch mila from UserReal Time hook : ",Messages);
    const dispatch = useDispatch();

  useEffect(()=>{
    socket?.on("newMessage",(XYZ_newMessage)=>{
        dispatch(setMessages([...Messages,XYZ_newMessage]))
    })
  },[socket,setMessages,Messages])
}

export default UseGetRealtimeMessages
