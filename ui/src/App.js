import React, {useState, useEffect} from "react";
import {API_BASE_URL} from "./index";
import Login  from "./components/Login";
import Register from "./components/Register";
import MainPage from "./components/MainPage";
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
                </Routes>
            </Router>
        </>
      );
}

export default App;

