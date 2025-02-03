import { useState } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { useNavigate } from "react-router-dom"
import { useAuth } from '../store/auth';
import { toast } from 'react-toastify';

const Register = () => {
    const [user, setUser] = useState({
        username: '',
        email: '',
        password: '',
        phoneNumber: '',
        role: '',
        address: '',
    });

    const { storetokenInLS, API } = useAuth();
    const URL = `${API}/api/auth/register`;
    const [showPassword, setShowPassword] = useState(false);

    const handleInput = (e) => {

        let name = e.target.name;
        let value = e.target.value;
        setUser({
            ...user,
            [name]: value,

        });
    };

    //for navigate to home
    const navigate = useNavigate();

    // handling form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(user);

        // backend connection
        try {
            const response = await fetch(URL, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json", // Corrected the case here
                },
                body: JSON.stringify(user),
            });

            const res_data = await response.json();
            console.log("response from server", res_data);

            if (response.ok) {
                toast.success("Login Successful");
                navigate("/");
                setTimeout(() => {

                    // Storing token
                    storetokenInLS(res_data.token);

                    // Resetting the form fields
                    setUser({
                        username: '',
                        email: '',
                        phoneNumber: '',
                        password: '',
                        role: '',
                        address: '',
                    });

                }, 3000);


                window.scrollTo(0, 0);
            } else if (response.status === 422) {
                // Handle validation errors from Zod
                const errorDetails = res_data.errors.map(error => `${error.field}: ${error.message}`);
                errorDetails.forEach(err => toast.error(err));
            } else {
                toast.error(res_data.extraDetails ? res_data.extraDetails : res_data.message);
            }

            console.log(response);
        } catch (error) {
            console.log("register", error);
            toast.error("An error occurred while registering. Please try again.");
        }
    };


    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword); // Toggle password visibility
    };

    return (
        <div>
            <section className='section-content'>
                <main>
                    <div className="section-registeration">
                        <div className="container grid grid-two-cols">
                            <div className="registeration-image">
                                <img src="./images/register.png" alt="Registeration" width="950" height='500' />
                            </div>
                            {/* Registration Form */}
                            <div className="registeration-form section-form">
                                <h1 className="main-heading mb-3">
                                    Registration Form
                                </h1>
                                <br />
                                <form onSubmit={handleSubmit}>
                                    <div>
                                        <label htmlFor="username">Username</label>
                                        <input
                                            type="text"
                                            name='username'
                                            placeholder='username'
                                            id='username'
                                            required
                                            autoComplete='off'
                                            value={user.username}
                                            onChange={handleInput}
                                        />
                                    </div>

                                    <div>
                                        <label htmlFor="email">Email</label>
                                        <input
                                            type="email"
                                            name='email'
                                            placeholder='Enter your email'
                                            id='email'
                                            required
                                            autoComplete='off'
                                            value={user.email}
                                            onChange={handleInput}
                                        />
                                    </div>

                                    <div>
                                        <label htmlFor="phoneNumber">Phone</label>
                                        <input
                                            type="number"
                                            name="phoneNumber" // Updated the name to match the backend field
                                            placeholder="Phone number"
                                            id="phoneNumber"
                                            required
                                            autoComplete="off"
                                            value={user.phoneNumber}
                                            onChange={handleInput}
                                        />
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
                                    <div>
                                        <label htmlFor="address">Address</label>
                                        <input
                                            type="text"
                                            name='address'
                                            placeholder='address'
                                            id='address'
                                            required
                                            autoComplete='off'
                                            value={user.address}
                                            onChange={handleInput}
                                        />
                                    </div>
                                    {/* Role Field */}
                                    <div>
                                        <label htmlFor="role">Role</label>
                                        <select
                                            name="role"
                                            id="role"
                                            required
                                            value={user.role}
                                            onChange={handleInput}
                                        >
                                            <option value="">Select Role</option>
                                            <option value="hotel">Hotel</option>
                                            <option value="donor">Donor</option>
                                            <option value="volunteer">Volunteer</option>
                                            <option value="NGO">NGO</option>
                                        </select>
                                    </div>

                                    <button type='submit' className="btn btn-lg btn-success">Register Now</button>

                                </form>
                            </div>
                        </div>
                    </div>
                </main>
            </section>
        </div>
    );
}

export default Register;
