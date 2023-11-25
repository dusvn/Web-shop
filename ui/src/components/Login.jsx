import React, { useState } from 'react';


export default function Login() {
    return(
        <div className='grid grid-cols-1 sm:grid-cols-1 h-screen w-full'>
            <div className='bg-gray-800 flex flex-col justify-center'>
                <form className='max-w-[500px] w-full mx-auto bg-gray-900 p-8 px-8 rounded-lg'>
                    <h2 className='text-4xl dark:text-white  text-center italic font-light'>LOGIN</h2>
                    
                    <div className='flex flex-col text-gray-400 py-2'> 
                        <label>Email</label>
                        <input className='rounded-lg bg-gray-700 mt-2 p-2 focus:border-blue-500 focus:bg-gray-800 focus-outline-none' type='email' placeholder='email@gmail.com'></input>
                    </div>

                    <div className='flex flex-col text-gray-400 py-2'>
                        <label>Password</label>
                        <input className='rounded-lg bg-gray-700 mt-2 p-2 focus:border-blue-500 focus:bg-gray-800 focus-outline-none' type='password' placeholder='***********'></input>
                    </div>
                    <div>
                    <button className='w-full my-5 py-2 bg-teal-500 shadow-lg shadow-teal-500/40 hover:shadow-teal-500/40 text-white font-semibold rounded-lg'>LOGIN</button>
                    </div>
                    <div className='text-center'>
                        <label className="text-red-600">Not a memeber?</label> <a className='text-cyan-400 underline'>Register here</a>
                    </div>

                </form>
            </div>
        </div>
        
    )

  
}

