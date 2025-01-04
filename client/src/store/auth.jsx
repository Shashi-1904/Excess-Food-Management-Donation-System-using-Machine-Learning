import { createContext, useContext, useEffect, useState } from "react";
import Spinner from "../components/Spinner/Spinner";
import { toast } from 'react-toastify';
// Import useNavigate for redirection

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [token, setToken] = useState(localStorage.getItem("token"));
    const [user, setUser] = useState(null); // Initialize as null
    const [isLoading, setIsLoading] = useState(true);
    const authorizationToken = token ? `Bearer ${token}` : null; // Only set if token exists
    const API = import.meta.env.VITE_URI_API;
    // Initialize useNavigate for redirecting

    // Store token in localStorage
    const storetokenInLS = (serverToken) => {
        setToken(serverToken);
        return localStorage.setItem("token", serverToken);
    };

    // Handle logout by clearing token and removing it from localStorage
    const LogoutUser = () => {
        setToken("");
        localStorage.removeItem("token");
        toast.success("Logout Successful")
        // navigate("/login"); // Redirect to login page on logout
    };

    // JWT Authentication to get data of currently logged in user
    const userAuthentication = async () => {
        if (!token) {
            // If no token exists, skip the API call or redirect to login
            setIsLoading(false); // Stop loading as there's no need to fetch data
            setUser(null); // No user data
            return;
        }

        try {
            setIsLoading(true); // Start loading
            const response = await fetch(`${API}/api/auth/user`, {
                method: "GET",
                headers: {
                    Authorization: authorizationToken,
                },
            });

            if (response.ok) {
                const data = await response.json();
                setUser(data.userData); // Set user data once fetched
            } else {
                setUser(null); // If fetching fails, set user to null
            }
        } catch (error) {
            console.error("Error fetching user data:", error);
            setUser(null); // Handle error and set user to null
        } finally {
            setIsLoading(false); // Stop loading
        }
    };

    useEffect(() => {
        userAuthentication();
    }, [token]); // Re-run when token changes (including after login/logout)

    return (
        <AuthContext.Provider value={{ isLoggedIn: !!token, storetokenInLS, LogoutUser, user, authorizationToken, isLoading, API }}>
            {isLoading ? <Spinner /> : children} {/* Show Spinner until data is fetched */}
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
