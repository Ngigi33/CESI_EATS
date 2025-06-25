// FilterSearchSection.jsx
import React from 'react';

const FilterSearchSection = ({ searchTerm, setSearchTerm, filterStatus, setFilterStatus }) => {
  return (
    <div className="filter-container">
      <div className="search-box">
        <input
          type="text"
          placeholder="Search for an order..."
          className="search-input"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="filter-buttons">
        <button
          className={filterStatus === 'all' ? 'filter-button active' : 'filter-button'}
          onClick={() => setFilterStatus('all')}
        >
          All
        </button>
        <button
          className={filterStatus === 'pending' ? 'filter-button active' : 'filter-button'}
          onClick={() => setFilterStatus('pending')}
        >
          Pending
        </button>
        <button
          className={filterStatus === 'preparing' ? 'filter-button active' : 'filter-button'}
          onClick={() => setFilterStatus('preparing')}
        >
          Preparing
        </button>
        <button
          className={filterStatus === 'delivered' ? 'filter-button active' : 'filter-button'}
          onClick={() => setFilterStatus('delivered')}
        >
          Delivered
        </button>
        <button
          className={filterStatus === 'cancelled' ? 'filter-button active' : 'filter-button'}
          onClick={() => setFilterStatus('cancelled')}
        >
          Cancelled
        </button>
      </div>
    </div>
  );
};

export default FilterSearchSection;