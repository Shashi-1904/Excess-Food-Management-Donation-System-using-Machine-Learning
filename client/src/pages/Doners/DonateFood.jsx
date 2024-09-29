import React from 'react'
import { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom"
import { useAuth } from '../../store/auth';
import { toast } from 'react-toastify';


export default function DonateFood() {
    const [food, setFood] = useState({
        foodName: '',
        foodType: '',
        category: '',
        quantity: '',
        expiry: '',
        email: '',
        phoneNumber: '',
        address: ''
    });

    const { API } = useAuth();
    const URL = `${API}/api/donor/donateFood`;
    //for navigate to home
    const navigate = useNavigate();

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
        if (!checkLoginStatus()) {
            return;
        }
    }, []);

    const handleInput = (e) => {
        const { name, value } = e.target;
        setFood((prevState) => ({
            ...prevState,
            [name]: name === 'quantity' || name === 'expiry' ? Number(value) : value,
        }));
    };


    // Handling form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("Form submitted:", food);
        try {
            const response = await fetch(URL, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(food),
            });

            const res_data = await response.json();
            console.log("response from server", res_data);

            if (response.ok) {
                // Resetting the form fields
                setFood({
                    foodName: '',
                    foodType: '',
                    category: '',
                    quantity: '',
                    expiry: '',
                    email: '',
                    phoneNumber: '',
                    address: ''
                });

                toast.success("Food donation registered successfully");

                navigate("/");
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
            console.log("food donation", error);
            toast.error("An error occurred while submitting your food donation. Please try again.");
        }
    };


    return (
        <div>
            <section className='section-content'>
                <main>
                    <div className="section-registeration">
                        <div className="container grid grid-two-cols">
                            <div className="registeration-image">
                                <img src="./images/img3.png" alt="Donate Food" width="950" height='500' />
                            </div>
                            {/* Donate Food Form */}
                            <div className="registeration-form section-form">
                                <h1 className="main-heading mb-3">
                                    Donate Food Form
                                </h1>
                                <br />
                                <form onSubmit={handleSubmit}>
                                    <div>
                                        <label htmlFor="foodName">Food Name</label>
                                        <input
                                            type="text"
                                            name='foodName'
                                            placeholder='Enter food name'
                                            id='foodName'
                                            required
                                            autoComplete='off'
                                            value={food.foodName}
                                            onChange={handleInput}
                                        />
                                    </div>

                                    <div>
                                        <label htmlFor="foodType">Food Type</label>
                                        <select
                                            name="foodType"
                                            id="foodType"
                                            required
                                            value={food.foodType}
                                            onChange={handleInput}
                                        >
                                            <option value="">Select Type</option>
                                            <option value="veg">Vegetarian</option>
                                            <option value="non-veg">Non-Vegetarian</option>
                                        </select>
                                    </div>

                                    <div>
                                        <label htmlFor="category">Category</label>
                                        <select
                                            name="category"
                                            id="category"
                                            required
                                            value={food.category}
                                            onChange={handleInput}
                                        >
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
                                            name='email'
                                            placeholder='Enter your email'
                                            id='email'
                                            required
                                            autoComplete='off'
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
                                            name='address'
                                            placeholder='Enter address'
                                            id='address'
                                            required
                                            autoComplete='off'
                                            value={food.address}
                                            onChange={handleInput}
                                        />
                                    </div>

                                    <button type='submit' className='btn btn-submit'>Donate Now</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </main>
            </section>
        </div>

    )
}
