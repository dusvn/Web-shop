import React, { useState, useEffect } from 'react';
import { API_BASE_URL } from '../index';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

const VerifyUsers = () => {
  const navigate = useNavigate();
  const [notVerifiedUsers, setNotVerifiedUsers] = useState([]);
  const [formattedData, setFormattedData] = useState({});

  const handleApprove = async (e) => {
    const authToken = localStorage.getItem('jwtToken');
    try {
      const response = await fetch(`${API_BASE_URL}/approveCards`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${authToken}`,
          'Content-Type': 'application/json;charset=UTF-8',
        },
        body: JSON.stringify(formattedData),
      });
      console.log(formattedData)
      if (response.status === 200) {
        //navigate to main page 
        navigate("/MainPage")
        setNotVerifiedUsers([])
      } else {
        console.error('Add converted for this products are disabled');
      }
    } catch (error) {
      console.warn(error);
      console.error('Error during add converted function', error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const authToken = localStorage.getItem('jwtToken');
        const response = await fetch(`${API_BASE_URL}/getNotVerifiedUsers`, {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${authToken}`,
            'Content-Type': 'application/json',
          },
        });

        if (response.ok) {
          const data = await response.json();

          // Assuming FormattedData is your existing data structure
          const newData = {};
          for (const key in data) {
            if (data.hasOwnProperty(key)) {
              newData[key] = { cardNum: data[key].cardNum };
            }
          }

          setNotVerifiedUsers(data);
          setFormattedData(newData);
          console.warn(newData); // Logging the newly formatted data
        } else {
          console.error('Error fetching information:', response.statusText);
        }
      } catch (error) {
        console.error('Error fetching information:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="bg-gray-900 min-h-screen flex flex-col items-center justify-center">
      <div className="bg-gray-800 p-6 rounded-lg max-w-md w-full">
        <h2 className="text-4xl text-center italic font-light mb-4 text-white">Users for Approval</h2>
        <table className="w-full rounded-lg overflow-hidden">
          <thead className="text-white">
            <tr>
              <th className="py-2 px-4 border-b border-gray-600 text-center">Name</th>
              <th className="py-2 px-4 border-b border-gray-600 text-center">Last Name</th>
              <th className="py-2 px-4 border-b border-gray-600 text-center">Card Number</th>
            </tr>
          </thead>
          <tbody className="text-gray-300">
            {Object.entries(notVerifiedUsers).map(([userId, userData]) => (
              <tr key={userId} className="border-b border-gray-600">
                <td className="py-2 px-4 text-center">{userData.name}</td>
                <td className="py-2 px-4 text-center">{userData.lastName}</td>
                <td className="py-2 px-4 text-center">{userData.cardNum}</td>
              </tr>
            ))}
          
          </tbody>
        </table>
      </div>
      <button className="bg-teal-500 text-white px-4 py-2 rounded mt-4" onClick={handleApprove}>Approve all</button>
      <Link to="/MainPage" className='text-cyan-400 underline'>
              Back to the main page
            </Link>
    </div>
  );
};

export default VerifyUsers;
