import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useAuth } from "../../store/auth";
import { toast } from "react-toastify";

function MyMatchingRequests() {
    const [matchingRequests, setMatchingRequests] = useState([]);
    const [actionDropdown, setActionDropdown] = useState(null);
    const { authorizationToken, API } = useAuth();

    useEffect(() => {
        const fetchMatchingRequests = async () => {
            try {
                // console.log(authorizationToken);
                const response = await fetch(`${API}/api/volunteer/matching-requests`, {
                    headers: {
                        Authorization: authorizationToken,
                    },
                });
                const data = await response.json();

                if (response.ok && data.requests) {
                    setMatchingRequests(data.requests);
                } else {
                    console.error(data.message || 'NO matching requests at these moment.');
                }
            } catch (error) {
                console.error('Error fetching matching requests:', error);
                // toast.error('An error occurred while fetching matching requests.');
            }
        };

        fetchMatchingRequests();
    }, [API, authorizationToken]);

    const handleActionClick = (requestId) => {
        setActionDropdown(actionDropdown === requestId ? null : requestId);
    };

    const handleStatusChange = async (requestId, status) => {
        try {
            const response = await fetch(`${API}/api/volunteer/update-request-status`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: authorizationToken,
                },
                body: JSON.stringify({ requestId, status }),
            });

            const data = await response.json();

            if (response.ok) {
                toast.success(data.message);

                setMatchingRequests((prevRequests) =>
                    prevRequests.map((request) =>
                        request._id === requestId ? { ...request, status } : request
                    )
                );
            } else {
                toast.error(data.message || 'Failed to update request status.');
            }
        } catch (error) {
            console.error('Error updating request status:', error);
            toast.error('An error occurred. Please try again.');
        } finally {
            setActionDropdown(null);
        }
    };

    const handleGetRoute = (requestId) => {
        console.log(`Get route for Request ID: ${requestId}`);
    };

    return (
        <div className="container-fluid" style={{ display: 'flex', minHeight: '100vh', paddingTop: '60px' }}>
            <div className="content" style={{ marginLeft: '200px', width: 'calc(100% - 200px)', overflowY: 'auto', padding: '20px' }}>
                <h1 className="mb-4">Matching Food Requests</h1>
                {matchingRequests.length === 0 ? (
                    <div className="alert alert-warning">No matching food requests found.</div>
                ) : (
                    <div className="row">
                        {matchingRequests.map((request) => (
                            <div key={request._id} className="col-md-4 mb-4">
                                <div className="card" style={{ border: 'none', borderRadius: '10px', background: 'linear-gradient(145deg,rgb(255, 255, 255),rgb(252, 252, 252))', boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)', color: '#2d572c' }}>
                                    <div className="card-header" style={{ backgroundColor: 'rgb(36, 177, 26)', color: '#fff', borderRadius: '10px 10px 0 0', fontWeight: 'bold', textAlign: 'center', padding: '10px' }}>
                                        <h5 style={{ marginBottom: '5px' }}>{request.foodType} - {request.category}</h5>
                                        <small>{request.ngoName}</small>
                                    </div>
                                    <div className="card-body" style={{ padding: '15px' }}>
                                        <h5 className="card-title" style={{ marginBottom: '10px' }}>
                                            Quantity Needed: {request.quantityNeeded} Kg
                                        </h5>
                                        <p><strong>Needed By: </strong>{new Date(request.neededBy).toLocaleDateString()}</p>
                                        <p><strong>Contact: </strong>{request.contactPhone}</p>
                                        <p><strong>Email: </strong>{request.contactEmail}</p>
                                        <p><strong>Address: </strong>{request.address}</p>
                                        <p><strong>Status: </strong>{request.status}</p>
                                    </div>
                                    <div className="card-footer" style={{ backgroundColor: 'rgb(36, 177, 26)', color: 'white', borderRadius: '0 0 10px 10px', textAlign: 'center', fontWeight: 'bold', padding: '10px' }}>
                                        <button className="btn btn-success" onClick={() => handleActionClick(request._id)}>
                                            Actions
                                        </button>
                                        {actionDropdown === request._id && (
                                            <div className="dropdown-menu show" style={{ position: 'absolute', zIndex: 1000 }}>
                                                <button className="dropdown-item" onClick={() => handleStatusChange(request._id, 'Accepted')}>
                                                    Mark as Accepted
                                                </button>
                                                {/* <button className="dropdown-item" onClick={() => handleStatusChange(request._id, 'completed')}>
                                                    Mark as Completed
                                                </button> */}
                                                <button className="dropdown-item" onClick={() => handleGetRoute(request._id)}>
                                                    Get Route
                                                </button>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}

export default MyMatchingRequests;