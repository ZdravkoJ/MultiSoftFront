import React from "react";
import { Link, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { Formik } from "formik";
import { Alert, Button, Form, Row, Col, Modal } from "react-bootstrap";

import useAuth from "../../hooks/useAuth";
import { useTranslation } from "react-i18next";

const SignUp = () => {
  const navigate = useNavigate();
  const { signUp } = useAuth();
  const { t } = useTranslation();

  //array of companies to select from
  const companies = [
    { id: 1, name: "Company 1" },
    { id: 2, name: "Company 2" },
    { id: 3, name: "Company 3" },
  ];

  return (
    <Formik
      initialValues={{
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        submit: false,
        companyName: "",
        companyCode: "",
        userNameWithoutCompanyCode: "TestUser",

        companyType: 1,
      }}
      validationSchema={Yup.object().shape({
        firstName: Yup.string()
          .max(50)
          .required(`${t("FirstNameValidation")}`),
        lastName: Yup.string()
          .max(50)
          .required(`${t("LastNameValidation")}`),
        email: Yup.string()
          .email(`${t("EmailValidation")}`)
          .max(255)
          .required(`${t("EmailValidation")}`),
        password: Yup.string()
          .required(`${t("PasswordValidation")}`)
          .matches(
            /[A-Z]/,
            "Password must contain at least one uppercase letter"
          )
          .matches(/[0-9]/, "Password must contain at least one number")
          .matches(
            /[^a-zA-Z0-9]/,
            "Password must contain at least one special character"
          ),
        companyName: Yup.string().required("Required").max(100),
        companyCode: Yup.string().required("Required"),
      })}
      onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
        try {
          signUp(
            values.email,
            values.password,
            values.firstName,
            values.lastName,
            values.companyName,
            values.companyCode,
            values.companyType,
            values.userNameWithoutCompanyCode
          );
        } catch (error: any) {
          const message = error.message || "Something went wrong";

          setStatus({ success: false });
          setErrors({ submit: message });
          setSubmitting(false);
        }
      }}
    >
      {({
        errors,
        handleBlur,
        handleChange,
        handleSubmit,
        isSubmitting,
        touched,
        values,
      }) => (
        <React.Fragment>
          <Form onSubmit={handleSubmit}>
            {errors.submit && (
              <Alert className="my-3" variant="danger">
                {errors.submit}
              </Alert>
            )}
            <Form.Group className="mb-3">
              <Form.Label>{t("FirstName")}</Form.Label>
              <Form.Control
                type="text"
                name="firstName"
                placeholder="First name"
                value={values.firstName}
                isInvalid={Boolean(touched.firstName && errors.firstName)}
                onBlur={handleBlur}
                onChange={handleChange}
              />
              {!!touched.firstName && (
                <Form.Control.Feedback type="invalid">
                  {errors.firstName}
                </Form.Control.Feedback>
              )}
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>{t("LastName")}</Form.Label>
              <Form.Control
                type="text"
                name="lastName"
                placeholder="Last name"
                value={values.lastName}
                isInvalid={Boolean(touched.lastName && errors.lastName)}
                onBlur={handleBlur}
                onChange={handleChange}
              />
              {!!touched.lastName && (
                <Form.Control.Feedback type="invalid">
                  {errors.lastName}
                </Form.Control.Feedback>
              )}
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>{t("email")}</Form.Label>
              <Form.Control
                type="email"
                name="email"
                placeholder="Email address"
                value={values.email}
                isInvalid={Boolean(touched.email && errors.email)}
                onBlur={handleBlur}
                onChange={handleChange}
              />
              {!!touched.email && (
                <Form.Control.Feedback type="invalid">
                  {errors.email}
                </Form.Control.Feedback>
              )}
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>{t("Password")}</Form.Label>
              <Form.Control
                type="password"
                name="password"
                placeholder="Password"
                value={values.password}
                isInvalid={Boolean(touched.password && errors.password)}
                onBlur={handleBlur}
                onChange={handleChange}
              />
              {!!touched.password && (
                <Form.Control.Feedback type="invalid">
                  {errors.password}
                </Form.Control.Feedback>
              )}
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>{t("CompanyName")}</Form.Label>
              <Form.Control
                type="text"
                name="companyName"
                placeholder="companyName"
                value={values.companyName}
                isInvalid={Boolean(touched.companyName && errors.companyName)}
                onBlur={handleBlur}
                onChange={handleChange}
              />
              {!!touched.companyName && (
                <Form.Control.Feedback type="invalid">
                  {errors.companyName}
                </Form.Control.Feedback>
              )}
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>{t("CompanyCode")}</Form.Label>
              <Form.Control
                type="text"
                name="companyCode"
                placeholder="CompanyCode"
                value={values.companyCode}
                isInvalid={Boolean(touched.companyCode && errors.companyCode)}
                onBlur={handleBlur}
                onChange={handleChange}
              />
              {!!touched.companyCode && (
                <Form.Control.Feedback type="invalid">
                  {errors.companyCode}
                </Form.Control.Feedback>
              )}
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>{t("userNameWithoutCompanyCode")}</Form.Label>
              <Form.Control
                type="text"
                name="userNameWithoutCompanyCode"
                placeholder="userNameWithoutCompanyCode"
                value={values.userNameWithoutCompanyCode}
                // isInvalid={Boolean(
                //   touched.userNameWithoutCompanyCode &&
                //     errors.userNameWithoutCompanyCode
                // )}
                onBlur={handleBlur}
                onChange={handleChange}
              />
              {!!touched.userNameWithoutCompanyCode && (
                <Form.Control.Feedback type="invalid">
                  {errors.userNameWithoutCompanyCode}
                </Form.Control.Feedback>
              )}
            </Form.Group>
            <div className="d-grid gap-2 mt-3">
              <Button
                type="submit"
                variant="primary"
                size="lg"
                disabled={isSubmitting}
              >
                {t("SignUp")}
              </Button>
            </div>
          </Form>
        </React.Fragment>
      )}
    </Formik>
  );
};

export default SignUp;
