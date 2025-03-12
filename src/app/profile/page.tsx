'use client'

import axios from "axios"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useState } from "react"

import {toast, Toaster} from "react-hot-toast"


export default function ProfilePage () {
  
   const router = useRouter()
   const [data, setData] = useState("nothing")
  

   const getUserDetail = async () => {

        try {
            
          const response = await axios.post('/api/users/me')
          console.log(response.data.data);
          setData(response.data.data._id)
          

        } catch (error:any) {
             console.log(error.message);
             toast.error(error.message, {
                position: "top-center", duration: 3000
            })
             
        }
   }


   const logout = async () => {

        try {
            
          await axios.get('/api/users/logout')
          toast.success("Logout successfully", {
            position: "top-center", duration: 3000
          })
          router.push('/login')

        } catch (error:any) {
            console.log(error.message)
            toast.error(error.message, {
                position: "top-center", duration: 3000
            })
        }
   }
  

  return (
    <>
    <div className='flex flex-col justify-center items-center min-h-screen py-2'>
        <h1>
           Profile Page
        </h1>
        <hr />
        <h2>
            {data === "nothing"? "Nothing":  <Link href={`/profile/${data}`}>
             {data} test
            </Link>}
        </h2>
        <hr/>

        <button
        onClick={logout}
        className="p-2 bg-blue-500 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 cursor-pointer"
        >
            logout
        </button>

        <button
        onClick={getUserDetail}
        className="p-2 bg-green-500 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 cursor-pointer"
        >
            getUserDetail
        </button>
    </div>


    <Toaster/>
    </>
  )
}

