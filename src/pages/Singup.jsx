import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { singup } from '../services/operations/user';
import { useNavigate,Link } from 'react-router-dom';

function Singup() {
  const[email,setEmail] =useState("")
  const[password,setPassword] =useState("")
  const dispatch = useDispatch()
  const navigate = useNavigate()
  


  function submit(e){
    e.preventDefault();

    dispatch(singup(email, password,navigate));

  }
  return (
    <div className='min-h-screen flex justify-center items-center'> 
       <div className='w-[25%] bg-red-400'>
       <form className='flex flex-col gap-8 bg-white p-8'
       onSubmit={submit}>
          <h2 className='text-3xl font-bold'>Sign-up</h2>
              <div className='flex flex-col gap-2'>
               
                <input 
                
                type="email" id='email' 
                value={email}
                required
                onChange={(e)=>setEmail(e.target.value)}
                placeholder='Email Address' className='p-2 rounded-xl bg-slate-200 w-[70%]' />
              </div>
              <div className='flex flex-col gap-2'>
               
               <input 
               
               type="password" id='pass' 
               value={password}
               required

               onChange={(e)=>setPassword(e.target.value)}
               
               placeholder='Password' className='p-2 rounded-xl  bg-slate-200  w-[70%]'/>
             </div>

<div className='flex justify-center  '>

<button 

className='bg-blue-500 p-2 font-semibold rounded-xl px-5 hover:bg-blue-600
'>SingUp</button>

</div>
        </form>
       </div>
    </div>
  )
}

export default Singup;