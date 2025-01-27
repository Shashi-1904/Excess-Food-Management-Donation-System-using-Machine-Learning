import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useAuth } from "../../store/auth";
import { toast } from "react-toastify";

function AssignedDonations() {
    const [donations, setDonations] = useState([]);
    const [actionDropdown, setActionDropdown] = useState(null);
    const { authorizationToken, API } = useAuth();

    useEffect(() => {
        const fetchAssignedDonations = async () => {
            try {
                const response = await fetch(`${API}/api/volunteer/assigned-donations`, {
                    headers: {
                        Authorization: authorizationToken,
                    },
                });
                const data = await response.json();

                if (response.ok && data.donations) {
                    // Filter out donations with status 'completed'
                    const filteredDonations = data.donations.filter(
                        (donation) => donation.status !== 'completed'
                    );
                    setDonations(filteredDonations);
                } else {
                    toast.error(data.message || 'Failed to fetch donations.');
                }
            } catch (error) {
                console.error('Error fetching donations:', error);
                toast.error('An error occurred while fetching donations.');
            }
        };

        fetchAssignedDonations();
    }, [API, authorizationToken]);


    const handleActionClick = (donationId) => {
        setActionDropdown(actionDropdown === donationId ? null : donationId);
    };

    const handleStatusChange = async (donationId, status) => {
        try {
            const response = await fetch(`${API}/api/volunteer/update-donation-status`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: authorizationToken,
                },
                body: JSON.stringify({ donationId, status }),
            });

            const data = await response.json();

            if (response.ok) {
                toast.success(data.message); // Notify the user

                setDonations((prevDonations) => {
                    if (status === 'completed') {
                        // Remove the donation with the given ID if the status is 'completed'
                        return prevDonations.filter((donation) => donation._id !== donationId);
                    }
                    // Update the status for the specific donation
                    return prevDonations.map((donation) =>
                        donation._id === donationId ? { ...donation, status } : donation
                    );
                });
            } else {
                toast.error(data.message || 'Failed to update the donation status.');
            }
        } catch (error) {
            console.error('Error updating donation status:', error);
            toast.error('An error occurred. Please try again.');
        } finally {
            setActionDropdown(null); // Close the dropdown after updating
        }
    };



    const handleGetRoute = (donationId) => {
        console.log(`Get route for Donation ID: ${donationId}`);
    };

    return (
        <div className="container-fluid" style={{
            display: 'flex',
            minHeight: '100vh',
            paddingTop: '60px',
        }}>
            <div className="content" style={{
                marginLeft: '200px',
                width: 'calc(100% - 200px)',
                overflowY: 'auto',
                padding: '20px',
            }}>
                <h1 className="mb-4">Assigned Donations</h1>

                {donations.length === 0 ? (
                    <div className="alert alert-warning">No donations assigned to you.</div>
                ) : (
                    <div className="row">
                        {donations.map((donation) => (
                            <div key={donation._id} className="col-md-4 mb-4">
                                <div
                                    className="card"
                                    style={{
                                        border: 'none',
                                        borderRadius: '10px',
                                        background: 'linear-gradient(145deg,rgb(255, 255, 255),rgb(252, 252, 252))',
                                        boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
                                        color: '#2d572c',
                                    }}
                                >
                                    <div
                                        className="card-header"
                                        style={{
                                            backgroundColor: 'rgb(36, 177, 26)',
                                            color: '#fff',
                                            borderRadius: '10px 10px 0 0',
                                            fontWeight: 'bold',
                                            textAlign: 'center',
                                            padding: '10px',
                                        }}
                                    >
                                        <h5 style={{ marginBottom: '5px' }}>{donation.foodName}</h5>
                                        <small>{donation.foodType} - {donation.category}</small>
                                    </div>
                                    <div className="card-body" style={{ padding: '15px' }}>
                                        <h5 className="card-title" style={{ marginBottom: '10px' }}>
                                            Quantity: {donation.quantity} Kg
                                        </h5>
                                        <p><strong>Expiry: </strong>{donation.expiry} days</p>
                                        <p><strong>Contact: </strong>{donation.phoneNumber}</p>
                                        <p><strong>Email: </strong>{donation.email}</p>
                                        <p><strong>Address: </strong>{donation.address}</p>
                                        <p><strong>Status: </strong>{donation.status}</p>
                                    </div>
                                    <div
                                        className="card-footer"
                                        style={{
                                            backgroundColor: 'rgb(36, 177, 26)',
                                            color: 'white',
                                            borderRadius: '0 0 10px 10px',
                                            textAlign: 'center',
                                            fontWeight: 'bold',
                                            padding: '10px',
                                        }}
                                    >
                                        <button
                                            className="btn btn-success"
                                            onClick={() => handleActionClick(donation._id)}
                                        >
                                            Actions
                                        </button>
                                        {actionDropdown === donation._id && (
                                            <div className="dropdown-menu show" style={{ position: 'absolute', zIndex: 1000 }}>
                                                <button
                                                    className="dropdown-item"
                                                    onClick={() => handleStatusChange(donation._id, 'picked')}
                                                >
                                                    Mark as Picked
                                                </button>
                                                <button
                                                    className="dropdown-item"
                                                    onClick={() => handleStatusChange(donation._id, 'completed')}
                                                >
                                                    Mark as Completed
                                                </button>
                                                <button
                                                    className="dropdown-item"
                                                    onClick={() => handleGetRoute(donation._id)}
                                                >
                                                    Get Route
                                                </button>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}

export default AssignedDonations;
