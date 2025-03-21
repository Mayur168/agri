import React from "react";
import { useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import PrimaryButton from "./PrimaryButton";

function BackButton() {
  const navigate = useNavigate();
  const goBack = () => {
    navigate(-1);
  };

  return (
    <>
      <PrimaryButton
        className="btn backbtn fs-4"
        onClick={goBack}
        style={{ color: "white" }} 
      >
        <FaArrowLeft size={18} />
      </PrimaryButton>
    </>
  );
}

export default BackButton;
