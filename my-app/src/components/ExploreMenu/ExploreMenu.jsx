import React, { useContext } from 'react'
import './ExploreMenu.css'
import { menu_list } from '../../assets/assets'
import { StoreContext } from '../../context/StoreContext'

const ExploreMenu = ({ category, setCategory }) => {
    const { getUniqueCategories, loading } = useContext(StoreContext);
    
    // Utiliser les catégories de la base de données ou les catégories par défaut
    const dynamicCategories = getUniqueCategories();
    
    // Créer une liste de catégories avec les images correspondantes
    const categoriesWithImages = dynamicCategories.map(categoryName => {
        // Trouver l'image correspondante dans menu_list
        const menuItem = menu_list.find(item => 
            item.menu_name.toLowerCase() === categoryName.toLowerCase()
        );
        
        return {
            menu_name: categoryName,
            menu_image: menuItem ? menuItem.menu_image : menu_list[0].menu_image // Image par défaut
        };
    });

    // Utiliser les catégories statiques si les données ne sont pas encore chargées
    const categoriesToShow = loading || categoriesWithImages.length === 0 
        ? menu_list 
        : categoriesWithImages;

    return (
        <div className='explore-menu' id='explore-menu'>
            <h1>Explore our menu</h1>
            <p className='explore-menu-text'>Choose from a diverse menu featuring a delightful array of dishes...</p>
            <div className="explore-menu-list">
                {categoriesToShow.map((item, index) => {
                    return (
                        <div 
                            onClick={() => setCategory(prev => prev === item.menu_name ? "All" : item.menu_name)} 
                            key={index} 
                            className='explore-menu-list-item'
                        >
                            <img 
                                className={category === item.menu_name ? "active" : ""} 
                                src={item.menu_image} 
                                alt={item.menu_name} 
                            />
                            <p>{item.menu_name}</p>
                        </div>
                    );
                })}
            </div>
            <hr />
        </div>
    );
};

export default ExploreMenu;