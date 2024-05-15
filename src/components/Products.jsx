import React from 'react'
import { useProducts } from '../context/productContext';
import { Link } from 'react-router-dom';
import { useCart } from '../context/cartContext';
function Products() {
    const products = useProducts()
    const { cartItems, setCartItems } = useCart()

    const categories = filterFunc("category")
    const brands = filterFunc("brand")

    function filterFunc(filterItem) {
        return products.map(product => product[filterItem])?.reduce((acc, category) => {
            if (!acc.includes(category)) return [...acc, category]
            else return acc
        }, [])
    }

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
                <div className="bg-slate-200 min-w-[40%] sm:min-w-[35%] lg:min-w-[20%] sticky top-16 max-h-screen
                 dark:bg-slate-800 dark:text-white py-4 flex flex-col justify-start items-center gap-10">
                    <div className='flex flex-col justify-start items-center gap-y-8 h-2/6'>
                        <div>
                            <h1 className='uppercase text-md sm:text-xl md:text-2xl lg:text-3xl italic text-center mb-2 dark:text-white'>Filters</h1>
                            <button id="dropdownBgHoverButton" data-dropdown-toggle="dropdownBgHover" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 
                    focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-2 py-1 md:px-4 md:py-2 text-center inline-flex items-center dark:bg-blue-600 
                    dark:hover:bg-blue-700 dark:focus:ring-blue-800" type="button">Categories
                                <svg class="w-2.5 h-2.5 ms-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 4 4 4-4" />
                                </svg>
                            </button>
                        </div>
                        <div>
                            <button id="dropdownBgHoverButton1" data-dropdown-toggle="dropdownBgHover1" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 
                    focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-2 py-1 md:px-4 md:py-2 text-center inline-flex items-center dark:bg-blue-600 
                    dark:hover:bg-blue-700 dark:focus:ring-blue-800" type="button">Brands
                                <svg class="w-2.5 h-2.5 ms-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 4 4 4-4" />
                                </svg>
                            </button>
                        </div>
                        <div id="dropdownBgHover" class="z-10 hidden w-32 text-xs md:w-48 md:text-sm bg-white rounded-lg shadow dark:bg-gray-700 max-h-40 overflow-y-scroll">
                            <ul class="p-3 space-y-1 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownBgHoverButton">
                                {categories.map(category => {
                                    return (
                                        <li key={category}>
                                            <div class="flex items-center p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-600">
                                                <input type="checkbox" value={category} class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded 
                                    focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-1
                                     dark:bg-gray-600 dark:border-gray-500" />
                                                <label class="w-full ms-2 text-sm font-medium text-gray-900 rounded dark:text-gray-300">{category}</label>
                                            </div>
                                        </li>
                                    )
                                })}
                            </ul>
                        </div>
                        <div id="dropdownBgHover1" class="z-10 hidden w-32 text-xs md:w-48 md:text-sm bg-white rounded-lg shadow dark:bg-gray-700 max-h-40 overflow-y-scroll">
                            <ul class="p-3 space-y-1 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownBgHoverButton1">
                                {brands.map(brand => {
                                    return (
                                        <li key={brand}>
                                            <div class="flex items-center p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-600">
                                                <input type="checkbox" value={brand} class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded 
                                    focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-1
                                     dark:bg-gray-600 dark:border-gray-500" />
                                                <label class="w-full ms-2 text-sm font-medium text-gray-900 rounded dark:text-gray-300">{brand}</label>
                                            </div>
                                        </li>
                                    )
                                })}
                            </ul>
                        </div>
                    </div>
                    <div>
                        <h1 className='uppercase text-md sm:text-xl md:text-2xl lg:text-3xl italic text-center mb-4 dark:text-white'>SORTS</h1>
                        <button id="dropdownRadioBgHoverButton" data-dropdown-toggle="dropdownRadioBgHover" class="text-white bg-blue-700 hover:bg-blue-800 
                        focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm  px-2 py-1 md:px-4 md:py-2 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700
                         dark:focus:ring-blue-800" type="button">Sort <svg class="w-2.5 h-2.5 ms-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 4 4 4-4" />
                            </svg>
                        </button>
                        <div id="dropdownRadioBgHover" class="z-10 hidden w-32 text-xs md:w-48 md:text-sm bg-white divide-y divide-gray-100 rounded-lg shadow dark:bg-gray-700 dark:divide-gray-600">
                            <ul class="p-3 space-y-1 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownRadioBgHoverButton">
                                <li>
                                    <div class="flex items-center p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-600">
                                        <input id="default-radio-4" type="radio" value="" name="default-radio" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300
                                         focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"/>
                                        <label for="default-radio-4" class="w-full ms-2 text-sm font-medium text-gray-900 rounded dark:text-gray-300">Price-Low to High</label>
                                    </div>
                                </li>
                                <li>
                                    <div class="flex items-center p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-600">
                                        <input id="default-radio-4" type="radio" value="" name="default-radio" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300
                                         focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"/>
                                        <label for="default-radio-4" class="w-full ms-2 text-sm font-medium text-gray-900 rounded dark:text-gray-300">Price-High to Low</label>
                                    </div>
                                </li>
                                <li>
                                    <div class="flex items-center p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-600">
                                        <input id="default-radio-4" type="radio" value="" name="default-radio" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300
                                         focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"/>
                                        <label for="default-radio-4" class="w-full ms-2 text-sm font-medium text-gray-900 rounded dark:text-gray-300"> Top Rating</label>
                                    </div>
                                </li>
                                <li>
                                    <div class="flex items-center p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-600">
                                        <input id="default-radio-4" type="radio" value="" name="default-radio" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300
                                         focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"/>
                                        <label for="default-radio-4" class="w-full ms-2 text-sm font-medium text-gray-900 rounded dark:text-gray-300">Top Discounts</label>
                                    </div>
                                </li>
                            </ul>
                        </div>

                    </div>
                </div>
                <div className=" bg-gray-600 gap-2 grid grid-cols-1 md:grid-cols-2 
            lg:grid-cols-3 xl:grid-cols-4 justify-items-center md:justify-items-stretch py-2 flex-grow-1">
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
                                        <span class="text-xl md:text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white">
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