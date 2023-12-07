import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { API_BASE_URL } from '../index';

export default function MainPage() {
  const navigate = useNavigate();
  const [userName, setUserName] = useState('');

  const handleSignOut = () => {
    localStorage.removeItem('jwtToken');
    console.log(`This is jwt: ${localStorage.getItem('jwtToken')}`);
    navigate('/');
  };

  const fetchUserInformation = async () => {
    try {
      const authToken = localStorage.getItem('jwtToken');
      console.log(`Ovo je poslati token ${authToken}`);
      const response = await fetch(`${API_BASE_URL}/getUserName`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${authToken}`,
          'Content-Type': 'application/json',
        },
      });

      const userData = await response.json();
      console.log(userData);

    
      setUserName(userData); 
    } catch (error) {
      console.error('Error fetching user information:', error);
    }
  };

  useEffect(() => {
    fetchUserInformation();
  }, []);

  return (
    <header className="bg-gray-800 text-green-500 p-4 flex justify-between items-center">
      <div className="text-4xl italic font-light dark:text-white">Hello {userName}</div>
      <button className="bg-teal-500 text-white px-4 py-2 rounded" onClick={handleSignOut}>
        Sign Out
      </button>
    </header>
  );
}
