import React from "react";

import {
  Badge,
  Col,
  Container,
  Row,
  Tooltip,
  OverlayTrigger,
  Button,
} from "react-bootstrap";

import screenshotMixed from "../../../assets/img/screenshots/mixed.jpg";
import brandJavaScript from "../../../assets/img/brands/JANDEX.png";
import NavbarLanguages from "../../../components/navbar/NavbarLanguages";
import { useTranslation } from "react-i18next";
import Navbar from "../../../components/navbar/Navbar";
import SignIn from "../../../components/auth/SignIn";

const Home = () => {
  const { t } = useTranslation();

  return (
    <>
      <Navbar></Navbar>
      <section className="landing-intro pt-5 pt-lg-6 pb-5 pb-lg-7">
        <Container className="landing-intro-content">
          <Row className="align-items-center">
            <Col lg={5} className="mx-auto">
              <SignIn></SignIn>
            </Col>
          </Row>
        </Container>
      </section>
    </>
  );
};

export default Home;
