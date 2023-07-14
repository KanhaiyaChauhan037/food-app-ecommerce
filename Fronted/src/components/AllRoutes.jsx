import React from 'react'
import { Routes, Route } from "react-router-dom";
import Homepage from './Homepage';
import Singlepage from './Singlepage';
import OrderSummary from './OrderSummary';
import Cartpage from './Cartpage';
const AllRoutes = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/order" element={<OrderSummary />} />
        <Route path="/view/:_id" element={<Singlepage />} />
        <Route path="/cart" element={<Cartpage />} />
      </Routes>
    </div>
  );
}

export default AllRoutes