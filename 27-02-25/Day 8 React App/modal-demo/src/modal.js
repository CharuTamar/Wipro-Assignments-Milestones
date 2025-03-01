import React from "react";
import ReactDOM from "react-dom";
import "./modal.css"

const Modal = ({ children, onClose }) => {
    const portalRoot = document.getElementById("portal-root");

    if (!portalRoot) {
        console.error("Error: #portal-root not found in DOM");
        return null; // Prevent crash if portal-root is missing
    }

    return ReactDOM.createPortal(
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                {children}
                <button onClick={onClose} className="close-button">Close</button>
            </div>
        </div>,
        portalRoot
    );
};

export default Modal;
