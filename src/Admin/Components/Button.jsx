import React from "react";
import PropTypes from "prop-types"; // Optional: for prop type checking

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
  // Map custom variants to Bootstrap classes
  const variants = {
    primary: "btn-primary",
    secondary: "btn-secondary",
    // Add more Bootstrap variants as needed (e.g., "danger", "success", "info")
  };

  // Map custom sizes to Bootstrap classes
  const sizes = {
    sm: "btn-sm",
    md: "", // Bootstrap's default size (no additional class needed)
    lg: "btn-lg",
  };

  // Base Bootstrap button class
  const baseStyles = "btn";

  // Combine classes dynamically
  const buttonClasses = [
    baseStyles,
    variants[variant] || variants.primary, // Fallback to primary if variant not found
    sizes[size] || "", // Apply size class if defined
    loading ? "disabled opacity-50" : "", // Bootstrap's disabled style + opacity
    className, // Allow custom classes to be appended
  ]
    .filter(Boolean) // Remove falsy values
    .join(" "); // Join with spaces

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