import React from 'react'
import { NavLink } from 'react-router-dom'
import "./Navbar.css"
export default function Navbar() {
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
                            <li><NavLink to="/" className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}>Home</NavLink></li>
                            <li><NavLink to="/" className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}>Donate Food</NavLink></li>
                            <li>
                                <NavLink to="/about" className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}>About</NavLink>
                            </li>
                            <li><NavLink to="/contact" className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}>Contact</NavLink></li>
                            <li><NavLink to="/register" className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}>Register</NavLink></li>
                            <li><NavLink to="/login" className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}>Login</NavLink></li>
                            {/* {isLoggedIn ? (
                  <>
                  <li><NavLink to="/logout">Logout</NavLink></li>
                  <li style={{padding:"5px",boxShadow:" 0 4px 6px rgba(105, 103, 177, 0.5)",borderRadius:"1rem"}}><RiAdminFill /><NavLink to="/admin/users">Admin</NavLink></li>
                  </>

                ) : (
                  <>
                   <li><NavLink to="/register">Register</NavLink></li>
                    <li><NavLink to="/login">Login</NavLink></li>
                  </>
                )} */}



                        </ul>
                    </nav>
                </div>
            </header>

        </>
    )
}
