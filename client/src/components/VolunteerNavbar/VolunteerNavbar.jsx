// components/Navbar/VolunteerNavbar.js
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../../store/auth';
import { FaHome, FaCog, FaSignOutAlt, FaTachometerAlt, FaHandsHelping, FaSearchLocation, FaHistory } from 'react-icons/fa'; // Add necessary icons

function VolunteerNavbar() {
    const { isLoggedIn, LogoutUser, user } = useAuth();

    const handleLogout = () => {
        LogoutUser();
    };

    return (
        <div className="container-fluid">
            {/* Horizontal Navbar */}
            <nav className="navbar navbar-expand-lg navbar-light fixed-top" style={{ backgroundColor: '#28a745' }}>
                <NavLink className="navbar-brand text-white" to="/volunteer" style={{ fontSize: '24px', fontWeight: 'bold', marginLeft: "0.7em" }}>
                    Volunteer Panel
                </NavLink>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav ms-auto">
                        <li className="nav-item mx-3">
                            <NavLink className="nav-link text-white" to="/">
                                <FaHome /> Return to Home
                            </NavLink>
                        </li>
                        <li className="nav-item mx-3">
                            <NavLink className="nav-link text-white" to="/volunteer/mysettings">
                                <FaCog /> Settings
                            </NavLink>
                        </li>
                        <li>
                            <a onClick={handleLogout} className="nav-link logout-button">
                                <FaSignOutAlt className="me-2" /> Logout
                            </a>
                        </li>
                    </ul>
                </div>
            </nav>

            {/* Vertical Sidebar Navbar */}
            <div className="d-flex">
                <div className="sidebar bg-success p-3" style={{ width: '200px', height: '100vh', position: 'fixed', top: '0', left: '0' }}>
                    <ul className="nav flex-column text-white">
                        <li className="nav-item">
                            <a className="nav-link text-white" href="#">
                                <FaTachometerAlt /> Dashboard
                            </a>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link text-white" to="/volunteer/assigneddonations">
                                <FaHandsHelping /> My Assigned Donations
                            </NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link text-white" to="/volunteer/mymatchingrequests">
                                <FaSearchLocation /> Matching Requests
                            </NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link text-white" to="/volunteer/getrecommendations">
                                <FaSearchLocation /> Recommen -ded Locations
                            </NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link text-white" to="/volunteer/mydonationhistory">
                                <FaHistory /> My Donations History
                            </NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link text-white" to="/volunteer/mysettings">
                                <FaCog /> Settings
                            </NavLink>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default VolunteerNavbar;
