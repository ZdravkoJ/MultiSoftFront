import React from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import SignIn from "../../components/auth/SignIn";

const SignInPage = () => {
  const { t } = useTranslation();

  return (
    <React.Fragment>
      <Helmet title="Sign In" />
      <div className="text-center mt-4">
        <p className="lead"></p>
      </div>
      <SignIn />
      <div className="text-center mt-3">
        Don't have an account? <Link to="/auth/sign-up">Sign up</Link>
      </div>
    </React.Fragment>
  );
};

export default SignInPage;
