import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../store/auth";
import { toast } from "react-toastify";
import { GoogleMap, MarkerF, Autocomplete } from "@react-google-maps/api";

export default function DonateFood() {
    const [food, setFood] = useState({
        foodName: "",
        foodType: "",
        category: "",
        quantity: "",
        expiry: "",
        email: "",
        phoneNumber: "",
        address: "",
        latitude: 18.5204,
        longitude: 73.8567,
    });

    const { API } = useAuth();
    const donateURL = `${API}/api/donor/donateFood`;
    const assignVolunteerURL = `${API}/api/volunteer/assign-volunteer`;
    const navigate = useNavigate();
    const autocompleteRef = useRef(null);
    const mapRef = useRef(null);


    // Regular function for token check
    const checkLoginStatus = () => {
        const token = localStorage.getItem("token");
        if (!token) {
            toast.error("You are not logged in. Please log in first.");
            navigate("/login");
            return false;
        }
        return true;
    };

    useEffect(() => {
        checkLoginStatus();
    }, []);



    const handleInput = (e) => {
        const { name, value } = e.target;
        setFood((prevState) => ({
            ...prevState,
            [name]: name === "quantity" || name === "expiry" ? Number(value) : value,
        }));
    };

    const handleMapClick = (event) => {
        setFood((prevState) => ({
            ...prevState,
            latitude: event.latLng.lat(),
            longitude: event.latLng.lng(),
        }));
    };

    const assignVolunteer = async (donationId) => {
        try {
            const response = await fetch(assignVolunteerURL, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ donationId }),
            });

            const res_data = await response.json();

            if (response.ok) {
                console.log("Volunteer assigned successfully");
            } else {
                console.log(res_data.message || "Failed to assign volunteer");
            }
        } catch (error) {
            console.error("Assign volunteer error:", error);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(donateURL, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(food),
            });

            const res_data = await response.json();

            if (response.ok) {
                toast.success("Food donation registered successfully");
                await assignVolunteer(res_data.donation._id);
                navigate("/");
                window.scrollTo(0, 0);
            } else {
                // Display multiple validation errors
                if (res_data.errors && Array.isArray(res_data.errors)) {
                    res_data.errors.forEach((err) => {
                        toast.error(`${err.field}: ${err.message}`);
                    });
                } else {
                    toast.error(res_data.message || "Failed to register donation");
                }
            }
        } catch (error) {
            console.error("Food donation error:", error);
            toast.error("An error occurred while submitting your food donation. Please try again.");
        }
    };


    const handlePlaceSelect = () => {
        if (autocompleteRef.current) {
            const place = autocompleteRef.current.getPlace();

            if (place.geometry) {
                setFood((prevState) => ({
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
            <section className="section-content">
                <main>
                    <div className="section-registration">
                        <div className="container grid grid-two-cols">
                            <div className="registration-image">
                                <img src="./images/img3.png" alt="Donate Food" width="950" height="500" />
                            </div>
                            <div className="registration-form section-form">
                                <h1 className="main-heading mb-3">Donate Food Form</h1>
                                <br />
                                <form onSubmit={handleSubmit}>
                                    <div>
                                        <label htmlFor="foodName">Food Name</label>
                                        <input
                                            type="text"
                                            name="foodName"
                                            placeholder="Enter food name"
                                            id="foodName"
                                            required
                                            autoComplete="off"
                                            value={food.foodName}
                                            onChange={handleInput}
                                        />
                                    </div>

                                    <div>
                                        <label htmlFor="foodType">Food Type</label>
                                        <select name="foodType" id="foodType" required value={food.foodType} onChange={handleInput}>
                                            <option value="">Select Type</option>
                                            <option value="veg">Vegetarian</option>
                                            <option value="non-veg">Non-Vegetarian</option>
                                        </select>
                                    </div>

                                    <div>
                                        <label htmlFor="category">Category</label>
                                        <select name="category" id="category" required value={food.category} onChange={handleInput}>
                                            <option value="">Select Category</option>
                                            <option value="raw">Raw Food</option>
                                            <option value="cooked">Cooked Food</option>
                                            <option value="packed">Packed Food</option>
                                        </select>
                                    </div>

                                    <div>
                                        <label htmlFor="quantity">Quantity (Person)</label>
                                        <input
                                            type="number"
                                            name="quantity"
                                            placeholder="Enter quantity"
                                            id="quantity"
                                            required
                                            value={food.quantity}
                                            onChange={handleInput}
                                        />
                                    </div>

                                    <div>
                                        <label htmlFor="expiry">Expiry (Expected in hrs)</label>
                                        <input
                                            type="number"
                                            name="expiry"
                                            placeholder="Enter expiry in hours"
                                            id="expiry"
                                            required
                                            value={food.expiry}
                                            onChange={handleInput}
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor="email">Email</label>
                                        <input
                                            type="email"
                                            name="email"
                                            placeholder="Enter your email"
                                            id="email"
                                            required
                                            autoComplete="off"
                                            value={food.email}
                                            onChange={handleInput}
                                        />
                                    </div>

                                    <div>
                                        <label htmlFor="phoneNumber">Phone</label>
                                        <input
                                            type="number"
                                            name="phoneNumber"
                                            placeholder="Enter phone number"
                                            id="phoneNumber"
                                            required
                                            autoComplete="off"
                                            value={food.phoneNumber}
                                            onChange={handleInput}
                                        />
                                    </div>

                                    <div>
                                        <label htmlFor="address">Address</label>
                                        <input
                                            type="text"
                                            name="address"
                                            placeholder="Enter address"
                                            id="address"
                                            required
                                            autoComplete="off"
                                            value={food.address}
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

                                        <h4>Choose Pickup Location</h4>
                                        <GoogleMap
                                            mapContainerStyle={{ width: "100%", height: "400px" }}
                                            center={{ lat: food.latitude, lng: food.longitude }}
                                            zoom={12}
                                            onClick={handleMapClick}
                                            onLoad={(map) => (mapRef.current = map)}
                                        >
                                            <MarkerF
                                                position={{ lat: food.latitude, lng: food.longitude }}
                                                draggable={true}
                                                onDragEnd={(event) => {
                                                    if (event.latLng) {
                                                        setFood((prevState) => ({
                                                            ...prevState,
                                                            latitude: event.latLng.lat(),
                                                            longitude: event.latLng.lng(),
                                                        }));
                                                    }
                                                }}
                                            />
                                        </GoogleMap>
                                        <p>Selected Location: Latitude: {food.latitude}, Longitude: {food.longitude}</p>
                                    </div>

                                    <button type="submit" className="btn btn-lg btn-success">
                                        Donate Now
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                </main>
            </section>
        </div>
    );
}
