// import React, { useState } from "react";
// import axios from "axios";
// // import PrimaryButton from "../../Components/PrimaryButton";

// const Form = () => {
//   const [formData, setFormData] = useState({
//     farmingType: "",
//     profit: "",
//     loss: "",
//     farmPeak: "",
//     totalLabors: "",
//     rentPerDay: "",
//     peakDuration: "",
//   });

//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     setError(null);
  
//     try {
//       const token = localStorage.getItem("token"); // Get token from local storage
  
//       const response = await axios.post(
//         "https://your-backend-url.com/api/farms",
//         {
//           action: "postFarmRecord", // Adjust the action if required
//           ...formData,
//         },
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );
  
//       console.log("Form Submitted:", response.data);
//       alert("Farm details submitted successfully!");
//     } catch (err) {
//       console.error("Error submitting form:", err);
//       setError("Failed to submit the form. Please try again.");
//     } finally {
//       setLoading(false);
//     }
//   };
  

//   // const handleSubmit = async (e) => {
//   //   e.preventDefault();
//   //   setLoading(true);
//   //   setError(null);

//   //   try {
//   //     const response = await axios.post("https://your-backend-url.com/api/farms", formData);
//   //     console.log("Form Submitted:", response.data);
//   //     alert("Farm details submitted successfully!");
//   //   } catch (err) {
//   //     console.error("Error submitting form:", err);
//   //     setError("Failed to submit the form. Please try again.");
//   //   } finally {
//   //     setLoading(false);
//   //   }
//   // };
  

//   return (
//     <div className="sheti-form-container mb-5">
//       <h2 className="sheti-form-title">Farm Details Form</h2>
//       {error && <div className="sheti-error-message">{error}</div>}
//       <form onSubmit={handleSubmit}>
        
//         {/* Farming Type */}
//         <div className="sheti-form-group">
//           <label className="sheti-form-label mt-5">Farming Type</label>
//           <select className="sheti-form-select" name="farmingType" value={formData.farmingType} onChange={handleChange} required>
//             <option value="">Select Farming Type</option>
//             <option value="Aquaculture">Agriculture</option>
//             <option value="Other">Other</option>
//           </select>
//         </div>

//         {/* Profit */}
//         <div className="sheti-form-group">
//           <label className="sheti-form-label">Profit (₹)</label>
//           <input type="number" className="sheti-form-control" name="profit" value={formData.profit} onChange={handleChange} required />
//         </div>

//         {/* Loss */}
//         <div className="sheti-form-group">
//           <label className="sheti-form-label">Loss (₹)</label>
//           <input type="number" className="sheti-form-control" name="loss" value={formData.loss} onChange={handleChange} required />
//         </div>

//         {/* Farm Peak */}
//         <div className="sheti-form-group">
//           <label className="sheti-form-label">Farm Peak (Date)</label>
//           <input type="date" className="sheti-form-control" name="farmPeak" value={formData.farmPeak} onChange={handleChange} required />
//         </div>

//         {/* Total Labors */}
//         <div className="sheti-form-group">
//           <label className="sheti-form-label">Total Labors</label>
//           <input type="number" className="sheti-form-control" name="totalLabors" value={formData.totalLabors} onChange={handleChange} required />
//         </div>

//         {/* Rent Per Day */}
//         <div className="sheti-form-group">
//           <label className="sheti-form-label">Rent Per Day (₹)</label>
//           <input type="number" className="sheti-form-control" name="rentPerDay" value={formData.rentPerDay} onChange={handleChange} required />
//         </div>

//         {/* Peak Duration */}
//         <div className="sheti-form-group">
//           <label className="sheti-form-label">Duration of Farm Peak (Days)</label>
//           <input type="number" className="sheti-form-control" name="peakDuration" value={formData.peakDuration} onChange={handleChange} required />
//         </div>

//         {/* Submit Button */}
//         <button type="submit" className="sheti-submit-btn" disabled={loading}>
//           {loading ? "Submitting..." : "Submit"}
//         </button>
//         {/* <PrimaryButton type="submit" className="sheti-submit-btn" disabled={loading}>{loading ? "Submitting..." : "Submit"}</PrimaryButton> */}
//       </form>
//     </div>
//   );
// };

