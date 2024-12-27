import React from 'react'
import OtherUser from './OtherUser.jsx'
import UseGetOtherUsers from '../hooks/UseGetOtherUsers.jsx'
import { useSelector } from 'react-redux';

const OtherUsers = () => {
    UseGetOtherUsers();
    const {OtherUsersss} = useSelector(store=>store.user)
    // console.log(OtherUsersss);
    if(!OtherUsersss) return;

  return (
    <div className='overflow-y-auto h-80 ll'>

{
  OtherUsersss && OtherUsersss?.map((v,i)=>{
        return(
      <OtherUser key={v?._id} v={v}/>
        )
    })
}
    </div>
  )
}

export default OtherUsers
