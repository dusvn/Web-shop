import React, { useState, useEffect } from 'react';
import { API_BASE_URL } from '../index';
import { Link } from 'react-router-dom';

const LivePurchases = () => {
  const [purchases, setPurchases] = useState([]);

  const fetchData = async () => {
    try {
      const authToken = localStorage.getItem('jwtToken');
      const response = await fetch(`${API_BASE_URL}/getLivePurchases`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${authToken}`,
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        const data = await response.json();
        setPurchases(data.orders); // Set the state with the received orders
      } else {
        console.error('Error fetching information:', response.statusText);
      }
    } catch (error) {
      console.error('Error fetching information:', error);
    }
  };

  useEffect(() => {
    fetchData();
    const intervalId = setInterval(() => {
      fetchData();
    }, 60000);

    return () => clearInterval(intervalId);
  }, []); 


  return (
    <div className="bg-gray-900 min-h-screen flex flex-col items-center justify-center">
      <div className="bg-gray-800 p-6 rounded-lg w-full">
        <h2 className="text-4xl text-center italic font-light mb-4 text-white">Purchases history</h2>
        <table className="w-full rounded-lg overflow-hidden">
          <thead className="text-white">
            <tr>
              <th className="py-2 px-4 border-b border-gray-600 text-center" style={{ width: '10%' }}>Price</th>
              <th className="py-2 px-4 border-b border-gray-600 text-center" style={{ width: '10%' }}>Currency</th>
              <th className="py-2 px-4 border-b border-gray-600 text-center" style={{ width: '20%' }}>Time</th>
              <th className="py-2 px-4 border-b border-gray-600 text-center" style={{ width: '20%' }}>Name</th>
              <th className="py-2 px-4 border-b border-gray-600 text-center" style={{ width: '20%' }}>Last Name</th>
              <th className="py-2 px-4 border-b border-gray-600 text-center" style={{ width: '20%' }}>Email</th>
            </tr>
          </thead>
          <tbody className="text-gray-300">
            {purchases.map((order, index) => (
              <tr key={index}>
                <td className="py-2 px-4 border-b border-gray-600 text-center">{order.price}</td>
                <td className="py-2 px-4 border-b border-gray-600 text-center">{order.currency}</td>
                <td className="py-2 px-4 border-b border-gray-600 text-center">{new Date(order.dateTime).toLocaleString()}</td>
                <td className="py-2 px-4 border-b border-gray-600 text-center">{order.name}</td>
                <td className="py-2 px-4 border-b border-gray-600 text-center">{order.lastName}</td>
                <td className="py-2 px-4 border-b border-gray-600 text-center">{order.email}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Link to="/MainPage" className='text-cyan-400 underline'>
        Back to the main page
      </Link>
    </div>
  );
};

export default LivePurchases;
