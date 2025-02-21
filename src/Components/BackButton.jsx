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
      <PrimaryButton className="btn text-blue" onClick={goBack}>
        {" "}
        <FaArrowLeft size={15} />
      </PrimaryButton>
    </>
  );
}

export default BackButton;
