import { useState } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { useNavigate } from "react-router-dom";
import { useAuth } from '../store/auth';
import { toast } from 'react-toastify';
import { GoogleMap, MarkerF, useJsApiLoader } from '@react-google-maps/api';

const Register = () => {
    const [user, setUser] = useState({
        username: '',
        email: '',
        password: '',
        phoneNumber: '',
        role: '',
        address: '',
        latitude: 18.5204,
        longitude: 73.8567,
    });

    const { storetokenInLS, API } = useAuth();
    const URL = `${API}/api/auth/register`;
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();



    const handleInput = (e) => {
        const { name, value } = e.target;
        setUser({
            ...user,
            [name]: value
        });
    };

    const handleMapClick = (event) => {
        setUser({
            ...user,
            latitude: event.latLng.lat(),
            longitude: event.latLng.lng()
        });
        toast.success("Location selected on map!");
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(user);

        try {
            const response = await fetch(URL, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(user),
            });

            const res_data = await response.json();
            console.log("response from server", res_data);

            if (response.ok) {
                toast.success("Registration Successful!");
                navigate("/");

                setTimeout(() => {
                    storetokenInLS(res_data.token);
                    setUser({
                        username: '',
                        email: '',
                        phoneNumber: '',
                        password: '',
                        role: '',
                        address: '',
                        latitude: 19.0760,
                        longitude: 72.8777
                    });
                }, 3000);

                window.scrollTo(0, 0);
            } else {
                toast.error(res_data.message || "Registration failed. Try again.");
            }
        } catch (error) {
            console.error("register", error);
            toast.error("An error occurred while registering. Please try again.");
        }
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    return (
        <div>
            <section className='section-content'>
                <main>
                    <div className="section-registeration">
                        <div className="container grid grid-two-cols">
                            <div className="registeration-image">
                                <img src="./images/register.png" alt="Registration" width="950" height='500' />
                            </div>
                            <div className="registeration-form section-form">
                                <h1 className="main-heading mb-3">Registration Form</h1>
                                <br />
                                <form onSubmit={handleSubmit}>
                                    <div>
                                        <label htmlFor="username">Username</label>
                                        <input
                                            type="text"
                                            name='username'
                                            placeholder='Username'
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
                                            name="phoneNumber"
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

                                    <div>
                                        <label htmlFor="address">Address</label>
                                        <input
                                            type="text"
                                            name='address'
                                            placeholder='Address'
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


                                    <div>
                                        <label htmlFor="latitude">Select Location</label>

                                        <GoogleMap
                                            mapContainerStyle={{ width: "100%", height: "400px" }}
                                            center={{ lat: user.latitude, lng: user.longitude }}
                                            zoom={12}
                                            onClick={handleMapClick}
                                        >
                                            <MarkerF
                                                position={{ lat: user.latitude, lng: user.longitude }}
                                                draggable={true}
                                                onDragEnd={(event) => {
                                                    if (event.latLng) {
                                                        setUser({
                                                            ...user,
                                                            latitude: event.latLng.lat(),
                                                            longitude: event.latLng.lng(),
                                                        });
                                                    }
                                                }}
                                            />
                                        </GoogleMap>

                                    </div>

                                    <div>
                                        <label htmlFor="latitude">Latitude</label>
                                        <input type="text" name="latitude" id="latitude" readOnly value={user.latitude} />
                                    </div>

                                    <div>
                                        <label htmlFor="longitude">Longitude</label>
                                        <input type="text" name="longitude" id="longitude" readOnly value={user.longitude} />
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
