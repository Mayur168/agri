import React from "react";

function SecondaryButton({ children, onClick, className = "", disabled, style,type }) {
  return (
    <button
      type={type}
      className={`btn btn-secondary ${className}`}
      onClick={onClick}
      disabled={disabled}
      style={{ style }}
      role="button"
    >
      {children}
    </button>
  );
}

export default SecondaryButton;
