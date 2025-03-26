// template page for managing company and consultant settings regarding company

import React, { useState } from "react";
import { Helmet } from "react-helmet-async";
import { Container, Row, Col } from "react-bootstrap";

const ControlPanel = () => {
  const [show, setShow] = useState(false);

  return (
    <React.Fragment>
      <Helmet title="Company Control Panel" />
      <Container fluid className="p-0">
        <Row>
          <Col lg={12} className="d-flex">
            <h1>Company Control Panel</h1>
          </Col>
        </Row>
      </Container>
    </React.Fragment>
  );
};

export default ControlPanel;
