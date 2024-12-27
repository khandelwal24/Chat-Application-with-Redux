import React, { useRef,useEffect } from 'react'
import { useSelector } from 'react-redux'

const Message = ({msg}) => {
 
  const msgRef = useRef();
  useEffect(()=>{
      msgRef.current?.scrollIntoView({behaviour:'smooth'});
  },[msg])

  const {authUser,SelectedUser} = useSelector(store=>store.user);
  

  return (
    <div ref={msgRef} className={`flex gap-2 items-start p-1.5 w-full ${authUser?._id === msg?.senderId ? 'justify-end':'justify-start'}`}>
      <img src={authUser?._id === msg?.senderId ? authUser?.profilePic : SelectedUser?.profilePic } className={`h-6 w-6 rounded-full ${authUser?._id === msg?.senderId ? 'order-2':'order-1'}`}/>
      <p className={`text-sm bg-gray-600 rounded-xl break-words text-left max-w-[60%] bg-opacity-70 p-1.5 ${authUser?._id === msg?.senderId ? 'order-1':'order-2'} `}>{msg?.message}</p>     
    </div>
  )
}
export default Message
