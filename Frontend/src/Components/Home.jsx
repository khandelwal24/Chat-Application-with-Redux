import React from 'react'
import Sidebar from './Sidebar'
import MessagePanel from './MessagePanel'
import { ToastContainer } from 'react-toastify'

const Home = () => {
 

  return (
    <div className='w-[100%]'>
    <div className='max-w-[800px] mx-auto p-5'>
    <div className='text-center grid grid-cols-[30%_auto] text-white gap-2 mx-auto bg-gray-800 border backdrop-blur-lg  bg-opacity-80  rounded-lg p-3' style={{boxShadow:'2px 2px 3px red, -2px -2px 2px red'}}>
      <Sidebar/>
      <MessagePanel/>
    </div>
    </div>
    </div>
  )
}

export default Home

