import React, { useEffect, useState, useRef } from 'react';
import { useProducts } from '../context/productContext';
import { Link } from 'react-router-dom';
import { useCart } from '../context/cartContext';

function Products() {
    const products = useProducts();
    const { cartItems, setCartItems } = useCart();
    const [filterProduct, setFilterProduct] = useState([]);
    const [category, setCategory] = useState([]);
    const [brand, setBrand] = useState([]);
    const [sort, setSort] = useState("");

    const categoryFilterRef = useRef([]);

    const categories = filterFunc("category");
    const brands = filterFunc("brand");

    function filterFunc(filterItem) {
        if (filterItem === "brand") {
            return categoryFilterRef.current.map(product => product[filterItem])?.reduce((acc, category) => {
                if (!acc.includes(category)) return [...acc, category];
                else return acc;
            }, []);
        }
        return products.map(product => product[filterItem])?.reduce((acc, category) => {
            if (!acc.includes(category)) return [...acc, category];
            else return acc;
        }, []);
    }

    const handleCart = (item) => {
        const isAvailable = cartItems.find(product => product.id === item.id);
        if (isAvailable) {
            const updatedCart = cartItems.map(product => {
                if (product.id === item.id) {
                    return { ...product, count: product.count + 1 };
                }
                return product;
            });
            setCartItems(updatedCart);
        } else {
            setCartItems(prev => [...prev, { ...item, count: 1 }]);
        }
    };

    const categoryHandle = (event) => {
        let checked = event.target.checked;
        let value = event.target.value;
        if (checked) {
            setCategory(prev => [...prev, value]);
        } else {
            setCategory(prev => prev.filter(ele => ele !== value));
        }
    };

    const brandHandle = (event) => {
        let checked = event.target.checked;
        let value = event.target.value;
        if (checked) {
            setBrand(prev => [...prev, value]);
        } else {
            setBrand(prev => prev.filter(ele => ele !== value));
        }
    };

    const handleSort = (event) => {
        let value = event.target.value;
        setSort(value);
    };

    useEffect(() => {
        setFilterProduct(products);
        categoryFilterRef.current = products;
    }, [products]);

    useEffect(() => {
        if (category.length > 0) {
            let updatedProducts = products.filter(ele => category.includes(ele.category));
            setFilterProduct(updatedProducts);
            categoryFilterRef.current = updatedProducts;
        } else {
            setFilterProduct(products);
        }
        if (brand.length > 0) {
            let updatedProducts = categoryFilterRef.current.filter(ele => brand.includes(ele.brand));
            setFilterProduct(updatedProducts);
        } else if (category.length > 0) {
            setFilterProduct(categoryFilterRef.current);
        }
    }, [category, brand]);

    useEffect(() => {
        if (sort) {
            setFilterProduct(prev => {
                const sortedProducts = [...prev];
                if (sort === "l-h") {
                    sortedProducts.sort((a, b) => a.price - b.price);
                } else if (sort === "h-l") {
                    sortedProducts.sort((a, b) => b.price - a.price);
                } else if (sort === "top-rate") {
                    sortedProducts.sort((a, b) => b.rating - a.rating);
                } else if (sort === "top-discount") {
                    sortedProducts.sort((a, b) => b.discountPercentage - a.discountPercentage);
                }
                return sortedProducts;
            });
        }
    }, [sort]);

    return (
        <>
            <div className="bg-slate-100 flex gap-2 w-full dark:bg-slate-600">
                <div className="bg-slate-200 min-w-[40%] sm:min-w-[35%] lg:min-w-[20%] sticky top-16 max-h-screen dark:bg-slate-800 dark:text-white py-4 flex flex-col justify-start items-center gap-10">
                    <div className='flex flex-col justify-start items-center gap-y-8 h-2/6'>
                        <div>
                            <h1 className='uppercase text-md sm:text-xl md:text-2xl lg:text-3xl italic text-center mb-2 dark:text-white'>Filters</h1>
                            <button id="dropdownBgHoverButton" data-dropdown-toggle="dropdownBgHover" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-2 py-1 md:px-4 md:py-2 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" type="button">Categories
                                <svg className="w-2.5 h-2.5 ms-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 4 4 4-4" />
                                </svg>
                            </button>
                        </div>
                        <div>
                            <button id="dropdownBgHoverButton1" data-dropdown-toggle="dropdownBgHover1" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-2 py-1 md:px-4 md:py-2 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" type="button">Brands
                                <svg className="w-2.5 h-2.5 ms-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 4 4 4-4" />
                                </svg>
                            </button>
                        </div>
                        <div id="dropdownBgHover" className="z-10 hidden w-32 text-xs md:w-48 md:text-sm bg-white rounded-lg shadow dark:bg-gray-700 max-h-40 overflow-y-scroll">
                            <ul className="p-3 space-y-1 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownBgHoverButton">
                                {categories.map(category => {
                                    return (
                                        <li key={category}>
                                            <div className="flex items-center p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-600">
                                                <input type="checkbox" value={category} className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-1 dark:bg-gray-600 dark:border-gray-500" onChange={(e) => categoryHandle(e)} />
                                                <label className="w-full ms-2 text-sm font-medium text-gray-900 rounded dark:text-gray-300">{category}</label>
                                            </div>
                                        </li>
                                    )
                                })}
                            </ul>
                        </div>
                        <div id="dropdownBgHover1" className="z-10 hidden w-32 text-xs md:w-48 md:text-sm bg-white rounded-lg shadow dark:bg-gray-700 max-h-40 overflow-y-scroll">
                            <ul className="p-3 space-y-1 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownBgHoverButton1">
                                {brands.map(brand => {
                                    return (
                                        <li key={brand}>
                                            <div className="flex items-center p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-600">
                                                <input type="checkbox" value={brand} className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-1 dark:bg-gray-600 dark:border-gray-500" onChange={brandHandle} />
                                                <label className="w-full ms-2 text-sm font-medium text-gray-900 rounded dark:text-gray-300">{brand}</label>
                                            </div>
                                        </li>
                                    )
                                })}
                            </ul>
                        </div>
                    </div>
                    <div>
                        <h1 className='uppercase text-md sm:text-xl md:text-2xl lg:text-3xl italic text-center mb-4 dark:text-white'>SORTS</h1>
                        <button id="dropdownRadioBgHoverButton" data-dropdown-toggle="dropdownRadioBgHover" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm  px-2 py-1 md:px-4 md:py-2 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" type="button">Sort <svg className="w-2.5 h-2.5 ms-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 4 4 4-4" />
                        </svg>
                        </button>
                        <div id="dropdownRadioBgHover" className="z-10 hidden w-32 text-xs md:w-48 md:text-sm bg-white divide-y divide-gray-100 rounded-lg shadow dark:bg-gray-700 dark:divide-gray-600">
                            <ul className="p-3 space-y-1 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownRadioBgHoverButton">
                                <li>
                                    <div className="flex items-center p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-600">
                                        <input id="default-radio-4" type="radio" value="l-h" name="sort" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500" onChange={handleSort} />
                                        <label htmlFor="default-radio-4" className="w-full ms-2 text-sm font-medium text-gray-900 rounded dark:text-gray-300">Price-Low to High</label>
                                    </div>
                                </li>
                                <li>
                                    <div className="flex items-center p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-600">
                                        <input id="default-radio-4" type="radio" value="h-l" name="sort" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500" onChange={handleSort} />
                                        <label htmlFor="default-radio-4" className="w-full ms-2 text-sm font-medium text-gray-900 rounded dark:text-gray-300">Price-High to Low</label>
                                    </div>
                                </li>
                                <li>
                                    <div className="flex items-center p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-600">
                                        <input id="default-radio-4" type="radio" value="top-rate" name="sort" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500" onChange={handleSort} />
                                        <label htmlFor="default-radio-4" className="w-full ms-2 text-sm font-medium text-gray-900 rounded dark:text-gray-300"> Top Rating</label>
                                    </div>
                                </li>
                                <li>
                                    <div className="flex items-center p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-600">
                                        <input id="default-radio-4" type="radio" value="top-discount" name="sort" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500" onChange={handleSort} />
                                        <label htmlFor="default-radio-4" className="w-full ms-2 text-sm font-medium text-gray-900 rounded dark:text-gray-300">Top Discounts</label>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div className=" bg-gray-600 gap-2 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 justify-items-center md:justify-items-stretch py-2 flex-grow-1">
                    {filterProduct.map(product => {
                        return (
                            <div className=" bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700" key={product.id}>
                                <Link to={`/products/${product.id}`}>
                                    <img className="p-8 rounded-t-lg h-[250px] w-[250px]" src={product.images[0]} alt="product image" />
                                </Link>
                                <div className="px-5 pb-5">
                                    <Link to={`/products/${product.id}`}>
                                        <h5 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white">
                                            {product.title}
                                        </h5>
                                    </Link>
                                    <div className="flex items-center justify-between">
                                        <span className="text-xl md:text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white">
                                            {product.price}$
                                        </span>
                                        <button className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" onClick={() => handleCart(product)}>Add to cart</button>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </>
    );
}

export default Products;
