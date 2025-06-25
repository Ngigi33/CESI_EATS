import React from 'react';
import './Modal.css'; // Link to the new Modal CSS

const Modal = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;

  // Stop propagation to prevent clicks inside modal from closing it via overlay click
  const handleContentClick = (e) => {
    e.stopPropagation();
  };

  return (
    <div className="modal-overlay" onClick={onClose}> {/* Click overlay to close */}
      <div className="modal-content" onClick={handleContentClick}>
        <div className="modal-header">
          <h2>{title}</h2>
          <button className="modal-close-button" onClick={onClose}>
            &times;
          </button>
        </div>
        <div className="modal-body">{children}</div>
      </div>
    </div>
  );
};

export default Modal;