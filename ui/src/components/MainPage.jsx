import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { API_BASE_URL } from '../index';

export default function MainPage() {
  const navigate = useNavigate();
  const [userName, setUserName] = useState('');
  const [products, setProducts] = useState({});
  const [currencyPairs, setCurrencyPairs] = useState([]);
  const [showQuantity, setShowQuantity] = useState(false);
  const [showProducts, setShowProducts] = useState(true);
  const [showProfileEdit, setShowProfileEdit] = useState(false);
  const [selectedValues, setSelectedValues] = useState({});
  const [isUserAdmin, setIsUserAdmin] = useState(false);
  const [isUserVerified, setIsUserVerified] = useState(false);

  const [izValute, setIzValute] = useState('USD');
  const [uValutu, setUValutu] = useState('EUR');
  const [iznos, setIznos] = useState(0);
  const [kurs, setKurs] = useState(null);
  const [konvertovaniIznos, setKonvertovaniIznos] = useState(null);
  const [dostupneValute, setDostupneValute] = useState([]);
  const [sveValute, setSveValute] = useState([]);

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

  useEffect(() => {
    const fetchExchangeRate = async () => {
      try {

        const authToken = localStorage.getItem('jwtToken');
      console.log(`Ovo je poslati token ${authToken}`);
      const response1 = await fetch(`${API_BASE_URL}/getUserInfo`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${authToken}`,
          'Content-Type': 'application/json',
        },
      });
      const userData = await response1.json();

      const { name: userName } = userData;

      const currencyPairs = Object.entries(userData.bill)
        .map(([currency, { value }]) => ({ currency, value }));
      setCurrencyPairs(currencyPairs);

      if(izValute !== ''){
        const response = await fetch(`https://open.er-api.com/v6/latest/${izValute}`);
        const data = await response.json();
        const exchangeRate = data.rates[uValutu];
        setKurs(exchangeRate);

        //const availableCurrencies = Object.keys(data.rates);

        const availableCurrencies = currencyPairs.map(({ currency }) => currency);
        setDostupneValute(availableCurrencies);
      }

      } catch (error) {
        console.error('Greška prilikom dobijanja kursa:', error);
      }
    };

    fetchExchangeRate();
  }, [izValute, uValutu]);

  useEffect(() => {
    if (kurs !== null) {
      const convertedAmount = iznos * kurs;
      setKonvertovaniIznos(convertedAmount);
    }
  }, [iznos, kurs]);

  useEffect(() => {
    const fetchCurrencies = async () => {
      try {
        const response = await fetch(`https://open.er-api.com/v6/latest/${uValutu}`);
        const data = await response.json();

        const currencyCodes = Object.keys(data.rates);

        setSveValute(currencyCodes);

      } catch (error) {
        console.error('Error fetching currencies:', error);
      }
    };

    fetchCurrencies();
  }, []);

  const handleChange = (event, productId) => {
    const { value } = event.target;
    setSelectedValues((prevSelectedValues) => ({
      ...prevSelectedValues,
      [productId]: Number(value),
    }));
  };

  const handleAddQuantity = () => {
    setShowQuantity(true);
    setShowProfileEdit(false);
  };

  const handleProfileEdit = async (e) => {
      const authToken = localStorage.getItem('jwtToken');
      const response = await fetch(`${API_BASE_URL}/user`, {
          method: 'GET',
          headers: {
          'Authorization': `Bearer ${authToken}`,
          'Content-Type': 'application/json;charset=UTF-8',
        }
      }).then(response => response.json());
      console.warn(response["user_data"]);
      var user_data = response["user_data"];
      setName(user_data["name"]);
      setLastName(user_data["lastName"]);
      setAddress(user_data["address"]);
      setEmail(user_data["email"]);
      setPassword(user_data["password"]);
      setCountry(user_data["country"]);
      setCity(user_data["city"]);
      setPhoneNum(user_data["phoneNum"]);
      setShowQuantity(false);
      setShowProducts(false);
      setShowProfileEdit(true);
  };

  const handleSignOut = () => {
    localStorage.removeItem('jwtToken');
    console.log(`This is jwt: ${localStorage.getItem('jwtToken')}`);
    navigate('/');
  };

  const handleAddNewProduct = () => {
    navigate('/newProduct');
  };

  const handleViewProducts = () => {
    setShowQuantity(false);
    setShowProfileEdit(false);
    setShowProducts(true);
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
        setShowQuantity(false);
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

  const handleConvert = async (e) => {
    const currencyPairsMap = new Map([
      [izValute, iznos],
      [uValutu, konvertovaniIznos],
      ]);
    const arrayFromMap = Array.from(currencyPairsMap);

    const authToken = localStorage.getItem('jwtToken');
    try {
      const response = await fetch(`${API_BASE_URL}/addConverted`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${authToken}`,
          'Content-Type': 'application/json;charset=UTF-8',
        },
        body: JSON.stringify(Object.fromEntries(currencyPairsMap))
      });
      console.warn(response);
      if (response.status === 200) {
        window.location.reload(); // refresh page
      } else {
        console.error('Add converted for this products are disabled');
      }
    } catch (error) {
      console.warn(error);
      console.error('Error during add converted function', error);
    }
  };

  useEffect(() => {
    fetchUserInformation();
    fetchProducts();
  }, []);

  const renderProfileEdit = () => {
    return(
        <div className="w-1/2 mr-14">
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
        </div>
    );
  };

  const renderQuantity = () => {
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

  const renderProducts = () => {
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
              {isUserAdmin && (
                  <div className="flex justify-end mt-4">
                    <button className="bg-teal-500 text-white px-4 py-2 rounded" onClick={handleAddNewProduct}>Add new product</button>
                  </div>
              )}
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



      <div className="flex">
      <div className="my-2 p-4 bg-gray-800 rounded-lg mr-4">
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
        {(currencyPairs.length === 0) && isUserVerified && (
            <><p>An admin needs to approve your billing info.</p>
            </>
        )}
      </div>

        {!isUserAdmin && <div className="my-2 p-4 bg-gray-800 rounded-lg">
      <h2 className="text-2xl mb-4 text-teal-500">Konvertor Valuta</h2>
      <div className="flex">
        <div className="mr-4">
          <label className="text-white">Iz valute:</label>
          <select value={izValute} onChange={(e) => setIzValute(e.target.value)} className="bg-gray-700 text-white p-2 rounded">
            <option value="" disabled>Izaberite valutu</option>
            {dostupneValute.map((valuta) => (
              <option key={valuta} value={valuta}>{valuta}</option>
            ))}
          </select>
        </div>
        <div className="mr-4">
          <label className="text-white">U valutu:</label>
          <select value={uValutu} onChange={(e) => setUValutu(e.target.value)} className="bg-gray-700 text-white p-2 rounded">
            <option value="" disabled>Izaberite valutu</option>
            {sveValute.map((valuta) => (
              <option key={valuta} value={valuta}>{valuta}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="text-white">Iznos:</label>
          <input type="number" value={iznos} onChange={(e) => setIznos(e.target.value)} className="bg-gray-700 text-white p-2 rounded" />
        </div>
      </div>
        <div className="mt-4">
        <button onClick={handleConvert} className="bg-teal-500 text-white px-4 py-2 rounded">Konvertuj</button>
      </div>
      <div>
        <p className="text-white">Kurs: {kurs}</p>
        {konvertovaniIznos !== null && (
          <p className="text-white">{iznos} {izValute} = {konvertovaniIznos} {uValutu}</p>
        )}
      </div>
    </div>}
    </div>


      <div className="flex justify-between">
        <div className="w-1/4 ml-8">
          <br />
          {!isUserAdmin && (
              <>
                <button className="bg-teal-500 text-white px-4 py-2 rounded mb-4 w-full" onClick={handleProfileEdit}>Edit profile</button>
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
                <button className="bg-teal-500 text-white px-4 py-2 rounded mb-4 w-full" onClick={handleAddQuantity}>Add quantity</button>
                <br />
                <br />
                <button className="bg-teal-500 text-white px-4 py-2 rounded mb-4 w-full">Purchases</button>
                <br />
                <br />
              </>
          )}
          <button className="bg-teal-500 text-white px-4 py-2 rounded mb-4 w-full" onClick={handleViewProducts}>View products</button>
        </div>
          {showProfileEdit ? renderProfileEdit(): (
              <div>
              </div>
          )}

        {showQuantity ? renderQuantity() : (
            showProducts ? renderProducts() : ("")
            )
        }

      </div>
    </div>
  );

}