import React, { useEffect, useState } from "react";
import { Formik, Form, Field } from "formik";
import {
  Button,
  Tab,
  Table,
  Form as FormBootstrap,
  FormGroup,
} from "react-bootstrap";
import axiosInstance from "../../utils/axios";
import * as Yup from "yup";
import { AuthUser } from "../../types/auth";
import { Firm } from "../../types/firm";

const Consultant = () => {
  const [showForm, setShowForm] = useState(false);
  const [consultants, setConsultants] = useState<AuthUser[]>();
  const [firms, setFirms] = useState<Firm[]>();
  const [selectedFirmIds, setSelectedFirmIds] = useState<{
    [consultantId: number]: number; // Allow null if no firm is selected
  }>({});

  const toggleForm = () => setShowForm((prev) => !prev);

  const initialValues = {
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    phoneNumber: "",
    password: " ",
  };

  const fetchConsultants = async () => {
    try {
      const response = await axiosInstance.get("admin/consultants");
      setConsultants(response.data);
    } catch (error) {
      console.error("Failed to fetch consultants", error);
    }
  };

  const fetchCompanies = async () => {
    try {
      const res = await axiosInstance.get("admin/companies");
      setFirms(res.data);
      console.log(res.data);
    } catch (error) {
      console.error("Failed to fetch companies", error);
    }
  };

  useEffect(() => {
    fetchConsultants();
    fetchCompanies();
  }, []);

  const handleFirmChange = (consultantId: number, firmId: string) => {
    setSelectedFirmIds((prev) => ({
      ...prev,
      [consultantId]: parseInt(firmId), // Convert firmId to number
    }));
    console.log(selectedFirmIds);
  };

  const assignFirmToConsultant = async (consultantId: number) => {
    const firmId = selectedFirmIds[consultantId];
    if (firmId) {
      try {
        await axiosInstance.post("admin/consultants/companies", {
          consultantUserId: consultantId,
          companyId: firmId,
        });
        alert(`Firm ${firmId} assigned to consultant ${consultantId}`);
        // Optionally, update the consultants state to reflect the assignment
      } catch (error) {
        console.error(
          `Failed to assign firm ${firmId} to consultant ${consultantId}`,
          error
        );
        alert("Failed to assign firm.");
      }
    } else {
      alert("Please select a firm before assigning.");
    }
  };

  const validationSchema = Yup.object({
    firstName: Yup.string().required("Required").max(100),
    lastName: Yup.string().required("Required").max(100),
    username: Yup.string().required("Required"),
    email: Yup.string().email("Invalid email").required("Required"),
    password: Yup.string()
      .required(`password`)
      .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
      .matches(/[0-9]/, "Password must contain at least one number")
      .matches(
        /[^a-zA-Z0-9]/,
        "Password must contain at least one special character"
      ),
  });

  const handleSubmit = async (
    values: typeof initialValues,
    { resetForm }: any
  ) => {
    try {
      await axiosInstance.post("/admin/consultants", values);
      alert("Consultant created successfully!");
      resetForm();
    } catch (error) {
      console.error("Error creating consultant:", error);
      alert("Something went wrong.");
    }
  };

  return (
    <div className="my-4">
      <Button onClick={toggleForm}>
        {showForm ? "Cancel" : "Consultants"}
      </Button>
      {showForm && (
        <div className="mt-4">
          <h4> Consultants</h4>
          <div className="d-flex gap-5 align-start">
            <Formik
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={handleSubmit}
            >
              {({ errors, touched }) => (
                <Form>
                  <div className="mb-3">
                    <label>First Name</label>
                    <Field name="firstName" className="form-control" />
                    {touched.firstName && errors.firstName && (
                      <div className="text-danger">{errors.firstName}</div>
                    )}
                  </div>
                  <div className="mb-3">
                    <label>Last Name</label>
                    <Field name="lastName" className="form-control" />
                    {touched.lastName && errors.lastName && (
                      <div className="text-danger">{errors.lastName}</div>
                    )}
                  </div>
                  <div className="mb-3">
                    <label>Username</label>
                    <Field name="username" className="form-control" />
                    {touched.username && errors.username && (
                      <div className="text-danger">{errors.username}</div>
                    )}
                  </div>
                  <div className="mb-3">
                    <label>Password</label>
                    <Field
                      name="password"
                      className="form-control"
                      type="password"
                    />
                    {touched.password && errors.password && (
                      <div className="text-danger">{errors.password}</div>
                    )}
                  </div>
                  <div className="mb-3">
                    <label>Email</label>
                    <Field name="email" className="form-control" />
                    {touched.email && errors.email && (
                      <div className="text-danger">{errors.email}</div>
                    )}
                  </div>
                  <div className="mb-3">
                    <label>Phone</label>
                    <Field name="phoneNumber" className="form-control" />
                    {touched.phoneNumber && errors.phoneNumber && (
                      <div className="text-danger">{errors.phoneNumber}</div>
                    )}
                  </div>
                  <Button type="submit">Submit</Button>
                </Form>
              )}
            </Formik>

            <div>
              <Table striped bordered hover responsive className="mt-3">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Username</th>
                    <th>Email</th>
                    <th>Fullname</th>
                    <th>Phone</th>
                    <th>Firms</th>
                    <th>Assign</th>
                  </tr>
                </thead>
                <tbody>
                  {consultants?.map((consultant) => (
                    <tr key={consultant?.id}>
                      <td>{consultant?.id}</td>
                      <td>{consultant?.username}</td>
                      <td>{consultant?.email}</td>
                      <td>{consultant?.fullName}</td>
                      <td>{consultant?.phoneNumber}</td>
                      <td>
                        <FormBootstrap.Select
                          size="sm"
                          value={selectedFirmIds[consultant!.id]}
                          onChange={(e) =>
                            handleFirmChange(
                              consultant?.id,
                              parseInt(e.target.value)
                            )
                          }
                        >
                          <option value="">Select Firm</option>
                          {firms?.map((firm) => (
                            <option key={firm.id} value={firm.id}>
                              {firm.id}-{firm.name}
                            </option>
                          ))}
                        </FormBootstrap.Select>
                      </td>
                      <td>
                        <Button
                          size="sm"
                          onClick={() =>
                            assignFirmToConsultant(consultant?.id!)
                          }
                          disabled={!selectedFirmIds[consultant?.id!]}
                        >
                          Assign
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Consultant;
