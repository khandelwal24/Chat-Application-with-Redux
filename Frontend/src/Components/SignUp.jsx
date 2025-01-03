import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import { useSelector } from 'react-redux';
import { NavLink, useNavigate } from 'react-router-dom';
import { toast,ToastContainer } from 'react-toastify';

const SignUp = () => {

  const [pass,setPass] = useState(false);
  const {authUser} = useSelector(store=>store.user);

  const [info,setInfo] = useState({
    username:'',
    fullname:'',
    email:'',
    password:'',
    gender:'',
  })

  const getVal = (e) =>{
    const oldValue = {...info}
    const InputName = e.target.name
    const InputValue = e.target.value
    oldValue[InputName] = InputValue
    setInfo(oldValue);
  }

  const navigate = useNavigate();


  const onSubmitHandler = async (e) =>{
    e.preventDefault();
    console.log(info);
    try{
      const res = await axios.post('https://chat-application-with-redux-backend.onrender.com/api/v1/user/register',info,{headers:{"Content-Type":'application/json'}, withCredentials:true})
      if(res.data.success){
        toast.success(res.data.message);
        setInfo({
          username:'',
          fullname:'',
          email:'',
          password:'',
          gender:'',
        })

        setTimeout(()=>navigate('/login'),1000)
      }
    }
    catch(error){
      console.log('Error Occured',error);
      toast.error(error.response.data.message);
    }
    

  }
  const handleGenderChanger = (gender) =>{
    setInfo({...info,gender:gender});
  }

  useEffect(()=>{
    if(authUser) navigate('/');
  },[]);

  return (
 
   <div className='w-[100%] px-4 text-white'>
<ToastContainer position='top-center' theme='dark' autoClose={1000}/>
   <div className='max-w-[400px] w-full mx-auto bg-gray-800 border backdrop-blur-lg  bg-opacity-80 rounded-lg p-3' style={{boxShadow:'2px 2px 3px red, -2px -2px 2px red'}}>
    <h1 className='text-center font-bold text-3xl text-white mt-3 mb-5'>Register New User</h1>
    <form onSubmit={onSubmitHandler}>
    <p className='mb-4'> 
      <label className='block'>Username</label>
      <input onChange={getVal} value={info.username} name='username' type='text' placeholder='Enter username' required className='p-2.5 bg-transparent border outline-none rounded-md w-full'/>
    </p>

    <p className='mb-4'> 
      <label className='block'>Name</label>
      <input onChange={getVal} value={info.fullname} name='fullname' type='text' placeholder='Enter your Name' required className='p-2.5 bg-transparent border outline-none rounded-md w-full'/>
    </p>

    <p className='mb-4'> 
      <label className='block'>Email</label>
      <input onChange={getVal} value={info.email} name='email' type='email' placeholder='Enter Email' required className='p-2.5 bg-transparent border outline-none rounded-md w-full'/>
    </p>

    <p className='mb-4 relative'> 
      <label className='block'>Password</label>
      <input onChange={getVal} value={info.password} name='password' type={pass?'text':'password'} placeholder='Enter password' required className='p-2.5 bg-transparent border outline-none rounded-md w-full'/>
      {pass ? <FaEye onClick={()=>setPass(!pass)} className='hover:cursor-pointer text-2xl absolute bottom-[10px] right-2'/> : <FaEyeSlash onClick={()=>setPass(!pass)} className='hover:cursor-pointer text-2xl absolute bottom-2 right-2' />}      
    </p>

    <p className='mb-4 flex items-center'>

<label className='flex items-center'>Gender : 
      
<span className='px-2 space-x-1 flex items-center'>
      <label htmlFor='Male'>Male</label>
      <input checked={info.gender==="Male"} onChange={()=>handleGenderChanger("Male")} value="Male" type='radio' name='gender' id='Male'/>
</span>

<span className='px-2 space-x-1 flex items-center'>
      <label htmlFor='Female'>Female</label>
      <input checked={info.gender==="Female"} onChange={()=>handleGenderChanger("Female")} value="Female" type='radio' name='gender' id='Female'/>
</span>

</label>
     
    </p>

<button className='text-center bg-red-900 hover:bg-red-700 text-white font-semibold rounded-md w-full p-1.5'>Sign up</button>
<p className='text-right my-2 text-xs'>Already have an Account? <NavLink className='text-red-500 hover:underline' to={'/Login'}>Login</NavLink> </p>
    </form>
   </div>
   </div>
 
  )
}

export default SignUp
