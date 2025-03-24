import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../../store/auth';
import { FaSignOutAlt, FaHome, FaCog, FaChartBar, FaUtensils, FaDonate, FaTachometerAlt, FaBell } from 'react-icons/fa';
import { FaHotel } from "react-icons/fa";
import { AiOutlineFileText } from "react-icons/ai";

function HotelNavbar() {
    const { LogoutUser, authorizationToken, API } = useAuth();
    const [notifications, setNotifications] = useState([]);
    const [showPopup, setShowPopup] = useState(false);
    const [hasNewNotification, setHasNewNotification] = useState(false);


    // Fetch Notifications
    useEffect(() => {
        const fetchNotifications = async () => {
            try {
                const response = await fetch(`${API}/api/hotel/hotel-notifications`, {
                    headers: {
                        Authorization: authorizationToken
                    }
                });

                if (response.ok) {
                    const data = await response.json();
                    if (data.success && data.notifications.length > 0) {
                        setNotifications(data.notifications);
                        setHasNewNotification(true); // Show dot if there are new notifications
                    }
                } else {
                    console.error('Failed to fetch notifications');
                }
            } catch (error) {
                console.error('Error fetching notifications:', error);
            }
        };

        fetchNotifications();
    }, [API, authorizationToken]);

    // Handle Logout
    const handleLogout = () => {
        LogoutUser();
    };

    // Toggle Popup
    const togglePopup = () => {
        setShowPopup(!showPopup);
        setHasNewNotification(false); // Hide dot when popup opens
    };

    return (
        <div className="container-fluid">
            {/* Horizontal Navbar */}
            <nav className="navbar navbar-expand-lg navbar-light fixed-top" style={{ backgroundColor: '#28a745' }}>
                <NavLink className="navbar-brand text-white" to="/hotel" style={{ fontSize: '24px', fontWeight: 'bold', marginLeft: "0.7em" }}>
                    <FaTachometerAlt className="me-2" /> Hotel Panel
                </NavLink>

                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarNav"
                    aria-controls="navbarNav"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav ms-auto">

                        <li className="nav-item mx-3">
                            <NavLink className="nav-link text-white" to="/">
                                <FaHome className="me-2" /> Return to Home
                            </NavLink>
                        </li>
                        <li className="nav-item mx-3">
                            <NavLink className="nav-link text-white" to="/hotel/settings">
                                <FaCog className="me-2" /> Settings
                            </NavLink>
                        </li>
                        <li
                            className="nav-item mx-3 position-relative"
                            onClick={togglePopup}
                            style={{ cursor: 'pointer', marginTop: '4px' }}
                        >
                            <FaBell className="text-white" size={20} />
                            {hasNewNotification && (
                                <span
                                    className="position-absolute"
                                    style={{
                                        top: '15%',      // Moved dot slightly lower
                                        left: '75%',     // Adjusted for better alignment
                                        transform: 'translate(-50%, -50%)',
                                        backgroundColor: 'red',
                                        color: 'white',
                                        borderRadius: '50%',
                                        width: '12px',
                                        height: '12px',
                                        fontSize: '8px',
                                        display: 'inline-block'
                                    }}
                                >
                                    •
                                </span>
                            )}
                        </li>

                        <li>
                            <a onClick={handleLogout} className="nav-link logout-button" style={{ cursor: 'pointer' }}>
                                <FaSignOutAlt className="me-2" /> Logout
                            </a>
                        </li>
                    </ul>
                </div>
            </nav>

            {/* Vertical Sidebar Navbar */}
            <div className="d-flex">
                <div
                    className="sidebar bg-success p-3"
                    style={{ width: '200px', height: '100vh', position: 'fixed', top: '0', left: '0' }}
                >
                    <ul className="nav flex-column text-white">
                        <li className="nav-item">
                            <NavLink className="nav-link text-white" to="/hotel">
                                <FaTachometerAlt className="me-2" /> Dashboard
                            </NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link text-white" to="/hotel/history">
                                <FaDonate className="me-2" /> My Donations
                            </NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link text-white" to="/hotel/foodwastage">
                                <FaUtensils className="me-2" />Food Wastage
                            </NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link text-white" to="/hotel/analytics">
                                <FaChartBar className="me-2" /> Hotel Analytics
                            </NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link text-white" to="/hotel/add-log">
                                <FaChartBar className="me-2" /> Add Log Details
                            </NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link text-white" to="/hotel/settings">
                                <FaCog className="me-2" /> Settings
                            </NavLink>
                        </li>
                    </ul>
                </div>
            </div>

            {/* Notification Popup */}
            {/* Notification Popup */}
            {showPopup && (
                <div
                    className="notification-popup card shadow-lg p-3"
                    style={{
                        position: 'fixed',
                        top: '70px',
                        right: '20px',
                        width: '350px',
                        zIndex: '1000',
                        backgroundColor: '#fff',
                        border: '1px solid #ccc',
                        borderRadius: '8px'
                    }}
                >
                    <div className="d-flex justify-content-between align-items-center">
                        <h5>Notifications</h5>
                        <button className="btn btn-sm btn-success" onClick={togglePopup}>Close</button>
                    </div>
                    <hr />
                    <div style={{ maxHeight: '300px', overflowY: 'auto' }}>
                        {notifications.length > 0 ? (
                            notifications.map((notification, index) => (
                                <div
                                    key={index}
                                    className="p-3 mb-2 text-white"
                                    style={{
                                        backgroundColor: notification.type === 'assignment' ? '#28a745' : '#218838',  // Green shades
                                        borderRadius: '6px',
                                        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)'
                                    }}
                                >
                                    <p className="m-0">{notification.message}</p>
                                    <small className="text-white-50">{new Date(notification.timestamp).toLocaleString()}</small>
                                </div>
                            ))
                        ) : (
                            <p>No new notifications.</p>
                        )}
                    </div>
                </div>
            )}

        </div>
    );
}

export default HotelNavbar;
