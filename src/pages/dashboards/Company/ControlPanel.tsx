// template page for managing company and consultant settings regarding company

import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { Container, Row, Col, Form } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import axiosInstance from "../../../utils/axios";

const ControlPanel = () => {
  const [show, setShow] = useState(false);
  const [companies, setCompanies] = useState<
    { id: number; name: string; description: string }[]
  >([]);

  const { t } = useTranslation();

  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        const response = await axiosInstance.get("/auth/roles");
        console.log(response);
        setCompanies(response.data);
      } catch (error) {
        console.error("Failed to fetch companies", error);
      } finally {
      }
    };

    fetchCompanies();
  }, []);

  return (
    <React.Fragment>
      <Helmet title="Company Control Panel" />
      <Container fluid className="p-0">
        <Row>
          <Col lg={12} className="d-flex">
            <h1>{t("ControlPanel")}</h1>
            <Form>
              <Form.Group controlId="companySelect">
                <Form.Label>{t("UserRoles")}</Form.Label>
                <Form.Select>
                  <option value="" disabled>
                    {t("Choose a company")}
                  </option>
                  {companies.map((company) => (
                    <option key={company.id} value={company.id}>
                      {company.name}-{company.description}
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>
            </Form>
          </Col>
        </Row>
      </Container>
    </React.Fragment>
  );
};

export default ControlPanel;
