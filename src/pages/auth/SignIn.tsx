import React, { useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { Link, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import SignIn from "../../components/auth/SignIn";
import useAuth from "../../hooks/useAuth";
import Navbar from "../../components/navbar/Navbar";
import { Container, Row } from "react-bootstrap";

const SignInPage = () => {
  const { t } = useTranslation();
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate("/private", { replace: true }); // Redirect if already logged in
    }
  }, [user, navigate]);

  return (
    <React.Fragment>
      <Helmet title="Sign In" />
      <Container>
        <Navbar></Navbar>
        <SignIn />
        <div className="text-center mt-3">
          {t("DontHaveAccount")} <Link to="/auth/sign-up">{t("SignUp")}</Link>
        </div>
      </Container>
    </React.Fragment>
  );
};

export default SignInPage;
