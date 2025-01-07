import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { useAuth } from "../store/auth";

function ProfilePage() {
    const { user } = useAuth(); // Get user details from context

    return (
        <div
            className="profile-page container-fluid py-5"
            style={{ backgroundColor: "#f8f9fa" }}
        >
            <div className="row justify-content-center">
                <div className="col-lg-6 col-md-8">
                    <div className="card shadow-lg border-0">
                        <div
                            className="card-header text-center"
                            style={{ backgroundColor: "#34D32F", color: "#fff" }}
                        >
                            <h2 className="fw-bold" style={{ fontSize: "2rem" }}>User Profile</h2>
                        </div>
                        <div className="card-body p-5">
                            <div className="row mb-4">
                                <div className="col-sm-4">
                                    <strong className="text-primary" style={{ fontSize: "1.2rem" }}>Username:</strong>
                                </div>
                                <div className="col-sm-8 text-dark" style={{ fontSize: "1.2rem" }}>{user.username}</div>
                            </div>
                            <div className="row mb-4">
                                <div className="col-sm-4">
                                    <strong className="text-primary" style={{ fontSize: "1.2rem" }}>Email:</strong>
                                </div>
                                <div className="col-sm-8 text-dark" style={{ fontSize: "1.2rem" }}>{user.email}</div>
                            </div>
                            <div className="row mb-4">
                                <div className="col-sm-4">
                                    <strong className="text-primary" style={{ fontSize: "1.2rem" }}>Phone Number:</strong>
                                </div>
                                <div className="col-sm-8 text-dark" style={{ fontSize: "1.2rem" }}>{user.phoneNumber}</div>
                            </div>
                            <div className="row mb-4">
                                <div className="col-sm-4">
                                    <strong className="text-primary" style={{ fontSize: "1.2rem" }}>Role:</strong>
                                </div>
                                <div className="col-sm-8 text-dark text-capitalize" style={{ fontSize: "1.2rem" }}>{user.role}</div>
                            </div>
                            <div className="row mb-4">
                                <div className="col-sm-4">
                                    <strong className="text-primary" style={{ fontSize: "1.2rem" }}>Address:</strong>
                                </div>
                                <div className="col-sm-8 text-dark" style={{ fontSize: "1.2rem" }}>{user.address}</div>
                            </div>
                            <div className="row mb-4">
                                <div className="col-sm-4">
                                    <strong className="text-primary" style={{ fontSize: "1.2rem" }}>Password:</strong>
                                </div>
                                <div className="col-sm-8 d-flex align-items-center">
                                    <input
                                        type="password"
                                        className="form-control border-0 bg-light"
                                        value="**********" // Keep password hidden
                                        readOnly
                                        style={{ maxWidth: "80%", fontSize: "1.2rem" }}
                                    />
                                    <button
                                        type="button"
                                        className="btn btn-outline-primary ms-2"
                                        style={{ fontSize: "1.2rem" }}
                                    >
                                        Update Password
                                    </button>
                                </div>
                            </div>
                            <div className="row mb-4">
                                <div className="col-sm-4">
                                    <strong className="text-primary" style={{ fontSize: "1.2rem" }}>Account Created:</strong>
                                </div>
                                <div className="col-sm-8 text-dark" style={{ fontSize: "1.2rem" }}>
                                    {new Date(user.createdAt).toLocaleDateString()}
                                </div>
                            </div>
                        </div>
                        <div
                            className="card-footer text-center"
                            style={{ backgroundColor: "#34D32F", color: "#fff" }}
                        >
                            <button className="btn btn-light" style={{ fontSize: "1.2rem" }}>Edit Profile</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ProfilePage;
