import React from 'react';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../../store/auth';
import { useNavigate } from 'react-router-dom';
import { Toast } from 'react-bootstrap';
import "./Navbar.css";

export default function Navbar() {
    const { isLoggedIn, LogoutUser, user } = useAuth();
    // const navigate = useNavigate();

    const handleLogout = () => {
        LogoutUser();
    };

    return (
        <>
            <header>
                <div className="container">
                    <div className="logo-brand">
                        <img src="/images/logo.png" alt="logo" height="40" width="40" />
                        <NavLink to={"/"}> ServeSurplus</NavLink>
                    </div>
                    <nav>
                        <ul>
                            {/* Always visible links */}
                            <li>
                                <NavLink
                                    to="/"
                                    className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}
                                >
                                    Home
                                </NavLink>
                            </li>
                            <li>
                                <NavLink
                                    to="/donatefood"
                                    className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}
                                >
                                    Donate Food
                                </NavLink>
                            </li>
                            <li>
                                <NavLink
                                    to="/about"
                                    className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}
                                >
                                    About
                                </NavLink>
                            </li>
                            <li>
                                <NavLink
                                    to="/contact"
                                    className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}
                                >
                                    Contact
                                </NavLink>
                            </li>

                            {/* Conditionally rendered links based on isLoggedIn */}
                            {isLoggedIn ? (
                                <>
                                    {/* Ensure user is not null before accessing role */}
                                    {user && user.role === 'admin' && ( // Check if the user is an admin
                                        <li>
                                            <NavLink
                                                to="/admin"
                                                className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}
                                            >
                                                Admin
                                            </NavLink>
                                        </li>
                                    )}

                                    {user && user.role === 'volunteer' && ( // Check if the user is a volunteer
                                        <li>
                                            <NavLink
                                                to="/volunteer"
                                                className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}
                                            >
                                                Volunteer Dashboard
                                            </NavLink>
                                        </li>
                                    )}

                                    <li>
                                        <a onClick={handleLogout} className="nav-link logout-button">
                                            Logout
                                        </a>
                                    </li>
                                </>
                            ) : (
                                <>
                                    <li>
                                        <NavLink
                                            to="/register"
                                            className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}
                                        >
                                            Register
                                        </NavLink>
                                    </li>
                                    <li>
                                        <NavLink
                                            to="/login"
                                            className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}
                                        >
                                            Login
                                        </NavLink>
                                    </li>
                                </>
                            )}
                        </ul>
                    </nav>
                </div>
            </header>
        </>
    );
}
