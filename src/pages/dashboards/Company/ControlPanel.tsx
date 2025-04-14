// template page for managing company and consultant settings regarding company

import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { Container, Row, Col, Form } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import axiosInstance from "../../../utils/axios";
import UserRoleForm from "./UserRoleForm";

const ControlPanel = () => {
  const [show, setShow] = useState(false);

  const { t } = useTranslation();

  return (
    <React.Fragment>
      <Helmet title="Company Control Panel" />
      <Container fluid className="p-0">
        <Row>
          <Col lg={12}>
            <h1>{t("ControlPanel")}</h1>
            <UserRoleForm />
          </Col>
        </Row>
      </Container>
    </React.Fragment>
  );
};

export default ControlPanel;
