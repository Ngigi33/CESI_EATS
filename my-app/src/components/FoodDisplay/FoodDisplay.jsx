import React, { useContext } from 'react'
import './FoodDisplay.css'
import { StoreContext } from '../../context/StoreContext'
import FoodItem from '../FoodItem/FoodItem'

const FoodDisplay = ({ category }) => {
    const { food_list, loading, error } = useContext(StoreContext);

    if (loading) {
        return (
            <div className='food-display' id='food-display'>
                <h2>Top dishes near you</h2>
                <div className="loading-message">
                    <p>Chargement des plats...</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className='food-display' id='food-display'>
                <h2>Top dishes near you</h2>
                <div className="error-message">
                    <p>Erreur lors du chargement des plats: {error}</p>
                    <button onClick={() => window.location.reload()}>
                        Réessayer
                    </button>
                </div>
            </div>
        );
    }

    const filteredFoods = food_list.filter((item) => {
        if (category === "All") return true;
        return category === item.category;
    });

    return (
        <div className='food-display' id='food-display'>
            <h2>Top dishes near you</h2>
            {filteredFoods.length === 0 ? (
                <div className="no-food-message">
                    <p>Aucun plat trouvé pour cette catégorie.</p>
                </div>
            ) : (
                <div className="food-display-list">
                    {filteredFoods.map((item) => {
                        return (
                            <FoodItem
                                key={item._id}
                                id={item._id}
                                name={item.name}
                                description={item.description}
                                price={item.price}
                                image={item.image}
                                restaurantName={item.restaurantName}
                                category={item.category}
                            />
                        );
                    })}
                </div>
            )}
        </div>
    );
};

export default FoodDisplay;