import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useAuth } from "../../store/auth";
import { toast } from "react-toastify";

function MyDonationHistory() {
    const [donations, setDonations] = useState([]);
    const { authorizationToken, API } = useAuth();

    useEffect(() => {
        const fetchCompletedDonations = async () => {
            try {
                const response = await fetch(`${API}/api/volunteer/assigned-donations`, {
                    headers: {
                        Authorization: authorizationToken,
                    },
                });
                const data = await response.json();

                if (response.ok && data.donations) {
                    // Filter donations with status 'completed'
                    const completedDonations = data.donations.filter(
                        (donation) => donation.status === "completed" || donation.status === "expired"
                    );
                    setDonations(completedDonations);
                } else {
                    toast.error(data.message || 'Failed to fetch donation history.');
                }
            } catch (error) {
                console.error('Error fetching completed donations:', error);
                toast.error('An error occurred while fetching donation history.');
            }
        };

        fetchCompletedDonations();
    }, [API, authorizationToken]);

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
                <h1 className="mb-4">My Donation History</h1>

                {donations.length === 0 ? (
                    <div className="alert alert-warning">No completed donations found.</div>
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
                                        {/* <p><strong>Date Completed: </strong>{new Date(donation.completedDate).toLocaleDateString()}</p> */}
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
                                        <p className="mb-0">Donation {donation.status}</p>
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

export default MyDonationHistory;
