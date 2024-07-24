import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import SignupPage from "./components/SignupPage";
import LoginPage from "./components/LoginPage";
import { UserContextProvider } from './components/userContext';
import Header from "./components/Header";
import WeatherData from "./components/WeatherData";
import SettingsPage from "./components/SettingsPage";

function App() {
  return (
    <UserContextProvider>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<WeatherData />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/settingsPage" element={<SettingsPage />} />
        </Routes>
        <ToastContainer />
      </Router>
    </UserContextProvider>
  );
}

export default App;
