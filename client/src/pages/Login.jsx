import React, { useState } from 'react';
import { useAuth } from '../store/auth';
import { useNavigate, Link } from "react-router-dom";
import { toast } from 'react-toastify';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import Spinner from '../components/Spinner/Spinner'; // Import Spinner component

export default function Login() {
    const [user, setUser] = useState({
        email: "",
        password: ""
    });

    const [loading, setLoading] = useState(false); // Manage loading state
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();
    const { storetokenInLS, API } = useAuth();

    const URL = `${API}/api/auth/login`;

    const handleInput = (e) => {
        let name = e.target.name;
        let value = e.target.value;
        setUser({
            ...user,
            [name]: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true); // Set loading to true when login is in progress

        try {
            const response = await fetch(URL, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(user),
            });

            const res_data = await response.json();

            if (response.ok) {
                storetokenInLS(res_data.token);
                setUser({
                    email: "",
                    password: ""
                });

                toast.success("Login Successful");
                navigate("/");

                // // Wait for 5 seconds before navigating to homepage
                // setTimeout(() => {
                //     setLoading(false); // Stop the spinner
                //     // Navigate to homepage
                //     window.location.reload();
                // }, 5000);

            } else if (response.status === 422) {
                const errorDetails = res_data.errors.map(error => `${error.field}: ${error.message}`);
                errorDetails.forEach(err => toast.error(err));
                setLoading(false);
            } else {
                setLoading(false); // Stop loading if error occurs
                toast.error(res_data.extraDetails ? res_data.extraDetails : res_data.message);

            }

        } catch (error) {
            console.log("login error", error);
            setLoading(false); // Stop loading on error
        }
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword); // Toggle password visibility
    };

    return (
        <div>
            <section>
                <main>
                    <div className='section-content'>
                        <div className="container grid grid-two-cols">
                            <div className="registeration-image">
                                <img src="./images/login3.png" alt="Login" width="600" height='600' />
                            </div>
                            {/* Registration Form */}
                            <div className="registeration-form section-form">
                                <h1 className="main-heading mb-3">
                                    Login
                                </h1>
                                <br />
                                <form onSubmit={handleSubmit}>
                                    <div>
                                        <label htmlFor="email">Email</label>
                                        <input type="email" name='email' placeholder='Enter your email' id='email' required autoComplete='off' value={user.email} onChange={handleInput} />
                                    </div>

                                    {/* Password Field with Toggle Visibility */}
                                    <div style={{ position: 'relative' }}>
                                        <label htmlFor="password">Password</label>
                                        <input
                                            type={showPassword ? 'text' : 'password'}
                                            name='password'
                                            placeholder='Password'
                                            id='password'
                                            required
                                            autoComplete='off'
                                            value={user.password}
                                            onChange={handleInput}
                                        />
                                        <span
                                            className="eye-icon"
                                            style={{
                                                position: 'absolute',
                                                right: '10px',
                                                top: '65px',
                                                cursor: 'pointer',
                                            }}
                                            onClick={togglePasswordVisibility}
                                        >
                                            {showPassword ? <FaEyeSlash /> : <FaEye />}
                                        </span>
                                    </div>

                                    <button type='submit' className='btn btn-submit'>Login Now</button>
                                    <p id="not-registered" className="mt-3">
                                        Not registered yet?{' '}
                                        <Link to="/register" className="text-link">Register here</Link>
                                    </p>
                                </form>

                                {loading && <Spinner />} {/* Show spinner while loading */}
                            </div>
                        </div>
                    </div>
                </main>
            </section>
        </div>
    );
}
