import React from 'react'
import { useProducts } from '../context/productContext';
import { Link } from 'react-router-dom';
import { useCart } from '../context/cartContext';
function Products() {
    const products = useProducts()
    const { cartItems, setCartItems } = useCart()

    const handelCart = (item) => {
        const isAvailable = cartItems.find(product => product.id == item.id)
        if (isAvailable) {
            const updatedCart = cartItems?.map(product => {
                if (product.id == item.id) {
                    product.count = product.count + 1
                }
                return product
            })
            setCartItems(updatedCart)
        }
        else {
            setCartItems((prev) => [...prev, { ...item, count: 1 }])
        }
    }
    return (
        <>
            <div className="bg-slate-100 flex gap-2 w-full dark:bg-slate-600">
                <div className="bg-slate-200 w-4/12 sticky top-16 max-h-screen
                 dark:bg-slate-800 dark:text-white">

                </div>
                <div className=" bg-gray-600 gap-2 grid grid-cols-1 md:grid-cols-2 
            lg:grid-cols-3 xl:grid-cols-4 justify-items-center sm:justify-items-stretch py-2 flex-grow-1">
                    {products.map(product => {
                        return (
                            <div class=" bg-white border border-gray-200 
                        rounded-lg shadow dark:bg-gray-800 dark:border-gray-700" key={product.id}>
                                <Link to={`/products/${product.id}`}>
                                    <img class="p-8 rounded-t-lg h-[250px] w-[250px]" src={product.images[0]}
                                        alt="product image" />
                                </Link>
                                <div class="px-5 pb-5">
                                    <Link to={`/products/${product.id}`}>
                                        <h5 class="text-xl font-semibold tracking-tight text-gray-900 dark:text-white">
                                            {product.title}
                                        </h5>
                                    </Link>
                                    <div class="flex items-center justify-between">
                                        <span class="text-3xl font-bold text-gray-900 dark:text-white">
                                            {product.price}$</span>
                                        <button class="text-white bg-blue-700 hover:bg-blue-800 
                                    focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg
                                     text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 
                                     dark:focus:ring-blue-800"
                                            onClick={() => handelCart(product)}
                                        >Add to cart</button>
                                    </div>
                                </div>
                            </div>
                        )
                    })}
                </div >
            </div>
        </>
    )
}

export default Products