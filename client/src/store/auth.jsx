import { createContext, useContext, useEffect, useState } from "react";
import Spinner from "../components/Spinner/Spinner";
import { toast } from 'react-toastify';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [token, setToken] = useState(localStorage.getItem("token"));
    const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const authorizationToken = token ? `Bearer ${token}` : null;
    const API = import.meta.env.VITE_URI_API;
    const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;



    // Store token in localStorage
    const storetokenInLS = (serverToken) => {
        setToken(serverToken);
        return localStorage.setItem("token", serverToken);
    };

    // Handle logout by clearing token and removing it from localStorage
    const LogoutUser = () => {
        setToken("");
        localStorage.removeItem("token");
        toast.success("Logout Successful");

        setTimeout(() => {
            window.location.href = "/login";
        }, 2000);
    };


    // JWT Authentication to get data of currently logged in user
    const userAuthentication = async () => {
        if (!token) {

            setIsLoading(false);
            setUser(null);
            return;
        }

        try {
            setIsLoading(true);
            const response = await fetch(`${API}/api/auth/user`, {
                method: "GET",
                headers: {
                    Authorization: authorizationToken,
                },
            });

            if (response.ok) {
                const data = await response.json();
                setUser(data.userData);
            } else {
                setUser(null);
            }
        } catch (error) {
            console.error("Error fetching user data:", error);
            setUser(null);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        userAuthentication();
    }, [token]);

    return (
        <AuthContext.Provider value={{ isLoggedIn: !!token, storetokenInLS, LogoutUser, user, setUser, authorizationToken, isLoading, API, apiKey }}>
            {isLoading ? <Spinner /> : children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const authContextValue = useContext(AuthContext);
    if (!authContextValue) {
        throw new Error("useAuth used outside of the Provider");
    }
    return authContextValue;
};
