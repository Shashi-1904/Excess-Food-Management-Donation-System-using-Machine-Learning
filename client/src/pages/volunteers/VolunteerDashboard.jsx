import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { toast } from 'react-toastify';
import { useAuth } from "../../store/auth";
import { Bar } from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js';

Chart.register(...registerables);

function VolunteerDashboard() {
    const [completedDonations, setCompletedDonations] = useState([]);
    const [assignedDonations, setAssignedDonations] = useState([]);
    const [matchingRequests, setMatchingRequests] = useState([]);
    const { authorizationToken, API } = useAuth();

    useEffect(() => {
        const fetchCompletedDonations = async () => {
            try {
                const response = await fetch(`${API}/api/volunteer/assigned-donations`, {
                    headers: { Authorization: authorizationToken },
                });
                const data = await response.json();
                if (response.ok && data.donations) {
                    setCompletedDonations(data.donations.filter(d => d.status === 'completed'));
                } else {
                    console.error(data.message || 'Failed to fetch completed donations.');
                }
            } catch (error) {
                console.error('Error fetching completed donations:', error);

            }
        };

        const fetchAssignedDonations = async () => {
            try {
                const response = await fetch(`${API}/api/volunteer/assigned-donations`, {
                    headers: { Authorization: authorizationToken },
                });
                const data = await response.json();
                if (response.ok && data.donations) {
                    setAssignedDonations(data.donations);
                    setCompletedDonations(data.donations.filter(d => d.status === 'completed'));
                } else {
                    console.error(data.message || 'Failed to fetch assigned donations.');
                }
            } catch (error) {
                console.error('Error fetching assigned donations:', error);

            }
        };

        const fetchMatchingRequests = async () => {
            try {
                const response = await fetch(`${API}/api/volunteer/matching-requests`, {
                    headers: { Authorization: authorizationToken },
                });
                const data = await response.json();
                if (response.ok && data.requests) {
                    setMatchingRequests(data.requests);
                } else {
                    console.error(data.message || 'Failed to fetch matching requests.');
                }
            } catch (error) {
                console.error('Error fetching matching requests:', error);

            }
        };

        fetchCompletedDonations();
        fetchAssignedDonations();
        fetchMatchingRequests();
    }, [API, authorizationToken]);

    const pendingCount = assignedDonations.filter(d => d.status === 'pending').length;
    const assignedCount = assignedDonations.filter(d => d.status === 'assigned').length;
    const pickedCount = assignedDonations.filter(d => d.status === 'picked').length;
    const completedCount = completedDonations.length;

    const chartData = {
        labels: ['Pending', 'Assigned', 'Picked', 'Completed'],
        datasets: [
            {
                label: 'Number of Donations',
                data: [pendingCount, assignedCount, pickedCount, completedCount],
                backgroundColor: ['#f39c12', '#3498db', '#9b59b6', '#2ecc71'],
            },
        ],
    };



    return (
        <div className="container-fluid" style={{ display: 'flex', minHeight: '100vh', paddingTop: '60px' }}>
            <div className="content" style={{ marginLeft: '200px', width: 'calc(100% - 200px)', padding: '20px' }}>
                <h1>Welcome, Volunteer!</h1>
                <p>View donations, track food requests, and take actions to help those in need.</p>

                <div className="row mb-4">
                    <div className="col-md-3">
                        <div className="card text-white bg-success mb-3">
                            <div className="card-header">Donations completed</div>
                            <div className="card-body">
                                <h5 className="card-title">{completedDonations.length} Donations</h5>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-3">
                        <div className="card text-white bg-primary mb-3">
                            <div className="card-header">Request matched</div>
                            <div className="card-body">
                                <h5 className="card-title">{matchingRequests.length} Requests</h5>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-3">
                        <div className="card text-white bg-warning mb-3">
                            <div className="card-header">Donations assigned</div>
                            <div className="card-body">
                                <h5 className="card-title">{assignedDonations.length} Assigned</h5>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-3">
                        <div className="card text-white bg-info mb-3">
                            <div className="card-header">Pending donations</div>
                            <div className="card-body">
                                <h5 className="card-title">{assignedDonations.filter(d => d.status === 'pending').length} Pending</h5>
                            </div>
                        </div>
                    </div>
                </div>

                <h2 style={{ marginTop: '2em' }}>Recent Activities</h2>
                <ul className="list-group mb-4">
                    <li className="list-group-item">
                        New Donation Assigned: {assignedDonations.length > 0 ? assignedDonations[0].foodName : 'N/A'} ({assignedDonations.length > 0 ? assignedDonations[0].foodType : 'N/A'})
                    </li>
                    <li className="list-group-item">
                        Request Matched: {matchingRequests.length > 0 ? matchingRequests[0].foodType : 'N/A'} ({matchingRequests.length > 0 ? matchingRequests[0].category : 'N/A'})
                    </li>
                    <li className="list-group-item">
                        Recently Completed Donation Location: {completedDonations.length > 0 ? completedDonations[0].address : 'N/A'}
                    </li>
                </ul>

                <h2 style={{ marginTop: '3em' }}>Food Distribution Analytics</h2>
                <div className="chart-container" style={{ height: '500px', }}>
                    <Bar data={chartData} options={{ responsive: true, maintainAspectRatio: false }} />
                </div>
                <div className="row mt-4">
                    <div className="col-md-4">
                        <button className="btn btn-success btn-block">View Food Requests</button>
                    </div>
                    <div className="col-md-4">
                        <button className="btn btn-primary btn-block">Take Action on Donation</button>
                    </div>
                    <div className="col-md-4">
                        <button className="btn btn-info btn-block">View Donation Details</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default VolunteerDashboard;
