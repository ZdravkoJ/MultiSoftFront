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
import SignUp from "../../../components/auth/SignUp";
import { Link } from "react-router-dom";
import Footer from "../../../components/Footer";

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
      <Navbar></Navbar>
      <section className="landing-intro pt-5 pt-lg-6 pb-5 pb-lg-7">
        <Container className="landing-intro-content">
          <Row className="align-items-center">
            <Col lg={5} className="mx-auto">
              {!isAuthenticated && !user && (
                <div>
                  <Link to="/auth/sign-in">{t("SignIn")}</Link>
                  <br></br>
                  <Link to="/auth/sign-up">{t("SignUp")}</Link>
                </div>
              )}
            </Col>
          </Row>
        </Container>
      </section>
    </>
  );
};

export default Home;
