import React, { useState } from "react";
import { Modal } from "../context/Modal";
import { CreateReviews } from "./createReview";

export const CreateReviewModal = () => {
  const [showModal, setShowModal] = useState(false);

  return (
    <div className="create-review-modal-container">
      <button
        className="create-review-modal-button"
        onClick={() => setShowModal(true)}
      >
        Leave a Review
      </button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <CreateReviews setShowModal={setShowModal} />
        </Modal>
      )}
    </div>
  );
};
