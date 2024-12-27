import React from 'react'
import Message from './Message.jsx'
import UseGetMessage from '../hooks/UseGetMessage.jsx'
import { useSelector } from 'react-redux';
import UseGetRealtimeMessages from '../hooks/UseGetRealtimeMessages.jsx';

const Messagess = () => {
 

UseGetMessage();
UseGetRealtimeMessages();

const {Messages} = useSelector(store=>store.Mesa);
if(!Messages) return;

  return (
    <div className='flex-1 overflow-auto'>
    {
      Messages && Messages?.map((msg,i)=>{
        return(
            <Message key={msg._id} msg={msg}/>
        )
      })
    }
    </div>
  )
}

export default Messagess;
