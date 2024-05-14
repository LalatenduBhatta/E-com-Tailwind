import React from 'react'
import { Link } from 'react-router-dom'
import { useCart } from '../context/cartContext'

function Navbar() {
    const { cartItems } = useCart()
    return (
        <>
            <nav class="bg-white border-gray-200 dark:bg-gray-900 sticky top-0 z-10">
                <div class="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-2">
                    <a href="" class="flex items-center space-x-3 rtl:space-x-reverse">
                        <img src="/logo.webp" class="h-12 rounded-full" alt="Logo" />
                        <span class="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">E-Com</span>
                    </a>
                    <button data-collapse-toggle="navbar-default" type="button" class="inline-flex items-center p-2 w-10 h-10 justify-center 
                    text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200
                     dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600 -order-1" aria-controls="navbar-default" aria-expanded="false">
                        <span class="sr-only">Open main menu</span>
                        <svg class="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 1h15M1 7h15M1 13h15" />
                        </svg>
                    </button>
                    <div class="hidden w-full md:block md:w-auto" id="navbar-default">
                        <ul class="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg
                         bg-gray-50 md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0
                          md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
                            <li>
                                <Link to="/" class="block py-2 px-3 text-gray-900 rounded
                                 hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 
                                 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700
                                  dark:hover:text-white md:dark:hover:bg-transparent" >Home</Link>
                            </li>
                            <li>
                                <Link to="/products" class="block py-2 px-3 text-gray-900 rounded
                                 hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 
                                 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700
                                  dark:hover:text-white md:dark:hover:bg-transparent">Products</Link>
                            </li>
                            <li>
                                <Link to="/contact" class="block py-2 px-3 text-gray-900 rounded
                                 hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 
                                 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 
                                 dark:hover:text-white md:dark:hover:bg-transparent">Contact</Link>
                            </li>
                            <li>
                                <Link to="/cart" class="block py-2 px-3 text-gray-900 rounded
                                 hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 
                                 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 
                                 dark:hover:text-white md:dark:hover:bg-transparent relative">Cart
                                    <div class="absolute inline-flex items-center justify-center w-6 h-6 text-xs font-bold text-white bg-red-500 border-2
                                     border-white rounded-full -top-2 -end-6 dark:border-gray-900">{cartItems.length}</div>
                                </Link>
                            </li>
                        </ul>
                    </div>
                    <div className="login">
                        <Link to="/login">
                            <button class="block text-gray-900 rounded bg-blue-500 py-2 px-6
                                 hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700
                                dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-300">
                                LOGIN</button>
                        </Link>
                    </div>
                </div>
            </nav>

        </>
    )
}

export default Navbar