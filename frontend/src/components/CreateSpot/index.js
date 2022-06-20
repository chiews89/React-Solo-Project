import React, { useState } from "react";
import { Modal } from "../context/Modal";
import NewSpot from "./CreateSpot";


export const CreateSpotModal = () => {
  const [showModal, setShowModal] = useState(false);

  return (
    <div className="host-a-spot-modal">
      <button
        className="host-a-spot-button"
        onClick={() => setShowModal(true)}
      >
        Host a Spot
      </button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <NewSpot setShowModal={setShowModal} />
        </Modal>
      )}
    </div>
  );
};
