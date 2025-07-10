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
// {formType === "farm" && (
//                   <>
//                     <div className="col-md-6">
//                       <div className="form-floating">
//                         <input
//                           type="text"
//                           className="form-control"
//                           name="name"
//                           value={formData.name || ""}
//                           onChange={handleChange}
//                           placeholder={labels[language].farmName}
//                           disabled={!isEditing}
//                         />
//                         <label>
//                           <FaTractor className="me-2 text-success" />{" "}
//                           {labels[language].farmName}
//                         </label>
//                       </div>
//                     </div>
//                     <div className="col-md-6">
//                       <div className="form-floating">
//                         <select
//                           className="form-select"
//                           name="manager_id"
//                           value={formData.manager_id || ""}
//                           onChange={handleChange}
//                           disabled={!isEditing}
//                         >
//                           <option value="">
//                             {labels[language].selectManager || "Select Manager"}
//                           </option>
//                           {managers.map((manager) => (
//                             <option key={manager.id} value={manager.id}>
//                               {manager.user.first_name} {manager.user.last_name}
//                             </option>
//                           ))}
//                         </select>
//                         <label>
//                           <FaUserTag className="me-2 text-success" />{" "}
//                           {labels[language].manager}
//                         </label>
//                       </div>
//                     </div>
//                     <div className="col-md-6">
//                       <div className="form-floating">
//                         <input
//                           type="text"
//                           className="form-control"
//                           name="farm_size"
//                           value={formData.farm_size || ""}
//                           onChange={handleChange}
//                           placeholder={labels[language].farmSize}
//                           disabled={!isEditing}
//                         />
//                         <label>
//                           <FaRuler className="me-2 text-success" />{" "}
//                           {labels[language].farmSize}
//                         </label>
//                       </div>
//                     </div>
//                     <div className="col-md-6">
//                       <div className="form-floating">
//                         <input
//                           type="text"
//                           className="form-control"
//                           name="address"
//                           value={formData.address || ""}
//                           onChange={handleChange}
//                           placeholder={labels[language].address}
//                           disabled={!isEditing}
//                         />
//                         <label>
//                           <FaMapPin className="me-2 text-success" />{" "}
//                           {labels[language].address}
//                         </label>
//                       </div>
//                     </div>
//                     <div className="col-md-6">
//                       <div className="input-group">
//                         <div className="form-floating flex-grow-1">
//                           <input
//                             type="text"
//                             className="form-control"
//                             name="location_url"
//                             value={formData.location_url || ""}
//                             onChange={handleChange}
//                             placeholder={labels[language].locationUrl}
//                             disabled={!isEditing}
//                           />
//                           <label>
//                             <FaGlobe className="me-2 text-success" />{" "}
//                             {labels[language].locationUrl}
//                           </label>
//                         </div>
//                         {isEditing && (
//                           <button
//                             type="button"
//                             className="btn btn-outline-primary"
//                             onClick={getLiveLocation}
//                             disabled={!isEditing}
//                             title={
//                               labels[language].getLiveLocation ||
//                               "Get Live Location"
//                             }
//                           >
//                             <FaMapMarkerAlt size={20} />
//                           </button>
//                         )}
//                       </div>
//                     </div>
//                     {/* Conditionally render fertilizers section */}
//                     {formType === "farm" && (formData.id || !isEditing) && (
//                       <div className="col-12">
//                         <h5 className="mb-3 fw-bold">
//                           {labels[language].fertilizers}
//                         </h5>
//                         {fertilizers.length > 0 ? (
//                           <div className="table-responsive rounded">
//                             <table
//                               className="table table-hover mb-0"
//                               style={{
//                                 borderRadius: "10px",
//                                 overflow: "hidden",
//                                 backgroundColor: "#fff",
//                               }}
//                             >
//                               <thead
//                                 className="bg-success text-white"
//                                 style={{
//                                   position: "sticky",
//                                   top: 0,
//                                   zIndex: 1,
//                                 }}
//                               >
//                                 <tr>
//                                   <th
//                                     scope="col"
//                                     className="text-center py-3"
//                                     style={{ width: "10%", fontSize: "0.9rem" }}
//                                   >
//                                     #
//                                   </th>
//                                   <th
//                                     scope="col"
//                                     className="py-3"
//                                     style={{ width: "45%", fontSize: "0.9rem" }}
//                                   >
//                                     <FaLeaf className="me-2" />
//                                     {labels[language].fertilizerName}
//                                   </th>
//                                   <th
//                                     scope="col"
//                                     className="py-3"
//                                     style={{ width: "45%", fontSize: "0.9rem" }}
//                                   >
//                                     <FaCalendarAlt className="me-2" />
//                                     {labels[language].date}
//                                   </th>
//                                 </tr>
//                               </thead>
//                               <tbody>
//                                 {fertilizers.map((fertilizer, index) => (
//                                   <tr
//                                     key={fertilizer.id || index}
//                                     style={{
//                                       transition: "background-color 0.2s ease",
//                                     }}
//                                     onMouseEnter={(e) =>
//                                       (e.currentTarget.style.backgroundColor =
//                                         "#f8f9fa")
//                                     }
//                                     onMouseLeave={(e) =>
//                                       (e.currentTarget.style.backgroundColor =
//                                         "transparent")
//                                     }
//                                   >
//                                     <td className="text-center py-3">
//                                       {index + 1}
//                                     </td>
//                                     <td className="py-3 fw-medium">
//                                       {fertilizer.name || "Unknown Fertilizer"}
//                                     </td>
//                                     <td className="py-3 text-muted">
//                                       {formatDateForDisplay(fertilizer.date) ||
//                                         "N/A"}
//                                     </td>
//                                   </tr>
//                                 ))}
//                               </tbody>
//                             </table>
//                           </div>
//                         ) : (
//                           <div
//                             className="alert alert-info text-center py-3 mb-0"
//                             role="alert"
//                             style={{ borderRadius: "8px" }}
//                           >
//                             {labels[language].noFertilizers ||
//                               "No fertilizers found for this farm."}
//                           </div>
//                         )}
//                       </div>
//                     )}
//                   </>
//                 )}