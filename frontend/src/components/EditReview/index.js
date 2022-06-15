import React, { useState } from "react";
import { Modal } from "../context/Modal";
import EditReview from "./EditReview";

export const EditReviewModal = ({ reviews }) => {
  const [showModal, setShowModal] = useState(false);

  return (
    <div className="edit-review-modal-container">
      <button
        className="edit-review-modal-button"
        onClick={() => setShowModal(true)}
      >
        Edit Review
      </button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <EditReview reviews={reviews} setShowModal={setShowModal} />
        </Modal>
      )}
    </div>
  );
};
