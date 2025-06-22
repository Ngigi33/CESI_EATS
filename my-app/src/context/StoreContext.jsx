import { createContext, useEffect, useState } from "react";
import { food_list } from "../assets/assets";
import axios from "axios";

export const StoreContext = createContext(null)

const url="http://localhost:3001";

const StoreContextProvider = (props) => {

    const [cartItems, setCartItems] = useState({});

    const addToCart = async (itemId) => {
        if (!cartItems[itemId]) {
            setCartItems((prev) => ({ ...prev, [itemId]: 1 }))
        }
        else {
            setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }))
        }

        await axios.post("http://localhost:3001/api/cart/add", { userId: "68552d7f2952a3f94ea408c7", itemId })
    }

    const removeFromCart = async (itemId) => {
        setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }))
        await axios.post("http://localhost:3001/api/cart/remove", { userId: "68552d7f2952a3f94ea408c7", itemId })
    }

    useEffect(() => {
        async function loadData() {
           await loadCartData();
        }
        loadData();
        // console.log(cartItems);
    }, [])

    const getTotalCartAmount = () => {
        let totalAmount = 0;
        for (const item in cartItems) {
            if (cartItems[item] > 0) {
                let itemInfo = food_list.find((product) => product._id === item);
                totalAmount += itemInfo.price * cartItems[item];
            }
        }
        return totalAmount
    }
    const loadCartData = async () => {
        const response = await axios.post("http://localhost:3001/api/cart/get",{ userId:"68552d7f2952a3f94ea408c7"});
        setCartItems(response.data.cartData);
    }

    const contextValue = {
        food_list,
        cartItems,
        setCartItems,
        addToCart,
        removeFromCart,
        getTotalCartAmount,
        loadCartData,
    }

    return (
        <StoreContext.Provider value={contextValue}>
            {props.children}
        </StoreContext.Provider>
    )
}

export default StoreContextProvider;