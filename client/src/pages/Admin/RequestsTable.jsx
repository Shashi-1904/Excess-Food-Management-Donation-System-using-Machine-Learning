import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Modal, Button, Toast } from "react-bootstrap";
import { useAuth } from "../../store/auth";
import { toast } from "react-toastify";

function RequestsTable() {
    const [requests, setRequests] = useState([]);
    const { authorizationToken, API } = useAuth();

    // Fetch requests from the backend
    useEffect(() => {
        const fetchRequests = async () => {
            try {
                const response = await fetch(`${API}/api/admin/requests`, {
                    headers: {
                        Authorization: authorizationToken,
                    },
                });
                if (response.ok) {
                    const result = await response.json();
                    if (result.success) {
                        setRequests(result.data);
                    } else {
                        toast.error("Failed to fetch requests:", result.message || "Unknown error");
                    }
                } else {
                    toast.error("Error in response:", response.status, response.statusText);
                }
            } catch (error) {
                toast.error("Error fetching requests:", error);
            }
        };

        fetchRequests();
    }, [authorizationToken]);

    return (
        <div
            className="container-fluid"
            style={{
                display: "flex",
                minHeight: "100vh",
                paddingTop: "60px",
            }}
        >
            <div
                className="content"
                style={{
                    marginLeft: "200px",
                    width: "calc(100% - 200px)",
                    overflowY: "auto",
                    padding: "20px",
                    zIndex: "500",
                }}
            >
                <div className="row mb-4">
                    <div className="col-12">
                        <h2 style={{ fontSize: "2rem" }}>All Requests</h2>
                        <p style={{ fontSize: "1.2rem" }}>
                            View all food requests from this page.
                        </p>
                    </div>
                </div>

                {/* Requests Table */}
                <div className="table-responsive">
                    <table
                        className="table table-striped table-hover"
                        style={{ fontSize: "1.4rem" }}
                    >
                        <thead className="thead-dark">
                            <tr>
                                <th>#</th>
                                <th>Food Type</th>
                                <th>Category</th>
                                <th>Quantity Needed</th>
                                <th>Needed By</th>
                                <th>NGO Name</th>
                                <th>Contact Email</th>
                                <th>Contact Phone</th>
                                <th>Address</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {requests.length > 0 ? (
                                requests.map((request, index) => (
                                    <tr key={request._id}>
                                        <td>{index + 1}</td>
                                        <td>{request.foodType}</td>
                                        <td>{request.category}</td>
                                        <td>{request.quantityNeeded}</td>
                                        <td>{new Date(request.neededBy).toLocaleDateString()}</td>
                                        <td>{request.ngoName}</td>
                                        <td>{request.contactEmail}</td>
                                        <td>{request.contactPhone}</td>
                                        <td>{request.address}</td>
                                        <td
                                            className={`text-${request.status === "pending"
                                                ? "warning"
                                                : request.status === "fulfilled"
                                                    ? "success"
                                                    : "secondary"
                                                }`}
                                            style={{ textTransform: "uppercase" }}
                                        >
                                            {request.status}
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="10" className="text-center">
                                        No requests found.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default RequestsTable;
