import React, { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import { GoogleMap, DirectionsRenderer } from "@react-google-maps/api";
import { useAuth } from "../../store/auth";

const containerStyle = {
    width: "100%",
    height: "100vh",
};

const GetRoute = () => {
    const { donationLat, donationLng, deliveredTo } = useParams();
    const { API } = useAuth();

    const [directions, setDirections] = useState(null);
    const [ngoLocation, setNgoLocation] = useState(null);
    const [loading, setLoading] = useState(true);
    const directionsFetched = useRef(false);


    const donationLocation = {
        lat: parseFloat(donationLat) || 0,
        lng: parseFloat(donationLng) || 0
    };


    // console.log("Donation Location:", donationLocation);

    const fetchNgoLocation = async () => {
        console.log("Fetching NGO location...");

        try {
            const response = await fetch(`${API}/api/volunteer/volunteer-location`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ email: deliveredTo })
            });


            if (!response.ok) {
                throw new Error("Failed to fetch NGO location");
            }

            const data = await response.json();
            // console.log("Fetched NGO location:", data);

            if (data.success && data.data.latitude && data.data.longitude) {
                setNgoLocation({
                    lat: parseFloat(data.data.latitude),
                    lng: parseFloat(data.data.longitude)
                });
            } else {
                console.error("Invalid or missing lat/lng data:", data.message);
            }
        } catch (error) {
            console.error("Error fetching NGO location:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchNgoLocation();
    }, []);

    useEffect(() => {
        if (
            donationLocation.lat !== 0 &&
            donationLocation.lng !== 0 &&
            ngoLocation &&
            !directionsFetched.current
        ) {
            // console.log("Both donation and NGO locations available:", {
            //     donationLocation,
            //     ngoLocation
            // });

            directionsFetched.current = true;

            const directionsService = new window.google.maps.DirectionsService();
            directionsService.route(
                {
                    origin: donationLocation,
                    destination: ngoLocation,
                    travelMode: window.google.maps.TravelMode.DRIVING,
                },
                (result, status) => {
                    console.log("Directions API status:", status);
                    if (status === "OK") {
                        console.log("Directions result:", result);
                        setDirections(result);
                    } else {
                        console.error("Error fetching directions:", status);
                    }
                }
            );
        } else {
            console.log("Waiting for valid coordinates...");
        }
    }, [donationLocation, ngoLocation]);

    if (loading) {
        return <p>Loading map...</p>;
    }

    if (!ngoLocation || isNaN(donationLocation.lat) || isNaN(donationLocation.lng)) {
        return <p>Error: Invalid or missing coordinates.</p>;
    }

    return (
        <GoogleMap
            mapContainerStyle={containerStyle}
            center={donationLocation}
            zoom={12}
        >
            {directions && <DirectionsRenderer directions={directions} />}
        </GoogleMap>
    );
};

export default GetRoute;
