import React from "react";
import Home from "../page/home";
import Login from "../page/login";
import Signup from "../page/signup";
import { Routes, Route } from "react-router-dom";
import BuyTicket from "../page/buy-ticket";
import Cart from "../page/cart";
import Dashboard from "../page/staff/dashboard";
import Habitat from "../page/staff/habitat";

function Router() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/sign-up" element={<Signup />} />
      <Route path="/buy-ticket" element={<BuyTicket />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="/staff/dashboard" element={<Dashboard />} />
      <Route path="/staff/habitat" element={<Habitat />} />
    </Routes>
  );
}

export default Router;
