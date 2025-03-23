import React, { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import { GoogleMap, DirectionsRenderer } from "@react-google-maps/api";
import { useAuth } from "../../store/auth";

const containerStyle = {
    width: "100%",
    height: "100vh",
};

const GetRoute = () => {
    const { pickupLat, pickupLng } = useParams();
    const { user } = useAuth();
    const [directions, setDirections] = useState(null);
    const directionsFetched = useRef(false);

    const userLocation = user
        ? { lat: parseFloat(user.latitude), lng: parseFloat(user.longitude) }
        : null;
    const destination = pickupLat && pickupLng
        ? { lat: parseFloat(pickupLat), lng: parseFloat(pickupLng) }
        : null;

    useEffect(() => {
        if (userLocation && destination && !directionsFetched.current) {
            directionsFetched.current = true; // Prevent further calls

            const directionsService = new window.google.maps.DirectionsService();
            directionsService.route(
                {
                    origin: userLocation,
                    destination,
                    travelMode: window.google.maps.TravelMode.DRIVING,
                },
                (result, status) => {
                    if (status === "OK") {
                        setDirections(result);
                    } else {
                        console.error("Error fetching directions", status);
                    }
                }
            );
        }
    }, [userLocation, destination]);

    return (
        <GoogleMap mapContainerStyle={containerStyle} center={userLocation} zoom={12}>
            {directions && <DirectionsRenderer directions={directions} />}
        </GoogleMap>
    );
};

export default GetRoute;
