import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useAuth } from "../../store/auth";
import { toast } from "react-toastify";

function AddLogDetails() {
    const { authorizationToken, API } = useAuth();

    const initialLog = {
        date: new Date().toISOString().split('T')[0],
        dishName: '',
        quantityPrepared: '',
        dayOfWeek: '',
        month: '',
        weekend: '',
        festivalName: '',
        festivalType: '',
        daysBeforeAfterFestival: '',
        totalCustomers: '',
        ordersPerDish: '',
        weather: '',
        specialOffer: '',
        quantityWasted: '',
        holiday: '',
        event: '',
        deliveryOrders: ''
    };

    const [log, setLog] = useState(initialLog);

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
                setLog(initialLog);  // Reset form after submission
            } else {
                toast.error(data.message || "Failed to add log");
            }
        } catch (error) {
            console.error("Error adding log:", error);
        }
    };

    return (
        <div className="container-fluid" style={{ minHeight: '100vh', paddingTop: '60px' }}>
            <div className="content" style={{ marginLeft: '200px', width: 'calc(100% - 200px)', overflowY: 'auto', padding: '20px' }}>
                <div className="row justify-content-center">
                    <div className="col-md-10">
                        <div className="card shadow-lg" style={{ borderRadius: '10px' }}>
                            <div className="card-header bg-success text-white text-center">
                                <h3>Add Log Details</h3>
                            </div>
                            <div className="card-body p-4">
                                <form onSubmit={handleSubmit}>
                                    {/* Date */}
                                    <div className="mb-3">
                                        <label className="form-label">Date</label>
                                        <input type="date" className="form-control" name="date" value={log.date} onChange={handleChange} required />
                                    </div>

                                    {/* Dish Name */}
                                    <div className="mb-3">
                                        <label className="form-label">Dish Name</label>
                                        <select className="form-control" name="dishName" value={log.dishName} onChange={handleChange} required>
                                            <option value="">Select</option>
                                            {['Fish Curry', 'Naan (plain, butter, garlic)', 'Palak Paneer', 'Shahi Paneer', 'Tandoori Chicken',
                                                'Jeera Rice', 'Indrayni Rice', 'Veg Biryani', 'Kadai Paneer', 'Roti (Tandoori, Phulka)',
                                                'Chole Bhature', 'Mutton Biryani', 'Chicken Handi', 'Egg Curry', 'Chicken Biryani',
                                                'Chicken Tikka Masala', 'Paneer Butter Masala', 'Butter Chicken']
                                                .map((item) => <option key={item} value={item}>{item}</option>)}
                                        </select>
                                    </div>

                                    {/* Quantity Prepared */}
                                    <div className="mb-3">
                                        <label className="form-label">Quantity Prepared</label>
                                        <input type="number" className="form-control" name="quantityPrepared" value={log.quantityPrepared} onChange={handleChange} required />
                                    </div>

                                    {/* Day of Week */}
                                    <div className="mb-3">
                                        <label className="form-label">Day of Week</label>
                                        <select className="form-control" name="dayOfWeek" value={log.dayOfWeek} onChange={handleChange} required>
                                            <option value="">Select</option>
                                            {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
                                                .map((day) => <option key={day} value={day}>{day}</option>)}
                                        </select>
                                    </div>

                                    {/* Month */}
                                    <div className="mb-3">
                                        <label className="form-label">Month</label>
                                        <select className="form-control" name="month" value={log.month} onChange={handleChange} required>
                                            <option value="">Select</option>
                                            {['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
                                                .map((month) => <option key={month} value={month}>{month}</option>)}
                                        </select>
                                    </div>

                                    {/* Weekend */}
                                    <div className="mb-3">
                                        <label className="form-label">Weekend</label>
                                        <select className="form-control" name="weekend" value={log.weekend} onChange={handleChange} required>
                                            <option value="">Select</option>
                                            <option value="No">No</option>
                                            <option value="Yes">Yes</option>
                                        </select>
                                    </div>

                                    {/* Festival Name */}
                                    <div className="mb-3">
                                        <label className="form-label">Festival Name</label>
                                        <select className="form-control" name="festivalName" value={log.festivalName} onChange={handleChange}>
                                            <option value="">Select</option>
                                            {['Holi', 'Eid', 'Janmashtami', 'Lohri', 'Makar Sankranti', 'Christmas',
                                                'Navratri', 'Diwali', 'Ganesh Chaturthi', 'Dussehra', 'Baisakhi']
                                                .map((fest) => <option key={fest} value={fest}>{fest}</option>)}
                                        </select>
                                    </div>

                                    {/* Festival Type */}
                                    <div className="mb-3">
                                        <label className="form-label">Festival Type</label>
                                        <select className="form-control" name="festivalType" value={log.festivalType} onChange={handleChange}>
                                            <option value="">Select</option>
                                            <option value="Cultural">Cultural</option>
                                        </select>
                                    </div>

                                    {/* Days Before/After Festival */}
                                    <div className="mb-3">
                                        <label className="form-label">Days Before/After Festival</label>
                                        <input type="number" className="form-control" name="daysBeforeAfterFestival" value={log.daysBeforeAfterFestival} onChange={handleChange} />
                                    </div>

                                    {/* Total Customers */}
                                    <div className="mb-3">
                                        <label className="form-label">Total Customers</label>
                                        <input type="number" className="form-control" name="totalCustomers" value={log.totalCustomers} onChange={handleChange} required />
                                    </div>

                                    {/* Orders Per Dish */}
                                    <div className="mb-3">
                                        <label className="form-label">Orders Per Dish</label>
                                        <input type="number" className="form-control" name="ordersPerDish" value={log.ordersPerDish} onChange={handleChange} required />
                                    </div>

                                    {/* Weather */}
                                    <div className="mb-3">
                                        <label className="form-label">Weather</label>
                                        <select className="form-control" name="weather" value={log.weather} onChange={handleChange} required>
                                            <option value="">Select</option>
                                            {['Windy', 'Stormy', 'Cloudy', 'Sunny', 'Humid', 'Foggy', 'Rainy']
                                                .map((weather) => <option key={weather} value={weather}>{weather}</option>)}
                                        </select>
                                    </div>

                                    {/* Special Offer */}
                                    <div className="mb-3">
                                        <label className="form-label">Special Offer</label>
                                        <select className="form-control" name="specialOffer" value={log.specialOffer} onChange={handleChange} required>
                                            <option value="No">No</option>
                                            <option value="Yes">Yes</option>
                                        </select>
                                    </div>

                                    {/* Quantity Wasted */}
                                    <div className="mb-3">
                                        <label className="form-label">Quantity Wasted</label>
                                        <input type="number" className="form-control" name="quantityWasted" value={log.quantityWasted} onChange={handleChange} required />
                                    </div>

                                    {/* Holiday */}
                                    <div className="mb-3">
                                        <label className="form-label">Holiday</label>
                                        <select className="form-control" name="holiday" value={log.holiday} onChange={handleChange}>
                                            <option value="">Select Holiday</option>
                                            <option value="Yes">Yes</option>
                                            <option value="No">No</option>
                                        </select>
                                    </div>

                                    {/* Event */}
                                    <div className="mb-3">
                                        <label className="form-label">Event</label>
                                        <select className="form-control" name="event" value={log.event} onChange={handleChange}>
                                            <option value="">Select Event</option>
                                            <option value="nan">None</option>
                                            <option value="Concert">Concert</option>
                                            <option value="Wedding Season">Wedding Season</option>
                                            <option value="Fair">Fair</option>
                                        </select>
                                    </div>


                                    {/* Delivery Orders */}
                                    <div className="mb-3">
                                        <label className="form-label">Delivery Orders</label>
                                        <input type="number" className="form-control" name="deliveryOrders" value={log.deliveryOrders} onChange={handleChange} required />
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
