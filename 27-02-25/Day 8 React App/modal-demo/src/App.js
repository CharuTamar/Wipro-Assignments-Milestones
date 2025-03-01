import React, { useState, useEffect } from "react";
import Modal from "./modal";
import Tooltip from "./Tooltip";
import Popup from "./Popup";
import "./styles.css";

import ErrorBoundary from "./ErrorBoundary";  //Error Boundary Demo
import FaultyComponent from "./FaultyComponent"; //Error Boundary Demo


export default function App() {
  const [showModal, setShowModal] = useState(false);
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    let portalDiv = document.getElementById("portal-root");
        if (!portalDiv) {
            portalDiv = document.createElement("div");
            portalDiv.id = "portal-root";
            document.body.appendChild(portalDiv);
        }
  },[])

  return (
    <div className="App">
      <h1>React Portal Modal Demo</h1>

      {/* Modal Button */}
      <button onClick={() => setShowModal(true)}>Open Modal</button>

      {showModal && (
                <Modal onClose={() => setShowModal(false)}>
                    <h2>Portal Modal</h2>
                    <p>This modal is rendered outside the root DOM hierarchy.</p>
                </Modal>
            )}

      {/* Popup Button */}
      <button onClick={() => setShowPopup(true)}>Show Popup</button>

      {/* Tooltip Demo */}
      <div className="tooltip-container">
        Hover me <Tooltip text="This is a tooltip!" />
      </div>


         {/* Popup */}
         {showPopup && <Popup message="This is a pop-up!" onClose={() => setShowPopup(false)} />}




         {/*Error Boundary  */}
         <h1>React Error Boundary Demo</h1>

      {/* This component is wrapped inside ErrorBoundary */}
      <ErrorBoundary>
        <FaultyComponent />
      </ErrorBoundary>

      {/* Normal component that works fine */}
      <ErrorBoundary>
        <div>
          <h2>This is a safe component</h2>
        </div>
      </ErrorBoundary>
    </div>
  );
}