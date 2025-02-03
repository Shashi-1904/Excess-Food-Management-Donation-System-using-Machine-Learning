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
                            View and Manage all food requests.
                        </p>
                    </div>
                </div>

                {/* Requests Table */}
                <div className="table-responsive">
                    <table
                        className="table table-striped table-hover"
                        style={{ fontSize: "1.4rem", width: "100%" }}
                    >
                        <thead className="thead-dark">
                            <tr>
                                {["#", "Food Type", "Category", "Quantity Needed", "Needed By", "NGO Name", "Contact Email", "Contact Phone", "Address", "Status"].map((header, index) => (
                                    <th key={index} style={{ padding: "12px 16px", textAlign: "left" }}>
                                        {header}
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {requests.length > 0 ? (
                                requests.map((request, index) => (
                                    <tr key={request._id}>
                                        <td style={{ padding: "12px 16px" }}>{index + 1}</td>
                                        <td style={{ padding: "12px 16px" }}>{request.foodType}</td>
                                        <td style={{ padding: "12px 16px" }}>{request.category}</td>
                                        <td style={{ padding: "12px 16px" }}>{request.quantityNeeded}</td>
                                        <td style={{ padding: "12px 16px" }}>{new Date(request.neededBy).toLocaleDateString()}</td>
                                        <td style={{ padding: "12px 16px" }}>{request.ngoName}</td>
                                        <td style={{ padding: "12px 16px" }}>{request.contactEmail}</td>
                                        <td style={{ padding: "12px 16px" }}>{request.contactPhone}</td>
                                        <td style={{ padding: "12px 16px" }}>{request.address}</td>
                                        <td
                                            className={`text-${request.status === "pending"
                                                ? "warning"
                                                : request.status === "fulfilled"
                                                    ? "success"
                                                    : "secondary"
                                                }`}
                                            style={{ textTransform: "uppercase", padding: "12px 16px" }}
                                        >
                                            {request.status}
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="10" className="text-center" style={{ padding: "12px 16px" }}>
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
