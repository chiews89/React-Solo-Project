import React, { useState } from "react";
import { Modal } from "../context/Modal";
import SignupFormPage from "./SignupForm";


export const SignupFormModal = () => {
  const [showModal, setShowModal] = useState(false);

  return (
    <div className="signup-form-modal">
      <button
        className="signup-form-modal-button"
        onClick={() => setShowModal(true)}
      >
        Sign up
      </button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <SignupFormPage setShowModal={setShowModal} />
        </Modal>
      )}
    </div>
  );
};
