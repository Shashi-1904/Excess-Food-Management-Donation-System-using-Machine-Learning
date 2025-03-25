import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FaUser, FaCog, FaMoon, FaSun, FaEnvelope, FaMapMarkerAlt, FaToggleOn, FaToggleOff } from 'react-icons/fa';
import { useAuth } from "../../store/auth";
import { NavLink } from "react-router-dom";
import { toast } from 'react-toastify';

function VolunteerSettings() {
    const { user, authorizationToken, API } = useAuth();
    const { username, email, address, isActive } = user || {};

    const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');
    const [activeStatus, setActiveStatus] = useState(isActive);

    useEffect(() => {
        document.body.style.backgroundColor = theme === 'dark' ? '#343a40' : '#ffffff';
        document.body.style.color = theme === 'dark' ? '#ffffff' : '#000000';
        localStorage.setItem('theme', theme);
    }, [theme]);

    const toggleTheme = () => {
        setTheme(theme === 'light' ? 'dark' : 'light');
    };

    const toggleStatus = async () => {
        try {
            const newStatus = !activeStatus;

            const response = await fetch(`${API}/api/volunteer/update-volunteer-status`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: authorizationToken
                },
                body: JSON.stringify({ isActive: newStatus })
            });

            const data = await response.json();

            if (response.ok) {
                setActiveStatus(newStatus);
                toast.success(`Status updated to ${newStatus ? 'Active' : 'Inactive'}`);
            } else {
                toast.error(data.message || "Failed to update status.");
            }
        } catch (error) {
            console.error("Error updating status:", error);
            toast.error("An error occurred. Please try again.");
        }
    };

    return (
        <div className="container-fluid" style={{ minHeight: '89vh', paddingTop: '60px' }}>
            <div className="content" style={{ marginLeft: '200px', padding: '20px' }}>
                <h2><FaCog className="me-2" />Volunteer Settings</h2>

                {/* Volunteer Profile Section */}
                <div className="card p-3 mb-4" style={{ backgroundColor: theme === 'dark' ? '#495057' : '#ffffff', color: theme === 'dark' ? '#ffffff' : '#000000' }}>
                    <h4>Volunteer Profile</h4>
                    <p><FaUser className="me-2 text-primary" /> <strong>Name:</strong> {username || "N/A"}</p>
                    <p><FaEnvelope className="me-2 text-success" /> <strong>Email:</strong> {email || "N/A"}</p>
                    <p><FaMapMarkerAlt className="me-2 text-danger" /> <strong>Address:</strong> {address || "N/A"}</p>
                </div>

                {/* General Settings Section */}
                <div className="card p-3 mb-4" style={{ backgroundColor: theme === 'dark' ? '#495057' : '#ffffff', color: theme === 'dark' ? '#ffffff' : '#000000' }}>
                    <h4><FaCog className="me-2" /> General Settings</h4>
                    <p>Manage your volunteer settings and preferences.</p>
                    <NavLink to={"/profile"} className="w-100">
                        <button className="btn btn-primary w-100">Update Profile</button>
                    </NavLink>
                </div>

                {/* Theme Toggle */}
                <div className="card p-3 mb-4" style={{ backgroundColor: theme === 'dark' ? '#495057' : '#ffffff', color: theme === 'dark' ? '#ffffff' : '#000000' }}>
                    <h4><FaMoon className="me-2" /> Theme Settings</h4>
                    <p>Switch between Light and Dark mode.</p>
                    <button onClick={toggleTheme} className="btn btn-secondary">
                        {theme === 'light' ? <><FaMoon className="me-2" /> Dark Mode</> : <><FaSun className="me-2" /> Light Mode</>}
                    </button>
                </div>

                {/* Active/Inactive Toggle */}
                <div className="card p-3" style={{ backgroundColor: theme === 'dark' ? '#495057' : '#ffffff', color: theme === 'dark' ? '#ffffff' : '#000000' }}>
                    <h4><FaToggleOn className="me-2" /> Status Settings</h4>
                    <p>Change your active status.</p>
                    <button onClick={toggleStatus} className={`btn ${activeStatus ? 'btn-success' : 'btn-danger'}`}>
                        {activeStatus
                            ? <><FaToggleOn className="me-2" /> Active</>
                            : <><FaToggleOff className="me-2" /> Inactive</>
                        }
                    </button>
                </div>
            </div>
        </div>
    );
}

export default VolunteerSettings;
