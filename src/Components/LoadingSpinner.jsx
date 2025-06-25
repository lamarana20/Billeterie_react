import React from "react";

const LoadingSpinner = ({ className = "" }) => {
  return (
    <div className={`inline-block animate-spin rounded-full h-5 w-5 border-2 border-solid border-current border-r-transparent ${className}`}
      role="status">
      <span className="sr-only">Chargement...</span>
    </div>
  );
};

export default LoadingSpinner;