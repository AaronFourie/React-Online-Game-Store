import React, { useState } from "react";
import ModalContent from "./AccountModalContent"; // Import the ModalContent component

const SignUpLoginForm = ({ closeModal }) => {
  const [showLoginForm, setShowLoginForm] = useState(true);

  const toggleForm = () => {
    setShowLoginForm((prevState) => !prevState);
  };

  return (
    <ModalContent showLoginForm={showLoginForm} toggleForm={toggleForm} />
  );
};

export default SignUpLoginForm;