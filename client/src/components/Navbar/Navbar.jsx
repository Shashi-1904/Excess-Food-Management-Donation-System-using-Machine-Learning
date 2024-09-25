import React from 'react'

export default function Navbar() {
    return (
        <div>
            <header>
                <div className="container">
                    <div className="logo-brand">
                        <img src="/images/logo5.png" alt="logo" height="30" width="30" />
                        <NavLink to={"/"}>EduNexus</NavLink>
                    </div>
                    <nav>
                        <ul>
                            <li><NavLink to="/">Home</NavLink></li>
                            <li><NavLink to="/">Donate Food</NavLink></li>
                            <li><NavLink to="/">About Us</NavLink></li>
                            <li><NavLink to="/">Contact</NavLink></li>
                            <li><NavLink to="/">Register</NavLink></li>
                            <li><NavLink to="/">Login</NavLink></li>
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

        </div>
    )
}
