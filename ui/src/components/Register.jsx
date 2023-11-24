import React, { useState } from 'react';


export default function Register() {
    return (
        <div className='grid grid-cols-1 sm:grid-cols-1 h-screen w-full'>
            <div className='bg-gray-800 flex flex-col justify-center'>
                <form className='max-w-[600px] w-full mx-auto bg-gray-900 p-8 px-8 rounded-lg '>
                    <h2 className='text-4xl dark:text-white  text-center italic font-light'>REGISTER</h2>

                    <div className='flex flex-col text-gray-400 py-2'>
                        <label>Ime</label>
                        <input className='rounded-lg bg-gray-700 mt-2 p-2 focus:border-blue-500 focus:bg-gray-800 focus-outline-none' type='text' placeholder='Pera'></input>
                    </div>

                    <div className='flex flex-col text-gray-400 py-2'>
                        <label>Prezime</label>
                        <input className='rounded-lg bg-gray-700 mt-2 p-2 focus:border-blue-500 focus:bg-gray-800 focus-outline-none' type='text' placeholder='Peric'></input>
                    </div>
                    <div className='flex flex-col text-gray-400 py-2'>
                        <label>Adresa</label>
                        <input className='rounded-lg bg-gray-700 mt-2 p-2 focus:border-blue-500 focus:bg-gray-800 focus-outline-none' type='text' placeholder='Adresa ulice'></input>
                    </div>

                    <div className='flex flex-col text-gray-400 py-2'>
                        <label>Grad</label>
                        <input className='rounded-lg bg-gray-700 mt-2 p-2 focus:border-blue-500 focus:bg-gray-800 focus-outline-none' type='text' placeholder='Grad'></input>
                    </div>

                    <div className='flex flex-col text-gray-400 py-2'>
                        <label>Drzava</label>
                        <input className='rounded-lg bg-gray-700 mt-2 p-2 focus:border-blue-500 focus:bg-gray-800 focus-outline-none' type='text' placeholder='Drzava'></input>
                    </div>

                    <div className='flex flex-col text-gray-400 py-2'>
                        <label>Broj telefona</label>
                        <input className='rounded-lg bg-gray-700 mt-2 p-2 focus:border-blue-500 focus:bg-gray-800 focus-outline-none' type='text' placeholder='+381 XXX-XXX-XXX'></input>
                    </div>

                    <div className='flex flex-col text-gray-400 py-2'>
                        <label>Email</label>
                        <input className='rounded-lg bg-gray-700 mt-2 p-2 focus:border-blue-500 focus:bg-gray-800 focus-outline-none' type='email' placeholder='email@gmail.com'></input>
                    </div>

                    <div className='flex flex-col text-gray-400 py-2'>
                        <label>Password</label>
                        <input className='rounded-lg bg-gray-700 mt-2 p-2 focus:border-blue-500 focus:bg-gray-800 focus-outline-none' type='password' placeholder='***********'></input>
                    </div>

                    <div className='flex flex-col text-gray-400 py-2'>
                        <label>Confirm password</label>
                        <input className='rounded-lg bg-gray-700 mt-2 p-2 focus:border-blue-500 focus:bg-gray-800 focus-outline-none' type='password' placeholder='***********'></input>
                    </div>

                    <div>
                        <button className='w-full my-5 py-2 bg-teal-500 shadow-lg shadow-teal-500/40 hover:shadow-teal-500/40 text-white font-semibold rounded-lg'>Register</button>
                    </div>

                    <div>
                        <label className="text-red-600">Have an Account</label> <a className='text-cyan-400' href="/Login.jsx">Login here</a>
                    </div>

                </form>
            </div>
        </div>

    )
}

