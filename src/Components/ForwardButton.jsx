import React from "react";
import { useNavigate } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa";
import SecondaryButton from "./SecondaryButton";

function ForwardButton() {
  const navigate = useNavigate();
  const goForward = () => {
    navigate(+1);
    console.log("hello")
  };

  return (
    <>
      <SecondaryButton className="" onClick={goForward}>
        <FaArrowRight size={20} />
      </SecondaryButton>
    </>
  );
}

export default ForwardButton;
