import React from "react";
import PropTypes from "prop-types"; 

const Button = ({
  variant = "primary",
  size = "md",
  loading = false,
  children,
  onClick,
  type = "button",
  className = "",
  ...props
}) => {
  const variants = {
    primary: "btn-primary",
    secondary: "btn-secondary",
  };

  const sizes = {
    sm: "btn-sm",
    md: "", 
    lg: "btn-lg",
  };

  const baseStyles = "btn";

  const buttonClasses = [
    baseStyles,
    variants[variant] || variants.primary, 
    sizes[size] || "", 
    loading ? "disabled opacity-50" : "", 
    className, 
  ]
    .filter(Boolean) 
    .join(" "); 

  return (
    <button
      className={buttonClasses}
      onClick={onClick}
      disabled={loading}
      type={type}
      {...props}
    >
      {loading ? (
        <>
          <span
            className="spinner-border spinner-border-sm me-2"
            role="status"
            aria-hidden="true"
          ></span>
          Loading...
        </>
      ) : (
        children
      )}
    </button>
  );
};

// Optional: PropTypes for type checking
Button.propTypes = {
  variant: PropTypes.oneOf(["primary", "secondary"]),
  size: PropTypes.oneOf(["sm", "md", "lg"]),
  loading: PropTypes.bool,
  children: PropTypes.node,
  onClick: PropTypes.func,
  type: PropTypes.string,
  className: PropTypes.string,
};

export default Button;