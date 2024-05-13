import React from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Navbar from "./components/Navbar"
import Home from "./components/Home"
import Contact from "./components/Contact"
import Products from "./components/Products"
import Cart from "./components/Cart"
import Login from "./components/auth/Login"
import Signup from "./components/auth/Signup"
import Footer from './components/Footer'
import SingleProduct from './components/SingleProduct'

function App() {
  return (
    <>
      <BrowserRouter>
        <Navbar></Navbar>
        <Routes>
          <Route path="/" element={<Home></Home>} />
          <Route path="/products" element={<Products />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/products/:id" element={<SingleProduct />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  )
}

export default App