import React from 'react'
import { GiCatapult } from 'react-icons/gi'
import { setSelectedUser } from '../Redux/UserSlice'
import { useDispatch, useSelector } from 'react-redux'

const OtherUser = ({v}) => {

  const dispatch = useDispatch();
  const {SelectedUser,OnlineUsers} = useSelector(store=>store.user);
 
    const selectUserHandler = (v) =>{
    dispatch(setSelectedUser(v))
  }

  return (
    <div>
       <div onClick={()=>selectUserHandler(v)} className={`All_users mx-auto px-1 w-full hover:cursor-pointer ${SelectedUser?._id === v?._id ? 'bg-green-800 rounded-full':''}`}>
        <div className='flex pl-1 items-center gap-1 w-full my-3 overflow-hidden mx-auto hover:bg-gray-800 hover:bg-opacity-70 rounded-full py-1'>
            <img src={v.profilePic} className='h-10 w-10 rounded-full' />
            <p className='flex flex-col items-start w-full p-1 overflow-hidden'>
            <span className='text-sm md:text-md break-words'>{v?.fullname}</span>
            <span className={`text-xs font-semibold ${OnlineUsers?.includes(v?._id) ? 'text-green-600':'text-red-600'}`}>{OnlineUsers.includes(v?._id) ? 'Online':'Offline'}</span>
            </p>
        </div>
      </div>
    </div>
  )
}

export default OtherUser
