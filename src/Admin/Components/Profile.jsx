import React, { useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import { Container, Card, Row, Col, Badge } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css"; // Ensure Bootstrap CSS is imported

function Profile() {
  const { user } = useContext(AuthContext);

  const getUserRole = () => {
    if (user?.is_admin) return "Admin";
    if (user?.is_manager) return "Manager";
    return "User";
  };

  return (
    <Container className="py-4">
      <Card className="shadow-sm border-0 rounded-3">
        <Card.Header className="bg-success text-white d-flex justify-content-between align-items-center py-3">
          <h4 className="mb-0 fw-bold">Profile</h4>
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
                  <Col md={6} xs={12}>
                    <small className="text-muted fw-bold d-block mb-1">ID</small>
                    <p className="mb-0 bg-light p-2 rounded-3 border">{user.id || "N/A"}</p>
                  </Col>
                  <Col md={6} xs={12}>
                    <small className="text-muted fw-bold d-block mb-1">Email</small>
                    <p className="mb-0 bg-light p-2 rounded-3 border">{user.email || "N/A"}</p>
                  </Col>
                  <Col md={6} xs={12}>
                    <small className="text-muted fw-bold d-block mb-1">First Name</small>
                    <p className="mb-0 bg-light p-2 rounded-3 border">{user.first_name || "N/A"}</p>
                  </Col>
                  <Col md={6} xs={12}>
                    <small className="text-muted fw-bold d-block mb-1">Last Name</small>
                    <p className="mb-0 bg-light p-2 rounded-3 border">{user.last_name || "N/A"}</p>
                  </Col>
                  <Col md={6} xs={12}>
                    <small className="text-muted fw-bold d-block mb-1">Phone</small>
                    <p className="mb-0 bg-light p-2 rounded-3 border">{user.phone || "N/A"}</p>
                  </Col>
                  <Col md={6} xs={12}>
                    <small className="text-muted fw-bold d-block mb-1">Role</small>
                    <p className="mb-0 bg-light p-2 rounded-3 border">{user.role || getUserRole()}</p>
                  </Col>
                  <Col md={6} xs={12}>
                    <small className="text-muted fw-bold d-block mb-1">Admin Status</small>
                    <p className="mb-0 bg-light p-2 rounded-3 border">{user.is_admin ? "Yes" : "No"}</p>
                  </Col>
                  <Col md={6} xs={12}>
                    <small className="text-muted fw-bold d-block mb-1">Manager Status</small>
                    <p className="mb-0 bg-light p-2 rounded-3 border">{user.is_manager ? "Yes" : "No"}</p>
                  </Col>
                </Row>
              </Col>
            </Row>
          ) : (
            <p className="text-center text-muted py-4 fs-5">Loading user data...</p>
          )}
        </Card.Body>
      </Card>
    </Container>
  );
}

export default Profile;