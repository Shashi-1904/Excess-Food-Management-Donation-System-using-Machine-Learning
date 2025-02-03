import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { useAuth } from "../store/auth";

function UserContactHistory() {
    const [contacts, setContacts] = useState([]);
    const { authorizationToken, API } = useAuth();

    // Fetch user's contact history
    useEffect(() => {
        const fetchContacts = async () => {
            try {
                const response = await fetch(`${API}/api/user/contact-history`, {
                    headers: {
                        Authorization: authorizationToken,
                    },
                });
                if (response.ok) {
                    const result = await response.json();
                    if (result.success) {
                        setContacts(result.data);
                    } else {
                        console.error("Failed to fetch contacts:", result.message || "Unknown error");
                    }
                } else {
                    console.error("Error in response:", response.status, response.statusText);
                }
            } catch (error) {
                console.error("Error fetching contact history:", error);
            }
        };

        fetchContacts();
    }, [authorizationToken]);

    return (
        <div className="container-fluid d-flex justify-content-center" style={{ backgroundColor: '#f4f6f9', }}>
            <div className="content mt-5" style={{ width: "80%", padding: '20px', backgroundColor: '#ffffff', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', borderRadius: '8px', marginBottom: '15rem', }}>
                <h2 className="text-center mb-4">Contact History</h2>
                <p className="text-center mb-4">View your past inquiries and responses from the Admin</p>

                <div className="table-responsive">
                    <table className="table table-striped table-hover" style={{ fontSize: '1.2rem', backgroundColor: '#f8f9fa' }}>
                        <thead className="thead-dark">
                            <tr>
                                <th>#</th>
                                <th>Message</th>
                                <th>Reply</th>
                                <th>Date</th>
                            </tr>
                        </thead>
                        <tbody>
                            {contacts.length > 0 ? (
                                contacts.map((contact, index) => (
                                    <tr key={contact._id}>
                                        <td>{index + 1}</td>
                                        <td>{contact.message}</td>
                                        <td>
                                            {contact.reply ? (
                                                contact.reply
                                            ) : (
                                                <span className="text-danger">Not Replied</span>
                                            )}
                                        </td>
                                        <td>{new Date(contact.createdAt).toLocaleString()}</td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="4" className="text-center">No messages found.</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default UserContactHistory;
