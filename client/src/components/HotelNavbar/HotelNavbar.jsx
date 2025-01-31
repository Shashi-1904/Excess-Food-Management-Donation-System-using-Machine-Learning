import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../../store/auth';
import { FaSignOutAlt, FaHome, FaCog, FaChartBar, FaUtensils, FaDonate, FaTachometerAlt } from 'react-icons/fa';

function HotelNavbar() {
    const { LogoutUser } = useAuth();

    const handleLogout = () => {
        LogoutUser();
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
                                <FaUtensils className="me-2" /> Food Wastage
                            </NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link text-white" to="/hotel/analytics">
                                <FaChartBar className="me-2" /> Hotel Analytics
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
        </div>
    );
}

export default HotelNavbar;