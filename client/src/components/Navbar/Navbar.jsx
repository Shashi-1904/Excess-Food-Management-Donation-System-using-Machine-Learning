import React from 'react';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../../store/auth';
import "./Navbar.css";

export default function Navbar() {
    const { isLoggedIn, LogoutUser, user } = useAuth();

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

                            {/* Conditionally rendered links based on user role */}
                            {isLoggedIn && user && (
                                <>
                                    {user.role === 'admin' && (
                                        <li>
                                            <NavLink
                                                to="/admin"
                                                className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}
                                            >
                                                Admin Dashboard
                                            </NavLink>
                                        </li>
                                    )}
                                    {user.role === 'volunteer' && (
                                        <li>
                                            <NavLink
                                                to="/volunteer"
                                                className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}
                                            >
                                                Volunteer Dashboard
                                            </NavLink>
                                        </li>
                                    )}
                                    {user.role === 'hotel' && (
                                        <li>
                                            <NavLink
                                                to="/hotel"
                                                className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}
                                            >
                                                Hotel Dashboard
                                            </NavLink>
                                        </li>
                                    )}
                                    {user.role === 'NGO' && (
                                        <>
                                            <li>
                                                <NavLink
                                                    to="/foodrequest"
                                                    className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}
                                                >
                                                    Request Food
                                                </NavLink>
                                            </li>
                                            <li>
                                                <NavLink
                                                    to="/ngo/donations"
                                                    className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}
                                                >
                                                    Available Donations
                                                </NavLink>
                                            </li>
                                        </>
                                    )}

                                    <li>
                                        <NavLink
                                            to="/profile"
                                            className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}
                                        >
                                            Profile
                                        </NavLink>
                                    </li>
                                </>
                            )}


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

                            {/* Auth Links */}
                            {isLoggedIn ? (
                                <li>
                                    <a onClick={handleLogout} className="nav-link logout-button">
                                        Logout
                                    </a>
                                </li>
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
