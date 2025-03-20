import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Modal, Button } from "react-bootstrap";
import { useAuth } from "../../store/auth";

function DonationTable() {
    const [donations, setDonations] = useState([]);
    const [selectedDonation, setSelectedDonation] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const { authorizationToken, API } = useAuth();

    // Fetch donations from the backend
    useEffect(() => {
        const fetchDonations = async () => {
            try {
                const response = await fetch(`${API}/api/admin/donations`, {
                    headers: {
                        Authorization: authorizationToken,
                    },
                });
                if (response.ok) {
                    const result = await response.json();
                    if (result.success) {
                        setDonations(result.data);
                    } else {
                        console.error("Failed to fetch donations:", result.message || "Unknown error");
                    }
                } else {
                    console.error("Error in response:", response.status, response.statusText);
                }
            } catch (error) {
                console.error("Error fetching donations:", error);
            }
        };

        fetchDonations();
    }, [authorizationToken]);

    // Handle click to show full donation details
    const handleViewDonation = (donation) => {
        setSelectedDonation(donation);
        setShowModal(true);
    };

    // Format date function
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleString("en-US", {
            day: "2-digit",
            month: "long",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit",
            hour12: true,
        });
    };

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
                        <h2 style={{ fontSize: "2rem" }}>All Donations</h2>
                        <p style={{ fontSize: "1.2rem" }}>
                            View and manage all food donations from this page.
                        </p>
                    </div>
                </div>

                {/* Donation Table */}
                <div className="table-responsive">
                    <table
                        className="table table-striped table-hover"
                        style={{ fontSize: "1.4rem" }}
                    >
                        <thead className="thead-dark">
                            <tr>
                                <th>#</th>
                                <th>Food Name</th>
                                <th>Food Type</th>
                                <th>Category</th>
                                <th>Quantity</th>
                                <th>Expiry (hrs)</th>
                                <th>Status</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {donations.length > 0 ? (
                                donations.map((donation, index) => (
                                    <tr key={donation._id}>
                                        <td>{index + 1}</td>
                                        <td>{donation.foodName}</td>
                                        <td>{donation.foodType}</td>
                                        <td>{donation.category}</td>
                                        <td>{donation.quantity}</td>
                                        <td>{donation.expiry}</td>
                                        <td
                                            className={`text-${donation.status === "pending"
                                                ? "warning"
                                                : donation.status === "assigned"
                                                    ? "info"
                                                    : "success"
                                                }`}
                                            style={{ textTransform: 'uppercase' }}
                                        >
                                            {donation.status}
                                        </td>
                                        <td>
                                            <button
                                                className="btn btn-sm btn-success"
                                                onClick={() => handleViewDonation(donation)}
                                            >
                                                View Full Donation
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="9" className="text-center">
                                        No donations found.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Full Donation Details Modal */}
            <Modal show={showModal} onHide={() => setShowModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Donation Details</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {selectedDonation ? (
                        <div>
                            <p><strong>Food Name:</strong> {selectedDonation.foodName}</p>
                            <p><strong>Food Type:</strong> {selectedDonation.foodType}</p>
                            <p><strong>Category:</strong> {selectedDonation.category}</p>
                            <p><strong>Quantity:</strong> {selectedDonation.quantity} kg</p>
                            <p><strong>Expiry:</strong> {selectedDonation.expiry} hours</p>
                            <p><strong>Email:</strong> {selectedDonation.email}</p>
                            <p><strong>Phone:</strong> {selectedDonation.phoneNumber}</p>
                            <p><strong>Address:</strong> {selectedDonation.address}</p>
                            <p><strong>Created At:</strong> {formatDate(selectedDonation.createdAt)}</p>
                            <p><strong>Expires At:</strong> {formatDate(selectedDonation.expiresAt)}</p>
                            <p>
                                <strong>Delivered To:</strong>{" "}
                                {selectedDonation.deliveredTo ? (
                                    selectedDonation.deliveredTo
                                ) : (
                                    "Not Assigned"
                                )}
                            </p>
                        </div>
                    ) : (
                        <p>No details available.</p>
                    )}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowModal(false)}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}

export default DonationTable;
