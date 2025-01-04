import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../store/auth";
import Spinner from "./Spinner/Spinner";
import { toast } from 'react-toastify';

const ProtectedRoute = ({ allowedRoles }) => {
    const { user, isLoading } = useAuth();


    if (isLoading) return <Spinner />;

    if (!user || !allowedRoles.includes(user.role)) {

        return <Navigate to="/" />;


    }

    return <Outlet />;
};

export default ProtectedRoute;
