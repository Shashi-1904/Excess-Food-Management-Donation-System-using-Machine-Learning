import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { useAuth } from '../../store/auth';

function ContactMessages() {
    const [contacts, setContacts] = useState([]);
    const [replyMessage, setReplyMessage] = useState("");
    const [selectedContact, setSelectedContact] = useState(null);
    const { authorizationToken, API } = useAuth();

    // Fetch all contact messages from the backend
    useEffect(() => {
        const fetchContacts = async () => {
            try {
                const response = await fetch(`${API}/api/admin/contacts`, {
                    headers: {
                        Authorization: authorizationToken,
                    },
                });
                if (response.ok) {
                    const result = await response.json();
                    setContacts(result);
                } else {
                    console.error("Error fetching contact messages:", response.statusText);
                }
            } catch (error) {
                console.error("Error fetching contact messages:", error);
            }
        };
        fetchContacts();
    }, [authorizationToken]);

    // Handle reply submission
    const handleReply = async () => {
        if (!selectedContact || !replyMessage.trim()) return;
        try {
            const response = await fetch(`${API}/api/admin/reply`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: authorizationToken,
                },
                body: JSON.stringify({
                    contactId: selectedContact._id,
                    reply: replyMessage,
                }),
            });

            if (response.ok) {
                const updatedContact = await response.json();
                setContacts((prevContacts) =>
                    prevContacts.map((contact) =>
                        contact._id === updatedContact.contact._id ? updatedContact.contact : contact
                    )
                );
                setSelectedContact(null);
                setReplyMessage("");
            } else {
                console.error("Failed to send reply");
            }
        } catch (error) {
            console.error("Error sending reply:", error);
        }
    };

    return (
        <div className="container-fluid" style={{ display: 'flex', minHeight: '100vh', paddingTop: '60px' }}>
            <div className="content" style={{ marginLeft: '200px', width: 'calc(100% - 200px)', overflowY: 'auto', padding: '20px' }}>
                <h2>All Contact Messages</h2>
                <p>Manage and reply to user inquiries.</p>

                <div className="table-responsive">
                    <table className="table table-striped table-hover" style={{ fontSize: '1.4rem' }}>
                        <thead className="thead-dark">
                            <tr>
                                <th>#</th>
                                <th>Username</th>
                                <th>Email</th>
                                <th>Message</th>
                                <th>Reply</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {contacts.length > 0 ? (
                                contacts.map((contact, index) => (
                                    <tr key={contact._id}>
                                        <td>{index + 1}</td>
                                        <td>{contact.username}</td>
                                        <td>{contact.email}</td>
                                        <td>{contact.message}</td>
                                        <td>{contact.reply ? contact.reply : <span className="text-danger">Not Replied</span>}</td>
                                        <td>
                                            <button
                                                className="btn btn-sm btn-success"
                                                onClick={() => setSelectedContact(contact)}
                                            >
                                                Reply
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="6" className="text-center">No messages found.</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Reply Popup */}
            {selectedContact && (
                <div className="modal show d-block" style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}>
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h2 className="modal-title">Reply to {selectedContact.username}</h2>
                                {/* <button type="button" className="close" onClick={() => setSelectedContact(null)}>&times;</button> */}
                            </div>
                            <div className="modal-body">
                                <p><strong>Message:</strong> {selectedContact.message}</p>
                                <textarea
                                    className="form-control"
                                    rows="4"
                                    placeholder="Type your reply here..."
                                    value={replyMessage}
                                    onChange={(e) => setReplyMessage(e.target.value)}
                                />
                            </div>
                            <div className="modal-footer">
                                <button className="btn btn-secondary" onClick={() => setSelectedContact(null)}>Close</button>
                                <button className="btn btn-success" onClick={handleReply}>Send Reply</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default ContactMessages;
