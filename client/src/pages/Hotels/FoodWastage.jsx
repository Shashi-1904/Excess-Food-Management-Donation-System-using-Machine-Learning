import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { useAuth } from "../../store/auth";
import { toast } from "react-toastify";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

function FoodWastage() {
    const [foodWastage, setFoodWastage] = useState({});
    const { authorizationToken, API } = useAuth();

    useEffect(() => {
        const fetchDonationHistory = async () => {
            try {
                const response = await fetch(`${API}/api/hotel/history`, {
                    headers: { Authorization: authorizationToken },
                });
                const data = await response.json();

                if (response.ok) {
                    processFoodWastage(data);
                } else {
                    toast.error(data.message || "Failed to fetch donation history.");
                }
            } catch (error) {
                console.error("Error fetching donation history:", error);
                toast.error("An error occurred while fetching donation history.");
            }
        };

        fetchDonationHistory();
    }, [API, authorizationToken]);

    const processFoodWastage = (donations) => {
        const monthlyData = {};
        const today = new Date();

        donations.forEach((donation) => {
            const donationDate = new Date(donation.createdAt);
            const monthYear = `${donationDate.getFullYear()}-${donationDate.getMonth() + 1}`;

            if (!monthlyData[monthYear]) {
                monthlyData[monthYear] = 0;
            }
            monthlyData[monthYear] += donation.quantity;
        });

        // Get last 4 months in descending order
        const months = [];
        for (let i = 3; i >= 0; i--) {
            const date = new Date(today.getFullYear(), today.getMonth() - i, 1);
            const key = `${date.getFullYear()}-${date.getMonth() + 1}`;
            months.push({ label: date.toLocaleString("default", { month: "long" }), value: monthlyData[key] || 0 });
        }

        setFoodWastage({
            labels: months.map((m) => m.label),
            datasets: [
                {
                    label: "Food Wastage (Kg)",
                    data: months.map((m) => m.value),
                    backgroundColor: "rgba(255, 99, 132, 0.6)",
                    borderColor: "rgba(255, 99, 132, 1)",
                    borderWidth: 1,
                },
            ],
        });
    };

    return (
        <div className="container-fluid" style={{
            display: 'flex',
            minHeight: '100vh',
            paddingTop: '60px',
        }}>
            <div className="content" style={{
                marginLeft: '200px',
                width: 'calc(100% - 200px)',
                overflowY: 'auto',
                padding: '20px',
                zIndex: '500',
            }}>
                <h1 className="mb-4">Food Wastage Report</h1>
                <div className="card" style={{ padding: "20px", borderRadius: "10px", boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)" }}>
                    {foodWastage.labels ? <Bar data={foodWastage} /> : <p>Loading...</p>}
                </div>
            </div>
        </div>
    );
}

export default FoodWastage;
