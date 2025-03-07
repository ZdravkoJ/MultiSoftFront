import React from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import * as yup from "yup";
import { Formik } from "formik";
import { Alert, Button, Form, Row, Col } from "react-bootstrap";

import useAuth from "../../hooks/useAuth";
import { useTranslation } from "react-i18next";
import { sign } from "jsonwebtoken";

const SignIn = () => {
  const navigate = useNavigate();
  const { signIn } = useAuth();
  const { t } = useTranslation();

  const [username, setUsername] = useState(""); // "demo@bootlab.io"
  const [password, setPassword] = useState(""); // "unsafepassword"
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [touched, setIsTouched] = useState(false);

  const validationSchema = yup.object({
    username: yup
      .string()
      .min(3, "Username must be at least 3 characters")
      .required("Required"),
    password: yup
      .string()
      .min(6, "Must be at least 6 characters")
      .required("Required"),
  });

  const handleLoginSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitting(true);
    setError(null);
    try {
      await validationSchema.validate(
        { username, password },
        { abortEarly: false }
      );

      await signIn(username, password);
      //getme accesstoken localstorage and log it
      const accessToken = localStorage.getItem("accessToken");
      console.log("accessToken", accessToken);

      navigate("/dashboard");
    } catch (error: any) {
      if (error.name === "ValidationError") {
        setError(error.errors.join(", "));
      } else {
        setError(error.message || "An error occurred");
      }
      setSubmitting(false);
    }
  };

  //make me handleblur and handlechange for username/password
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    if (name === "username") {
      setUsername(value);
    } else if (name === "password") {
      setPassword(value);
    }
  };

  //make me handleblur so it can be used in the form
  const handleBlur = (event: React.FocusEvent<HTMLInputElement>) => {
    setIsTouched(true);
  };

  return (
    <React.Fragment>
      <form onSubmit={handleLoginSubmit}>
        {error !== null && error !== "" ? (
          <Alert className="my-3" variant="danger">
            <div className="alert-message">{error}</div>
          </Alert>
        ) : null}

        <Form.Group className="mb-3">
          <Form.Label>{t("Username")}</Form.Label>
          <Form.Control
            size="lg"
            type="text"
            name="username"
            placeholder="Enter your username"
            value={username}
            onBlur={handleBlur}
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>{t("Password")}</Form.Label>
          <Form.Control
            size="lg"
            type="password"
            name="password"
            placeholder="Enter your password"
            value={password}
            onBlur={handleBlur}
            onChange={handleChange}
          />
          <small>
            <Link to="/auth/reset-password">Forgot password?</Link>
          </small>
        </Form.Group>

        <div>
          <Form.Check
            type="checkbox"
            id="rememberMe"
            label="Remember me"
            defaultChecked
          />
        </div>

        <div className="d-grid gap-2 mt-3">
          <Button
            type="submit"
            variant="primary"
            size="lg"
            disabled={submitting}
          >
            {t("SignIn")}
          </Button>
        </div>
      </form>
    </React.Fragment>
  );
};

export default SignIn;
