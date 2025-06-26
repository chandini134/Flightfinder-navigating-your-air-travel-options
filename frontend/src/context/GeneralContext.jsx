import React, { createContext, useState } from 'react';
import axios from 'axios';

export const GeneralContext = createContext();

const GeneralContextProvider = ({ children }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [userType, setUsertype] = useState('');
  const [username, setUsername] = useState('');
  const [ticketBookingDate, setTicketBookingDate] = useState(''); // Added for journey date

  const login = async () => {
    try {
      const response = await fetch('http://localhost:6002/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem('userId', data._id);
        localStorage.setItem('userType', data.usertype);
        localStorage.setItem('username', data.username);
        window.location.href =
          data.usertype === 'admin'
            ? '/admin'
            : data.usertype === 'flight-operator'
            ? '/flight-admin'
            : '/';
      } else {
        alert(data.message || 'Login failed');
      }
    } catch (err) {
      console.error('Login Error:', err);
      alert('Server Error');
    }
  };

  const register = async () => {
    try {
      const res = await axios.post('http://localhost:6002/register', {
        username,
        email,
        password,
        usertype: userType,
      });

      if (res.status === 201) {
        alert('Registration successful. Please login.');
        window.location.href = '/auth';
      }
    } catch (err) {
      console.error('Registration failed:', err);
      alert(err.response?.data?.message || 'Registration error');
    }
  };

  const logout = () => {
    localStorage.clear();
    window.location.href = '/';
  };

  return (
    <GeneralContext.Provider
      value={{
        email,
        setEmail,
        password,
        setPassword,
        userType,
        setUsertype,
        username,
        setUsername,
        login,
        register,
        logout,
        ticketBookingDate,
        setTicketBookingDate, // expose this function
      }}
    >
      {children}
    </GeneralContext.Provider>
  );
};

export default GeneralContextProvider;
