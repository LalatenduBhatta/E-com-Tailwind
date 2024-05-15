import React from 'react'
import { useCart } from '../context/cartContext'

function Cart() {
    const { cartItems, setCartItems } = useCart()
    const cartItemDecrement = (id) => {
        let updatedCart = cartItems.map(item => {
            if (item.id === id) {
                if (item.count >= 1) {
                    item.count = item.count - 1
                }
            }
            return item
        })
        setCartItems(updatedCart)
    }
    const cartItemIncrement = (id) => {
        let updatedCart = cartItems.map(item => {
            if (item.id === id) {
                if (item.count < item.stock) {
                    item.count = item.count + 1
                }
            }
            return item
        })
        setCartItems(updatedCart)
    }
    const removeCartItem = (id) => {
        let updatedCart = cartItems.filter(item => item.id !== id)
        setCartItems(updatedCart)
    }
    return (
        <>
            {cartItems.length <= 0 ?
                <h1 className=' text-5xl text-center font-bold my-5'>Cart is empty</h1> :
                <div>
                    <div class="relative overflow-x-auto shadow-md">
                        <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                            <thead class="text-xl text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                <tr>
                                    <th scope="col" class="px-16 py-3">
                                        <span class="sr-only">Image</span>
                                    </th>
                                    <th scope="col" class="px-6 py-3">
                                        Product
                                    </th>
                                    <th scope="col" class="px-6 py-3">
                                        Qty
                                    </th>
                                    <th scope="col" class="px-6 py-3">
                                        Price
                                    </th>
                                    <th scope="col" class="px-6 py-3">
                                        Action
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    cartItems.map(item => {
                                        return (
                                            <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600" key={item.id}>
                                                <td class="p-4">
                                                    <img src={item.images[0]} class="w-16 md:w-32 max-w-full max-h-full" alt="Apple Watch" />
                                                </td>
                                                <td class="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                                                    {item.title}
                                                </td>
                                                <td class="px-6 py-4">
                                                    <div class="flex items-center">
                                                        <button class="inline-flex items-center justify-center p-1 me-3 text-sm font-medium h-6 w-6 text-gray-500 bg-white border border-gray-300 rounded-full 
                                                    focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600
                                                     dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
                                                            type="button"
                                                            onClick={() => cartItemDecrement(item.id)}>
                                                            <span class="sr-only">- button</span>
                                                            <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 2">
                                                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 1h16" />
                                                            </svg>
                                                        </button>
                                                        <div>
                                                            <input type="number" id="first_product" class="bg-gray-50 w-14 border border-gray-300 text-gray-900 text-sm rounded-lg
                                                         focus:ring-blue-500 focus:border-blue-500 block px-2.5 py-1 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400
                                                          dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required value={item.count} />
                                                        </div>
                                                        <button class="inline-flex items-center justify-center h-6 w-6 p-1 ms-3 text-sm font-medium text-gray-500 bg-white border
                                                     border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 dark:bg-gray-800
                                                      dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
                                                            type="button"
                                                            onClick={() => cartItemIncrement(item.id)}>
                                                            <span class="sr-only">+ button</span>
                                                            <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
                                                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 1v16M1 9h16" />
                                                            </svg>
                                                        </button>
                                                    </div>
                                                </td>
                                                <td class="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                                                    ${item.price * item.count}
                                                </td>
                                                <td class="px-6 py-4">
                                                    <button class="font-medium text-red-600 dark:text-red-500 hover:underline"
                                                        onClick={() => removeCartItem(item.id)}
                                                    >Remove</button>
                                                </td>
                                            </tr>)
                                    })
                                }
                            </tbody>
                        </table>
                    </div>
                </div>
            }
        </>
    )
}

export default Cart