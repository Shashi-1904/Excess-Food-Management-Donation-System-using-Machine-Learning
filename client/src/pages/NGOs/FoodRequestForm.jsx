import React, { useState, useEffect } from 'react';
import { useAuth } from '../../store/auth';
import { toast } from 'react-toastify';

export default function FoodRequestForm() {
    const [request, setRequest] = useState({
        foodType: '',
        category: '',
        quantityNeeded: '',
        neededBy: '',
        ngoName: '',
        contactEmail: '',
        contactPhone: '',
        address: ''
    });

    const { API } = useAuth();
    const URL = `${API}/api/ngo/requestFood`;

    const handleInput = (e) => {
        const { name, value } = e.target;
        setRequest((prevState) => ({
            ...prevState,
            [name]: name === 'quantityNeeded' ? Number(value) : value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("Form submitted:", request);
        try {
            const response = await fetch(URL, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(request),
            });

            const res_data = await response.json();
            console.log("Response from server", res_data);

            if (response.ok) {
                setRequest({
                    foodType: '',
                    category: '',
                    quantityNeeded: '',
                    neededBy: '',
                    ngoName: '',
                    contactEmail: '',
                    contactPhone: '',
                    address: ''
                });

                toast.success("Food request submitted successfully");

                window.scrollTo(0, 0);
            } else if (response.status === 422) {
                const errorDetails = res_data.errors.map(error => `${error.field}: ${error.message}`);
                errorDetails.forEach(err => toast.error(err));
            } else {
                toast.error(res_data.extraDetails ? res_data.extraDetails : res_data.message);
            }

        } catch (error) {
            console.log("Food request error", error);
            toast.error("An error occurred while submitting your food request. Please try again.");
        }
    };

    return (
        <div>
            <section className='section-content'>
                <main>
                    <div className="section-registration">
                        <div className="container grid grid-two-cols">
                            <div className="registration-image">
                                <img src="./images/img3.png" alt="Food Request" width="950" height="500" />
                            </div>
                            <div className="registration-form section-form">
                                <h1 className="main-heading mb-3">
                                    Food Request Form
                                </h1>
                                <br />
                                <form onSubmit={handleSubmit}>
                                    <div>
                                        <label htmlFor="foodType">Food Type</label>
                                        <select
                                            name="foodType"
                                            id="foodType"
                                            required
                                            value={request.foodType}
                                            onChange={handleInput}
                                            className="form-select form-select-lg"
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
                                            value={request.category}
                                            onChange={handleInput}
                                            className="form-select form-select-lg"
                                        >
                                            <option value="">Select Category</option>
                                            <option value="raw">Raw Food</option>
                                            <option value="cooked">Cooked Food</option>
                                            <option value="packed">Packed Food</option>
                                        </select>
                                    </div>

                                    <div>
                                        <label htmlFor="quantityNeeded">Quantity Needed (Person)</label>
                                        <input
                                            type="number"
                                            name="quantityNeeded"
                                            placeholder="Enter quantity needed"
                                            id="quantityNeeded"
                                            required
                                            value={request.quantityNeeded}
                                            onChange={handleInput}
                                        />
                                    </div>

                                    <div>
                                        <label htmlFor="neededBy">Needed By (Date)</label>
                                        <input
                                            type="date"
                                            name="neededBy"
                                            id="neededBy"
                                            required
                                            value={request.neededBy}
                                            onChange={handleInput}
                                        />
                                    </div>

                                    <div>
                                        <label htmlFor="ngoName">NGO Name</label>
                                        <input
                                            type="text"
                                            name="ngoName"
                                            placeholder="Enter NGO name"
                                            id="ngoName"
                                            required
                                            value={request.ngoName}
                                            onChange={handleInput}
                                        />
                                    </div>

                                    <div>
                                        <label htmlFor="contactEmail">Contact Email</label>
                                        <input
                                            type="email"
                                            name="contactEmail"
                                            placeholder="Enter contact email"
                                            id="contactEmail"
                                            required
                                            value={request.contactEmail}
                                            onChange={handleInput}
                                        />
                                    </div>

                                    <div>
                                        <label htmlFor="contactPhone">Contact Phone</label>
                                        <input
                                            type="text"
                                            name="contactPhone"
                                            placeholder="Enter contact phone number"
                                            id="contactPhone"
                                            required
                                            value={request.contactPhone}
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
                                            value={request.address}
                                            onChange={handleInput}
                                        />
                                    </div>

                                    <button type='submit' className='btn btn-lg btn-success'>Submit Request</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </main>
            </section>
        </div>
    )
}
