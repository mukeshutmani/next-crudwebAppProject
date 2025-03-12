'use client'
import axios from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/router';

import React, { useEffect, useState } from 'react'


export default function VerifyEmailPage() {

//   const router = useRouter()

  const [token, setToken] =  useState('');
  const [verified, setVerified] = useState(false)
  const [error, setError] = useState(false)
  

  const VerifyUserEmail = async() => {
  try {
      await axios.post("/api/users/verifyemail/",{token});
      setVerified(true)
      
  } catch (error:any) {
      setError(true)
      console.log(error.response.data);
  }
  }

  useEffect(() => {
    setError(false)
    const urlToken = window.location.search.split("=")[1]
    console.log(urlToken);
    setToken(urlToken || "")

    // next js utilization
    // const {query} = router 
    // const urlTokenTwo = query.token
    // we can use dependecy injection router
  },[])

  useEffect(() => {
      setError(false)
       if(token.length >0) {
             VerifyUserEmail()
       }
  },[token])

  return (
    <div className='flex flex-col justify-center items-center min-h-screen py-2'>
       <h1 className='text-4xl p-2'> Verify Email</h1>
       <h2 className='p-2 bg-orange-400 text-black'>
         {token ? `${token}`: `no token`}
       </h2>

       {verified && (
        <div>
            <h2>Verified</h2>
            <Link href={'/login'}> login</Link>
        </div>
       )}

       {error && (
        <div>
            <h2>Error</h2>
        </div>
       )}
    </div>
  )
}

