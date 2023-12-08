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
    <div className="flex flex-col h-screen bg-gray-900 text-white">
      {/* Your existing header with Sign Out button */}
      <header className="bg-gray-700 p-4 flex justify-between items-center">
        <div className="text-4xl italic font-light">Hello {userName}</div>
        <button className="bg-teal-500 text-white px-4 py-2 rounded" onClick={handleSignOut}>
          Sign Out
        </button>
      </header>
  
      <div className="my-2">
        <br />
        <br />
        <br />
      </div>
  
      <div className="flex justify-between">
        {/* Left side with 3 buttons */}
        <div className="w-1/4 ml-8"> {/* Adjust the left margin as needed */}
          <button className="bg-teal-500 text-white px-4 py-2 rounded mb-4 w-full">Users</button>
          <br></br>
          <br></br>
          <button className="bg-teal-500 text-white px-4 py-2 rounded mb-4 w-full">Products</button>
          <br></br>
          <br></br>
          <button className="bg-teal-500 text-white px-4 py-2 rounded mb-4 w-full">Purchases</button>
          <br></br>
          <br></br>
        </div>
  
        {/* Right side with the table and "Add new product" button */}
        <div className="w-1/2 mr-14">
          <table className="w-full border-collapse border border-gray-700 rounded-lg">
            <thead>
              <tr>
                <th className="bg-gray-800 p-1 border-r border-gray-700">
                  <h3 className="text-sm font-semibold mb-1">Name</h3>
                </th>
                <th className="bg-gray-800 p-1 border-r border-gray-700">
                  <h3 className="text-sm font-semibold mb-1">Price</h3>
                </th>
                <th className="bg-gray-800 p-1">
                  <h3 className="text-sm font-semibold mb-1">Quantity</h3>
                </th>
              </tr>
            </thead>
            <tr className="border-t border-gray-700">
              <td className="bg-gray-800 p-1 border-r border-gray-700">
                Product 1
              </td>
              <td className="bg-gray-800 p-1 border-r border-gray-700">
                $10.00
              </td>
              <td className="bg-gray-800 p-1">
                5
              </td>
            </tr>
            <tr className="border-t border-gray-700">
              <td className="bg-gray-800 p-1 border-r border-gray-700">
                Product 1
              </td>
              <td className="bg-gray-800 p-1 border-r border-gray-700">
                $10.00
              </td>
              <td className="bg-gray-800 p-1">
                5
              </td>
            </tr>
            <tr className="border-t border-gray-700">
              <td className="bg-gray-800 p-1 border-r border-gray-700">
                Product 1
              </td>
              <td className="bg-gray-800 p-1 border-r border-gray-700">
                $10.00
              </td>
              <td className="bg-gray-800 p-1">
                5
              </td>
            </tr>
            <tbody>
              {/* Add your table rows here */}
            </tbody>
          </table>
          <div className="flex justify-end mt-4">
            <button className="bg-teal-500 text-white px-4 py-2 rounded">Add new product</button>
          </div>
        </div>
      </div>
    </div>
  );
  
  
  

}
