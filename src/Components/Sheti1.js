import React, { useState } from "react";
import axios from "axios";

const Sheti1 = () => {
  const [formData, setFormData] = useState({
    farmingType: "",
    profit: "",
    loss: "",
    farmPeak: "",
    totalLabors: "",
    rentPerDay: "",
    peakDuration: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
  
    try {
      const accessToken = localStorage.getItem("accessToken"); // Get token from local storage
  
      const response = await axios.post(
        "https://your-backend-url.com/api/farms",
        {
          action: "postFarmRecord", // Adjust the action if required
          ...formData,
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
  
      console.log("Form Submitted:", response.data);
      alert("Farm details submitted successfully!");
    } catch (err) {
      console.error("Error submitting form:", err);
      setError("Failed to submit the form. Please try again.");
    } finally {
      setLoading(false);
    }
  };
  

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   setLoading(true);
  //   setError(null);

  //   try {
  //     const response = await axios.post("https://your-backend-url.com/api/farms", formData);
  //     console.log("Form Submitted:", response.data);
  //     alert("Farm details submitted successfully!");
  //   } catch (err) {
  //     console.error("Error submitting form:", err);
  //     setError("Failed to submit the form. Please try again.");
  //   } finally {
  //     setLoading(false);
  //   }
  // };
  

  return (
    <div className="sheti-form-container">
      <h2 className="sheti-form-title">Farm Details Form</h2>
      {error && <div className="sheti-error-message">{error}</div>}
      <form onSubmit={handleSubmit}>
        
        {/* Farming Type */}
        <div className="sheti-form-group">
          <label className="sheti-form-label">Farming Type</label>
          <select className="sheti-form-select" name="farmingType" value={formData.farmingType} onChange={handleChange} required>
            <option value="">Select Farming Type</option>
            <option value="Aquaculture">Agriculture</option>
            <option value="Other">Other</option>
          </select>
        </div>

        {/* Profit */}
        <div className="sheti-form-group">
          <label className="sheti-form-label">Profit (₹)</label>
          <input type="number" className="sheti-form-control" name="profit" value={formData.profit} onChange={handleChange} required />
        </div>

        {/* Loss */}
        <div className="sheti-form-group">
          <label className="sheti-form-label">Loss (₹)</label>
          <input type="number" className="sheti-form-control" name="loss" value={formData.loss} onChange={handleChange} required />
        </div>

        {/* Farm Peak */}
        <div className="sheti-form-group">
          <label className="sheti-form-label">Farm Peak (Date)</label>
          <input type="date" className="sheti-form-control" name="farmPeak" value={formData.farmPeak} onChange={handleChange} required />
        </div>

        {/* Total Labors */}
        <div className="sheti-form-group">
          <label className="sheti-form-label">Total Labors</label>
          <input type="number" className="sheti-form-control" name="totalLabors" value={formData.totalLabors} onChange={handleChange} required />
        </div>

        {/* Rent Per Day */}
        <div className="sheti-form-group">
          <label className="sheti-form-label">Rent Per Day (₹)</label>
          <input type="number" className="sheti-form-control" name="rentPerDay" value={formData.rentPerDay} onChange={handleChange} required />
        </div>

        {/* Peak Duration */}
        <div className="sheti-form-group">
          <label className="sheti-form-label">Duration of Farm Peak (Days)</label>
          <input type="number" className="sheti-form-control" name="peakDuration" value={formData.peakDuration} onChange={handleChange} required />
        </div>

        {/* Submit Button */}
        <button type="submit" className="sheti-submit-btn" disabled={loading}>
          {loading ? "Submitting..." : "Submit"}
        </button>
      </form>
    </div>
  );
};

export default Sheti1;
