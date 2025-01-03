// Admin Dashboard Home Page Layout
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

function AdminDashboard() {
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
                        <h1>Welcome, Admin!</h1>
                        <p>Manage donations, track user activities, and view analytics from here.</p>
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
                            <div className="card-header">Total Users</div>
                            <div className="card-body">
                                <h5 className="card-title">200 Users</h5>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-3">
                        <div className="card text-white bg-warning mb-3">
                            <div className="card-header">Food Wasted</div>
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
                            <li className="list-group-item">New User Registration: John Doe (Hotel)</li>
                            <li className="list-group-item">Food Donation Received: 100 Kg of Rice</li>
                            <li className="list-group-item">Donation Matched with Volunteer: 50 Kg of Fruits</li>
                        </ul>
                    </div>
                </div>

                {/* Analytics Summary Section */}
                <div className="row mb-4">
                    <div className="col-12">
                        <h3>Food Wastage Analytics</h3>
                        {/* Placeholder for Chart */}
                        <div className="chart-placeholder" style={{ height: '300px', backgroundColor: '#f0f0f0' }}>
                            <p>Chart showing food wastage trends over time.</p>
                        </div>
                    </div>
                </div>

                {/* Actionable Shortcuts Section */}
                <div className="row">
                    <div className="col-md-4">
                        <button className="btn btn-success btn-block">Add New Donation</button>
                    </div>
                    <div className="col-md-4">
                        <button className="btn btn-primary btn-block">Manage Users</button>
                    </div>
                    <div className="col-md-4">
                        <button className="btn btn-info btn-block">View Detailed Analytics</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AdminDashboard;
