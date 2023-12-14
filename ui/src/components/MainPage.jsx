import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { API_BASE_URL } from '../index';

export default function MainPage() {
  const navigate = useNavigate();
  const [userName, setUserName] = useState('');
  const [products, setProducts] = useState({});
  const [currencyPairs, setCurrencyPairs] = useState([]);
  const [showTable, setShowTable] = useState(false);
  const [selectedValues, setSelectedValues] = useState({});
  const [isUserAdmin, setIsUserAdmin] = useState(false);
  const [isUserVerified, setIsUserVerified] = useState(false);

  const handleChange = (event, productId) => {
    const { value } = event.target;
    setSelectedValues((prevSelectedValues) => ({
      ...prevSelectedValues,
      [productId]: Number(value),
    }));
  };

  const handleShowTable = () => {
    setShowTable(true);
  };

  const handleSignOut = () => {
    localStorage.removeItem('jwtToken');
    console.log(`This is jwt: ${localStorage.getItem('jwtToken')}`);
    navigate('/');
  };

  const handleAddNewProduct = () => {
    navigate('/newProduct');
  };

  const handleReloadMain = () => {
    setShowTable(false);
    navigate('/MainPage');
  }

  const fetchUserInformation = async () => {
    try {
      const authToken = localStorage.getItem('jwtToken');
      console.log(`Ovo je poslati token ${authToken}`);
      const response = await fetch(`${API_BASE_URL}/getUserInfo`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${authToken}`,
          'Content-Type': 'application/json',
        },
      });
      const userData = await response.json();
      console.log(userData);

      const { name: userName, is_admin: isUserAdmin, is_verified: isUserVerified } = userData;

      if(userData.bill !== null){
        const currencyPairs = Object.entries(userData.bill)
            .map(([currency, { value }]) => ({ currency, value }));
            setCurrencyPairs(currencyPairs);
      }

      console.log(currencyPairs);
      setUserName(userName);
      setIsUserAdmin(isUserAdmin);
      setIsUserVerified(isUserVerified);
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


  const handleSubmit = async (e) => {
    const selectedPairs = Object.entries(selectedValues).filter(([productId, value]) => value !== 0);
    const authToken = localStorage.getItem('jwtToken');
    try {
      console.warn(selectedPairs);
      const response = await fetch(`${API_BASE_URL}/addQuantity`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${authToken}`,
          'Content-Type': 'application/json;charset=UTF-8',
        },
        body: JSON.stringify(selectedPairs)
      });
      console.warn(response);
      if (response.status === 200) {
        setShowTable(false);
        navigate("/MainPage");
        window.location.reload(); // refresh page
      } else {
        console.error('Add quantity for this products are disabled');
      }
    } catch (error) {
      console.warn(error);
      console.error('Error during add quantity function', error);
    }
  };

  useEffect(() => {
    fetchUserInformation();
    fetchProducts();
  }, []);

  const renderTable = () => {
    return (
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
              <th className="bg-gray-800 p-1 border-r border-gray-700">
                <h3 className="text-sm font-semibold mb-1">Quantity</h3>
              </th>
              <th className="bg-gray-800 p-1">
                <h3 className="text-sm font-semibold mb-1">Select Quantity</h3>
              </th>
            </tr>
          </thead>
          <tbody>
            {Object.keys(products).map((productId) => {
              const product = products[productId];
              return (
                <tr key={productId}>
                  <td className="border p-1">{product.name}</td>
                  <td className="border p-1">{`${product.price} ${product.currency}`}</td>
                  <td className="border p-1">{product.quantity}</td>
                  <td className="border p-1">
                    <select
                      id={`quantitySelect_${productId}`}
                      className="bg-gray-800 text-white p-2 rounded w-full"
                      value={selectedValues[productId] || 0}
                      onChange={(event) => handleChange(event, productId)}
                    >
                      <option value={0}>0</option>
                      <option value={2}>2</option>
                      <option value={5}>5</option>
                      <option value={10}>10</option>
                      <option value={15}>15</option>
                      <option value={20}>20</option>
                      <option value={25}>25</option>
                    </select>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>

        <div className="flex justify-end mt-4">
          <button className="bg-teal-500 text-white px-4 py-2 rounded" onClick={handleSubmit}>Submit new</button>
        </div>
      </div>
    );
  };

  return (
    <div className="flex flex-col h-screen bg-gray-900 text-white">
      <header className="bg-gray-700 p-4 flex justify-between items-center">
        <div className="text-4xl italic font-light">Hello {userName}</div>
        <button className="bg-teal-500 text-white px-4 py-2 rounded" onClick={handleSignOut}>
          Sign Out
        </button>
      </header>

      <div className="my-2 p-4 bg-gray-800 rounded-lg">
        <h2 className="text-2xl mb-4 text-teal-500">Balance</h2>
        {!isUserVerified && (
            <>
              <button className="bg-teal-500 text-white px-4 py-2 rounded mb-4 w-full">Add billing info</button>
              <br />
              <br />
            </>
        )}
        {!(!currencyPairs) && (
            <>
              <ul className="list-disc pl-4">
              {currencyPairs.map(({ currency, value }, index) => (
                <li key={index} className="text-white">{`${currency}: ${value}`}</li>
              ))}
              </ul>
            </>
        )}
        {(currencyPairs.length === 0) && (
            <><p>An admin needs to approve your billing info.</p>
            </>
        )}
      </div>

      <div className="flex justify-between">
        <div className="w-1/4 ml-8">
          <br />
          {!isUserAdmin && (
              <>
                <button className="bg-teal-500 text-white px-4 py-2 rounded mb-4 w-full">Edit profile</button>
                <br />
                <br />
                <button className="bg-teal-500 text-white px-4 py-2 rounded mb-4 w-full">Purchase history</button>
                <br />
                <br />
                <button className="bg-teal-500 text-white px-4 py-2 rounded mb-4 w-full">Add funds</button>
                <br />
                <br />
              </>
          )}
          {isUserAdmin && (
              <>
                <button className="bg-teal-500 text-white px-4 py-2 rounded mb-4 w-full">Verify accounts</button>
                <br />
                <br />
                <button className="bg-teal-500 text-white px-4 py-2 rounded mb-4 w-full" onClick={handleShowTable}>Add quantity</button>
                <br />
                <br />
                <button className="bg-teal-500 text-white px-4 py-2 rounded mb-4 w-full">Purchases</button>
                <br />
                <br />
              </>
          )}
          <button className="bg-teal-500 text-white px-4 py-2 rounded mb-4 w-full" onClick={handleReloadMain}>View products</button>
        </div>

        {showTable ? renderTable() : (
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

            <div className="flex justify-end mt-4">
              <button className="bg-teal-500 text-white px-4 py-2 rounded" onClick={handleAddNewProduct}>Add new product</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );

}