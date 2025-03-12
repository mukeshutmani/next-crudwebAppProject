'use client'

import React, { useEffect, useState } from 'react'
import { Toaster, toast} from 'react-hot-toast';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import Link from 'next/link';



export default function loginPage() {

  const router = useRouter()
   const [user, setUser] = useState({
        email: "",
        password: "",
   })

   const [buttonDisable, setButtonDisable] = useState(false);
   const [loading, setloading] = useState(false)

  const onLogin = async () => {
  if(user.email.length===0 || user.password.length===0) {
     toast.error("All fields are required", 
      {position: "top-center", duration: 3000});
     return;
    } 

  try {
      setloading(true);
      const response  =  await axios.post("/api/users/login", user);
      console.log("Login Success", response.data);
      router.push('/profile')
            
    } catch (error:any) {
       console.log("Login Failed");
       toast.error(error.message)
       setloading(false)
    }
  }

  useEffect(() => {
    if(user.email.length>0 && user.password.length>0 ) {
          setButtonDisable(false)
      } else {
        setButtonDisable(true)
      }
  },[user])

  return (
    <div
     className='flex flex-col gap-1 items-center justify-center min-h-screen py-2'
    >
      <h1>{ loading ? "Processing": "Login" }</h1>
  
      <label htmlFor="email">email</label>
      <input type="text" 
      className='p-2  border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600'
      id='email'
      value={user.email}
      onChange={(e) => setUser({...user, email: e.target.value})}
      placeholder='email'
      />

      <label htmlFor="password">password</label>
      <input type="text" 
      className='p-2  border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600'
      id='password'
      value={user.password}
      onChange={(e) => setUser({...user, password: e.target.value})}
      placeholder='password'
      />

      <button
      onClick={onLogin}
      className='p-2  border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 cursor-pointer'
      >
        {buttonDisable ? "No Login" : "Login"}
      </button>

      <Link href={'/signup'}>  visit signup page </Link>
     <Toaster />
    </div>

  )
}

