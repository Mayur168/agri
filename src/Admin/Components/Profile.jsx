import React, { useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import { Container, Card, Row, Col, Badge } from "react-bootstrap";

function Profile() {
  const { user } = useContext(AuthContext);

  const getUserRole = () => {
    if (user?.is_admin) return "Admin";
    if (user?.is_manager) return "Manager";
    return "User";
  };

  return (
    <Container className="mt-4 pt-2">
      <Card className="shadow-sm border-0">
        <Card.Header className="bg-success text-white d-flex justify-content-between align-items-center">
          <h4 className="mb-0">Profile</h4>
          <Badge bg="light" text="dark" className="fs-6">
            {user?.role || getUserRole()}
          </Badge>
        </Card.Header>
        <Card.Body className="p-4">
          {user ? (
            <Row>
              {/* Left Column: Avatar and Name */}
              <Col md={3} className="text-center mb-3 mb-md-0">
                <div
                  className="rounded-circle bg-success text-white d-flex align-items-center justify-content-center mx-auto mb-3"
                  style={{ width: "80px", height: "80px", fontSize: "2rem" }}
                >
                  {user.first_name?.charAt(0).toUpperCase() || "P"}
                </div>
                <h5 className="mb-1">{`${user.first_name || ""} ${user.last_name || ""}`}</h5>
                <Badge bg="secondary" className="mt-1">
                  {user.role || getUserRole()}
                </Badge>
              </Col>

              {/* Right Column: User Details */}
              <Col md={9}>
                <Row className="g-3">
                  <Col md={6}>
                    <small className="text-muted d-block mb-1 fw-bold">ID</small>
                    <p className="mb-0 bg-light p-2 rounded">{user.id || "N/A"}</p>
                  </Col>
                  <Col md={6}>
                    <small className="text-muted d-block mb-1 fw-bold">Email</small>
                    <p className="mb-0 bg-light p-2 rounded">{user.email || "N/A"}</p>
                  </Col>
                  <Col md={6}>
                    <small className="text-muted d-block mb-1 fw-bold">First Name</small>
                    <p className="mb-0 bg-light p-2 rounded">{user.first_name || "N/A"}</p>
                  </Col>
                  <Col md={6}>
                    <small className="text-muted d-block mb-1 fw-bold">Last Name</small>
                    <p className="mb-0 bg-light p-2 rounded">{user.last_name || "N/A"}</p>
                  </Col>
                  <Col md={6}>
                    <small className="text-muted d-block mb-1 fw-bold">Phone</small>
                    <p className="mb-0 bg-light p-2 rounded">{user.phone || "N/A"}</p>
                  </Col>
                  <Col md={6}>
                    <small className="text-muted d-block mb-1 fw-bold">Role</small>
                    <p className="mb-0 bg-light p-2 rounded">{user.role || getUserRole()}</p>
                  </Col>
                  <Col md={6}>
                    <small className="text-muted d-block mb-1 fw-bold">Admin Status</small>
                    <p className="mb-0 bg-light p-2 rounded">{user.is_admin ? "Yes" : "No"}</p>
                  </Col>
                  <Col md={6}>
                    <small className="text-muted d-block mb-1 fw-bold">Manager Status</small>
                    <p className="mb-0 bg-light p-2 rounded">{user.is_manager ? "Yes" : "No"}</p>
                  </Col>
                </Row>
              </Col>
            </Row>
          ) : (
            <p className="text-center text-muted">Loading user data...</p>
          )}
        </Card.Body>
      </Card>
    </Container>
  );
}

export default Profile;