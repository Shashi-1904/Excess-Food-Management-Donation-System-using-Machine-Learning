import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { useAuth } from "../../store/auth";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

function AssignedDonations() {
    const [donations, setDonations] = useState([]);
    const [foodRequests, setFoodRequests] = useState([]);
    const [actionDropdown, setActionDropdown] = useState(null);
    const [showETAInput, setShowETAInput] = useState(false);
    // State initialization
    const [etaMinutes, setEtaMinutes] = useState("");
    // ETA state
    const [selectedDonationId, setSelectedDonationId] = useState(null);

    // New state for delivery location popup
    const [showLocationPopup, setShowLocationPopup] = useState(false);
    const [deliveryLocation, setDeliveryLocation] = useState("");

    const { authorizationToken, API } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchAssignedData = async () => {
            try {
                const response = await fetch(`${API}/api/volunteer/assigned-donations`, {
                    headers: { Authorization: authorizationToken },
                });

                const data = await response.json();

                if (response.ok) {
                    const filteredDonations = (data.donations || []).filter(
                        (donation) => donation.status !== "completed" && donation.status !== "expired"
                    );
                    const filteredRequests = (data.foodRequests || []).filter(
                        (request) => request.status !== "completed"
                    );


                    setDonations(filteredDonations);
                    setFoodRequests(filteredRequests);
                } else {
                    toast.error(data.message || "Failed to fetch assigned data.");
                }
            } catch (error) {
                console.error("Error fetching data:", error);
                toast.error("An error occurred while fetching assigned data.");
            }
        };

        fetchAssignedData();
    }, [API, authorizationToken]);

    const handleActionClick = (id) => {
        setActionDropdown(actionDropdown === id ? null : id);
    };

    // Show ETA popup for arriving status
    const handleArrivingClick = (donationId) => {
        setSelectedDonationId(donationId);
        setShowETAInput(true);
    };

    // Handle ETA submission
    const handleETASubmit = async () => {
        if (!etaMinutes || isNaN(etaMinutes) || etaMinutes <= 0) {
            toast.error("Please enter a valid ETA in minutes.");
            return;
        }

        const minutes = Number(etaMinutes);
        await handleStatusChange(selectedDonationId, "arriving", minutes);
        setShowETAInput(false);
        setEtaMinutes("");
    };

    const handleLocationSubmit = async () => {
        if (!deliveryLocation.trim()) {
            toast.error("Please enter a valid delivery location.");
            return;
        }

        try {
            // Send interaction location data first
            const interactionResponse = await fetch(`${API}/api/interaction/add-interaction`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: authorizationToken,
                },
                body: JSON.stringify({ locationId: deliveryLocation })
            });

            const interactionData = await interactionResponse.json();

            if (!interactionResponse.ok) {
                toast.error(interactionData.message || "Failed to save interaction.");
                return;
            }

            toast.success("Interaction saved successfully.");

            // Now, update the donation status to "completed"
            const statusPayload = { donationId: selectedDonationId, status: "completed" };

            const statusResponse = await fetch(`${API}/api/volunteer/update-donation-status`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: authorizationToken,
                },
                body: JSON.stringify(statusPayload),
            });

            const statusData = await statusResponse.json();

            if (statusResponse.ok) {
                toast.success("Donation marked as completed.");

                // Remove the donation from the page only after successful status update
                setDonations((prevDonations) =>
                    prevDonations.filter((donation) => donation._id !== selectedDonationId)
                );

            } else {
                toast.error(statusData.message || "Failed to update the donation status.");
            }

            // Close popup and clear the location
            setShowLocationPopup(false);
            setDeliveryLocation("");

        } catch (error) {
            console.error("Error submitting location and updating status:", error);
            toast.error("An error occurred. Please try again.");
        }
    };


    const handleStatusChange = async (donationId, status, minutes = null) => {
        try {
            // For completed status, show location popup first
            if (status === "completed") {
                setSelectedDonationId(donationId);
                setShowLocationPopup(true);
                return;  // Wait until location is submitted
            }

            const payload = { donationId, status };

            if (status === "arriving" && minutes) {
                payload.minutes = minutes;
            }

            // Send status update request
            const response = await fetch(`${API}/api/volunteer/update-donation-status`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: authorizationToken,
                },
                body: JSON.stringify(payload),
            });

            const data = await response.json();

            if (response.ok) {
                toast.success(data.message);

                // Update donation status in the list
                setDonations((prevDonations) =>
                    prevDonations.map((donation) =>
                        donation._id === donationId
                            ? { ...donation, status, eta: minutes || donation.eta }
                            : donation
                    )
                );
            } else {
                toast.error(data.message || "Failed to update the donation status.");
            }
        } catch (error) {
            console.error("Error updating donation status:", error);
            toast.error("An error occurred. Please try again.");
        } finally {
            setActionDropdown(null);
        }
    };


    const handleGetRoute = (pickupLat, pickupLng) => {
        navigate(`/getroute/${pickupLat}/${pickupLng}`);
    };

    const handleGetDeliveryRoute = (pickupLat, pickupLng, deliveredTo) => {
        navigate(`/getdeliveryroute/${pickupLat}/${pickupLng}/${deliveredTo}`);
    };


    return (
        <div className="container-fluid" style={{ display: "flex", minHeight: "100vh", paddingTop: "60px" }}>
            <div className="content" style={{ marginLeft: "200px", width: "calc(100% - 200px)", overflowY: "auto", padding: "20px" }}>
                <h1 className="mb-4">Assigned Donations & Requests</h1>


                {donations.length === 0 && foodRequests.length === 0 ? (
                    <div className="alert alert-warning">No donations or food requests assigned to you.</div>
                ) : (
                    <div className="row">
                        {donations.map((donation) => (
                            <div key={donation._id} className="col-md-4 mb-4">
                                <div className="card shadow-lg rounded">
                                    <div className="card-header bg-success text-white text-center">
                                        <h5>{donation.foodName}</h5>
                                        <small>{donation.foodType} - {donation.category}</small>
                                    </div>
                                    <div className="card-body">
                                        <p><strong>Quantity:</strong> {donation.quantity} Kg</p>
                                        <p><strong>Expiry:</strong> {donation.expiry} Hours</p>
                                        <p><strong>Contact:</strong> {donation.phoneNumber}</p>
                                        <p><strong>Email:</strong> {donation.email}</p>
                                        <p><strong>Address:</strong> {donation.address}</p>
                                        <p><strong>Status:</strong> {donation.status.charAt(0).toUpperCase() + donation.status.slice(1)}</p>
                                        {donation.deliveredTo && (
                                            <p><strong>Requested By:</strong> {donation.deliveredTo}</p>
                                        )}

                                    </div>
                                    <div className="card-footer text-center">
                                        <button className="btn btn-success" onClick={() => handleActionClick(donation._id)}>
                                            Actions
                                        </button>
                                        {actionDropdown === donation._id && (
                                            <div className="dropdown-menu show">
                                                <button
                                                    className="dropdown-item"
                                                    onClick={() => handleArrivingClick(donation._id)}
                                                >
                                                    Mark as Arriving for Pickup
                                                </button>
                                                <button className="dropdown-item" onClick={() => handleStatusChange(donation._id, "picked")}>
                                                    Mark as Picked
                                                </button>
                                                <button className="dropdown-item" onClick={() => handleStatusChange(donation._id, "completed")}>
                                                    Mark as Completed
                                                </button>
                                                <button className="dropdown-item" onClick={() => handleGetRoute(donation.latitude, donation.longitude)}>
                                                    Get Pickup Route
                                                </button>
                                                {donation.deliveredTo && (
                                                    <button
                                                        className="dropdown-item"
                                                        onClick={() => handleGetDeliveryRoute(donation.latitude, donation.longitude, donation.deliveredTo)}
                                                    >
                                                        Get Delivery Route
                                                    </button>
                                                )}

                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* ETA Modal */}
            {showETAInput && (
                <div className="modal fade show d-block" style={{ backgroundColor: "rgba(0,0,0,0.5)" }}>
                    <div className="modal-dialog modal-dialog-centered">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Estimated Time of Arrival (minutes)</h5>
                                <button className="btn-close" onClick={() => setShowETAInput(false)}></button>
                            </div>
                            <div className="modal-body">
                                <input
                                    type="number"
                                    className="form-control"
                                    value={etaMinutes}
                                    onChange={(e) => setEtaMinutes(e.target.value)}
                                    placeholder="Enter ETA in minutes"
                                />
                            </div>
                            <div className="modal-footer">
                                <button className="btn btn-secondary" onClick={() => setShowETAInput(false)}>Cancel</button>
                                <button className="btn btn-success" onClick={handleETASubmit}>Submit</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Delivery Location Popup */}
            {showLocationPopup && (
                <div className="modal fade show d-block" style={{ backgroundColor: "rgba(0,0,0,0.5)" }}>
                    <div className="modal-dialog modal-dialog-centered">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5>Delivery Location</h5>
                                <button className="btn-close" onClick={() => setShowLocationPopup(false)}></button>
                            </div>
                            <div className="modal-body">
                                <input
                                    type="text"
                                    className="form-control"
                                    value={deliveryLocation}
                                    onChange={(e) => setDeliveryLocation(e.target.value)}
                                    placeholder="Enter delivery location"
                                />
                            </div>
                            <div className="modal-footer">
                                <button className="btn btn-secondary" onClick={() => setShowLocationPopup(false)}>Cancel</button>
                                <button className="btn btn-success" onClick={handleLocationSubmit}>Submit</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

        </div>
    );
}

export default AssignedDonations;


// import React, { useEffect, useState } from "react";
// import "bootstrap/dist/css/bootstrap.min.css";
// import { useAuth } from "../../store/auth";
// import { toast } from "react-toastify";
// import { useNavigate } from "react-router-dom";


// function AssignedDonations() {
//     const [donations, setDonations] = useState([]);
//     const [foodRequests, setFoodRequests] = useState([]);
//     const [actionDropdown, setActionDropdown] = useState(null);
//     const { authorizationToken, API } = useAuth();
//     const navigate = useNavigate();

//     useEffect(() => {
//         const fetchAssignedData = async () => {
//             try {
//                 const response = await fetch(`${API}/api/volunteer/assigned-donations`, {
//                     headers: {
//                         Authorization: authorizationToken,
//                     },
//                 });

//                 const data = await response.json();

//                 if (response.ok) {
//                     const filteredDonations = (data.donations || []).filter(
//                         (donation) => donation.status !== "completed"
//                     );
//                     const filteredRequests = (data.foodRequests || []).filter(
//                         (request) => request.status !== "completed"
//                     );

//                     setDonations(filteredDonations);
//                     setFoodRequests(filteredRequests);
//                 } else {
//                     toast.error(data.message || "Failed to fetch assigned data.");
//                 }
//             } catch (error) {
//                 console.error("Error fetching data:", error);
//                 toast.error("An error occurred while fetching assigned data.");
//             }
//         };

//         fetchAssignedData();
//     }, [API, authorizationToken]);

//     const handleActionClick = (id) => {
//         setActionDropdown(actionDropdown === id ? null : id);
//     };

//     const handleStatusChange = async (donationId, status) => {
//         try {
//             const response = await fetch(`${API}/api/volunteer/update-donation-status`, {
//                 method: "PUT",
//                 headers: {
//                     "Content-Type": "application/json",
//                     Authorization: authorizationToken,
//                 },
//                 body: JSON.stringify({ donationId, status }),
//             });

//             const data = await response.json();

//             if (response.ok) {
//                 toast.success(data.message);
//                 setDonations((prevDonations) =>
//                     status === "completed"
//                         ? prevDonations.filter((donation) => donation._id !== donationId)
//                         : prevDonations.map((donation) =>
//                             donation._id === donationId ? { ...donation, status } : donation
//                         )
//                 );
//             } else {
//                 toast.error(data.message || "Failed to update the donation status.");
//             }
//         } catch (error) {
//             console.error("Error updating donation status:", error);
//             toast.error("An error occurred. Please try again.");
//         } finally {
//             setActionDropdown(null);
//         }
//     };

//     const handleStatusChangeRequest = async (requestId, status) => {
//         try {
//             const response = await fetch(`${API}/api/volunteer/update-request-status`, {
//                 method: "PUT",
//                 headers: {
//                     "Content-Type": "application/json",
//                     Authorization: authorizationToken,
//                 },
//                 body: JSON.stringify({ requestId, status }),
//             });

//             const data = await response.json();

//             if (response.ok) {
//                 toast.success(data.message);
//                 setFoodRequests((prevRequests) =>
//                     status === "completed"
//                         ? prevRequests.filter((request) => request._id !== requestId)
//                         : prevRequests.map((request) =>
//                             request._id === requestId ? { ...request, status } : request
//                         )
//                 );
//             } else {
//                 toast.error(data.message || "Failed to update the request status.");
//             }
//         } catch (error) {
//             console.error("Error updating request status:", error);
//             toast.error("An error occurred. Please try again.");
//         } finally {
//             setActionDropdown(null);
//         }
//     };

//     const handleGetRoute = (pickupLat, pickupLng) => {
//         navigate(`/getroute/${pickupLat}/${pickupLng}`);
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
//                 }}
//             >
//                 <h1 className="mb-4">Assigned Donations & Requests</h1>

//                 {donations.length === 0 && foodRequests.length === 0 ? (
//                     <div className="alert alert-warning">No donations or food requests assigned to you.</div>
//                 ) : (
//                     <div className="row">
//                         {/* Assigned Donations */}
//                         {donations.map((donation) => (
//                             <div key={donation._id} className="col-md-4 mb-4">
//                                 <div className="card shadow-lg rounded">
//                                     <div className="card-header bg-success text-white text-center">
//                                         <h5>{donation.foodName}</h5>
//                                         <small>{donation.foodType} - {donation.category}</small>
//                                     </div>
//                                     <div className="card-body">
//                                         <p><strong>Quantity:</strong> {donation.quantity} Kg</p>
//                                         <p><strong>Expiry:</strong> {donation.expiry} Hours</p>
//                                         <p><strong>Contact:</strong> {donation.phoneNumber}</p>
//                                         <p><strong>Email:</strong> {donation.email}</p>
//                                         <p><strong>Address:</strong> {donation.address}</p>
//                                         <p><strong>Status:</strong> {donation.status.charAt(0).toUpperCase() + donation.status.slice(1)}</p>
//                                     </div>
//                                     <div className="card-footer text-center">
//                                         <button className="btn btn-success" onClick={() => handleActionClick(donation._id)}>
//                                             Actions
//                                         </button>
//                                         {actionDropdown === donation._id && (
//                                             <div className="dropdown-menu show">
//                                                 <button
//                                                     className="dropdown-item"
//                                                     onClick={() => handleStatusChange(donation._id, "arriving")}
//                                                 >
//                                                     Mark as Arriving for Pickup
//                                                 </button>
//                                                 <button className="dropdown-item" onClick={() => handleStatusChange(donation._id, "picked")}>
//                                                     Mark as Picked
//                                                 </button>
//                                                 <button className="dropdown-item" onClick={() => handleStatusChange(donation._id, "completed")}>
//                                                     Mark as Completed
//                                                 </button>
//                                                 <button className="dropdown-item" onClick={() => handleGetRoute(donation.latitude, donation.longitude)}>
//                                                     Get Route
//                                                 </button>
//                                             </div>
//                                         )}
//                                     </div>
//                                 </div>
//                             </div>
//                         ))}

//                         {/* Assigned Food Requests */}
//                         {foodRequests.map((request) => (
//                             <div key={request._id} className="col-md-4 mb-4">
//                                 <div className="card shadow-lg rounded">
//                                     <div className="card-header bg-primary text-white text-center">
//                                         <h5>{request.ngoName}</h5>
//                                         <small>{request.foodType} - {request.category}</small>
//                                     </div>
//                                     <div className="card-body">
//                                         <p><strong>Quantity Needed:</strong> {request.quantityNeeded} Kg</p>
//                                         <p><strong>Needed By:</strong> {new Date(request.neededBy).toDateString()}</p>
//                                         <p><strong>Contact:</strong> {request.contactPhone}</p>
//                                         <p><strong>Email:</strong> {request.contactEmail}</p>
//                                         <p><strong>Address:</strong> {request.address}</p>
//                                         <p><strong>Status:</strong> {request.status}</p>
//                                     </div>
//                                     <div className="card-footer text-center">
//                                         <button className="btn btn-primary" onClick={() => handleActionClick(request._id)}>
//                                             Actions
//                                         </button>
//                                         {actionDropdown === request._id && (
//                                             <div className="dropdown-menu show">
//                                                 <button className="dropdown-item" onClick={() => handleStatusChangeRequest(request._id, "In Progress")}>
//                                                     Mark as In Progress
//                                                 </button>
//                                                 <button className="dropdown-item" onClick={() => handleStatusChangeRequest(request._id, "completed")}>
//                                                     Mark as Completed
//                                                 </button>
//                                                 {/* <button className="dropdown-item" onClick={() => handleGetRoute(donation.latitude, donation.longitude)}>
//                                                     Get Route
//                                                 </button> */}
//                                             </div>
//                                         )}
//                                     </div>
//                                 </div>
//                             </div>
//                         ))}
//                     </div>
//                 )}
//             </div>
//         </div>
//     );
// }

// export default AssignedDonations;
