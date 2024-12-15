import React from 'react';
import './Modal.css'; // Create a CSS file for modal styling

const Modal = ({ isOpen, onClose, onConfirm }) => {
    if (!isOpen) return null; // Don't render if the modal is not open

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <h2>Login Required</h2>
                <p>You need to log in to access the courses.</p>
                <div className="modal-buttons">
                    <button onClick={onConfirm}>Login</button>
                    <button onClick={onClose}>Cancel</button>
                </div>
            </div>
        </div>
    );
};

export default Modal;
