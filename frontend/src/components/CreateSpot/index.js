import React, { useState } from "react";
import { Modal } from "../context/Modal";
import NewSpot from "./CreateSpot";
import { BsHouseDoor } from "react-icons/bs";

export const CreateSpotModal = () => {
  const [showModal, setShowModal] = useState(false);

  return (
    <div className="host-a-spot-modal">
      <button className="host-a-spot-button" onClick={() => setShowModal(true)}>
        <i className="user-icon">
          <BsHouseDoor />
        </i>
      </button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <NewSpot setShowModal={setShowModal} />
        </Modal>
      )}
    </div>
  );
};
