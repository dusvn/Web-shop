import React, {useState, useEffect} from "react";
import {API_BASE_URL} from "./index";
import Login  from "./components/Login";
import Register from "./components/Register";
import MainPage from "./components/MainPage";
import Product from "./components/Product";
import VerifyUsers from "./components/Verify";
import HistoryPurchases from "./components/HistoryPurchases";
import LivePurchases from "./components/LivePurchases";

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
                    <Route path="/MainPage" element={<MainPage/>} />
                    <Route path="/newProduct" element={<Product/>} />
                    <Route path="/verifyUsers" element = {<VerifyUsers/>} />
                    <Route path="/HistoryPurchases" element = {<HistoryPurchases/>} />
                    <Route path="/LivePurchases" element = {<LivePurchases/>} /> 
                </Routes>
            </Router>
        </>
      );
}

export default App;