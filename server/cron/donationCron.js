const cron = require("node-cron");
const FoodDonation = require("../models/donation-model");

const donationCron = () => {
    const markExpiredDonations = async () => {
        const currentTime = new Date();

        try {
            const donations = await FoodDonation.find({
                expiresAt: { $exists: true },
                status: { $nin: ["completed", "expired"] }
            });

            if (donations.length === 0) {
                console.log("No donations found for expiration check.");
                return;
            }

            let expiredCount = 0;

            for (const donation of donations) {
                const expiryTime = new Date(donation.expiresAt);

                // Only update expired donations
                if (expiryTime <= currentTime) {
                    await FoodDonation.updateOne(
                        { _id: donation._id },
                        { $set: { status: "expired" } }
                    );
                    expiredCount++;
                }
            }

            console.log(`Marked ${expiredCount} donations as expired.`);
        } catch (error) {
            console.error("Error updating expired donations:", error);
        }
    };

    // Run after server starts
    markExpiredDonations();

    // run every hour
    cron.schedule("0 * * * *", async () => {
        await markExpiredDonations();
    });

    console.log("Cron job started and scheduled to run every hour.");
};

module.exports = donationCron;
