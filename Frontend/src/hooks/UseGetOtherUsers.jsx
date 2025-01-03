import axios from 'axios';
import React, { useEffect } from 'react'
import { GiCatapult } from 'react-icons/gi';
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify';
import { setOtherUsersss } from '../Redux/UserSlice';

const UseGetOtherUsers = () => {
    const dispatch = useDispatch();
    const {user} = useSelector(store=>store.user);

  useEffect(()=>{
    const fetchOtherUser = async()=>{
        try{
            const res = await axios.get(`https://chat-application-with-redux.onrender.com/api/v1/user/getOtherUsers`,{headers:{"Content-Type":'application/json'},withCredentials:true});
            // console.log(res.data.OtherUserId);
            if(res.data.success){
                dispatch(setOtherUsersss(res.data.OtherUserId))
                toast.success(res.data.message);
            }
        }
        catch(error){
            toast.error(error.response.data.message);
            console.log('Error Occured',error);
        }
    }

    fetchOtherUser();

  },[])
}

export default UseGetOtherUsers
