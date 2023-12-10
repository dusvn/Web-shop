import React, { useState, useEffect } from 'react';
import { useNavigate} from 'react-router-dom';
import { API_BASE_URL } from '../index';

export default function MainPage() {
  const navigate = useNavigate();
  const [userName, setUserName] = useState('');
  const [products, setProducts] = useState({});

  const handleSignOut = () => {
    localStorage.removeItem('jwtToken');
    console.log(`This is jwt: ${localStorage.getItem('jwtToken')}`);
    navigate('/');
  };

  const handleAddNewProduct = () => {
    navigate('/newProduct');
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

  const fetchProducts = () => {

    const authToken = localStorage.getItem('jwtToken');
    fetch(`${API_BASE_URL}/getProducts`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${authToken}`,
        'Content-Type': 'application/json',
      },
    })
      .then(response => response.json())
      .then(productsData => {
        console.log(productsData);
        setProducts(productsData);
        console.log(products);
      })
      .catch(error => {
        console.error('Error fetching products:', error);
      });
  };



  useEffect(() => {
    fetchUserInformation();
    fetchProducts();
  }, []);



  
  return (
    <div className="flex flex-col h-screen bg-gray-900 text-white">
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
        <div className="w-1/4 ml-8">
          <button className="bg-teal-500 text-white px-4 py-2 rounded mb-4 w-full">Users</button>
          <br />
          <br />
          <button className="bg-teal-500 text-white px-4 py-2 rounded mb-4 w-full">Products</button>
          <br />
          <br />
          <button className="bg-teal-500 text-white px-4 py-2 rounded mb-4 w-full">Purchases</button>
          <br />
          <br />
        </div>

        <div className="w-1/2 mr-14">
          {Object.keys(products).length > 0 ? (
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
              <tbody>
                {Object.keys(products).map(productId => {
                  const product = products[productId];
                  return (
                    <tr key={productId} >
                      <td className="border p-1" >{product.name}</td>
                      <td className="border p-1">{`${product.price} ${product.currency}`}</td>
                      <td className="border p-1">{product.quantity}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          ) : (
            <p>No products available</p>
          )}
          <div className="flex justify-end mt-4">
            <button className="bg-teal-500 text-white px-4 py-2 rounded" onClick={handleAddNewProduct}>Add new product</button>
          </div>
        </div>
      </div>
    </div>
  );

}
