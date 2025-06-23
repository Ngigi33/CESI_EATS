import React from 'react';
import { Plus, Edit, Trash2, Eye } from 'lucide-react';

const RestaurantsContent = ({ restaurants, openModal }) => {
  return (
    <div className="restaurants-content">
      <div className="content-header">
        <h1 className="content-title">My Restaurants</h1> {/* Changed to English */}
        <button
          onClick={() => openModal('restaurant')}
          className="btn btn-primary"
        >
          <Plus className="btn-icon" />
          <span>Add Restaurant</span> {/* Changed to English */}
        </button>
      </div>

      <div className="restaurant-grid">
        {restaurants.map(restaurant => (
          <div key={restaurant.id} className="restaurant-card">
            <img
              src={restaurant.image}
              alt={restaurant.name}
              className="restaurant-image"
            />
            <div className="restaurant-card-body">
              <div className="restaurant-card-header">
                <h3 className="restaurant-name">{restaurant.name}</h3>
                <span className={`restaurant-status ${
                  restaurant.status === 'open' ? 'status-open' : 'status-closed'
                }`}>
                  {restaurant.status === 'open' ? 'Open' : 'Closed'} {/* Changed to English */}
                </span>
              </div>
              <p className="restaurant-address">{restaurant.address}</p>
              <p className="restaurant-description">{restaurant.description}</p>
              <div className="restaurant-card-footer">
                <div className="restaurant-hours">
                  {restaurant.opening} - {restaurant.closing}
                </div>
                <div className="restaurant-actions">
                  <button
                    onClick={() => openModal('restaurant', restaurant)}
                    className="action-btn edit-btn"
                  >
                    <Edit className="btn-icon" />
                  </button>
                  <button className="action-btn view-btn">
                    <Eye className="btn-icon" />
                  </button>
                  <button className="action-btn delete-btn">
                    <Trash2 className="btn-icon" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RestaurantsContent;