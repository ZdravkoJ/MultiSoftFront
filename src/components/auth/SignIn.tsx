import React from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import * as yup from "yup";
import { Alert, Button, Form, Row, Col } from "react-bootstrap";

import useAuth from "../../hooks/useAuth";
import { useTranslation } from "react-i18next";
import MainModal from "../../pages/ui/MainModal";
import { AuthResponse, AuthUser, SignInProps } from "../../types/auth";

const SignIn = ({ isSuperAdmin = false }: SignInProps) => {
  const navigate = useNavigate();
  const { signIn, signInSA } = useAuth();
  const { t } = useTranslation();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [touched, setIsTouched] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState(false);

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
    try {
      await validationSchema.validate(
        { username, password },
        { abortEarly: false }
      );

      const response = isSuperAdmin
        ? await signInSA(username, password)
        : await signIn(username, password);

      const data = response.data;

      if (
        data.userDetails != null &&
        data.accessToken != null &&
        data.userType !== 1
      ) {
        navigate("/dashboard");
      } else {
        showErrorModal("Invalid username or password.");
      }
    } catch (error: any) {
      if (error.response) {
        const message =
          error.response.data?.reason ||
          error.response.data?.errors?.[0]?.reason ||
          "Invalid username or password.";
        showErrorModal(message);
      } else if (error.request) {
        showErrorModal("No response from server.");
      } else {
        console.error(error);
        showErrorModal("Unexpected error.");
      }
    } finally {
      setSubmitting(false);
    }
  };

  const showErrorModal = (message: string) => {
    setIsOpen(true);
    setMessage(message);
    setError(true);
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
        {/* {error && (
          <Alert className="my-3" variant="danger">
            <div className="alert-message">{error}</div>
          </Alert>
        )} */}
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
        </Form.Group>

        {/* <div>
          <Form.Check
            type="checkbox"
            id="rememberMe"
            label="Remember me"
            defaultChecked
          />
        </div> */}

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
      <MainModal
        isOpen={isOpen}
        message={message}
        error={error}
        show={() => setIsOpen(true)}
        close={() => setIsOpen(false)}
      />
    </React.Fragment>
  );
};

export default SignIn;
