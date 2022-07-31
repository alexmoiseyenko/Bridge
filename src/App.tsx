import React from 'react';
import { Route, Routes } from 'react-router-dom';

import './App.css';
import Navbar from './components/Navbar/Navbar';
import Login from './components/Login/Login';
import HomePage from './components/HomePage/HomePage';

const App = (): JSX.Element => (
  <div className="App">
    <Routes>
      <Route path="/" element={<Navbar />}>
        <Route index element={<HomePage />} />
        <Route path="login" element={<Login />} />
        <Route path="*" element={<Login />} />
      </Route>
    </Routes>
  </div>
);

export default App;
