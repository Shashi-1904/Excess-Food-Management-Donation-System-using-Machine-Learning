import { createContext, useContext, useEffect, useState } from "react";
import Spinner from "../components/Spinner/Spinner";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    // Getting token
    const [token, setToken] = useState(localStorage.getItem("token"));
    const [user, setUser] = useState(null); // Initialize as null
    const [isLoading, setIsLoading] = useState(true);
    const authorizationToken = `Bearer ${token}`;
    const API = import.meta.env.VITE_URI_API;

    const storetokenInLS = (serverToken) => {
        setToken(serverToken);
        return localStorage.setItem("token", serverToken);
    };

    // checking logged in
    let isLoggedIn = !!token;

    // tackling logout functionality
    const LogoutUser = () => {
        setToken("");
        return localStorage.removeItem("token");
    };

    // JWT Authentication to get data of currently logged in user
    const userAuthentication = async () => {
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
    }, []); // Run once on mount

    return (
        <AuthContext.Provider value={{ isLoggedIn, storetokenInLS, LogoutUser, user, authorizationToken, isLoading, API }}>
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