// export default Form;

import React, { useState } from "react";
import { useLanguage } from "../../contexts/LanguageContext"; // Adjust path accordingly
import axios from "axios";

const Form = () => {
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

  const { language } = useLanguage(); // Use language from context

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const token = localStorage.getItem("token"); // Get token from local storage

      const response = await axios.post(
        "https://your-backend-url.com/api/farms",
        {
          action: "postFarmRecord", // Adjust the action if required
          ...formData,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
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

  const formLabels = {
    en: {
      farmingType: "Farming Type",
      profit: "Profit (₹)",
      loss: "Loss (₹)",
      farmPeak: "Farm Peak (Date)",
      totalLabors: "Total Labors",
      rentPerDay: "Rent Per Day (₹)",
      peakDuration: "Duration of Farm Peak (Days)",
      submit: "Submit",
      submitting: "Submitting...",
      selectFarmingType: "Select Farming Type",
      agriculture: "Agriculture",
      other: "Other",
    },
    mr: {
      farmingType: "शेती प्रकार",
      profit: "नफा (₹)",
      loss: "तोटा (₹)",
      farmPeak: "शेत पीक (तारीख)",
      totalLabors: "एकूण श्रमिक",
      rentPerDay: "प्रति दिन भाडे (₹)",
      peakDuration: "शेत पीक कालावधी (दिवस)",
      submit: "सबमिट करा",
      submitting: "सबमिट करत आहे...",
      selectFarmingType: "शेती प्रकार निवडा",
      agriculture: "कृषी",
      other: "इतर",
    },
  };

  return (
    <div className="sheti-form-container mb-5">
      <h2 className="sheti-form-title">{language === "en" ? "Farm Details Form" : "शेती तपशील फॉर्म"}</h2>
      {error && <div className="sheti-error-message">{error}</div>}
      <form onSubmit={handleSubmit}>
        
        {/* Farming Type */}
        <div className="sheti-form-group">
          <label className="sheti-form-label mt-5">{formLabels[language].farmingType}</label>
          <select className="sheti-form-select" name="farmingType" value={formData.farmingType} onChange={handleChange} required>
            <option value="">{formLabels[language].selectFarmingType}</option>
            <option value="Aquaculture">{formLabels[language].agriculture}</option>
            <option value="Other">{formLabels[language].other}</option>
          </select>
        </div>

        {/* Profit */}
        <div className="sheti-form-group">
          <label className="sheti-form-label">{formLabels[language].profit}</label>
          <input type="number" className="sheti-form-control" name="profit" value={formData.profit} onChange={handleChange} required />
        </div>

        {/* Loss */}
        <div className="sheti-form-group">
          <label className="sheti-form-label">{formLabels[language].loss}</label>
          <input type="number" className="sheti-form-control" name="loss" value={formData.loss} onChange={handleChange} required />
        </div>

        {/* Farm Peak */}
        <div className="sheti-form-group">
          <label className="sheti-form-label">{formLabels[language].farmPeak}</label>
          <input type="date" className="sheti-form-control" name="farmPeak" value={formData.farmPeak} onChange={handleChange} required />
        </div>

        {/* Total Labors */}
        <div className="sheti-form-group">
          <label className="sheti-form-label">{formLabels[language].totalLabors}</label>
          <input type="number" className="sheti-form-control" name="totalLabors" value={formData.totalLabors} onChange={handleChange} required />
        </div>

        {/* Rent Per Day */}
        <div className="sheti-form-group">
          <label className="sheti-form-label">{formLabels[language].rentPerDay}</label>
          <input type="number" className="sheti-form-control" name="rentPerDay" value={formData.rentPerDay} onChange={handleChange} required />
        </div>

        {/* Peak Duration */}
        <div className="sheti-form-group">
          <label className="sheti-form-label">{formLabels[language].peakDuration}</label>
          <input type="number" className="sheti-form-control" name="peakDuration" value={formData.peakDuration} onChange={handleChange} required />
        </div>

        {/* Submit Button */}
        <button type="submit" className="sheti-submit-btn" disabled={loading}>
          {loading ? formLabels[language].submitting : formLabels[language].submit}
        </button>
      </form>
    </div>
  );
};

export default Form;
