import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useAuth } from '../../store/auth';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);


function AdminDashboard() {
    const [totalUsers, setTotalUsers] = useState(0);
    const [totalDonations, setTotalDonations] = useState(0);
    const [donationsDelivered, setDonationsDelivered] = useState(0);
    const [activeVolunteers, setActiveVolunteers] = useState(0);
    const [recentRegistration, setRecentRegistration] = useState('');
    const [recentDonation, setRecentDonation] = useState('');
    const [recentRequest, setRecentRequest] = useState('');
    const [donationStats, setDonationStats] = useState({ pending: 0, assigned: 0, picked: 0, completed: 0 });
    const { authorizationToken, API } = useAuth();


    useEffect(() => {
        // Fetch Users
        const fetchUsers = async () => {
            try {
                const response = await fetch(`${API}/api/admin/users`, {
                    headers: { Authorization: authorizationToken },
                });
                if (response.ok) {
                    const result = await response.json();
                    if (result.success) {
                        setTotalUsers(result.data.length);
                        const volunteers = result.data.filter(user => user.role === 'volunteer');
                        setActiveVolunteers(volunteers.length);
                        if (result.data.length > 0) {
                            const sortedUsers = result.data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
                            setRecentRegistration(sortedUsers[0].username);
                        }
                    }
                }
            } catch (error) {
                console.error('Error fetching users:', error);
            }
        };

        // Fetch Donations
        const fetchDonations = async () => {
            try {
                const response = await fetch(`${API}/api/admin/donations`, {
                    headers: { Authorization: authorizationToken },
                });
                if (response.ok) {
                    const result = await response.json();
                    if (result.success) {
                        setTotalDonations(result.data.length);
                        const completedDonations = result.data.filter(donation => donation.status === 'completed');
                        setDonationsDelivered(completedDonations.length);

                        // Count donations by status
                        const stats = { pending: 0, assigned: 0, picked: 0, completed: 0 };
                        result.data.forEach(donation => {
                            if (stats[donation.status] !== undefined) {
                                stats[donation.status]++;
                            }
                        });
                        setDonationStats(stats);

                        // Get the most recent donation
                        if (result.data.length > 0) {
                            setRecentDonation(result.data[0].foodName);
                        }
                    }
                }
            } catch (error) {
                console.error('Error fetching donations:', error);
            }
        };


        // Fetch Requests
        const fetchRequests = async () => {
            try {
                const response = await fetch(`${API}/api/admin/requests`, {
                    headers: { Authorization: authorizationToken },
                });
                if (response.ok) {
                    const result = await response.json();
                    if (result.success && result.data.length > 0) {
                        setRecentRequest(result.data[0].ngoName);
                    }
                }
            } catch (error) {
                console.error('Error fetching requests:', error);
            }
        };

        fetchUsers();
        fetchDonations();
        fetchRequests();
    }, [API, authorizationToken]);

    // Bar Chart Data
    const barChartData = {
        labels: ['Pending', 'Assigned', 'Picked', 'Completed'],
        datasets: [
            {
                label: 'Donations by Status',
                data: [donationStats.pending, donationStats.assigned, donationStats.picked, donationStats.completed],
                backgroundColor: ['#f39c12', '#3498db', '#9b59b6', '#2ecc71'],
                borderColor: ['#e67e22', '#2980b9', '#8e44ad', '#27ae60'],
                borderWidth: 1,
            },
        ],
    };

    // Bar Chart Options
    const barChartOptions = {
        responsive: true,
        plugins: {
            legend: { display: true, position: 'top' },
            title: { display: true, text: 'Donation Status Overview' },
        },
    };

    return (
        <div className="container-fluid" style={{
            display: 'flex',
            minHeight: '100vh',
            paddingTop: '60px',
        }}>
            {/* Main Content Area */}
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
                {/* Welcome Section */}
                <div className="row mb-4">
                    <div className="col-12">
                        <h1>Welcome, Admin!</h1>
                        <p>Manage donations, track user activities, and view analytics from here.</p>
                    </div>
                </div>

                {/* Key Stats Section */}
                <div className="row mb-4" >
                    <div className="col-md-3">
                        <div className="card text-white bg-success mb-3">
                            <div className="card-header">Total Donations</div>
                            <div className="card-body">
                                <h5 className="card-title">{totalDonations} Donations</h5>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-3">
                        <div className="card text-white bg-primary mb-3">
                            <div className="card-header">Total Users</div>
                            <div className="card-body">
                                <h5 className="card-title">{totalUsers} Users</h5>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-3">
                        <div className="card text-white bg-warning mb-3">
                            <div className="card-header">Donations Delivered</div>
                            <div className="card-body">
                                <h5 className="card-title">{donationsDelivered} Delivered</h5>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-3">
                        <div className="card text-white bg-info mb-3">
                            <div className="card-header">Active Volunteers</div>
                            <div className="card-body">
                                <h5 className="card-title">{activeVolunteers} Volunteers</h5>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Recent Activities Section */}
                <div className="row mb-4" style={{ marginTop: '3em' }}>
                    <div className="col-12">
                        <h2 style={{ fontSize: '2.5rem', marginBottom: '20px', }}>Recent Activities</h2>
                        <ul className="list-group">
                            <li className="list-group-item">New User Registration: {recentRegistration || 'No recent registrations'}</li>
                            <li className="list-group-item">Food Donation Received: {recentDonation || 'No recent donations'}</li>
                            <li className="list-group-item">New Request by NGO: {recentRequest || 'No recent requests'}</li>
                        </ul>
                    </div>
                </div>

                {/* Bar Chart Section */}
                <div className="row mb-4" style={{ marginTop: '7em' }}>
                    <div className="col-12">
                        <h2 style={{ fontSize: '2.5rem' }}>Donations Overview</h2>
                        <Bar data={barChartData} options={barChartOptions} />
                    </div>
                </div>


                {/* Actionable Shortcuts Section */}
                <div className="row">
                    <div className="col-md-4">
                        <button className="btn btn-success btn-block">Add New Donation</button>
                    </div>
                    <div className="col-md-4">
                        <button className="btn btn-primary btn-block">Manage Users</button>
                    </div>
                    <div className="col-md-4">
                        <button className="btn btn-info btn-block">View Detailed Analytics</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AdminDashboard;
