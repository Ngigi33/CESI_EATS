
import { createContext, useEffect, useState } from "react";
import { articleService } from "../services/apiService";
import axios from "axios";
axios.defaults.baseURL = "/"

export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {

    const url_order = 'http://localhost:5009/api';

    //const auth_url = "http://localhost:5000/api/auth" //user management url from docker

    // const url_order = `5009/api/orders`;
    const auth_url = "/api/auth";


    const [token, setToken] = useState("");

    // 1. Initialize cartItems by reading from Local Storage
    const [cartItems, setCartItems] = useState(() => {
        try {
            const storedCart = localStorage.getItem('cartItems');
            return storedCart ? JSON.parse(storedCart) : {};
        } catch (error) {
            console.error("Failed to parse cartItems from localStorage", error);
            return {}; // Retourne un objet vide en cas d'erreur de parsing
        }
    });

    const [food_list, setFoodList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);



    //2. Save cartItems to Local Storage whenever it changes
    useEffect(() => {
        try {
            localStorage.setItem('cartItems', JSON.stringify(cartItems));
        } catch (error) {
            console.error("Failed to save cartItems to localStorage", error);
        }
    }, [cartItems]); // This useEffect runs every time cartItems change



    useEffect(() => {
        async function loadData() {
            if (localStorage.getItem("token")) {
                setToken(localStorage.getItem("token"));
                await loadCartData(localStorage.getItem("token"));
            }
        }
        loadData();
    }, [])

    useEffect(() => {
        if (localStorage.getItem("token")) {
            setToken(localStorage.getItem("token"))
            console.log("token");
        }
    }, [])



    const addToCart = async (itemId) => {
        if (!cartItems[itemId]) {
            setCartItems((prev) => ({ ...prev, [itemId]: 1 }));
        } else {
            setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }));
        }
        if (token) {
            await axios.post('/api/cart/add', { itemId }, { headers: { Authorization: `Bearer ${token}` } });
        }
    };

    const removeFromCart = async (itemId) => {
        setCartItems((prev) => {
            const newCart = { ...prev, [itemId]: prev[itemId] - 1 };
            if (newCart[itemId] <= 0) {
                delete newCart[itemId]; // Deletes the item if the quantity is 0 or less
            }

            return newCart;
        });
        if (token) {
            await axios.post('/api/cart/remove', { itemId }, { headers: { Authorization: `Bearer ${token}` } });
        }
    };

    const loadCartData = async (token) => {
        const response = await axios.post('api/cart/get', {}, { headers: { Authorization: `Bearer ${token}` } });
        setCartItems(response.data.cartData);
    }

    const getTotalCartAmount = () => {
        let totalAmount = 0;
        for (const item in cartItems) {
            if (cartItems[item] > 0) {
                let itemInfo = food_list.find((product) => product._id === item);
                if (itemInfo) {
                    totalAmount += itemInfo.price * cartItems[item];
                }
            }
        }
        return totalAmount;
    };

    const clearCart = async () => {
        setCartItems({})
        localStorage.removeItem('cartItems')
    }


    const getUniqueCategories = () => {
        const categories = [...new Set(food_list.map(food => food.category))];
        return categories.filter(category => category);
    };

    const fetchFoodList = async () => {
        try {
            setLoading(true);
            setError(null);
            const response = await articleService.getAllArticles();
            if (response.success && Array.isArray(response.data)) {
                const transformedData = response.data.map(item => {
                    // If the image is already a full URL, use it as is.
                    // Otherwise, construct the full URL.
                    const backendUrl = 'http://localhost:5007';
                    // Extract number from image filename (e.g., food_22.png → 22)
                    const imageMatch = item.image?.match(/food_(\d+)\.png/);
                    const imageNumber = imageMatch ? imageMatch[1] : '1'; // Default to '1' if no match

                    // Construct image URL using the matched number
                    const imageUrl = `/images/food/food_${imageNumber}.png`;
                    return {
                        _id: item._id,
                        name: item.name,
                        description: item.description,
                        price: item.price,
                        image: imageUrl,
                        category: item.category || item.type,
                        type: item.type || item.category, // pour compatibilité si 'type' ou 'category' est utilisé
                        restaurantName: item.restaurantName || 'Restaurant inconnu',
                        restaurantId: item.restaurantId,
                        isAvailable: item.isAvailable !== false
                    };
                });
                console.log('Transformed data:', transformedData);
                setFoodList(transformedData);

            } else {
                console.error('Invalid response format:', response);
                setError('Format de réponse invalide');
            }
        } catch (error) {
            console.error('Error fetching food list:', error);
            setError('Erreur lors du chargement des articles');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchFoodList();
    }, []); // Le tableau de dépendances vide signifie que cela s'exécute une seule fois au montage

    const contextValue = {
        food_list,
        cartItems,
        setCartItems,
        addToCart,
        removeFromCart,
        getTotalCartAmount,
        getUniqueCategories,
        loadCartData,
        loading,
        error,
        refreshFoodList: fetchFoodList,
        //for user management
        auth_url,
        url_order,
        token,
        setToken,
        clearCart
    };

    return (
        <StoreContext.Provider value={contextValue}>
            {props.children}
        </StoreContext.Provider>
    );
};

export default StoreContextProvider;