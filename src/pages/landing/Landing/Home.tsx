import React, { useContext } from "react";

import {
  Badge,
  Col,
  Container,
  Row,
  Tooltip,
  OverlayTrigger,
  Button,
} from "react-bootstrap";

import { useTranslation } from "react-i18next";
import Navbar from "../../../components/navbar/Navbar";
import SignIn from "../../../components/auth/SignIn";
import AuthContext from "../../../contexts/JWTContext";
import Sidebar from "../../../components/sidebar/Sidebar";
import useDashboardItems from "../../../components/sidebar/useDashboardItems";
import Wrapper from "../../../components/Wrapper";

const Home = () => {
  const { t } = useTranslation();

  const authContext = useContext(AuthContext);
  const items = useDashboardItems();

  if (!authContext) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  const { isAuthenticated, user } = authContext;

  return (
    <>
      {isAuthenticated && user && <Navbar></Navbar>}
      {isAuthenticated && user && <Sidebar items={items} />}
      <section className="landing-intro pt-5 pt-lg-6 pb-5 pb-lg-7">
        <Container className="landing-intro-content">
          <Row className="align-items-center">
            <Col lg={5} className="mx-auto">
              {!isAuthenticated && !user && <SignIn></SignIn>}
            </Col>
          </Row>
        </Container>
      </section>
    </>
  );
};

export default Home;
