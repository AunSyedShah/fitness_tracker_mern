import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import Register from './pages/Register.jsx';
import Login from './pages/Login.jsx';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import AuthProvider from './context/AuthProvider.jsx';
import Dashboard from './components/Dashboard.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
        <BrowserRouter>
            <AuthProvider>
                <Routes>
                    <Route path="/" element={<App/>}/>
                    <Route path="/login" element={<Login/>}/>
                    <Route path="/register" element={<Register/>}/>
                    <Route path="/dashboard" element={<Dashboard/>}/>
                </Routes>
            </AuthProvider>
        </BrowserRouter>
);
