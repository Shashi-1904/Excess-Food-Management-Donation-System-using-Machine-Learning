import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { useAuth } from '../../store/auth';
import { toast } from "react-toastify";
import { Modal, Button } from "react-bootstrap";

function UsersTable() {
    const [users, setUsers] = useState([]);
    const [selectedUser, setSelectedUser] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const { authorizationToken, API } = useAuth();

    useEffect(() => {
        fetchUsers();
    }, [authorizationToken]);

    const fetchUsers = async () => {
        try {
            const response = await fetch(`${API}/api/admin/users`, {
                headers: {
                    Authorization: authorizationToken,
                },
            });
            if (response.ok) {
                const result = await response.json();
                if (result.success) {
                    setUsers(result.data);
                } else {
                    console.error("Failed to fetch users:", result.message || "Unknown error");
                }
            } else {
                console.error("Error in response:", response.status, response.statusText);
            }
        } catch (error) {
            console.error("Error fetching users:", error);
        }
    };

    const handleDelete = async (userId) => {
        const confirmDelete = window.confirm("Are you sure you want to delete this user?");
        if (!confirmDelete) return;

        try {
            const response = await fetch(`${API}/api/admin/users/${userId}`, {
                method: "DELETE",
                headers: {
                    Authorization: authorizationToken,
                },
            });

            if (response.ok) {
                const result = await response.json();
                if (result.success) {
                    toast.success("User deleted successfully");
                    setUsers(users.filter(user => user._id !== userId));
                } else {
                    toast.error("Failed to delete user");
                }
            } else {
                toast.error("Error deleting user");
            }
        } catch (error) {
            toast.error("An error occurred while deleting user");
            console.error("Delete Error:", error);
        }
    };

    const handleViewProfile = (user) => {
        setSelectedUser(user);
        setShowModal(true);
    };

    return (
        <div className="container-fluid" style={{ display: 'flex', minHeight: '100vh', paddingTop: '60px' }}>
            <div className="content" style={{ marginLeft: '200px', width: 'calc(100% - 200px)', overflowY: 'auto', padding: '20px', zIndex: '500' }}>
                <div className="row mb-4">
                    <div className="col-12">
                        <h2 style={{ fontSize: '2rem' }}>All Users</h2>
                        <p style={{ fontSize: '1.2rem' }}>View and manage all registered users from this page.</p>
                    </div>
                </div>

                <div className="table-responsive">
                    <table className="table table-striped table-hover" style={{ fontSize: '1.4rem' }}>
                        <thead className="thead-dark">
                            <tr>
                                <th>#</th>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Role</th>
                                <th>Phone</th>
                                <th>Address</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.length > 0 ? (
                                users.map((user, index) => (
                                    <tr key={user._id}>
                                        <td>{index + 1}</td>
                                        <td>{user.name}</td>
                                        <td>{user.email}</td>
                                        <td className={`text-${user.role === 'admin' ? 'danger' : user.role === 'volunteer' ? 'success' : 'primary'}`}>{user.role}</td>
                                        <td>{user.phone || 'N/A'}</td>
                                        <td>{user.address || 'N/A'}</td>
                                        <td>
                                            <button className="btn btn-sm btn-primary mr-2" onClick={() => handleViewProfile(user)}>View Full Profile</button>
                                            <button className="btn btn-sm btn-danger" onClick={() => handleDelete(user._id)}>Delete</button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="7" className="text-center">No users found.</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* User Profile Modal */}
            {selectedUser && (
                <Modal show={showModal} onHide={() => setShowModal(false)}>
                    <Modal.Header closeButton>
                        <Modal.Title>User Profile</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <p><strong>Username:</strong> {selectedUser.username}</p>
                        <p><strong>Email:</strong> {selectedUser.email}</p>
                        <p><strong>Phone Number:</strong> {selectedUser.phoneNumber || 'N/A'}</p>
                        <p><strong>Role:</strong> {selectedUser.role}</p>
                        <p><strong>Address:</strong> {selectedUser.address || 'N/A'}</p>
                        <p><strong>Is Active:</strong> {selectedUser.isActive ? 'Yes' : 'No'}</p>
                        <p><strong>Created At:</strong> {new Date(selectedUser.createdAt).toLocaleString()}</p>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={() => setShowModal(false)}>Close</Button>
                    </Modal.Footer>
                </Modal>
            )}
        </div>
    );
}

export default UsersTable;
