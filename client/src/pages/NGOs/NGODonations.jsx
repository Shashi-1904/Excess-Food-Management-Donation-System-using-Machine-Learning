import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useAuth } from "../../store/auth";
import { toast } from "react-toastify";

function NGODonations() {
    const [donations, setDonations] = useState([]);
    const { authorizationToken, API } = useAuth();

    useEffect(() => {
        const fetchAvailableDonations = async () => {
            try {
                const response = await fetch(`${API}/api/ngo/available-donations`, {
                    headers: {
                        Authorization: authorizationToken,
                    },
                });
                const data = await response.json();

                if (response.ok && data.success) {
                    if (data.data.length > 0) {
                        setDonations(data.data);
                        toast.success(data.message);
                    } else {
                        setDonations([]); // Clear donations if none are found
                        toast.info("No available donations found.");
                    }
                } else {
                    toast.error(data.message || 'Failed to fetch donations.');
                }
            } catch (error) {
                console.error('Error fetching donations:', error);
                toast.error('An error occurred while fetching donations.');
            }
        };

        fetchAvailableDonations();
    }, [API, authorizationToken]);


    const handleAcceptDonation = async (donationId) => {
        try {
            const response = await fetch(`${API}/api/ngo/request-donation`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: authorizationToken,
                },
                body: JSON.stringify({ donationId }),
            });

            const data = await response.json();

            if (response.ok) {
                toast.success('Donation accepted successfully.');
                // Remove the accepted donation from the list
                setDonations(donations.filter((donation) => donation._id !== donationId));
            } else {
                toast.error(data.message || 'Failed to accept the donation.');
            }
        } catch (error) {
            console.error('Error accepting donation:', error);
            toast.error('An error occurred while accepting the donation.');
        }
    };

    return (
        <div className="container-fluid" style={{
            display: 'flex',
            flexDirection: 'column',
            minHeight: '100vh',
            // paddingTop: '60px',
        }}>
            <div className="content" style={{
                width: '100%',
                overflowY: 'auto',
                padding: '20px',
            }}>
                <h1 className="mb-4">Available Donations</h1>

                {donations.length === 0 ? (
                    <div className="alert alert-warning">No available donations found.</div>
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
                                            className="btn btn-light"
                                            style={{ fontWeight: 'bold', color: 'rgb(36, 177, 26)' }}
                                            onClick={() => handleAcceptDonation(donation._id)}
                                        >
                                            Accept Donation
                                        </button>
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

export default NGODonations;
