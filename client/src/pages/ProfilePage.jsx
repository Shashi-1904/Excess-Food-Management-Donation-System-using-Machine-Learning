import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { useAuth } from "../store/auth";
import { toast } from "react-toastify";

function ProfilePage() {
    const { user, setUser, authorizationToken, API } = useAuth();

    // State for form values
    const [editMode, setEditMode] = useState(false);
    const [formData, setFormData] = useState({
        username: user.username,
        phoneNumber: user.phoneNumber,
        address: user.address,
    });

    // Handle input changes
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    // Handle save changes (Send to backend)
    const handleSave = async () => {
        try {
            const response = await fetch(`${API}/api/user/updateprofile`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: authorizationToken,
                },
                body: JSON.stringify(formData),
            });

            const res_data = await response.json();

            if (response.status === 422) {
                const errorDetails = res_data.errors.map(error => `${error.field}: ${error.message}`);
                errorDetails.forEach(err => toast.error(err));
                return;
            }

            if (!response.ok) {
                throw new Error(res_data.message || "Failed to update profile");
            }


            toast.success(res_data.message || "Profile updated successfully!");


            setUser((prevUser) => ({
                ...prevUser,
                ...res_data.user
            }));


            setEditMode(false);
        } catch (error) {

            toast.error("An error occurred while updating the profile.");
        }
    };

    return (
        <div className="profile-page container-fluid py-5" style={{ backgroundColor: "#f8f9fa" }}>
            <div className="row justify-content-center">
                <div className="col-lg-6 col-md-8">
                    <div className="card shadow-lg border-0">
                        <div className="card-header text-center" style={{ backgroundColor: "#34D32F", color: "#fff" }}>
                            <h2 className="fw-bold" style={{ fontSize: "2rem" }}>User Profile</h2>
                        </div>
                        <div className="card-body p-5">
                            {/* Username Field */}
                            <div className="row mb-4">
                                <div className="col-sm-4">
                                    <strong className="text-primary" style={{ fontSize: "1.2rem" }}>Username:</strong>
                                </div>
                                <div className="col-sm-8">
                                    {editMode ? (
                                        <input
                                            type="text"
                                            className="form-control"
                                            name="username"
                                            value={formData.username}
                                            onChange={handleChange}
                                        />
                                    ) : (
                                        <span className="text-dark" style={{ fontSize: "1.2rem" }}>{user.username}</span>
                                    )}
                                </div>
                            </div>

                            {/* Phone Number Field */}
                            <div className="row mb-4">
                                <div className="col-sm-4">
                                    <strong className="text-primary" style={{ fontSize: "1.2rem" }}>Phone Number:</strong>
                                </div>
                                <div className="col-sm-8">
                                    {editMode ? (
                                        <input
                                            type="text"
                                            className="form-control"
                                            name="phoneNumber"
                                            value={formData.phoneNumber}
                                            onChange={handleChange}
                                        />
                                    ) : (
                                        <span className="text-dark" style={{ fontSize: "1.2rem" }}>{user.phoneNumber}</span>
                                    )}
                                </div>
                            </div>

                            {/* Address Field */}
                            <div className="row mb-4">
                                <div className="col-sm-4">
                                    <strong className="text-primary" style={{ fontSize: "1.2rem" }}>Address:</strong>
                                </div>
                                <div className="col-sm-8">
                                    {editMode ? (
                                        <input
                                            type="text"
                                            className="form-control"
                                            name="address"
                                            value={formData.address}
                                            onChange={handleChange}
                                        />
                                    ) : (
                                        <span className="text-dark" style={{ fontSize: "1.2rem" }}>{user.address}</span>
                                    )}
                                </div>
                            </div>

                            {/* Email Field (Not Editable) */}
                            <div className="row mb-4">
                                <div className="col-sm-4">
                                    <strong className="text-primary" style={{ fontSize: "1.2rem" }}>Email:</strong>
                                </div>
                                <div className="col-sm-8 text-dark" style={{ fontSize: "1.2rem" }}>{user.email}</div>
                            </div>
                            <div className="row mb-4">
                                <div className="col-sm-4">
                                    <strong className="text-primary" style={{ fontSize: "1.2rem" }}>Password:</strong>
                                </div>
                                <div className="col-sm-8 d-flex align-items-center">
                                    <input
                                        type="password"
                                        className="form-control border-0 bg-light"
                                        value="**********"
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

                            {/* Role Field (Not Editable) */}
                            <div className="row mb-4">
                                <div className="col-sm-4">
                                    <strong className="text-primary" style={{ fontSize: "1.2rem" }}>Role:</strong>
                                </div>
                                <div className="col-sm-8 text-dark text-capitalize" style={{ fontSize: "1.2rem" }}>{user.role}</div>
                            </div>

                            {/* Account Created Field */}
                            <div className="row mb-4">
                                <div className="col-sm-4">
                                    <strong className="text-primary" style={{ fontSize: "1.2rem" }}>Account Created:</strong>
                                </div>
                                <div className="col-sm-8 text-dark" style={{ fontSize: "1.2rem" }}>
                                    {new Date(user.createdAt).toLocaleDateString()}
                                </div>
                            </div>
                        </div>

                        {/* Footer Buttons */}
                        <div className="card-footer text-center" style={{ backgroundColor: "#34D32F", color: "#fff" }}>
                            {editMode ? (
                                <>
                                    <button className="btn btn-light mx-2" style={{ fontSize: "1.2rem" }} onClick={handleSave}>
                                        Save Changes
                                    </button>
                                    <button className="btn btn-outline-light" style={{ fontSize: "1.2rem" }} onClick={() => setEditMode(false)}>
                                        Cancel
                                    </button>
                                </>
                            ) : (
                                <button className="btn btn-light" style={{ fontSize: "1.2rem" }} onClick={() => setEditMode(true)}>
                                    Update Profile
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ProfilePage;
