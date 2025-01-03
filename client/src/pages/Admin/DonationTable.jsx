import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { useAuth } from '../../store/auth';

function DonationTable() {
    const [donations, setDonations] = useState([]);
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
                        setDonations(result.data); // Access the nested `data` field
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

    return (
        <div
            className="container-fluid"
            style={{
                display: 'flex',
                minHeight: '100vh',
                paddingTop: '60px',
            }}
        >
            <div
                className="content"
                style={{
                    marginLeft: '200px',
                    width: 'calc(100% - 200px)',
                    overflowY: 'auto',
                    padding: '20px',
                    zIndex: '500',
                }}
            >
                <div className="row mb-4">
                    <div className="col-12">
                        <h2 style={{ fontSize: '2rem' }}>All Donations</h2>
                        <p style={{ fontSize: '1.2rem' }}>View and manage all food donations from this page.</p>
                    </div>
                </div>

                {/* Donation Table */}
                <div className="table-responsive">
                    <table
                        className="table table-striped table-hover"
                        style={{ fontSize: '1.4rem' }}
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
                                            className={`text-${donation.status === 'pending'
                                                ? 'warning'
                                                : donation.status === 'assigned'
                                                    ? 'info'
                                                    : 'success'
                                                }`}
                                        >
                                            {donation.status}
                                        </td>
                                        <td>{donation.assignedTo || 'Not Assigned'}</td>
                                        <td>
                                            <button className="btn btn-sm btn-primary mr-2">Edit</button>
                                            <button className="btn btn-sm btn-danger mr-2">Delete</button>
                                            <button className="btn btn-sm btn-success">Assign</button>
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
        </div>

    );
}

export default DonationTable;
