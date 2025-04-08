import React, { useEffect, useState } from "react";
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
  const [isSuperAdmin, setIsSuperAdmin] = useState(false);

  return (
    <React.Fragment>
      <Helmet title="Sign In" />
      <Container>
        <Navbar></Navbar>
        <SignIn isSuperAdmin={isSuperAdmin} />
        <div className="form-check mt-3">
          <input
            type="checkbox"
            id="isSuperAdmin"
            className="form-check-input"
            checked={isSuperAdmin}
            onChange={() => setIsSuperAdmin(!isSuperAdmin)}
          />
          <label className="form-check-label" htmlFor="isSuperAdmin">
            {t("SignInAsSuperAdmin")}
          </label>
        </div>
        <div className="mt-3">
          {t("DontHaveAccount")} <Link to="/auth/sign-up">{t("SignUp")}</Link>
        </div>
        <div className="mt-3">
          {t("ForgotPassword")}
          <Link to="/auth/reset-password">{t("Reset")}</Link>
        </div>
      </Container>
    </React.Fragment>
  );
};

export default SignInPage;
