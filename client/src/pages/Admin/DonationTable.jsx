import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Modal, Button, Toast } from "react-bootstrap";
import { useAuth } from "../../store/auth";
import { toast } from "react-toastify";

function DonationTable() {
    const [donations, setDonations] = useState([]);
    const [volunteerEmails, setVolunteerEmails] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [selectedDonationId, setSelectedDonationId] = useState(null);
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

    // Fetch volunteer emails
    const fetchVolunteerEmails = async () => {
        try {
            const response = await fetch(`${API}/api/admin/emails`, {
                headers: {
                    Authorization: authorizationToken,
                },
            });
            if (response.ok) {
                const result = await response.json();
                if (result.emails) {
                    setVolunteerEmails(result.emails);
                } else {
                    console.error("Failed to fetch emails:", result.message || "Unknown error");
                }
            } else {
                console.error("Error in response:", response.status, response.statusText);
            }
        } catch (error) {
            console.error("Error fetching emails:", error);
        }
    };


    // Handle assign button click
    const handleAssignClick = (donationId) => {
        setSelectedDonationId(donationId);
        fetchVolunteerEmails();
        setShowModal(true);
    };

    // Assign donation to volunteer
    const handleAssignDonation = async (email) => {
        try {
            const response = await fetch(`${API}/api/admin/assign-donation`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: authorizationToken,
                },
                body: JSON.stringify({
                    donationId: selectedDonationId,
                    userEmail: email,
                }),
            });

            const result = await response.json();
            if (response.ok && result.success) {
                toast.success("Donation successfully assigned!");
                setShowModal(false);
                // Refresh donations
                const updatedDonations = donations.map((donation) =>
                    donation._id === selectedDonationId
                        ? { ...donation, status: "assigned", assignedTo: email }
                        : donation
                );
                setDonations(updatedDonations);
            } else {
                toast.error(result.message || "Failed to assign donation.");
            }
        } catch (error) {
            console.error("Error assigning donation:", error);
            toast.error("Error assigning donation.");
        }
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
                                <th>Assigned To</th>
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
                                        <td>{donation.assignedTo || "Not Assigned"}</td>
                                        <td>
                                            <button
                                                className="btn btn-sm btn-success"
                                                onClick={() => handleAssignClick(donation._id)}
                                            >
                                                Assign
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

            {/* Assign Modal */}
            <Modal show={showModal} onHide={() => setShowModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Assign Donation</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <table className="table table-striped">
                        <thead>
                            <tr>
                                <th>Email</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {volunteerEmails.map((email) => (
                                <tr key={email}>
                                    <td>{email}</td>
                                    <td>
                                        <button
                                            className="btn btn-sm btn-primary"
                                            onClick={() => handleAssignDonation(email)}
                                        >
                                            Assign
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
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
