import React, { useEffect, useState } from "react";
import { Table, Container, Spinner } from "react-bootstrap";
import axiosInstance from "../../utils/axios";
import { RegistrationRequest } from "../../types/firm";
import { Edit2, X } from "lucide-react";

const RegistrationRequestsTable = () => {
  const [registrationRequests, setRegistrationRequests] = useState<
    RegistrationRequest[]
  >([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const response = await axiosInstance.get("admin/registration-requests");
        setRegistrationRequests(response.data);
      } catch (error) {
        console.error("Error fetching registration requests:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchRequests();
  }, []);

  const confirmRegistrationRequest = async (id: number) => {
    try {
      await axiosInstance.post(`admin/registration-requests/${id}/approve`, {});
      // Optional: show a toast or confirmation message here
      setRegistrationRequests((prev) => prev.filter((r) => r.id !== id)); // Remove confirmed request
    } catch (error) {
      console.error("Failed to confirm request:", error);
    }
  };

  const deleteRegistrationRequest = async (id: number) => {
    try {
      await axiosInstance.delete(`admin/registration-requests/${id}`);
      // Optional: show a toast or confirmation message here
      setRegistrationRequests((prev) => prev.filter((r) => r.id !== id)); // Remove confirmed request
    } catch (error) {
      console.error("Failed to confirm request:", error);
    }
  };

  return (
    <Container className="mt-4">
      <h3>Registration Requests</h3>

      {loading ? (
        <div className="d-flex justify-content-center align-items-center">
          <Spinner animation="border" />
        </div>
      ) : (
        <Table striped bordered hover responsive>
          <thead>
            <tr>
              <th>ID</th>
              <th>Company Name</th>
              <th>User Full Name</th>
              <th>Email</th>
              <th>Timestamp</th>
              <th>Confirm</th>
              <th>Reject</th>
            </tr>
          </thead>
          <tbody>
            {registrationRequests.map((req) => (
              <tr key={req.id}>
                <td>{req.id}</td>
                <td>{req.companyName}</td>
                <td>{req.userFullName}</td>
                <td>{req.email}</td>
                <td>{new Date(req.timestamp).toLocaleString()}</td>
                <td>
                  <Edit2
                    className="align-middle me-1"
                    size={18}
                    onClick={() => {
                      confirmRegistrationRequest(req.id);
                      console.log(req.id, "confirm");
                    }}
                  />
                </td>
                <td>
                  <X
                    className="align-middle me-1"
                    size={18}
                    onClick={() => {
                      deleteRegistrationRequest(req.id);
                      console.log(req.id, "del");
                    }}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </Container>
  );
};

export default RegistrationRequestsTable;
