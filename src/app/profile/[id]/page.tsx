// import React from 'react'

function page({params}: any) {
  return (
    <div className="flex flex-col justify-center items-center min-h-screen py-2">
        <h1 className=""
        >Profile</h1>
        <h2 className="tetx-white p-2 bg-gray-600">
        {params.id}

        </h2>

    </div>
  )
}

export default page
