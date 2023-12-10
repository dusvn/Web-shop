import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {useNavigate} from "react-router-dom";
import {API_BASE_URL} from "../index";

export default function Login() {

  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');

  const [password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const handleEmailChange = (e) => {
    const value = e.target.value;
    setEmail(value);
    const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
    if (value.trim() === '') {
      setEmailError('Email must not be empty.');
    } else if (!isValidEmail) {
      setEmailError('Invalid email format. Please use the format: something@something');
    } else {
      setEmailError('');
    }
  };

  const handlePasswordChange = (e) => {
    const value = e.target.value;
    setPassword(value);
    if (value.trim() === '') {
      setPasswordError('Password must not be empty.');
    } else {
      setPasswordError('');
    }
  };

  const handleLogin = async (e) => {
        e.preventDefault();
        const userData = {
            "email":email,
            "password":password
        };
        try {
            console.warn(userData)
            const response = await fetch(`${API_BASE_URL}/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json;charset=UTF-8',
                },
                body: JSON.stringify(userData)
            });
            console.warn(response);
            if (response.status === 200) {
                const data = await response.json()
                localStorage.setItem('jwtToken', data.access_token);
                navigate("/MainPage");
            } else {
                console.error('Login failed');
            }
        } catch (error) {
            console.warn(error);
            console.error('Error during Login', error);
        }
    };

  return (
    <div className='grid grid-cols-1 sm:grid-cols-1 h-screen w-full'>
      <div className='bg-gray-800 flex flex-col justify-center'>
        <form className='max-w-[500px] w-full mx-auto bg-gray-900 p-8 px-8 rounded-lg' onSubmit={handleLogin}>
          <h2 className='text-4xl dark:text-white text-center italic font-light'>LOGIN</h2>

          <div className='flex flex-col text-gray-400 py-2'>
            <label>Email</label>
            <input
              className={`rounded-lg bg-gray-700 mt-2 p-2 focus:border-blue-500 focus:bg-gray-800 focus-outline-none ${
                emailError ? 'border-red-500' : ''
              }`}
              type='email'
              placeholder='email@gmail.com'
              value={email}
              onChange={handleEmailChange}
            />
            {emailError && <p className="text-red-500 text-sm">{emailError}</p>}
          </div>

          <div className='flex flex-col text-gray-400 py-2'>
            <label>Password</label>
            <input
              className={`rounded-lg bg-gray-700 mt-2 p-2 focus:border-blue-500 focus:bg-gray-800 focus-outline-none ${
                passwordError ? 'border-red-500' : ''
              }`}
              type='password'
              placeholder='***********'
              value={password}
              onChange={handlePasswordChange}
            />
            {passwordError && <p className="text-red-500 text-sm">{passwordError}</p>}
          </div>

          <div>
            <button type="submit" className='w-full my-5 py-2 bg-teal-500 shadow-lg shadow-teal-500/40 hover:shadow-teal-500/40 text-white font-semibold rounded-lg'>LOGIN</button>
          </div>

          <div className='text-center'>
            <label className="text-red-600">Not a member?</label>&nbsp;&nbsp;
            <Link to="/Register" className='text-cyan-400 underline'>
              Register
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}