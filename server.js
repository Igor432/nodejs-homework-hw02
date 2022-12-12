const express = require("express");
const logger = require("morgan");
const cors = require("cors");
const contactsRouter = require("./routes/api/contacts");
require("dotenv").config();
const { connectMongo } = require("./db/db");

const app = express();

const formatsLogger = app.get("env") === "development" ? "dev" : "short";

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/contacts", contactsRouter);

app.use((req, res) => {
    res.status(404).json({ message: "Not found" });
});

app.use((err, req, res, next) => {
    res.status(500).json({ message: err.message });
});

const PORT = process.env.PORT;

const start = async() => {
    try {
        connectMongo();
        app.listen(PORT, (err) => {
            if (err) {
                console.error("Failed with error:", err);
                console.log(`Server error ${err}`);
            }
        });
    } catch (err) {
        console.error(`Failed to launch with error ${err.message}`);
        process.exit(1)
    }
};

start();