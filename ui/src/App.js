import React, {useState, useEffect} from "react";
import {API_BASE_URL} from "./index";
import Login  from "./components/Login";
import Register from "./components/Register";

import {
    BrowserRouter as Router,
    Routes,
    Route,
    Navigate,
} from "react-router-dom";


function App() {
    return (
        <>
            <Router>
                <Routes>
                    <Route exact path="/" element={<Login />} />
                    <Route path="/Register" element={<Register/>} />
                    
                </Routes>
            </Router>
        </>
      );
}

export default App;

