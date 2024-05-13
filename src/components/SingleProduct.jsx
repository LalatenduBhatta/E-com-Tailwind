import React from 'react'
import { useParams } from "react-router-dom"
import { useProducts } from '../context/productContext';
function SingleProduct() {
    let { id } = useParams()
    const products = useProducts()
    const product = products.find(ele => ele.id == id)
    console.log(product);
    return (
        <>
            <div className="bg-slate-700 dark:text-white">
                <h1 className=' text-4xl font-bold ms-28'>{product.title}</h1>
                <div className="flex flex-wrap gap-4 justify-center">
                    {product?.images?.map(e => {
                        return <img src={e} alt={product.title}
                            className='img-fluid h-[400px] w-[200px]'
                        ></img>
                    })}
                </div>
            </div>
        </>
    )
}

export default SingleProduct