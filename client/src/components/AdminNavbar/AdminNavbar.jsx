import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../../store/auth';
import { FaHome, FaUsers, FaDonate, FaChartBar, FaCog, FaSignOutAlt } from 'react-icons/fa';
import { MdMessage } from 'react-icons/md';

function AdminNavbar() {
    const { isLoggedIn, LogoutUser, user } = useAuth();

    const handleLogout = () => {
        LogoutUser();
    };

    return (
        <div className="container-fluid">
            {/* Horizontal Navbar */}
            <nav className="navbar navbar-expand-lg navbar-light fixed-top" style={{ backgroundColor: '#28a745' }}>
                <NavLink className="navbar-brand text-white" to="/admin" style={{ fontSize: '24px', fontWeight: 'bold', marginLeft: "0.7em" }}>
                    Admin Panel
                </NavLink>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav ms-auto">
                        <li className="nav-item mx-3">
                            <NavLink className="nav-link text-white" to="/">
                                <FaHome className="me-2" />Return to Home
                            </NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link text-white" to="/admin/settings">
                                <FaCog className="me-2" /> Settings
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
                                <FaHome className="me-2" /> Dashboard
                            </a>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link text-white" to="/admin/getusers">
                                <FaUsers className="me-2" /> User Management
                            </NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link text-white" to="/admin/getdonations">
                                <FaDonate className="me-2" /> Food Donations
                            </NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link text-white" to="/admin/requests">
                                <FaDonate className="me-2" /> Food Requests
                            </NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link text-white" to="/admin/contacts">
                                <MdMessage className="me-2" /> User Inquiries
                            </NavLink>
                        </li>
                        {/* <li className="nav-item">
                            <a className="nav-link text-white" href="">
                                <FaChartBar className="me-2" /> Analytics
                            </a>
                        </li> */}
                        <li className="nav-item">
                            <NavLink className="nav-link text-white" to="/admin/settings">
                                <FaCog className="me-2" /> Settings
                            </NavLink>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default AdminNavbar;
