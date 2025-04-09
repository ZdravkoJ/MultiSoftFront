// template page for managing company and consultant settings regarding company

import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import {
  Container,
  Row,
  Col,
  Form,
  Card,
  InputGroup,
  Button,
  Table,
} from "react-bootstrap";
import { useTranslation } from "react-i18next";
import axiosInstance from "../../utils/axios";
import { Formik } from "formik";
import useAuth from "../../hooks/useAuth";
import { FileCode, Search } from "lucide-react";
import RegistrationRequestsTable from "../../components/firms/RegistrationRequest";
import MainModal from "../ui/MainModal";
import Consultant from "../../components/firms/Consultant";

const AdminPanel = () => {
  const [show, setShow] = useState(false);
  const { signIn, user, isInitialized } = useAuth();
  const [companies, setCompanies] = useState<{ id: number; name: string }[]>(
    []
  );
  const [selectedCompany, setSelectedCompany] = useState<number | "">("");

  const { t } = useTranslation();

  return (
    <React.Fragment>
      <Helmet title="SuperAdmin Panel" />
      <h1>{t("AdminPanel")}</h1>
      {user?.userType === 1 && <RegistrationRequestsTable />}
      {user?.userType === 1 && <Consultant />}
    </React.Fragment>
  );
};

export default AdminPanel;
