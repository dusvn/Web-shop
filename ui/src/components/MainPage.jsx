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
<<<<<<< HEAD
=======
  const [isCardAdded, setIsCardAdded] = useState(false);
>>>>>>> origin/Kumova-slama

  const [izValute, setIzValute] = useState('USD');
  const [uValutu, setUValutu] = useState('EUR');
  const [iznos, setIznos] = useState(0);
  const [kurs, setKurs] = useState(null);
  const [konvertovaniIznos, setKonvertovaniIznos] = useState(null);
  const [dostupneValute, setDostupneValute] = useState([]);
  const [sveValute, setSveValute] = useState([]);
  const [konverzijaError, setKonverzijaError] = useState('');
  const [userData, setUserData] = useState({});

  useEffect(() => {
    const fetchExchangeRate = async () => {
      try {
      const { name: userName } = userData;

      const currencyPairs = Object.entries(userData.bill)
        .map(([currency, { value }]) => ({ currency, value }));
      setCurrencyPairs(currencyPairs);


      //setIzValute(currencyPairs.keys()[0]) ovo da probam kad budemo imali normalnog korisnika
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
      setUserData(userData);
      console.log(userData);

<<<<<<< HEAD
      const { name: userName, is_admin: isUserAdmin, is_verified: isUserVerified } = userData;
=======
      const { name: userName, is_admin: isUserAdmin, is_verified: isUserVerified, is_card_added: isCardAdded } = userData;
>>>>>>> origin/Kumova-slama

      if(userData.bill !== null){
        const currencyPairs = Object.entries(userData.bill)
            .map(([currency, { value }]) => ({ currency, value }));
            setCurrencyPairs(currencyPairs);
      }

      console.log(currencyPairs);
      setUserName(userName);
      setIsUserAdmin(isUserAdmin);
      setIsUserVerified(isUserVerified);
<<<<<<< HEAD
<<<<<<< HEAD
=======
      setIsCardAdded(isCardAdded);
>>>>>>> origin/Kumova-slama
=======


>>>>>>> 981913f204fe979cd0138b473eb793f45e2ee976
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
        setKonverzijaError('Maximum ammount for chosen currency exceeded');
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

<<<<<<< HEAD
=======
  const [formData, setFormData] = useState({
    cardNumber: '',
    expirationDate: '',
    ccv: '',
  });

  const [validationStatus, setValidationStatus] = useState({
    cardNumber: false,
    expirationDate: false,
    ccv: false,
  });

  // Update the handleInputChange function
  const handleInputChange = (field, value) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      [field]: value,
    }));
  };

  // Implement validation functions
  const validateCardNumber = () => {
    return /^\d{4} \d{4} \d{4} \d{4}$/.test(formData.cardNumber);
  };

  const validateExpirationDate = () => {
    return /^(0[1-9]|1[0-2])\/\d{2}$/.test(formData.expirationDate);
  };

  const validateCCV = () => {
    return /^\d{3}$/.test(formData.ccv);
  };

  const validateForm = () => {
    return (
      validateCardNumber() &&
      validateExpirationDate() &&
      validateCCV()
    );
  };

  const handleBillingInfoSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      console.log('Form submitted successfully:', formData);
      const creditCardData = {
        card_number: formData.cardNumber,
        expiration_date: formData.expirationDate,
        ccv: formData.ccv,
      };

    const authToken = localStorage.getItem('jwtToken');
    try {
      console.warn(creditCardData);
      const response = await fetch(`${API_BASE_URL}/addNewCreditCard`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${authToken}`,
          'Content-Type': 'application/json;charset=UTF-8',
        },
        body: JSON.stringify(creditCardData),
      });

      console.warn(response);

      if (response.status === 200) {
        const data = await response.json();

        navigate("/MainPage");
      } else {
        console.error("Credit card can't be added!");
      }
    } catch (error) {
      console.warn(error);
      console.error('Error during add new credit card.', error);
    }
      } else {
        console.log('Form submission failed. Please check the input values.');
      }
  };

>>>>>>> origin/Kumova-slama

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



      <div className="flex">
      <div className="my-2 p-4 bg-gray-800 rounded-lg mr-4">
        <h2 className="text-2xl mb-4 text-teal-500">Balance</h2>
<<<<<<< HEAD
        {!isUserVerified && (
            <>
              <button className="bg-teal-500 text-white px-4 py-2 rounded mb-4 w-full">Add billing info</button>
              <br />
              <br />
            </>
=======
        {!isCardAdded && (
          <div className="mb-4 w-full">
            <h3 className="text-lg font-semibold text-teal-500 mb-2">Add Billing Info</h3>
            <form onSubmit={handleBillingInfoSubmit}>
              <div className="flex flex-col mb-4">
                <label className="text-white mb-2" htmlFor="cardNumber">Card Number:</label>
                <input
                  type="text"
                  id="cardNumber"
                  name="cardNumber"
                  placeholder="Enter card number"
                  className={`bg-gray-700 text-white p-2 rounded ${validateCardNumber() ? 'border-green-500' : 'border-red-500'}`}
                  onChange={(e) => handleInputChange('cardNumber', e.target.value)}
                />
                <p className={`text-sm mt-1 ${validateCardNumber() ? 'hidden' : 'text-red-500'}`}>
                  Enter a valid card number
                </p>
              </div>
              <div className="flex flex-row mb-4">
                <div className="flex flex-col mr-4">
                  <label className="text-white mb-2" htmlFor="expirationDate">Expiration Date:</label>
                  <input
                    type="text"
                    id="expirationDate"
                    name="expirationDate"
                    placeholder="MM/YY"
                    className={`bg-gray-700 text-white p-2 rounded ${validateExpirationDate() ? 'border-green-500' : 'border-red-500'}`}
                    onChange={(e) => handleInputChange('expirationDate', e.target.value)}
                  />
                  <p className={`text-sm mt-1 ${validateExpirationDate() ? 'hidden' : 'text-red-500'}`}>
                    Enter a valid exp. date
                  </p>
                </div>
                <div className="flex flex-col">
                  <label className="text-white mb-2" htmlFor="ccv">CCV:</label>
                  <input
                    type="text"
                    id="ccv"
                    name="ccv"
                    placeholder="Enter CCV"
                    className={`bg-gray-700 text-white p-2 rounded ${validateCCV() ? 'border-green-500' : 'border-red-500'}`}
                    onChange={(e) => handleInputChange('ccv', e.target.value)}
                  />
                  <p className={`text-sm mt-1 ${validateCCV() ? 'hidden' : 'text-red-500'}`}>
                    Enter a valid CCV
                  </p>
                </div>
              </div>
              <button
                type="submit"
                className="bg-teal-500 text-white px-4 py-2 rounded"
                disabled={!validateForm()}
              >
                Submit
              </button>
            </form>
          </div>
>>>>>>> origin/Kumova-slama
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
<<<<<<< HEAD
        {(currencyPairs.length === 0) && isUserVerified && (
=======
        {(currencyPairs.length === 0) && isCardAdded && (
>>>>>>> origin/Kumova-slama
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
          {konverzijaError && <p className="text-red-500 text-sm">{konverzijaError}</p>}
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