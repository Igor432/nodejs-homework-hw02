const mongo = require("mongoose");

const DB_HOST = process.env.DB_HOST;

const connectMongo = async() => {
    try {
        return mongo.connect(
            DB_HOST, {
                useNewUrlParser: true,
                useUnifiedTopology: true,
            },


            console.log("Database connection successful"),
        );
    } catch (err) {
        console.error(err);
    }

};

const disconnectMongo = async() => {
    return mongo.disconnect()
}



module.exports = {
    connectMongo,
    disconnectMongo
};