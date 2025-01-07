import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from "react-router-dom"; // Use useNavigate instead of useHistory
import { Bar } from "react-chartjs-2"; // Import the Bar chart component from react-chartjs-2
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from "chart.js"; // Import necessary Chart.js components

// Register the chart components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

function HotelDashboardAnalytics() {
    const [file, setFile] = useState(null); // Store the file selected by the user
    const [predictions, setPredictions] = useState([]); // Store predictions from API
    const [loading, setLoading] = useState(false); // Loading state for file upload
    const [error, setError] = useState(null); // Error handling state
    const navigate = useNavigate(); // Initialize the navigate function

    // Handle file input change
    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    // Handle file upload
    const handleFileUpload = async () => {
        if (!file) {
            setError("Please select a file to upload.");
            return;
        }

        const formData = new FormData();
        formData.append("file", file);

        try {
            setLoading(true);
            setError(null);

            // Send file to backend (Replace with your backend URL)
            const response = await fetch("http://localhost:3000/api/predictions/response", {
                method: "POST",
                body: formData,
            });

            const data = await response.json();

            if (response.ok) {
                setPredictions(data.predictions);
            } else {
                setError(data.error || "Something went wrong.");
            }
        } catch (error) {
            setError("Failed to upload file.");
        } finally {
            setLoading(false);
        }
    };

    // Prepare data for the bar chart
    const chartData = {
        labels: predictions.map((prediction) => prediction.Date), // Dates as x-axis labels
        datasets: [
            {
                label: "Predicted Quantity Ordered (kg)",
                data: predictions.map(
                    (prediction) => prediction["Predicted Quantity Ordered (kg)"]
                ),
                backgroundColor: "rgba(75, 192, 192, 0.2)", // Bar color
                borderColor: "rgba(75, 192, 192, 1)", // Border color
                borderWidth: 1,
            },
        ],
    };

    return (
        <div
            className="container-fluid"
            style={{
                display: "flex",
                minHeight: "100vh",
                paddingTop: "60px",
            }}
        >
            <div
                className="content"
                style={{
                    marginLeft: "200px", // Ensure the main content area shifts to the right
                    width: "calc(100% - 200px)", // Adjust the width accordingly
                    overflowY: "auto",
                    padding: "20px",
                    zIndex: "500",
                }}
            >
                <h1 className="mb-4">Hotel Analytics - Food Quantity Prediction</h1>

                {/* File Upload Section */}
                <div className="row mb-4">
                    <div className="col-12">
                        <input type="file" className="form-control" onChange={handleFileChange} />
                    </div>
                    <div className="col-12 mt-3">
                        <button
                            className="btn btn-primary"
                            onClick={handleFileUpload}
                            disabled={loading}
                        >
                            {loading ? "Uploading..." : "Upload File"}
                        </button>
                    </div>
                </div>

                {/* Error Message */}
                {error && (
                    <div className="alert alert-danger">
                        <strong>Error:</strong> {error}
                    </div>
                )}

                {/* Bar Chart for Predictions */}
                {predictions.length > 0 && (
                    <div className="mb-4">
                        <Bar
                            data={chartData}
                            options={{
                                responsive: true,
                                plugins: {
                                    title: {
                                        display: true,
                                        text: "Future Food Quantity Predictions",
                                    },
                                    tooltip: {
                                        callbacks: {
                                            label: function (tooltipItem) {
                                                return `${tooltipItem.raw.toFixed(2)} kg`; // Format tooltip
                                            },
                                        },
                                    },
                                },
                                scales: {
                                    x: {
                                        title: {
                                            display: true,
                                            text: "Date",
                                        },
                                    },
                                    y: {
                                        title: {
                                            display: true,
                                            text: "Predicted Quantity (kg)",
                                        },
                                        beginAtZero: true, // Start y-axis from 0
                                    },
                                },
                            }}
                        />
                    </div>
                )}

                {/* Predictions Table */}
                {predictions.length > 0 && (
                    <div className="table-responsive">
                        <table className="table table-striped">
                            <thead>
                                <tr>
                                    <th>Date</th>
                                    <th>Predicted Quantity Ordered (kg)</th>
                                </tr>
                            </thead>
                            <tbody>
                                {predictions.map((prediction, index) => (
                                    <tr key={index}>
                                        <td>{prediction.Date}</td>
                                        <td>{prediction["Predicted Quantity Ordered (kg)"].toFixed(2)}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    );
}

export default HotelDashboardAnalytics;
