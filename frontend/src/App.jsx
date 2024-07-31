import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from './context/AuthContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const App = () => {
    const { setIsLoggedIn } = useContext(AuthContext);
    const navigate = useNavigate();
    useEffect(
        () => {
            // get isLoggedIn from local storage
            const loggedIn = JSON.parse(localStorage.getItem("isLoggedIn"));
            if (loggedIn == true) {
                setIsLoggedIn(loggedIn);
                navigate('/dashboard');
            }
            else{
                navigate('/login');
            }
        }, []
    );


    return (
        <div className="container mx-auto p-4">
        <h1>App Component</h1>
        </div>
    );
};

export default App;
