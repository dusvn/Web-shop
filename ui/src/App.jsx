import React, {useState, useEffect} from "react";
import {API_BASE_URL} from "./index";

function App() {
  const [proizvodi, setProizvodi] = useState([]);
  useEffect(() => {
    fetchProizvodi();
  }, []);

  const fetchProizvodi = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/proizvodi`);
      const data = await response.json();
      setProizvodi(Object.values(data));
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  return (
    <div>
      <div>
        <h2>List of Proizvodi</h2>
      </div>
    </div>
  );
}

export default App;
