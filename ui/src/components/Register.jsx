import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {useNavigate} from "react-router-dom";
import {API_BASE_URL} from "../index";

export default function Register() {

    const navigate = useNavigate();

    const [name, setName] = useState('');
    const [nameError, setNameError] = useState('');

    const [lastName, setLastName] = useState('');
    const [lastNameError, setLastNameError] = useState('');

    const [address, setAddress] = useState('');
    const [addressError, setAddressError] = useState('');

    const [city, setCity] = useState('');
    const [cityError, setCityError] = useState('');

    const [country, setCountry] = useState('');
    const [countryError, setCountryError] = useState('');

    const [phoneNum, setPhoneNum] = useState('');
    const [phoneNumError, setPhoneNumError] = useState('');

    const [email, setEmail] = useState('');
    const [emailError, setEmailError] = useState('');

    const [password, setPassword] = useState('');
    const [passwordError, setPasswordError] = useState('');

    const [confirmPassword, setConfirmPassword] = useState('');
    const [confirmPasswordError, setConfirmPasswordError] = useState('');

    const handleNameChange = (e) => {
        const value = e.target.value;
        setName(value);
        if (value.trim() === '') 
            setNameError('Name must not be empty.');
        else setNameError('');
    };

    const handleLastNameChange = (e) => {
        const value = e.target.value;
        setLastName(value);
        if (value.trim() === '') 
            setLastNameError('Last name must not be empty.');
        else setLastNameError('');
    };

    const handleAddressChange = (e) => {
        const value = e.target.value;
        setAddress(value);
        if (value.trim() === '') setAddressError('Address must not be empty.');
        else setAddressError('');
    };

    const handleCityChange = (e) => {
        const value = e.target.value;
        setCity(value);
        if (value.trim() === '') setCityError('City must not be empty.');
        else setCityError('');
    };

    const handleCountryChange = (e) => {
        const value = e.target.value;
        setCountry(value);
        if (value.trim() === '') setCountryError('Country must not be empty.');
        else setCountryError('');
        
    };

    const handlePhoneNumChange = (e) => {
        const value = e.target.value;
        setPhoneNum(value);
        const isValidPhoneNumber = /^\+\d{12}$/.test(value); //ide +381626666666 ovaj patter + pa 12 brojeva 
        if (value.trim() === '') {
            setPhoneNumError('Phone number must not be empty.');
        } else if (!isValidPhoneNumber) {
            setPhoneNumError('Invalid phone number format. Please use the format: +381 XXX-XXX-XXX');
        } else setPhoneNumError('');
    };

    const handleEmailChange = (e) => {
        const value = e.target.value;
        setEmail(value);
        const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
        if (value.trim() === '') {
            setEmailError('Email must not be empty.');
        } else if (!isValidEmail) {
            setEmailError('Invalid email format. Please use the format: something@something');
        } else setEmailError('');
    };

    const handlePasswordChange = (e) => {
        const value = e.target.value;
        setPassword(value);
      
        const isPasswordValid = /^(?=.*[A-Z])(?=.*\d).{8,}$/.test(value);
      
        if (value.trim() === '') {
          setPasswordError('Password must not be empty.');
        } else if (!isPasswordValid) {
          setPasswordError('Password must be at least 8 characters long, including one uppercase letter and one number.');
        } else {
          setPasswordError('');
        }
      };
      

    const handleConfirmPasswordChange = (e) => {
        const value = e.target.value;
        setConfirmPassword(value);
        if (value.trim() === '') {
            setConfirmPasswordError('Confirm password must not be empty.');
        } else if (value !== password) {
            setConfirmPasswordError('Passwords do not match.');
        } else setConfirmPasswordError('');
    };

    const handleRegistration = async (e) => {
        e.preventDefault();
        if (nameError !== '' || lastNameError !== '' || addressError !== '' || cityError !== '' || countryError !== '' ||
          emailError !== '' || phoneNumError !== '' || passwordError !== '' || confirmPasswordError !== '') {
          return; // GRESKA, treba dodati obradu greske
      }
        const userData = {
            "name" : name,
            "lastName" :lastName,
            "address": address,
            "city": city,
            "country": country,
            "phoneNum":phoneNum,
            "email":email,
            "password":password
        };
        try {
            console.warn(userData)
            const response = await fetch(`${API_BASE_URL}/register`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json;charset=UTF-8'

                },
                body: JSON.stringify(userData)
            });
            console.warn(response);
            if (response.status === 201) {
                console.log('Registration successful');
                navigate("/");
            } else {
                console.error('Registration failed');
            }
        } catch (error) {
            console.warn(error);
            console.error('Error during registration', error);
        }
    };

    return (
        <div className='grid grid-cols-1 sm:grid-cols-1 h-screen w-full'>
            <div className='bg-gray-800 flex flex-col justify-center'>
                <form className='max-w-[600px] w-full mx-auto bg-gray-900 p-8 px-8 rounded-lg h-auto'
                onSubmit={handleRegistration}>
                    <h2 className='text-4xl dark:text-white text-center italic font-light'>REGISTER</h2>

                    <div className='flex flex-col text-gray-400 py-2'>
                        <label>Ime</label>
                        <input
                            className={`rounded-lg bg-gray-700 mt-2 p-2 focus:border-blue-500 focus:bg-gray-800 focus-outline-none ${
                                nameError ? 'border-red-500' : ''
                            }`}
                            type='text'
                            placeholder='Pera'
                            value={name}
                            onChange={handleNameChange}
                        />
                        {nameError && <p className="text-red-500 text-sm">{nameError}</p>}
                    </div>

                    <div className='flex flex-col text-gray-400 py-2'>
                        <label>Prezime</label>
                        <input
                            className={`rounded-lg bg-gray-700 mt-2 p-2 focus:border-blue-500 focus:bg-gray-800 focus-outline-none ${
                                lastNameError ? 'border-red-500' : ''
                            }`}
                            type='text'
                            placeholder='Peric'
                            value={lastName}
                            onChange={handleLastNameChange}
                        />
                        {lastNameError && <p className="text-red-500 text-sm">{lastNameError}</p>}
                    </div>

                    <div className='flex flex-col text-gray-400 py-2'>
                        <label>Adresa</label>
                        <input
                            className={`rounded-lg bg-gray-700 mt-2 p-2 focus:border-blue-500 focus:bg-gray-800 focus-outline-none ${
                                addressError ? 'border-red-500' : ''
                            }`}
                            type='text'
                            placeholder='Adresa ulice'
                            value={address}
                            onChange={handleAddressChange}
                        />
                        {addressError && <p className="text-red-500 text-sm">{addressError}</p>}
                    </div>

                    <div className='flex flex-col text-gray-400 py-2'>
                        <label>Grad</label>
                        <input
                            className={`rounded-lg bg-gray-700 mt-2 p-2 focus:border-blue-500 focus:bg-gray-800 focus-outline-none ${
                                cityError ? 'border-red-500' : ''
                            }`}
                            type='text'
                            placeholder='Grad'
                            value={city}
                            onChange={handleCityChange}
                        />
                        {cityError && <p className="text-red-500 text-sm">{cityError}</p>}
                    </div>

                    <div className='flex flex-col text-gray-400 py-2'>
                        <label>Drzava</label>
                        <input
                            className={`rounded-lg bg-gray-700 mt-2 p-2 focus:border-blue-500 focus:bg-gray-800 focus-outline-none ${
                                countryError ? 'border-red-500' : ''
                            }`}
                            type='text'
                            placeholder='Drzava'
                            value={country}
                            onChange={handleCountryChange}
                        />
                        {countryError && <p className="text-red-500 text-sm">{countryError}</p>}
                    </div>

                    <div className='flex flex-col text-gray-400 py-2'>
                        <label>Broj telefona</label>
                        <input
                            className={`rounded-lg bg-gray-700 mt-2 p-2 focus:border-blue-500 focus:bg-gray-800 focus-outline-none ${
                                phoneNumError ? 'border-red-500' : ''
                            }`}
                            type='text'
                            placeholder='+381 XXX-XXX-XXX'
                            value={phoneNum}
                            onChange={handlePhoneNumChange}
                        />
                        {phoneNumError && <p className="text-red-500 text-sm">{phoneNumError}</p>}
                    </div>

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

                    <div className='flex flex-col text-gray-400 py-2'>
                        <label>Confirm password</label>
                        <input
                            className={`rounded-lg bg-gray-700 mt-2 p-2 focus:border-blue-500 focus:bg-gray-800 focus-outline-none ${
                                confirmPasswordError ? 'border-red-500' : ''
                            }`}
                            type='password'
                            placeholder='***********'
                            value={confirmPassword}
                            onChange={handleConfirmPasswordChange}
                        />
                        {confirmPasswordError && <p className="text-red-500 text-sm">{confirmPasswordError}</p>}
                    </div>

                    <div>
                        <button type="submit"

                            className='w-full my-5 py-2 bg-teal-500 shadow-lg shadow-teal-500/40 hover:shadow-teal-500/40 text-white font-semibold rounded-lg'>Register</button>
                    </div>

                    <div className='text-center'>
                        <label className="text-red-600">Have an Account?</label>  <a href="#" className='text-cyan-400 underline'>
                            <Link to="/">Login</Link>
                        </a>
                    </div>

                </form>
            </div>
        </div>
    );
}