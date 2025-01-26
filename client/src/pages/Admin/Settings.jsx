import React, { useState } from 'react';
import { FaUser, FaBell, FaCogs } from 'react-icons/fa'; // React Icons

function Settings() {
    const [profile, setProfile] = useState({
        name: 'Admin Name',
        email: 'admin@example.com',
    });

    const handleProfileChange = (e) => {
        const { name, value } = e.target;
        setProfile({ ...profile, [name]: value });
    };

    const handleSaveProfile = () => {
        alert('Profile updated successfully!');
        // Save profile changes to the database via API
    };

    return (
        <div className="container mt-5">
            <h2 className="mb-4 text-center">Settings</h2>

            <div className="row">
                {/* User Profile Settings */}
                <div className="col-md-12 mb-4">
                    <div className="card shadow-sm rounded">
                        <div className="card-header bg-success text-white">
                            <FaUser className="me-2" /> Profile Settings
                        </div>
                        <div className="card-body">
                            <form>
                                <div className="mb-3">
                                    <label className="form-label">Name</label>
                                    <input
                                        type="text"
                                        name="name"
                                        value={profile.name}
                                        onChange={handleProfileChange}
                                        className="form-control shadow-sm"
                                        placeholder="Enter your name"
                                    />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Email</label>
                                    <input
                                        type="email"
                                        name="email"
                                        value={profile.email}
                                        onChange={handleProfileChange}
                                        className="form-control shadow-sm"
                                        placeholder="Enter your email"
                                    />
                                </div>
                                <button
                                    type="button"
                                    className="btn btn-success w-100 py-2 shadow-sm"
                                    onClick={handleSaveProfile}
                                >
                                    Save Changes
                                </button>
                            </form>
                        </div>
                    </div>
                </div>

                {/* System Configuration */}
                <div className="col-md-12 mb-4">
                    <div className="card shadow-sm rounded">
                        <div className="card-header bg-warning text-white">
                            <FaBell className="me-2" /> System Configuration
                        </div>
                        <div className="card-body">
                            <div className="form-check mb-3">
                                <input type="checkbox" className="form-check-input" id="emailAlerts" />
                                <label className="form-check-label" htmlFor="emailAlerts">
                                    Enable Email Alerts
                                </label>
                            </div>
                            <div className="form-check mb-3">
                                <input type="checkbox" className="form-check-input" id="volunteerNotifications" />
                                <label className="form-check-label" htmlFor="volunteerNotifications">
                                    Enable Volunteer Notifications
                                </label>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Access Control */}
                <div className="col-md-12 mb-4">
                    <div className="card shadow-sm rounded">
                        <div className="card-header bg-info text-white">
                            <FaCogs className="me-2" /> Access Control
                        </div>
                        <div className="card-body">
                            <p>Manage roles and permissions for users in the system.</p>
                            <button className="btn btn-warning w-100 py-2 shadow-sm">
                                View Users & Manage Roles
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Settings;
