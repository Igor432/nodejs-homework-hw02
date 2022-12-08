const app = require("./app");
/*
const { connectMongo } = require("./db/db");
*/
require("dotenv").config();

const PORT = process.env.PORT;



app.listen(PORT, (err) => {
    if (err) {
        console.error(err)
        console.log("Server failed")
    }
})


/*

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
*/