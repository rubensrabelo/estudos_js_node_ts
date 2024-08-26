const { MongoClient } = require("mongodb");

const uri = "mongodb://localhost:27017/testemongodb";

const client = new MongoClient(uri);

async function run() {
    try {
        await client.connect();

        console.log("MongoDB running...");
    } catch (error) {
        console.log(error);
    }
}

run();

module.exports = client;