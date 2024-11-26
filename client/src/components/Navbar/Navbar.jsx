import React from 'react';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../../store/auth';
import { useNavigate } from 'react-router-dom';
import "./Navbar.css";

export default function Navbar() {
    const { isLoggedIn, LogoutUser } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        LogoutUser();
        navigate('/'); // Redirect to homepage
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
                                    <li>
                                        <NavLink
                                            to="/admin"
                                            className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}
                                        >
                                            Admin
                                        </NavLink>
                                    </li>
                                    <li>
                                        <button onClick={handleLogout} className="nav-link logout-button">
                                            Logout
                                        </button>
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
