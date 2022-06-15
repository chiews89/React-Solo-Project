import React, { useState } from "react";
import { Modal } from "../context/Modal";
import UpdateSpot from "./Edit.Spot";

export const EditSpotModal = ({spot}) => {
  const [showModal, setShowModal] = useState(false);

  return (
    <div className="create-review-modal-container">
      <button
        className="create-review-modal-button"
        onClick={() => setShowModal(true)}
      >
        Edit Your Spot
      </button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <UpdateSpot spot ={spot} setShowModal={setShowModal} />
        </Modal>
      )}
    </div>
  );
};
