import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FaUser, FaCog, FaMoon, FaSun, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa';
import { useAuth } from "../../store/auth";
import { NavLink } from "react-router-dom";
function Settings() {
    const { user } = useAuth();
    const { username, email, address } = user || {};
    const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');

    useEffect(() => {
        document.body.style.backgroundColor = theme === 'dark' ? '#343a40' : '#ffffff';
        document.body.style.color = theme === 'dark' ? '#ffffff' : '#000000';
        localStorage.setItem('theme', theme);
    }, [theme]);


    const toggleTheme = () => {
        setTheme(theme === 'light' ? 'dark' : 'light');
    };

    return (
        <div className="container-fluid" style={{ minHeight: '89vh', paddingTop: '60px' }}>
            <div className="content" style={{ marginLeft: '200px', padding: '20px' }}>
                <h2><FaCog className="me-2" />Hotel Settings</h2>

                {/* Hotel Profile Section */}
                <div className="card p-3 mb-4" style={{ backgroundColor: theme === 'dark' ? '#495057' : '#ffffff', color: theme === 'dark' ? '#ffffff' : '#000000' }}>
                    <h4>Hotel Profile</h4>
                    <p><FaUser className="me-2 text-primary" /> <strong>Name:</strong> {username || "N/A"}</p>
                    <p><FaEnvelope className="me-2 text-success" /> <strong>Email:</strong> {email || "N/A"}</p>
                    <p><FaMapMarkerAlt className="me-2 text-danger" /> <strong>Address:</strong> {address || "N/A"}</p>
                </div>

                {/* General Settings Section */}
                <div className="card p-3 mb-4" style={{ backgroundColor: theme === 'dark' ? '#495057' : '#ffffff', color: theme === 'dark' ? '#ffffff' : '#000000' }}>
                    <h4><FaCog className="me-2" /> General Settings</h4>
                    <p>Manage your hotel settings and preferences.</p>
                    <NavLink to={"/profile"} className="w-100">
                        <button className="btn btn-primary w-100">Update Profile</button>
                    </NavLink>
                </div>

                {/* Theme Toggle */}
                <div className="card p-3" style={{ backgroundColor: theme === 'dark' ? '#495057' : '#ffffff', color: theme === 'dark' ? '#ffffff' : '#000000' }}>
                    <h4><FaMoon className="me-2" /> Theme Settings</h4>
                    <p>Switch between Light and Dark mode.</p>
                    <button onClick={toggleTheme} className="btn btn-secondary">
                        {theme === 'light' ? <><FaMoon className="me-2" /> Dark Mode</> : <><FaSun className="me-2" /> Light Mode</>}
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Settings;
