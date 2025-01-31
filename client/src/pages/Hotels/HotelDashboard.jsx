import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useAuth } from "../../store/auth";

function HotelDashboard() {
    const { authorizationToken, API } = useAuth();

    const [totalDonated, setTotalDonated] = useState(0);
    const [totalWastage, setTotalWastage] = useState(0);
    const [previousDonationStatus, setPreviousDonationStatus] = useState("No donations yet");
    const [latestDonation, setLatestDonation] = useState("No new donations");

    useEffect(() => {
        const fetchDonationHistory = async () => {
            try {
                const response = await fetch(`${API}/api/hotel/history`, {
                    headers: {
                        Authorization: authorizationToken,
                    },
                });

                const data = await response.json();

                if (response.ok) {
                    if (data.length > 0) {
                        const totalQty = data.reduce((sum, donation) => sum + donation.quantity, 0);


                        setTotalDonated(totalQty);


                        setPreviousDonationStatus(data[data.length - 1].status || "Unknown");
                        setLatestDonation(data[data.length - 1].foodName || "Unknown Item");
                    }
                } else {
                    console.error("Failed to fetch donation history:", data.message);
                }
            } catch (error) {
                console.error('Error fetching donation history:', error);
            }
        };

        fetchDonationHistory();
    }, [API, authorizationToken]);

    return (
        <div className="container-fluid" style={{
            display: 'flex',
            minHeight: '90vh',
            paddingTop: '60px',
        }}>
            {/* Main Content Area */}
            <div className="content" style={{
                marginLeft: '200px',
                width: 'calc(100% - 200px)',
                overflowY: 'auto',
                padding: '20px',
                zIndex: '500',
            }}>
                {/* Welcome Section */}
                <div className="row mb-4">
                    <div className="col-12">
                        <h1>Welcome, Hotel Manager!</h1>
                        <p>Track food donations, view analytics, and manage operations efficiently from here.</p>
                    </div>
                </div>

                {/* Key Stats Section */}
                <div className="row mb-4">
                    <div className="col-md-3">
                        <div className="card text-white bg-success mb-3">
                            <div className="card-header">Total Food Donated</div>
                            <div className="card-body">
                                <h5 className="card-title">{totalDonated} Kg</h5>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-3">
                        <div className="card text-white bg-primary mb-3">
                            <div className="card-header">Total Volunteers</div>
                            <div className="card-body">
                                <h5 className="card-title">75 Volunteers</h5>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-3">
                        <div className="card text-white bg-warning mb-3">
                            <div className="card-header">Previous Donation Status</div>
                            <div className="card-body">
                                <h5 className="card-title">{previousDonationStatus}</h5>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-3">
                        <div className="card text-white bg-info mb-3">
                            <div className="card-header">Total Food Wastage</div>
                            <div className="card-body">
                                <h5 className="card-title">{totalDonated} Kg</h5>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Recent Activities Section */}
                <div className="row mb-4" style={{ marginTop: '5em' }}>
                    <div className="col-12">
                        <h2>Recent Activities</h2>
                        <ul className="list-group">
                            <li className="list-group-item">New Donation Added: {latestDonation}</li>
                            <li className="list-group-item">Previous Donation Status: {previousDonationStatus}</li>
                            <li className="list-group-item">Wastage Data Submitted for Analytics</li>
                        </ul>
                    </div>
                </div>

                {/* Actionable Shortcuts Section */}
                <div className="row" style={{ marginTop: '8em' }}>
                    <div className="col-md-4">
                        <button className="btn btn-success btn-block">Add New Donation</button>
                    </div>
                    <div className="col-md-4">
                        <button className="btn btn-primary btn-block">Hotel Analytics</button>
                    </div>
                    <div className="col-md-4">
                        <button className="btn btn-info btn-block">View Previous Donations</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default HotelDashboard;
