// components/VolunteerDashboard.js
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

function VolunteerDashboard() {
    return (
        <div className="container-fluid" style={{
            display: 'flex',
            minHeight: '100vh', // Ensure the content covers the full screen height
            paddingTop: '60px', // Space for the horizontal navbar
        }}>
            {/* Main Content Area */}
            <div
                className="content"
                style={{
                    marginLeft: '200px',  // Reserve space for the sidebar
                    width: 'calc(100% - 200px)',  // Ensure the content takes the rest of the width
                    overflowY: 'auto', // Make sure content is scrollable vertically if needed
                    padding: '20px',
                    zIndex: '500', // Ensure content is below the fixed navbar and sidebar
                }}
            >
                {/* Welcome Section */}
                <div className="row mb-4">
                    <div className="col-12">
                        <h1>Welcome, Volunteer!</h1>
                        <p>View donations, track food requests, and take actions to help those in need.</p>
                    </div>
                </div>

                {/* Key Stats Section */}
                <div className="row mb-4">
                    <div className="col-md-3">
                        <div className="card text-white bg-success mb-3">
                            <div className="card-header">Total Donations</div>
                            <div className="card-body">
                                <h5 className="card-title">150 Donations</h5>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-3">
                        <div className="card text-white bg-primary mb-3">
                            <div className="card-header">Total Requests</div>
                            <div className="card-body">
                                <h5 className="card-title">200 Requests</h5>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-3">
                        <div className="card text-white bg-warning mb-3">
                            <div className="card-header">Food Distributed</div>
                            <div className="card-body">
                                <h5 className="card-title">500 Kg</h5>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-3">
                        <div className="card text-white bg-info mb-3">
                            <div className="card-header">Active Volunteers</div>
                            <div className="card-body">
                                <h5 className="card-title">50 Volunteers</h5>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Recent Activities Section */}
                <div className="row mb-4">
                    <div className="col-12">
                        <h3>Recent Activities</h3>
                        <ul className="list-group">
                            <li className="list-group-item">New Donation Matched: 100 Kg of Rice</li>
                            <li className="list-group-item">Food Donation Collected: 50 Kg of Fruits</li>
                            <li className="list-group-item">Volunteer Assigned to a Donation: 20 Kg of Bread</li>
                        </ul>
                    </div>
                </div>

                {/* Analytics Summary Section */}
                <div className="row mb-4">
                    <div className="col-12">
                        <h3>Food Distribution Analytics</h3>
                        {/* Placeholder for Chart */}
                        <div className="chart-placeholder" style={{ height: '300px', backgroundColor: '#f0f0f0' }}>
                            <p>Chart showing food distribution trends over time.</p>
                        </div>
                    </div>
                </div>

                {/* Actionable Shortcuts Section */}
                <div className="row">
                    <div className="col-md-4">
                        <button className="btn btn-success btn-block">View Food Requests</button>
                    </div>
                    <div className="col-md-4">
                        <button className="btn btn-primary btn-block">Take Action on Donation</button>
                    </div>
                    <div className="col-md-4">
                        <button className="btn btn-info btn-block">View Donation Details</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default VolunteerDashboard;
