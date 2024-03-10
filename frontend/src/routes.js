import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Landing from './components/landing';
import Calculator from './components/calculator';
import Orders from './components/orders';
import Compare from './components/compare';

// Import other components for different routes if needed

const RoutesComponent = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing/>} />
        <Route path="/calculator" element={<Calculator/>} />
        <Route path="/orders" element={<Orders/>} />
        <Route path="/compare" element={<Compare/>} />
      </Routes>
      </Router> 
  );
};

export default RoutesComponent;