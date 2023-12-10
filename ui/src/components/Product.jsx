import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { API_BASE_URL } from '../index';

export default function Product() {
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [productNameError, setProductNameError] = useState('');

  const [price, setPrice] = useState('');
  const [priceError, setPriceError] = useState('');

  const [quantity, setQuantity] = useState('');
  const [quantityError, setQuantityError] = useState('');

  const [currencies, setCurrencies] = useState([]);
  const [currency, setCurrency] = useState('');

  useEffect(() => {
    const fetchCurrencies = async () => {
      try {
        const response = await fetch('https://open.er-api.com/v6/latest/USD');
        const data = await response.json();

        const currencyCodes = Object.keys(data.rates);

        setCurrencies(currencyCodes);

        setCurrency(currencyCodes[0]);
      } catch (error) {
        console.error('Error fetching currencies:', error);
      }
    };

    fetchCurrencies();
  }, []);

  const handleProductNameChange = (e) => {
    const value = e.target.value;
    setName(value);
    if (value.trim() === '') {
      setProductNameError('Product name must not be empty.');
    } else {
      setProductNameError('');
    }
  };

  const handlePriceChange = (e) => {
    const value = e.target.value;
    setPrice(value);
    if (value.trim() === '') {
      setPriceError('Price must not be empty.');
    } else {
      setPriceError('');
    }
  };

  const handleQuantityChange = (e) => {
    const value = e.target.value;
    setQuantity(value);
    if (value.trim() === '') {
      setQuantityError('Quantity must not be empty.');
    } else {
      setQuantityError('');
    }
  };

//
  const handleAddNewProduct = async (e) => {
    const authToken = localStorage.getItem('jwtToken');
    e.preventDefault();
    const productData = {
        "name":name,
        "price":parseFloat(price),
        "quantity":parseInt(quantity),
        "currency":currency
    };

    try {
        console.warn(productData)
        const response = await fetch(`${API_BASE_URL}/addNewProduct`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${authToken}`,
                'Content-Type': 'application/json;charset=UTF-8',
            },
            body: JSON.stringify(productData)
        });
        console.warn(response);
        if (response.status === 200) {
            const data = await response.json(); // stavicemo nesto kao u povratku uspesno dodat proizvod pa njegovo ime 

            navigate("/MainPage");
        } else console.error("Product can't be added!");
    } catch (error) {
        console.warn(error);
        console.error('Error during add new product.', error);
    }
};
//

  return (
    <div className='grid grid-cols-1 sm:grid-cols-1 h-screen w-full'>
      <div className='bg-gray-800 flex flex-col justify-center'>
        <div
          className='max-w-[500px] w-full mx-auto bg-gray-900 p-8 px-8 rounded-lg'
          
        >
          <h2 className='text-4xl dark:text-white text-center italic font-light'>
            Add New Product
          </h2>

          <div className='flex flex-col text-gray-400 py-2'>
            <label>Product Name:</label>
            <input
              className={`rounded-lg bg-gray-700 mt-2 p-2 focus:border-blue-500 focus:bg-gray-800 focus-outline-none ${
                productNameError ? 'border-red-500' : ''
              }`}
              type='text'
              placeholder='Product name'
              value={name}
              onChange={handleProductNameChange}
            />
            {productNameError && (
              <p className='text-red-500 text-sm'>{productNameError}</p>
            )}
          </div>

          <div className='flex flex-col text-gray-400 py-2'>
            <label>Price:</label>
            <input
              className={`rounded-lg bg-gray-700 mt-2 p-2 focus:border-blue-500 focus:bg-gray-800 focus-outline-none ${
                priceError ? 'border-red-500' : ''
              }`}
              type='number'
              placeholder='Price'
              value={price}
              onChange={handlePriceChange}
            />
            {priceError && <p className='text-red-500 text-sm'>{priceError}</p>}
          </div>

          <div className='flex flex-col text-gray-400 py-2'>
            <label>Quantity:</label>
            <input
              className={`rounded-lg bg-gray-700 mt-2 p-2 focus:border-blue-500 focus:bg-gray-800 focus-outline-none ${
                quantityError ? 'border-red-500' : ''
              }`}
              type='number'
              placeholder='Quantity'
              value={quantity}
              onChange={handleQuantityChange}
            />
            {quantityError && (
              <p className='text-red-500 text-sm'>{quantityError}</p>
            )}
          </div>

          <div className='flex flex-col text-gray-400 py-2'>
            <label>Currency:</label>
            <select
              className='rounded-lg bg-gray-700 mt-2 p-2 focus:border-blue-500 focus:bg-gray-800 focus-outline-none'
              value={currency}
              onChange={(e) => setCurrency(e.target.value)}
            >
              {currencies.map((curr) => (
                <option key={curr} value={curr}>
                  {curr}
                </option>
              ))}
            </select>
          </div>

          <div>
            <button
              
              className='w-full my-5 py-2 bg-teal-500 shadow-lg shadow-teal-500/40 hover:shadow-teal-500/40 text-white font-semibold rounded-lg'
              onClick={handleAddNewProduct}
            >
              Add Product
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}