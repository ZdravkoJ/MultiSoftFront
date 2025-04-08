// template page for managing company and consultant settings regarding company

import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { Container, Row, Col, Form } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import axiosInstance from "../../utils/axios";
import { Formik } from "formik";

const AdminPanel = () => {
  const [show, setShow] = useState(false);

  const [companies, setCompanies] = useState<{ id: number; name: string }[]>(
    []
  );
  const [selectedCompany, setSelectedCompany] = useState<number | "">("");

  const { t } = useTranslation();

  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        const response = await axiosInstance.get("agency/companies");
        console.log(response.data);
        setCompanies(response.data); // Assuming response.data is an array of { id, name }
      } catch (error) {
        console.error("Failed to fetch companies:", error);
      }
    };

    fetchCompanies();
  }, []);

  return (
    <React.Fragment>
      <Helmet title="SuperAdmin Panel" />
      <Container fluid className="p-0">
        <Row>
          <Col lg={12} className="d-flex">
            <h1>{t("AdminPanel")}</h1>
            <Form.Group>
              <Form.Label>{t("SelectCompany")}</Form.Label>
              <Form.Control
                as="select"
                value={selectedCompany}
                onChange={(e) => setSelectedCompany(Number(e.target.value))}
              >
                <option value="">{t("SelectCompanyPlaceholder")}</option>
                {companies.map((company) => (
                  <option key={company.id} value={company.id}>
                    {company.name}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>
          </Col>
        </Row>
      </Container>
    </React.Fragment>
  );
};

export default AdminPanel;
