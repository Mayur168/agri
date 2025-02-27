
import React from "react";
import loading from "./loading.gif";
import "../../../src/App"

const Spinner = () => {
  return (
    <div className="spinner-container">
      <div className="text-center">
        <img src={loading} alt="loading" className="mb-2" style={{ width: "50px", height: "50px" }} />
        <p>Loading, please wait...</p>
      </div>
    </div>
  );
};

export default Spinner;
