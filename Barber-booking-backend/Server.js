const express = require("express");
const axios = require("axios");
const cors = require("cors");
const { MongoClient } = require("mongodb");
const nodemailer = require("nodemailer");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 8000;

// CORS setup
app.use(cors({
    origin: "http://localhost:5173", // we'll update this in Step 2
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
}));

app.use(express.json());

// MongoDB setup
const uri = process.env.ATLAS_URL;
const client = new MongoClient(uri);
let bookingsCollection;

async function connectToDB() {
    try {
        await client.connect();
        const db = client.db("pinnacle_hotel");
        bookingsCollection = db.collection("bookings");
        console.log("✅ Connected to MongoDB");
    } catch (err) {
        console.error("❌ MongoDB connection error:", err);
    }
}
connectToDB();

// Check Paystack env var
console.log(
    "Paystack Secret Key Loaded:",
    process.env.PAYSTACK_SECRET_KEY ? "✅ Loaded" : "❌ Not Loaded"
);

// Nodemailer setup
const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_PASS,
    },
});

// Email function
async function sendBookingConfirmation(toEmail, checkIn, checkOut, roomType, amount) {
    const formattedAmount = Number(amount).toLocaleString("en-NG", {
        style: "currency",
        currency: "NGN",
    });

    const mailOptions = {
        from: `"Pinnacle Hotel"`,
        to: toEmail,
        subject: "Booking Confirmation - Pinnacle Hotel",
        html: `
            <div style="font-family: Arial, sans-serif; padding: 20px; color: #333;">
              <img src="https://www.kayak.co.uk/rimg/dimg/dynamic/5/2023/08/341cd442bfcb075acf7a80a2997570a7.webp" alt="Pinnacle Hotel Logo" style="width: 150px; margin-bottom: 20px;" />
              <h2 style="color: #2c3e50;">Booking Confirmation</h2>
              <p>Thank you for booking with <strong>Pinnacle Hotel</strong>! Here are your reservation details:</p>
              <table style="border-collapse: collapse; width: 100%; margin: 20px 0;">
                <tr>
                  <td style="padding: 8px; border: 1px solid #ccc;">Room Type</td>
                  <td style="padding: 8px; border: 1px solid #ccc;">${roomType}</td>
                </tr>
                <tr>
                  <td style="padding: 8px; border: 1px solid #ccc;">Check-in</td>
                  <td style="padding: 8px; border: 1px solid #ccc;">${checkIn}</td>
                </tr>
                <tr>
                  <td style="padding: 8px; border: 1px solid #ccc;">Check-out</td>
                  <td style="padding: 8px; border: 1px solid #ccc;">${checkOut}</td>
                </tr>
                <tr>
                  <td style="padding: 8px; border: 1px solid #ccc;">Amount Paid</td>
                  <td style="padding: 8px; border: 1px solid #ccc;">${formattedAmount}</td>
                </tr>
              </table>
              <p>We look forward to seeing you soon!</p>
              <p>— <strong>The Pinnacle Hotel Team</strong></p>
            </div>
        `,
    };

    try {
        let info = await transporter.sendMail(mailOptions);
        console.log("✅ Email sent: " + info.response);
        return true;
    } catch (error) {
        console.error("❌ Error sending email:", {
            message: error.message,
            code: error.code,
            response: error.response,
            responseCode: error.responseCode
        });
        return false;
    }
}

// Payment route
app.post("/api/pay", async (req, res) => {
    const { email, amount, roomType, checkIn, checkOut } = req.body;

    if (!email || !amount || !roomType || !checkIn || !checkOut) {
        return res.status(400).json({ error: "Email, amount, roomType, checkIn, and checkOut are required." });
    }

    try {
        const response = await axios.post(
            "https://api.paystack.co/transaction/initialize",
            {
                email,
                amount: amount * 100,
                metadata: { roomType, checkIn, checkOut },
            },
            {
                headers: {
                    Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
                    "Content-Type": "application/json",
                },
            }
        );

        console.log("✅ Paystack Payment Initialized:", response.data);
        res.status(200).json(response.data);
    } catch (error) {
        const errorDetails = error.response?.data || error.message;
        console.error("❌ Paystack Init Error:", errorDetails);
        res.status(500).json({ error: "Payment initialization failed.", details: errorDetails });
    }
});

// Booking route
app.post("/api/book", async (req, res) => {
    const { email, amount, roomType, reference, checkIn, checkOut } = req.body;

    if (!email || !amount || !roomType || !reference || !checkIn || !checkOut) {
        return res.status(400).json({ success: false, message: "Missing booking info" });
    }

    try {
        const booking = {
            email,
            amount,
            roomType,
            reference,
            checkIn,
            checkOut,
            createdAt: new Date(),
        };
        const result = await bookingsCollection.insertOne(booking);

        console.log("✅ New Booking Saved:", result.insertedId);

        const emailSent = await sendBookingConfirmation(email, checkIn, checkOut, roomType, amount);

        if (emailSent) {
            return res.status(200).json({ success: true, message: "Booking saved and email sent", id: result.insertedId });
        } else {
            return res.status(200).json({ success: true, message: "Booking saved but failed to send email", id: result.insertedId });
        }
    } catch (err) {
        console.error("❌ Error saving booking:", err);
        return res.status(500).json({ success: false, message: "Failed to save booking" });
    }
});

// ✅ NEW: Root route for browser visit
app.get("/", (req, res) => {
    res.send("🏨 Pinnacle Hotel API is running");
});

// Start server
app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
});
