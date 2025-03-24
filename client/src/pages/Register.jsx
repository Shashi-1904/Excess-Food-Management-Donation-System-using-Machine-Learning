import { useState, useRef } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { useNavigate } from "react-router-dom";
import { useAuth } from '../store/auth';
import { toast } from 'react-toastify';
import { GoogleMap, MarkerF, Autocomplete } from "@react-google-maps/api";

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
    const autocompleteRef = useRef(null);
    const mapRef = useRef(null);
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
        setUser((prevState) => ({
            ...prevState,
            latitude: event.latLng.lat(),
            longitude: event.latLng.lng(),
        }));
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
                    window.location.reload();
                }, 3000);


                window.scrollTo(0, 0);
            } else {
                // Display multiple validation errors
                if (res_data.errors && Array.isArray(res_data.errors)) {
                    res_data.errors.forEach(err => {
                        toast.error(`${err.field}: ${err.message}`);
                    });
                } else {
                    toast.error(res_data.message || "Registration failed. Try again.");
                }
            }
        } catch (error) {
            console.error("register", error);
            toast.error("An error occurred while registering. Please try again.");
        }
    };


    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const handlePlaceSelect = () => {
        if (autocompleteRef.current) {
            const place = autocompleteRef.current.getPlace();

            if (place.geometry) {
                setUser((prevState) => ({
                    ...prevState,
                    latitude: place.geometry.location.lat(),
                    longitude: place.geometry.location.lng(),
                    address: place.formatted_address,
                }));

                // Move map to new location
                if (mapRef.current) {
                    mapRef.current.panTo({
                        lat: place.geometry.location.lat(),
                        lng: place.geometry.location.lng(),
                    });
                }
            }
        }
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
                                        <label htmlFor="address">Address</label>
                                        <input
                                            type="text"
                                            name="address"
                                            placeholder="Enter your address"
                                            id="address"
                                            required
                                            autoComplete="off"
                                            value={user.address}
                                            onChange={handleInput}
                                        />
                                    </div>

                                    <div>
                                        <h4>Search Location</h4>
                                        <Autocomplete
                                            onLoad={(autocomplete) => (autocompleteRef.current = autocomplete)}
                                            onPlaceChanged={handlePlaceSelect}
                                        >
                                            <input
                                                type="text"
                                                placeholder="Search location"
                                                style={{ width: "100%", padding: "10px", marginBottom: "10px" }}
                                            />
                                        </Autocomplete>

                                        <h4>Select Location on Map</h4>
                                        <GoogleMap
                                            mapContainerStyle={{ width: "100%", height: "400px" }}
                                            center={{ lat: user.latitude, lng: user.longitude }}
                                            zoom={12}
                                            onClick={handleMapClick}
                                            onLoad={(map) => (mapRef.current = map)}
                                        >
                                            <MarkerF
                                                position={{ lat: user.latitude, lng: user.longitude }}
                                                draggable={true}
                                                onDragEnd={(event) => {
                                                    if (event.latLng) {
                                                        setUser((prevState) => ({
                                                            ...prevState,
                                                            latitude: event.latLng.lat(),
                                                            longitude: event.latLng.lng(),
                                                        }));
                                                    }
                                                }}
                                            />
                                        </GoogleMap>
                                        <p>Selected Location: Latitude: {user.latitude}, Longitude: {user.longitude}</p>
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



// import React, { useState, useEffect, useRef } from "react";
// import { useNavigate } from "react-router-dom";
// import { useAuth } from "../store/auth";
// import { toast } from "react-toastify";
// import { GoogleMap, MarkerF, Autocomplete } from "@react-google-maps/api";
// import { FaEye, FaEyeSlash } from 'react-icons/fa';

// export default function Register() {
//     const [user, setUser] = useState({
//         username: "",
//         email: "",
//         password: "",
//         phoneNumber: "",
//         role: "",
//         address: "",
//         latitude: 18.5204,
//         longitude: 73.8567,
//     });

//     const { API } = useAuth();
//     const registerURL = `${API}/api/auth/register`;
//     const navigate = useNavigate();
//     const autocompleteRef = useRef(null);
//     const mapRef = useRef(null);
//     const [showPassword, setShowPassword] = useState(false);

//     useEffect(() => {
//         const token = localStorage.getItem("token");
//         if (token) {
//             toast.info("You are already logged in.");
//             navigate("/");
//         }
//     }, []);

//     const handleInput = (e) => {
//         const { name, value } = e.target;
//         setUser((prevState) => ({
//             ...prevState,
//             [name]: value,
//         }));
//     };

//     const handleMapClick = (event) => {
//         setUser((prevState) => ({
//             ...prevState,
//             latitude: event.latLng.lat(),
//             longitude: event.latLng.lng(),
//         }));
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         console.log(user);

//         try {
//             const response = await fetch(URL, {
//                 method: "POST",
//                 headers: { "Content-Type": "application/json" },
//                 body: JSON.stringify(user),
//             });

//             const res_data = await response.json();
//             console.log("response from server", res_data);

//             if (response.ok) {
//                 toast.success("Registration Successful!");
//                 navigate("/");

//                 setTimeout(() => {
//                     storetokenInLS(res_data.token);
//                     setUser({
//                         username: '',
//                         email: '',
//                         phoneNumber: '',
//                         password: '',
//                         role: '',
//                         address: '',
//                         latitude: 19.0760,
//                         longitude: 72.8777
//                     });
//                 }, 3000);

//                 window.scrollTo(0, 0);
//             } else {
//                 // Display multiple validation errors
//                 if (res_data.errors && Array.isArray(res_data.errors)) {
//                     res_data.errors.forEach(err => {
//                         toast.error(`${err.field}: ${err.message}`);
//                     });
//                 } else {
//                     toast.error(res_data.message || "Registration failed. Try again.");
//                 }
//             }
//         } catch (error) {
//             console.error("register", error);
//             toast.error("An error occurred while registering. Please try again.");
//         }
//     };



//     const handlePlaceSelect = () => {
//         if (autocompleteRef.current) {
//             const place = autocompleteRef.current.getPlace();

//             if (place.geometry) {
//                 setUser((prevState) => ({
//                     ...prevState,
//                     latitude: place.geometry.location.lat(),
//                     longitude: place.geometry.location.lng(),
//                     address: place.formatted_address,
//                 }));

//                 // Move map to new location
//                 if (mapRef.current) {
//                     mapRef.current.panTo({
//                         lat: place.geometry.location.lat(),
//                         lng: place.geometry.location.lng(),
//                     });
//                 }
//             }
//         }
//     };

//     const togglePasswordVisibility = () => {
//         setShowPassword(!showPassword);
//     };

//     return (
//         <div>
//             <section className="section-content">
//                 <main>
//                     <div className="section-registration">
//                         <div className="container grid grid-two-cols">
//                             <div className="registration-image">
//                                 <img src="./images/register.png" alt="Register" width="950" height="500" />
//                             </div>
//                             <div className="registration-form section-form">
//                                 <h1 className="main-heading mb-3">Register</h1>
//                                 <br />
//                                 <form onSubmit={handleSubmit}>
//                                     <div>
//                                         <label htmlFor="username">Username</label>
//                                         <input
//                                             type="text"
//                                             name="username"
//                                             placeholder="Enter your username"
//                                             id="username"
//                                             required
//                                             autoComplete="off"
//                                             value={user.username}
//                                             onChange={handleInput}
//                                         />
//                                     </div>

//                                     <div>
//                                         <label htmlFor="email">Email</label>
//                                         <input
//                                             type="email"
//                                             name="email"
//                                             placeholder="Enter your email"
//                                             id="email"
//                                             required
//                                             autoComplete="off"
//                                             value={user.email}
//                                             onChange={handleInput}
//                                         />
//                                     </div>

//                                     <div style={{ position: 'relative' }}>
//                                         <label htmlFor="password">Password</label>
//                                         <input
//                                             type={showPassword ? 'text' : 'password'}
//                                             name='password'
//                                             placeholder='Password'
//                                             id='password'
//                                             required
//                                             autoComplete='off'
//                                             value={user.password}
//                                             onChange={handleInput}
//                                         />
//                                         <span
//                                             className="eye-icon"
//                                             style={{
//                                                 position: 'absolute',
//                                                 right: '10px',
//                                                 top: '50%',
//                                                 transform: 'translateY(-50%)',
//                                                 cursor: 'pointer',
//                                             }}
//                                             onClick={togglePasswordVisibility}
//                                         >
//                                             {showPassword ? <FaEyeSlash /> : <FaEye />}
//                                         </span>
//                                     </div>

//                                     <div>
//                                         <label htmlFor="phoneNumber">Phone</label>
//                                         <input
//                                             type="tel"
//                                             name="phoneNumber"
//                                             placeholder="Enter phone number"
//                                             id="phoneNumber"
//                                             required
//                                             autoComplete="off"
//                                             value={user.phoneNumber}
//                                             onChange={handleInput}
//                                             pattern="[0-9]*"
//                                         />
//                                     </div>

//                                     <div>
//                                         <label htmlFor="role">Role</label>
//                                         <select name="role" id="role" required value={user.role} onChange={handleInput}>
//                                             <option value="">Select Role</option>
//                                             <option value="hotel">Hotel</option>
//                                             <option value="donor">Donor</option>
//                                             <option value="volunteer">Volunteer</option>
//                                             <option value="NGO">NGO</option>
//                                         </select>
//                                     </div>

//                                     <div>
//                                         <label htmlFor="address">Address</label>
//                                         <input
//                                             type="text"
//                                             name="address"
//                                             placeholder="Enter your address"
//                                             id="address"
//                                             required
//                                             autoComplete="off"
//                                             value={user.address}
//                                             onChange={handleInput}
//                                         />
//                                     </div>

//                                     <div>
//                                         <h4>Search Location</h4>
//                                         <Autocomplete
//                                             onLoad={(autocomplete) => (autocompleteRef.current = autocomplete)}
//                                             onPlaceChanged={handlePlaceSelect}
//                                         >
//                                             <input
//                                                 type="text"
//                                                 placeholder="Search location"
//                                                 style={{ width: "100%", padding: "10px", marginBottom: "10px" }}
//                                             />
//                                         </Autocomplete>

//                                         <h4>Select Location on Map</h4>
//                                         <GoogleMap
//                                             mapContainerStyle={{ width: "100%", height: "400px" }}
//                                             center={{ lat: user.latitude, lng: user.longitude }}
//                                             zoom={12}
//                                             onClick={handleMapClick}
//                                             onLoad={(map) => (mapRef.current = map)}
//                                         >
//                                             <MarkerF
//                                                 position={{ lat: user.latitude, lng: user.longitude }}
//                                                 draggable={true}
//                                                 onDragEnd={(event) => {
//                                                     if (event.latLng) {
//                                                         setUser((prevState) => ({
//                                                             ...prevState,
//                                                             latitude: event.latLng.lat(),
//                                                             longitude: event.latLng.lng(),
//                                                         }));
//                                                     }
//                                                 }}
//                                             />
//                                         </GoogleMap>
//                                         <p>Selected Location: Latitude: {user.latitude}, Longitude: {user.longitude}</p>
//                                     </div>

//                                     <button type="submit" className="btn btn-lg btn-primary">
//                                         Register
//                                     </button>
//                                 </form>
//                             </div>
//                         </div>
//                     </div>
//                 </main>
//             </section>
//         </div>
//     );
// }

