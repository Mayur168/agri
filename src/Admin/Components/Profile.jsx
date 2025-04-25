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
                  <Col md={6} xs={12}>
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
                  </Col>
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