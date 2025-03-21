import React from "react";

function PrimaryButton({ children, onClick, className = "", disabled, style, type,}) {
  return (
    <button
      type={type}
      className={`btn  p-2${className}`}
      onClick={onClick}
      disabled={disabled}
      style={ style }
      role="button"
    >
      {children}
    </button>
  );
}

export default PrimaryButton;
