import { createContext, useContext, useState } from "react";

const cartContext = createContext()

export const CartContextAPI = ({ children }) => {
    const [cartItems, setCartItems] = useState([])
    return (
        <cartContext.Provider value={{ cartItems, setCartItems }}>
            {children}
        </cartContext.Provider>
    )
}

export const useCart = () => {
    return useContext(cartContext)
}
