import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useAuth } from "../../store/auth";
import { toast } from "react-toastify";

function AddLogDetails() {
    const { authorizationToken, API } = useAuth();
    const [log, setLog] = useState({
        date: new Date().toISOString().split('T')[0],
        day: '',
        eventOrFestival: '',
        foodType: '',
        foodPreparedKg: '',
        customersserved: '',
        foodLeftoverKg: '',
        weather: ''
    });

    const handleChange = (e) => {
        setLog({ ...log, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`${API}/api/hotel/add-log`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': authorizationToken
                },
                body: JSON.stringify(log)
            });
            const data = await response.json();
            if (response.ok) {
                toast.success("Log added successfully");
                setLog({
                    date: new Date().toISOString().split('T')[0],
                    day: '',
                    eventOrFestival: '',
                    foodType: '',
                    foodPreparedKg: '',
                    customersserved: '',
                    foodLeftoverKg: '',
                    weather: ''
                });
            } else {
                toast.error(data.message || "Failed to add log");
            }
        } catch (error) {
            console.error("Error adding log:", error);
        }
    };

    return (
        <div className="container-fluid" style={{
            display: 'flex',
            minHeight: '100vh',
            paddingTop: '60px',
        }}>
            <div className="content" style={{
                marginLeft: '200px',
                width: 'calc(100% - 200px)',
                overflowY: 'auto',
                padding: '20px',
                zIndex: '500',
            }}>
                <div className="row justify-content-center">
                    <div className="col-md-10">
                        <div className="card shadow-lg" style={{ borderRadius: '10px' }}>
                            <div className="card-header bg-success text-white text-center">
                                <h3>Add Log Details</h3>
                            </div>
                            <div className="card-body p-4">
                                <form onSubmit={handleSubmit}>
                                    <div className="mb-3">
                                        <label className="form-label ">Date</label>
                                        <input type="date" className="form-control" name="date" value={log.date} onChange={handleChange} required />
                                    </div>
                                    <div className="mb-3">
                                        <label className="form-label">Day</label>
                                        <select className="form-control form-select-lg" name="day" value={log.day} onChange={handleChange} required>
                                            <option value="">Select</option>
                                            <option value="Monday">Monday</option>
                                            <option value="Tuesday">Tuesday</option>
                                            <option value="Wednesday">Wednesday</option>
                                            <option value="Thursday">Thursday</option>
                                            <option value="Friday">Friday</option>
                                            <option value="Saturday">Saturday</option>
                                            <option value="Sunday">Sunday</option>
                                        </select>
                                    </div>
                                    <div className="mb-3">
                                        <label className="form-label">Event</label>
                                        <select className="form-control form-select-lg" name="eventOrFestival" value={log.eventOrFestival} onChange={handleChange} required>
                                            <option value="">Select</option>
                                            <option value="Business Meeting">Business Meeting</option>
                                            <option value="Wedding Event">Wedding Event</option>
                                            <option value="Corporate Event">Corporate Event</option>
                                            <option value="Festival">Festival</option>
                                            <option value="None">None</option>
                                        </select>
                                    </div>
                                    <div className="mb-3">
                                        <label className="form-label">Food Type</label>
                                        <select className="form-control form-select-lg" name="foodType" value={log.foodType} onChange={handleChange} required>
                                            <option value="">Select</option>
                                            <option value="Veg">Veg</option>
                                            <option value="Non-Veg">Non-Veg</option>
                                        </select>
                                    </div>
                                    <div className="mb-3">
                                        <label className="form-label">Food Prepared (kg)</label>
                                        <input type="number" className="form-control" name="foodPreparedKg" value={log.foodPreparedKg} onChange={handleChange} required />
                                    </div>
                                    <div className="mb-3">
                                        <label className="form-label">Peoples Served</label>
                                        <input type="number" className="form-control" name="customersserved" value={log.customersserved} onChange={handleChange} required />
                                    </div>
                                    <div className="mb-3">
                                        <label className="form-label">Food Leftover (kg)</label>
                                        <input type="number" className="form-control" name="foodLeftoverKg" value={log.foodLeftoverKg} onChange={handleChange} required />
                                    </div>
                                    <div className="mb-3">
                                        <label className="form-label">Weather</label>
                                        <select className="form-control form-select-lg" name="weather" value={log.weather} onChange={handleChange} required>
                                            <option value="">Select</option>
                                            <option value="Windy">Windy</option>
                                            <option value="Sunny">Sunny</option>
                                            <option value="Stormy">Stormy</option>
                                            <option value="Cloudy">Cloudy</option>
                                            <option value="Rainy">Rainy</option>
                                        </select>
                                    </div>
                                    <button type="submit" className="btn btn-lg btn-success w-100">Submit Log</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AddLogDetails;
