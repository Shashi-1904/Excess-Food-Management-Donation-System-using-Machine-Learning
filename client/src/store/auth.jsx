import { createContext, useContext, useEffect, useState } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    // Getting token
    const [token, setToken] = useState(localStorage.getItem("token"));
    const [user, setUser] = useState("");
    const [courses, setCourses] = useState();
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

    //JWT Authentication-to get data of currently logged in user

    const userAuthentication = async () => {
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
                // console.log(data.userData);
                setUser(data.userData);
                setIsLoading(false);

            } else {
                setIsLoading(false);
            }
        } catch (error) {
            console.log("Error fetching user data");

        }
    }

    // to fetch the course data from backend
    const getCourses = async () => {
        try {
            const response = await fetch(`${API}/api/data/course`, {
                method: "GET",
            });

            if (response.ok) {
                const data = await response.json();
                console.log(data.message);
                setCourses(data.message);

            }

        } catch (error) {
            console.log(`courses backend error: ${error}`);
        }
    }

    useEffect(() => {
        getCourses();
        userAuthentication();

    }, []);

    return (<AuthContext.Provider value={{ isLoggedIn, storetokenInLS, LogoutUser, user, courses, authorizationToken, isLoading, API }}>
        {children}
    </AuthContext.Provider>
    );
}


export const useAuth = () => {
    const authContextValue = useContext(AuthContext);
    if (!authContextValue) {
        throw new Error("useAuth used outside of yhe Provider");
    };
    return authContextValue;

}



