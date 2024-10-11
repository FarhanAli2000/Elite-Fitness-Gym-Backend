import express from "express";
import { config } from "dotenv";
import cors from "cors";
import { sendEmail } from "./utils/sendEmail.js";

const app = express();
const router = express.Router();

config({ path: "./config.env" });

app.use(cors({
    origin: process.env.FRONTEND_URL,
    methods: ["POST"],
    credentials: true
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Use the router with the app
app.use("/", router);

// Define routes
router.post("/send.mail", async (req, res) => {
    const { name, email, message } = req.body;

    // Validate input
    if (!name || !email || !message) {
        return res.status(400).json({
            success: false,
            message: "Please provide all details."
        });
    }

    // Try sending email
    try {
        await sendEmail({
            email: "farhanaliofficial82@gmail.com",
            subject: "GYM WEBSITE CONTACT",
            message,
            userEmail: email,
        });

        // Successful email sending response
        res.status(200).json({
            success: true,
            message: "Message Sent Successfully"
        });
    } catch (error) {
        // Error handling
        res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });
    }
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server listening at port ${PORT}`);
});
