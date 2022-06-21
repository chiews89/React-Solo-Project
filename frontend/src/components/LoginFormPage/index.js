import React, { useState } from "react";
import { Modal } from "../context/Modal";
import LoginFormPage from "./LoginForm";

export const LoginFormModal = () => {
  const [showModal, setShowModal] = useState(false);

  return (
    <div className="login-form-modal">
      <button
        className="login-form-modal-button"
        onClick={() => setShowModal(true)}
      >
        Log in
      </button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <LoginFormPage setShowModal={setShowModal} />
        </Modal>
      )}
    </div>
  );
};
