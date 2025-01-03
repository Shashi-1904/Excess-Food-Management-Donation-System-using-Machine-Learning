import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { useAuth } from '../../store/auth';

function UsersTable() {
    const [users, setUsers] = useState([]);
    const { authorizationToken, API } = useAuth();

    // Fetch users from the backend
    useEffect(() => {
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
                        setUsers(result.data); // Access the nested `data` field
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

        fetchUsers();
    }, [authorizationToken]);

    return (
        <div
            className="container-fluid"
            style={{
                display: 'flex',
                minHeight: '100vh',
                paddingTop: '60px',
            }}
        >
            <div
                className="content"
                style={{
                    marginLeft: '200px',
                    width: 'calc(100% - 200px)',
                    overflowY: 'auto',
                    padding: '20px',
                    zIndex: '500',
                }}
            >
                <div className="row mb-4">
                    <div className="col-12">
                        <h2 style={{ fontSize: '2rem' }}>All Users</h2>
                        <p style={{ fontSize: '1.2rem' }}>View and manage all registered users from this page.</p>
                    </div>
                </div>

                {/* Users Table */}
                <div className="table-responsive">
                    <table
                        className="table table-striped table-hover"
                        style={{ fontSize: '1.4rem' }}
                    >
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
                                        <td
                                            className={`text-${user.role === 'admin'
                                                ? 'danger'
                                                : user.role === 'volunteer'
                                                    ? 'success'
                                                    : 'primary'
                                                }`}
                                        >
                                            {user.role}
                                        </td>
                                        <td>{user.phone || 'N/A'}</td>
                                        <td>{user.address || 'N/A'}</td>
                                        <td>
                                            <button className="btn btn-sm btn-primary mr-2">Edit</button>
                                            <button className="btn btn-sm btn-danger">Delete</button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="7" className="text-center">
                                        No users found.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default UsersTable;
