import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';

const ProtectedRoute = ({children}) => {
    const {authUser} = useSelector(store=>store.user);
    const navigate = useNavigate();

    useEffect(()=>{
        if(!authUser){
            navigate('/login');
        }
    },[]);

  return (
    <div className='w-[100%]'>
      {children};
    </div>
  )
}

export default ProtectedRoute
