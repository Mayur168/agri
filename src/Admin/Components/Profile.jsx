import React, { useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import { useLanguage } from "../../contexts/LanguageContext";
import { Container, Card, Row, Col, Badge } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

function Profile() {
  const { user } = useContext(AuthContext);
  const { language } = useLanguage();

  const translations = {
    en: {
      profile: "Profile",
      id: "ID",
      email: "Email",
      firstName: "First Name",
      lastName: "Last Name",
      phone: "Phone",
      role: "Role",
      adminStatus: "Admin Status",
      managerStatus: "Manager Status",
      managerId: "Manager ID",
      farmerId: "Farmer ID", // Changed from adminId to farmerId
      yes: "Yes",
      no: "No",
      loading: "Loading user data...",
    },
    mr: {
      profile: "प्रोफाइल",
      id: "आयडी",
      email: "ईमेल",
      firstName: "प्रथम नाव",
      lastName: "आडनाव",
      phone: "फोन",
      role: "भूमिका",
      adminStatus: "प्रशासक स्थिती",
      managerStatus: "व्यवस्थापक स्थिती",
      managerId: "व्यवस्थापक आयडी",
      farmerId: "शेतकरी आयडी", // Changed from adminId to farmerId
      yes: "होय",
      no: "नाही",
      loading: "वापरकर्ता डेटा लोड होत आहे...",
    },
  };

  const getUserRole = () => {
    if (user?.is_admin) return translations[language].role === "Role" ? "Admin" : "प्रशासक";
    if (user?.is_manager) return translations[language].role === "Role" ? "Manager" : "व्यवस्थापक";
    return translations[language].role === "Role" ? "User" : "वापरकर्ता";
  };

  // Determine which ID to show based on role
  const getIdLabelAndValue = () => {
    if (user?.is_admin) {
      return {
        label: translations[language].farmerId, // Use "Farmer ID" for admins
        value: user.farmer_id !== null && user.farmer_id !== undefined ? user.farmer_id : "N/A",
      };
    }
    if (user?.is_manager) {
      return {
        label: translations[language].managerId,
        value: user.manager_id !== null && user.manager_id !== undefined ? user.manager_id : "N/A",
      };
    }
    return {
      label: translations[language].id,
      value: user.id || "N/A", // Default to generic ID for other roles
    };
  };

  const { label: idLabel, value: idValue } = getIdLabelAndValue();

  return (
    <Container className="p-0">
      <Card className="shadow-sm border-0 rounded-3">
        <Card.Header className="bg-success text-white d-flex justify-content-between align-items-center py-3">
          <h4 className="mb-0 fw-bold">{translations[language].profile}</h4>
          <Badge bg="light" text="dark" className="px-3 py-2 fs-6 fw-normal">
            {user?.role || getUserRole()}
          </Badge>
        </Card.Header>
        <Card.Body className="p-4">
          {user ? (
            <Row className="g-4">
              {/* Left Column: Avatar and Name */}
              <Col md={3} xs={12} className="text-center mb-4 mb-md-0">
                <div
                  className="rounded-circle bg-success text-white d-flex align-items-center justify-content-center mx-auto mb-3 shadow-sm"
                  style={{ width: "90px", height: "90px", fontSize: "2.5rem" }}
                >
                  {user.first_name?.charAt(0).toUpperCase() || "P"}
                </div>
                <h5 className="fw-semibold mb-2">{`${user.first_name || ""} ${user.last_name || ""}`}</h5>
                <Badge bg="secondary" className="px-2 py-1 fs-6">
                  {user.role || getUserRole()}
                </Badge>
              </Col>

              {/* Right Column: User Details */}
              <Col md={9} xs={12}>
                <Row className="g-3">
                  {/* <Col md={6} xs={12}>
                    <small className="text-muted fw-bold d-block mb-1">{idLabel}</small>
                    <p className="mb-0 bg-light p-2 rounded-3 border">{idValue}</p>
                  </Col> */}
                  <Col md={6} xs={12}>
                    <small className="text-muted fw-bold d-block mb-1">{translations[language].firstName}</small>
                    <p className="mb-0 bg-light p-2 rounded-3 border">{user.first_name || "N/A"}</p>
                  </Col>
                  <Col md={6} xs={12}>
                    <small className="text-muted fw-bold d-block mb-1">{translations[language].lastName}</small>
                    <p className="mb-0 bg-light p-2 rounded-3 border">{user.last_name || "N/A"}</p>
                  </Col>
                  <Col md={6} xs={12}>
                    <small className="text-muted fw-bold d-block mb-1">{translations[language].email}</small>
                    <p className="mb-0 bg-light p-2 rounded-3 border">{user.email || "N/A"}</p>
                  </Col>
                  <Col md={6} xs={12}>
                    <small className="text-muted fw-bold d-block mb-1">{translations[language].phone}</small>
                    <p className="mb-0 bg-light p-2 rounded-3 border">{user.phone || "N/A"}</p>
                  </Col>
                  <Col md={6} xs={12}>
                    <small className="text-muted fw-bold d-block mb-1">{translations[language].role}</small>
                    <p className="mb-0 bg-light p-2 rounded-3 border">{user.role || getUserRole()}</p>
                  </Col>
                  {/* <Col md={6} xs={12}>
                    <small className="text-muted fw-bold d-block mb-1">{translations[language].adminStatus}</small>
                    <p className="mb-0 bg-light p-2 rounded-3 border">
                      {user.is_admin ? translations[language].yes : translations[language].no}
                    </p>
                  </Col>
                  <Col md={6} xs={12}>
                    <small className="text-muted fw-bold d-block mb-1">{translations[language].managerStatus}</small>
                    <p className="mb-0 bg-light p-2 rounded-3 border">
                      {user.is_manager ? translations[language].yes : translations[language].no}
                    </p>
                  </Col> */}
                </Row>
              </Col>
            </Row>
          ) : (
            <p className="text-center text-muted py-4 fs-5">{translations[language].loading}</p>
          )}
        </Card.Body>
      </Card>
    </Container>
  );
}

export default Profile;

// import React, { useContext, useState } from "react";
// import { AuthContext } from "../../contexts/AuthContext";
// import { useLanguage } from "../../contexts/LanguageContext";
// import { useNavigate } from "react-router-dom";
// import { Container, Card, Row, Col, Badge, Form, Alert } from "react-bootstrap";
// import "bootstrap/dist/css/bootstrap.min.css";
// import api from "../../Api/axiosInstance";
// import Swal from "sweetalert2";

// function Profile() {
//   const { user, setUser } = useContext(AuthContext);
//   const { language } = useLanguage();
//   const navigate = useNavigate();
//   const [uploading, setUploading] = useState(false);
//   const [error, setError] = useState(null);
//   const [tempImageUrl, setTempImageUrl] = useState(null);

//   const translations = {
//     en: {
//       profile: "Profile",
//       id: "ID",
//       email: "Email",
//       firstName: "First Name",
//       lastName: "Last Name",
//       phone: "Phone",
//       role: "Role",
//       adminStatus: "Admin Status",
//       managerStatus: "Manager Status",
//       managerId: "Manager ID",
//       farmerId: "Farmer ID",
//       yes: "Yes",
//       no: "No",
//       loading: "Loading user data...",
//       uploadPhoto: "Upload Photo",
//       uploading: "Uploading...",
//       uploadError: "Failed to upload image",
//       edit: "Edit",
//       success: "Profile photo updated successfully!",
//       error: "Failed to update profile photo",
//       unauthorized: "Unauthorized: Please log in again.",
//     },
//     mr: {
//       profile: "प्रोफाइल",
//       id: "आयडी",
//       email: "ईमेल",
//       firstName: "प्रथम नाव",
//       lastName: "आडनाव",
//       phone: "फोन",
//       role: "भूमिका",
//       adminStatus: "प्रशासक स्थिती",
//       managerStatus: "व्यवस्थापक स्थिती",
//       managerId: "व्यवस्थापक आयडी",
//       farmerId: "शेतकरी आयडी",
//       yes: "होय",
//       no: "नाही",
//       loading: "वापरकर्ता डेटा लोड होत आहे...",
//       uploadPhoto: "फोटो अपलोड करा",
//       uploading: "अपलोड होत आहे...",
//       uploadError: "प्रतिमा अपलोड करण्यात अयशस्वी",
//       edit: "संपादन",
//       success: "प्रोफाइल फोटो यशस्वीरित्या अपडेट झाला!",
//       error: "प्रोफाइल फोटो अपडेट करण्यात अयशस्वी",
//       unauthorized: "अनधिकृत: कृपया पुन्हा लॉग इन करा.",
//     },
//   };

//   const getUserRole = () => {
//     if (user?.is_admin)
//       return translations[language].role === "Role" ? "Admin" : "प्रशासक";
//     if (user?.is_manager)
//       return translations[language].role === "Role" ? "Manager" : "व्यवस्थापक";
//     return translations[language].role === "Role" ? "User" : "वापरकर्ता";
//   };

//   const getIdLabelAndValue = () => {
//     if (user?.is_admin) {
//       return {
//         label: translations[language].farmerId,
//         value:
//           user.farmer_id !== null && user.farmer_id !== undefined
//             ? user.farmer_id
//             : "N/A",
//       };
//     }
//     if (user?.is_manager) {
//       return {
//         label: translations[language].managerId,
//         value:
//           user.manager_id !== null && user.manager_id !== undefined
//             ? user.manager_id
//             : "N/A",
//       };
//     }
//     return {
//       label: translations[language].id,
//       value: user.id || "N/A",
//     };
//   };

//   const handleImageUpload = async (event) => {
//     const file = event.target.files[0];
//     if (!file) return;

//     const validTypes = ["image/jpeg", "image/png", "image/gif"];
//     if (!validTypes.includes(file.type)) {
//       setError(translations[language].uploadError + ": Invalid file type");
//       return;
//     }
//     if (file.size > 10 * 1024 * 1024) {
//       setError(translations[language].uploadError + ": File too large");
//       return;
//     }

//     setUploading(true);
//     setError(null);

//     try {
//       const storedUser = JSON.parse(localStorage.getItem("user"));
//       if (!storedUser?.id) {
//         throw new Error("User ID not found in localStorage");
//       }

//       const payload = {
//         action: "patchUser",
//         id: storedUser.id,
//         profile_img: file,
//       };

//       const response = await api.patch("/users/", payload, {
//         headers: {
//           Authorization: `Bearer ${localStorage.getItem("access_token")}`,
//           "Content-Type": "multipart/form-data",
//         },
//       });

//       // Assuming response returns updated user with image path
//       const updatedImageUrl = response.data?.profile_img;

//       const updatedUser = {
//         ...user,
//         profile_img: updatedImageUrl,
//       };

//       setUser(updatedUser);
//       localStorage.setItem("user", JSON.stringify(updatedUser));

//       Swal.fire({
//         icon: "success",
//         title: translations[language].success,
//         showConfirmButton: false,
//         timer: 2000,
//       });
//     } catch (err) {
//       console.error("API Error (Update Profile Photo):", err.response || err);
//       const errorMsg =
//         err.response?.data?.message ||
//         err.response?.data?.error_msg ||
//         translations[language].uploadError +
//           ": " +
//           translations[language].error;
//       setError(errorMsg);

//       if (err.response?.status === 401) {
//         Swal.fire({
//           icon: "error",
//           title: translations[language].unauthorized,
//           timer: 2000,
//         });
//         navigate("/login");
//       }
//     } finally {
//       setUploading(false);
//     }
//   };

//   const { label: idLabel, value: idValue } = getIdLabelAndValue();

//   const details = [
//     {
//       label: translations[language].firstName,
//       value: user?.first_name,
//       icon: "bi-person",
//     },
//     {
//       label: translations[language].lastName,
//       value: user?.last_name,
//       icon: "bi-person",
//     },
//     {
//       label: translations[language].email,
//       value: user?.email,
//       icon: "bi-envelope",
//     },
//     {
//       label: translations[language].phone,
//       value: user?.phone,
//       icon: "bi-phone",
//     },
//     {
//       label: translations[language].role,
//       value: user?.role || getUserRole(),
//       icon: "bi-briefcase",
//     },
//     {
//       label: translations[language].adminStatus,
//       value: user?.is_admin
//         ? translations[language].yes
//         : translations[language].no,
//       icon: "bi-shield-check",
//     },
//     {
//       label: translations[language].managerStatus,
//       value: user?.is_manager
//         ? translations[language].yes
//         : translations[language].no,
//       icon: "bi-person-check",
//     },
//   ];

//   return (
//     <Container className="p-0">
//       <Card className="shadow-sm border-0 rounded-3">
//         <Card.Header className="bg-success text-white d-flex justify-content-between align-items-center py-3">
//           <h4 className="mb-0 fw-bold">{translations[language].profile}</h4>
//           <Badge bg="light" text="dark" className="px-3 py-2 fs-6 fw-normal">
//             {user?.role || getUserRole()}
//           </Badge>
//         </Card.Header>
//         <Card.Body className="p-4">
//           {user ? (
//             <Row className="g-4">
//               {/* Left Column: Avatar, Edit Button, Name, and Role */}
//               <Col
//                 md={3}
//                 xs={12}
//                 className="text-center mb-3 mb-md-0 border-end"
//               >
//                 <div className="position-relative d-inline-block mb-3">
//                   <div
//                     className="rounded-circle bg-success text-white d-flex align-items-center justify-content-center shadow-sm overflow-hidden"
//                     style={{
//                       width: "120px",
//                       height: "120px",
//                       fontSize: "3rem",
//                     }}
//                   >
//                     {user.profile_img || tempImageUrl ? (
//                       <img
//                         src={user.profile_img || tempImageUrl}
//                         alt="Profile"
//                         key={user.profile_img || tempImageUrl}
//                         className="w-100 h-100 object-fit-cover"
//                         onError={(e) => {
//                           console.error(
//                             "Image load error:",
//                             user.profile_img || tempImageUrl
//                           );
//                           e.target.style.display = "none";
//                           e.target.nextSibling.style.display = "flex";
//                         }}
//                       />
//                     ) : null}
//                     <span
//                       style={{
//                         display:
//                           user.profile_img || tempImageUrl ? "none" : "flex",
//                         alignItems: "center",
//                         justifyContent: "center",
//                         width: "100%",
//                         height: "100%",
//                       }}
//                     >
//                       {user.first_name?.charAt(0).toUpperCase()}
//                     </span>
//                   </div>
//                   <Form.Label
//                     htmlFor="profile-upload"
//                     className="position-absolute bottom-0 end-0 bg-white rounded-circle p-1 shadow-sm"
//                     style={{
//                       cursor: uploading ? "not-allowed" : "pointer",
//                       opacity: uploading ? 0.5 : 1,
//                     }}
//                   >
//                     <i className="bi bi-pencil"></i>
//                   </Form.Label>
//                   <Form.Control
//                     id="profile-upload"
//                     type="file"
//                     accept="image/*"
//                     onChange={handleImageUpload}
//                     disabled={uploading}
//                     className="d-none"
//                   />
//                 </div>
//                 <h4 className="fw-semibold mb-2">{`${user.first_name || ""} ${
//                   user.last_name || ""
//                 }`}</h4>
//                 <Badge bg="secondary" className="px-2 py-1 fs-6 mb-3">
//                   {user.role || getUserRole()}
//                 </Badge>
//                 {error && (
//                   <Alert variant="danger" className="mt-2 p-2 fs-6">
//                     {error}
//                   </Alert>
//                 )}
//               </Col>

//               {/* Right Column: User Details */}
//               <Col md={9} xs={12}>
//                 <Row className="g-3">
//                   {details.map((detail, index) => (
//                     <Col md={6} xs={12} key={index}>
//                       <div className="mb-3">
//                         <small className="text-muted fw-bold d-flex align-items-center mb-1">
//                           <i className={`bi ${detail.icon} me-2`}></i>
//                           {detail.label}
//                         </small>
//                         <p className="mb-0 bg-light p-2 rounded-3 border">
//                           {detail.value || "N/A"}
//                         </p>
//                       </div>
//                     </Col>
//                   ))}
//                 </Row>
//               </Col>
//             </Row>
//           ) : (
//             <p className="text-center text-muted py-4 fs-5">
//               {translations[language].loading}
//             </p>
//           )}
//         </Card.Body>
//       </Card>
//     </Container>
//   );
// }

// export default Profile;
