import React, { useState } from 'react';
import { useAuth } from '../store/auth';
import { useNavigate, Link } from "react-router-dom";
import { toast } from 'react-toastify';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import Spinner from '../components/Spinner/Spinner';

export default function Login() {
    const [user, setUser] = useState({
        email: "",
        password: ""
    });

    const [loading, setLoading] = useState(false);
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
        setLoading(true);

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
                // Show success message first
                toast.success("Login Successful");
                navigate("/");
                setTimeout(() => {
                    storetokenInLS(res_data.token);
                    setUser({ email: "", password: "" });
                    setLoading(false);
                    navigate("/");
                    window.location.reload();
                }, 3000);

            }
            else if (response.status === 422) {
                const errorDetails = res_data.errors.map(error => `${error.field}: ${error.message}`);
                errorDetails.forEach(err => toast.error(err));
                setLoading(false);
            } else {
                setLoading(false);
                toast.error(res_data.extraDetails ? res_data.extraDetails : res_data.message);

            }

        } catch (error) {
            console.log("login error", error);
            setLoading(false);
        }
        finally {
            setLoading(false);  // Stop loading in all cases
        }
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
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

                                    <button type='submit' className="btn btn-lg btn-success">Login Now</button>
                                    <p id="not-registered" className="mt-3">
                                        Not registered yet?{' '}
                                        <Link to="/register" className="text-link">Register here</Link>
                                    </p>
                                </form>

                                {loading && <Spinner />}
                            </div>
                        </div>
                    </div>
                </main>
            </section>
        </div>
    );
}


