import axios from 'axios';
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { setMessages } from '../Redux/MessageSlice';

const UseGetMessage = () => {

    const {SelectedUser} = useSelector(store=>store.user);
    const dispatch = useDispatch();
    // console.log("Selected User",SelectedUser);

    useEffect(()=>{
        const fetchMessage = async() =>{
            try{
                axios.defaults.withCredentials=true;
                const res = await axios.get(`https://chat-application-with-redux-backend.onrender.com/api/v1/message/getAllMessage/${SelectedUser?._id}`);
                // console.log(res);
                if(res.data.success){
                    // toast.success(res.data.message);
                    dispatch(setMessages(res.data.convo));
                }
            }
            catch(error){
                console.log('Error Occured',error);
                // toast.error(error.response.data.message);
                dispatch(setMessages(null));
            }
        }

        fetchMessage();

    },[SelectedUser])


}

export default UseGetMessage
