import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useAuth } from "../../store/auth";
import { toast } from 'react-toastify';

function GetRecommendation() {
    const { user } = useAuth(); // Get user details and API base URL from context
    const API = "http://127.0.0.1:5000"
    const [recommendations, setRecommendations] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchRecommendations = async () => {
            try {
                const response = await fetch(`${API}/get_recommendations?volunteer_id=${user.email}`);
                if (!response.ok) {
                    const res_data = await response.json();
                    throw new Error(res_data.message || 'Failed to fetch recommendations');
                }
                const data = await response.json();
                setRecommendations(data.recommendations);
                toast.success("Recommendations fetched successfully!");
            } catch (err) {
                toast.error(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchRecommendations();
    }, [user.email, API]);

    return (
        <div className="container-fluid" style={{
            display: 'flex',
            minHeight: '100vh', // Ensure full-screen height
            paddingTop: '60px', // Space for navbar
        }}>
            {/* Main Content Area */}
            <div
                className="content"
                style={{
                    marginLeft: '200px', // Reserve space for sidebar
                    width: 'calc(100% - 200px)', // Content takes the rest of the width
                    overflowY: 'auto', // Scrollable if needed
                    padding: '20px',
                }}
            >
                <div className="row mb-4">
                    <div className="col-12">
                        <h1>Recommended Locations</h1>
                        <p>Based on your previous interactions, these locations are recommended for you for Donations.</p>
                    </div>
                </div>

                {/* Loading Spinner */}
                {loading && (
                    <div className="text-center">
                        <div className="spinner-border text-primary" role="status">
                            <span className="sr-only">Loading...</span>
                        </div>
                        <p>Fetching recommendations...</p>
                    </div>
                )}

                {/* Recommendations */}
                {!loading && recommendations.length > 0 && (
                    <div className="row">
                        {recommendations.map((rec, index) => (
                            <div key={index} className="col-md-4">
                                <div className="card text-white bg-info mb-3">
                                    <div className="card-header">Recommended Location</div>
                                    <div className="card-body">
                                        <h3 className="card-title">Location : {rec[0]}</h3>
                                        <button className="btn btn-lg btn-success" >
                                            Get Route
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {/* No Recommendations */}
                {!loading && recommendations.length === 0 && (
                    <div className="alert alert-info">
                        No recommendations available at the moment.
                    </div>
                )}
            </div>
        </div>
    );
}

export default GetRecommendation;
