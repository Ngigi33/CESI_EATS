import React, { useState } from 'react';
import './Account.css';
import { useNavigate } from 'react-router-dom';

const Account = () => {
  const [formData, setFormData] = useState({
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@email.com',
    street: '123 Main Street',
    city: 'New York',
    state: 'NY',
    zipCode: '10001',
    country: 'USA',
    phone: '+1 234 567 8900'
  });
  const navigate = useNavigate();
  const logout = () => {
    navigate('/');
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSave = () => {
    console.log('Saving changes:', formData);
    alert('Changes saved successfully!');
  };

  return (
    <div className="account-container">
      <div className="profile-section">
        <div className="profile-avatar">
          <span>{formData.firstName[0]}{formData.lastName[0]}</span>
        </div>
        <h2>{formData.firstName} {formData.lastName}</h2>
        <p>{formData.email}</p>
      </div>

      <div className="delivery-info">
        <h3>Delivery Information</h3>
        
        <div className="form-grid">
          <div className="input-group">
            <label>First Name</label>
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleInputChange}
              placeholder="First Name"
            />
          </div>
          
          <div className="input-group">
            <label>Last Name</label>
            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleInputChange}
              placeholder="Last Name"
            />
          </div>
          
          <div className="input-group full-width">
            <label>Email address</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="Email address"
            />
          </div>
          
          <div className="input-group full-width">
            <label>Street</label>
            <input
              type="text"
              name="street"
              value={formData.street}
              onChange={handleInputChange}
              placeholder="Street"
            />
          </div>
          
          <div className="input-group">
            <label>City</label>
            <input
              type="text"
              name="city"
              value={formData.city}
              onChange={handleInputChange}
              placeholder="City"
            />
          </div>
          
          <div className="input-group">
            <label>State</label>
            <input
              type="text"
              name="state"
              value={formData.state}
              onChange={handleInputChange}
              placeholder="State"
            />
          </div>
          
          <div className="input-group">
            <label>Zip code</label>
            <input
              type="text"
              name="zipCode"
              value={formData.zipCode}
              onChange={handleInputChange}
              placeholder="Zip code"
            />
          </div>
          
          <div className="input-group">
            <label>Country</label>
            <input
              type="text"
              name="country"
              value={formData.country}
              onChange={handleInputChange}
              placeholder="Country"
            />
          </div>
          
          <div className="input-group full-width">
            <label>Phone</label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              placeholder="Phone"
            />
          </div>
        </div>
        
        <button className="save-btn" onClick={handleSave}>
          Save Changes
        </button>
      </div>

      <button onClick={logout} className="logout-btn">Logout</button>
    </div>
  );
};

export default Account;