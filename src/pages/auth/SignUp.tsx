import React from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import SignUp from "../../components/auth/SignUp";
import { useTranslation } from "react-i18next";
import Navbar from "../../components/navbar/Navbar";

const SignUpPage = () => {
  const { t } = useTranslation();
  return (
    <React.Fragment>
      <Helmet title="Sign Up" />
      <Navbar></Navbar>
      <SignUp />
      <div className="text-center mt-3">
        {t("HaveAccount")}
        <Link to="/">{t("SignIn")}</Link>
      </div>
    </React.Fragment>
  );
};

export default SignUpPage;
