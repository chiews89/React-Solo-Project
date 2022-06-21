import React, { useState } from "react";
import { Modal } from "../context/Modal";
import UpdateSpot from "./Edit.Spot";
import { FaEllipsisH } from "react-icons/fa";
import "./EditSpot.css";

export const EditSpotModal = ({ spot }) => {
  const [showModal, setShowModal] = useState(false);

  return (
    <div className="edit-spot-modal-container">
      <button
        className="edit-spot-modal-button"
        onClick={() => setShowModal(true)}
      >
        <FaEllipsisH />
      </button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <UpdateSpot spot={spot} setShowModal={setShowModal} />
        </Modal>
      )}
    </div>
  );
};
