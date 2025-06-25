
import { createContext, useEffect, useState } from "react";
import { articleService } from "../services/apiService";

export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {

    //for user management service

    const url = "http://localhost:5000/api/auth" //backend url from docker
    const [token, setToken] = useState({})

    // 1. Initialiser cartItems en lisant depuis Local Storage
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

    // 2. Sauvegarder cartItems dans Local Storage chaque fois qu'il change
    useEffect(() => {
        try {
            localStorage.setItem('cartItems', JSON.stringify(cartItems));
        } catch (error) {
            console.error("Failed to save cartItems to localStorage", error);
        }
    }, [cartItems]); // Ce useEffect s'exécute chaque fois que cartItems change

    const addToCart = (itemId) => {
        if (!cartItems[itemId]) {
            setCartItems((prev) => ({ ...prev, [itemId]: 1 }));
        } else {
            setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }));
        }
    };

    const removeFromCart = (itemId) => {
        // S'assurer que la quantité ne descend pas en dessous de zéro
        setCartItems((prev) => {
            const newCart = { ...prev, [itemId]: prev[itemId] - 1 };
            if (newCart[itemId] <= 0) {
                delete newCart[itemId]; // Supprime l'article si la quantité est 0 ou moins
            }
            return newCart;
        });
    };

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

    //get token from localStorage
    useEffect(()=>{
        if(localStorage.getItem("token")){
            setToken(localStorage.getItem("token"))
        }
    }, [])

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
                    // Si l'image est déjà une URL complète, l'utiliser telle quelle
                    // Sinon, construire l'URL complète
                    const imageUrl = item.image.startsWith('http')
                        ? item.image
                        : `http://localhost:${process.env.PORT || 4005}/images/food/${item.image}`;

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
        loading,
        error,
        refreshFoodList: fetchFoodList,
        //for user management
        url,
        token,
        setToken
    };

    return (
        <StoreContext.Provider value={contextValue}>
            {props.children}
        </StoreContext.Provider>
    );
};

export default StoreContextProvider;