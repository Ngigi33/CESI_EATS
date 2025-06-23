import React from 'react';
import { Edit } from 'lucide-react';

const AccountContent = ({ ownerInfo, openModal }) => {
  return (
    <div className="account-content">
      <div className="content-header">
        <h1 className="content-title">My Account</h1> {/* Changed to English */}
        <button
          onClick={() => openModal('account', ownerInfo)}
          className="btn btn-primary"
        >
          <Edit className="btn-icon" />
          <span>Edit</span> {/* Changed to English */}
        </button>
      </div>

      <div className="account-card">
        <div className="account-info">
          <img
            src={ownerInfo.avatar}
            alt="Avatar"
            className="account-avatar"
          />
          <div className="account-details">
            <h2 className="account-name">{ownerInfo.name}</h2>
            <p className="account-email">{ownerInfo.email}</p>
            <p className="account-phone">{ownerInfo.phone}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountContent;