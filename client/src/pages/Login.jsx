import React, { useState } from 'react'
import { useAuth } from '../store/auth';
import { useNavigate } from "react-router-dom"
import { toast } from 'react-toastify';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

export default function Login() {

    const [user, setUser] = useState({
        email: "",
        password: ""
    });

    // handling input values
    const handleInput = (e) => {

        let name = e.target.name;
        let value = e.target.value;
        setUser({
            ...user,
            [name]: value,

        });
    };

    const navigate = useNavigate();

    const { storetokenInLS, API } = useAuth();
    const [showPassword, setShowPassword] = useState(false);

    const URL = `${API}/api/auth/login`;

    //handling form submission
    const handleSubmit = async (e) => {

        e.preventDefault();
        console.log(user);
        try {
            const response = await fetch(URL, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(user),
            });

            console.log(response);
            const res_data = await response.json();

            if (response.ok) {

                console.log("response from server", res_data);
                //storing token to localstorage
                storetokenInLS(res_data.token);
                setUser({
                    email: "",
                    passward: ""
                });
                toast.success("Login Successful")
                navigate("/")

            } else if (response.status === 422) {
                // Handle validation errors from Zod
                const errorDetails = res_data.errors.map(error => `${error.field}: ${error.message}`);
                errorDetails.forEach(err => toast.error(err));
            } else {
                toast.error(res_data.extraDetails ? res_data.extraDetails : res_data.message);
            }



        } catch (error) {
            console.log("login", error);
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
                            {/* Registeration Form */}
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
                                            placeholder='password'
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

                                </form>
                            </div>
                        </div>
                    </div>
                </main>
            </section>
        </div>
    )
}
