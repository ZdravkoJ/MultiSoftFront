import React from "react";

import {
  Badge,
  Col,
  Container,
  Row,
  Tooltip,
  OverlayTrigger,
} from "react-bootstrap";

import screenshotMixed from "../../../assets/img/screenshots/mixed.jpg";
import brandJavaScript from "../../../assets/img/brands/JANDEX.png";
import NavbarLanguages from "../../../components/navbar/NavbarLanguages";
import { useTranslation } from "react-i18next";
import Navbar from "../../../components/navbar/Navbar";

const Home = () => {
  const { t } = useTranslation();

  return (
    <>
      <Navbar></Navbar>
      <section className="landing-intro pt-5 pt-lg-6 pb-5 pb-lg-7">
        <Container className="landing-intro-content">
          <Row className="align-items-center">
            <Col lg={5} className="mx-auto">
              <div className="my-4">
                <OverlayTrigger
                  placement="bottom"
                  overlay={<Tooltip>{t("Jandex")}</Tooltip>}
                >
                  <img
                    width="250"
                    height="350"
                    src={brandJavaScript}
                    alt="JavaScript"
                    className="d-inline-block me-2"
                  />
                </OverlayTrigger>
              </div>
            </Col>
            <Col lg={7} className="d-none d-lg-flex mx-auto text-center">
              <div className="landing-intro-screenshot pb-3">
                <img
                  src={screenshotMixed}
                  alt="Dark/Light Bootstrap React Admin Template"
                  className="img-fluid"
                />
              </div>
            </Col>
          </Row>
          <Row className="align-items-center">
            <Col lg={5} className="mx-auto">
              <div>test123</div>
            </Col>
          </Row>
        </Container>
      </section>
    </>
  );
};

export default Home;
