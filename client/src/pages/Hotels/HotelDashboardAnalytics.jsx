import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const HotelDashboardAnalytics = () => {
    const [predictions, setPredictions] = useState([]);
    const [tableData, setTableData] = useState([]);
    const [dishes, setDishes] = useState([]);
    const [dates, setDates] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const response = await fetch("http://localhost:3000/api/predictions/send-dataset");

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const data = await response.json();
            console.log(data);

            setPredictions(data);
            formatTableData(data);
            setLoading(false);
        } catch (error) {
            console.error("Error fetching predictions:", error);
            setLoading(false);
        }
    };

    const formatTableData = (data) => {
        const dishSet = new Set();
        const dateSet = new Set();

        data.forEach((item) => {
            dishSet.add(item["Dish Name"]);
            dateSet.add(item["Date"]);
        });

        const sortedDishes = Array.from(dishSet)
            .sort()
            .map(dish => dish.charAt(0).toUpperCase() + dish.slice(1)); // Capitalize dish names

        const sortedDates = Array.from(dateSet).sort();

        const matrix = sortedDates.map((date) => {
            const row = { Date: date };
            sortedDishes.forEach((dish) => {
                const prediction = data.find(
                    (item) => item["Date"] === date &&
                        item["Dish Name"].toLowerCase() === dish.toLowerCase()
                );
                row[dish] = prediction ? prediction["Predicted Quantity"] : "-";
            });
            return row;
        });

        setDishes(sortedDishes);
        setDates(sortedDates);
        setTableData(matrix);
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
                zIndex: '500'
            }}>
                <h2 className="text-center mb-4" style={{ color: '#1b5e20', fontSize: '36px', fontWeight: 'bold' }}>
                    Hotel Prediction Dashboard
                </h2>

                {loading ? (
                    <div className="d-flex justify-content-center align-items-center" style={{ height: '60vh' }}>
                        <div className="spinner-border text-success" role="status" style={{ width: '3rem', height: '3rem' }}>
                            <span className="visually-hidden">Loading...</span>
                        </div>
                        <h4 className="ms-3">Fetching data...</h4>
                    </div>
                ) : (
                    <div className="table-responsive">
                        <table className="table table-bordered table-hover table-striped shadow-lg" style={{ borderRadius: '10px', overflow: 'hidden' }}>
                            <thead style={{ backgroundColor: '#4caf50', color: 'white' }}>
                                <tr>
                                    <th className="text-center p-3" style={{ fontSize: '18px', whiteSpace: 'nowrap', minWidth: '150px' }}>Date</th>
                                    {dishes.map((dish, index) => (
                                        <th key={index} className="text-center p-3" style={{ fontSize: '18px' }}>
                                            {dish}
                                        </th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {tableData.map((row, rowIndex) => (
                                    <tr key={rowIndex}>
                                        <td className="text-center p-3" style={{ fontSize: '16px', fontWeight: '500', whiteSpace: 'nowrap', minWidth: '150px' }}>
                                            {row.Date}
                                        </td>
                                        {dishes.map((dish, colIndex) => (
                                            <td key={colIndex} className="text-center p-3" style={{ fontSize: '16px' }}>
                                                {row[dish]}
                                            </td>
                                        ))}
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    );
};

export default HotelDashboardAnalytics;


// import React, { useState } from "react";
// import "bootstrap/dist/css/bootstrap.min.css";
// import { useNavigate } from "react-router-dom";
// import { Bar } from "react-chartjs-2";
// import {
//     Chart as ChartJS,
//     CategoryScale,
//     LinearScale,
//     BarElement,
//     Title,
//     Tooltip,
//     Legend,
// } from "chart.js";

// // Register the chart components
// ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

// function HotelDashboardAnalytics() {
//     const [file, setFile] = useState(null);
//     const [predictions, setPredictions] = useState([]);
//     const [loading, setLoading] = useState(false);
//     const [error, setError] = useState(null);
//     const navigate = useNavigate();

//     // Handle file input change
//     const handleFileChange = (e) => {
//         setFile(e.target.files[0]);
//     };

//     // Handle file upload
//     const handleFileUpload = async () => {
//         if (!file) {
//             setError("Please select a file to upload.");
//             return;
//         }

//         const formData = new FormData();
//         formData.append("file", file);

//         try {
//             setLoading(true);
//             setError(null);

//             const response = await fetch("http://localhost:3000/api/predictions/response", {
//                 method: "POST",
//                 body: formData,
//             });

//             const data = await response.json();

//             if (response.ok) {
//                 setPredictions(data.predictions);
//             } else {
//                 setError(data.error || "Something went wrong.");
//             }
//         } catch (error) {
//             setError("Failed to upload file.");
//         } finally {
//             setLoading(false);
//         }
//     };

//     // Prepare data for the bar chart
//     const chartData = {
//         labels: predictions.map((prediction) => prediction.Date),
//         datasets: [
//             {
//                 label: "Predicted Quantity Ordered (kg)",
//                 data: predictions.map(
//                     (prediction) => prediction["Predicted Food Prepared (kg)"]
//                 ),
//                 backgroundColor: "rgba(75, 192, 192, 0.2)",
//                 borderColor: "rgba(75, 192, 192, 1)",
//                 borderWidth: 1,
//             },
//         ],
//     };

//     return (
//         <div
//             className="container-fluid"
//             style={{
//                 display: "flex",
//                 minHeight: "100vh",
//                 paddingTop: "60px",
//             }}
//         >
//             <div
//                 className="content"
//                 style={{
//                     marginLeft: "200px",
//                     width: "calc(100% - 200px)",
//                     overflowY: "auto",
//                     padding: "20px",
//                     zIndex: "500",
//                 }}
//             >
//                 <h1 className="mb-4">Hotel Analytics - Food Quantity Prediction</h1>

//                 {/* File Upload Section */}
//                 <div className="row mb-4">
//                     <div className="col-12">
//                         <input type="file" className="form-control" onChange={handleFileChange} />
//                     </div>
//                     <div className="col-12 mt-3">
//                         <button
//                             className="btn btn-primary"
//                             onClick={handleFileUpload}
//                             disabled={loading}
//                         >
//                             {loading ? "Uploading..." : "Upload File"}
//                         </button>
//                     </div>
//                 </div>

//                 {/* Error Message */}
//                 {error && (
//                     <div className="alert alert-danger">
//                         <strong>Error:</strong> {error}
//                     </div>
//                 )}

//                 {/* Bar Chart for Predictions */}
//                 {predictions.length > 0 && (
//                     <div className="mb-4">
//                         <Bar
//                             data={chartData}
//                             options={{
//                                 responsive: true,
//                                 plugins: {
//                                     title: {
//                                         display: true,
//                                         text: "Future Food Quantity Predictions",
//                                     },
//                                     tooltip: {
//                                         callbacks: {
//                                             label: function (tooltipItem) {
//                                                 return `${tooltipItem.raw.toFixed(2)} kg`;
//                                             },
//                                         },
//                                     },
//                                 },
//                                 scales: {
//                                     x: {
//                                         title: {
//                                             display: true,
//                                             text: "Date",
//                                         },
//                                     },
//                                     y: {
//                                         title: {
//                                             display: true,
//                                             text: "Predicted Quantity (kg)",
//                                         },
//                                         beginAtZero: true,
//                                     },
//                                 },
//                             }}
//                         />
//                     </div>
//                 )}

//                 {/* Predictions Table */}
//                 {predictions.length > 0 && (
//                     <div className="container-fluid">
//                         <div className="row">
//                             <div className="col-12">
//                                 <div className="table-responsive">
//                                     <table className="table table-striped w-100" style={{ fontSize: "1.4rem" }}>
//                                         <thead>
//                                             <tr>
//                                                 <th>Date</th>
//                                                 <th>Predicted Food Prepared (kg)</th>
//                                             </tr>
//                                         </thead>
//                                         <tbody>
//                                             {predictions.map((prediction, index) => (
//                                                 <tr key={index}>
//                                                     <td>{prediction.Date}</td>
//                                                     <td>{prediction["Predicted Food Prepared (kg)"].toFixed(2)}</td>
//                                                 </tr>
//                                             ))}
//                                         </tbody>
//                                     </table>
//                                 </div>
//                             </div>
//                         </div>
//                     </div>

//                 )}
//             </div>
//         </div>
//     );
// }

// export default HotelDashboardAnalytics;
