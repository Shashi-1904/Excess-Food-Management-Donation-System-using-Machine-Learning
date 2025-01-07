// components/Navbar/HotelNavbar.js
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { NavLink } from 'react-router-dom';

function HotelNavbar() {
    return (
        <div className="container-fluid">
            {/* Horizontal Navbar */}
            <nav className="navbar navbar-expand-lg navbar-light fixed-top" style={{ backgroundColor: '#28a745' }}>
                <NavLink className="navbar-brand text-white" to="/hotel" style={{ fontSize: '24px', fontWeight: 'bold' }}>
                    Hotel Panel
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
                    <ul className="navbar-nav ms-auto"> {/* Aligns items to the right */}
                        <li className="nav-item mx-3"> {/* Adds spacing between items */}
                            <NavLink className="nav-link text-white" to="/">
                                Home
                            </NavLink>
                        </li>
                        <li className="nav-item mx-3">
                            <a className="nav-link text-white" href="#">
                                Settings
                            </a>
                        </li>
                        <li className="nav-item mx-3">
                            <a className="nav-link text-white" href="#">
                                Logout
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
                            <a className="nav-link text-white" href="#">
                                Dashboard
                            </a>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link text-white" to="/hotel/addfood">
                                Add Food
                            </NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link text-white" to="/hotel/foodwastage">
                                Food Wastage
                            </NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link text-white" to="/hotel/analytics">
                                Hotel Analytics
                            </NavLink>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link text-white" href="#">
                                Settings
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default HotelNavbar;
