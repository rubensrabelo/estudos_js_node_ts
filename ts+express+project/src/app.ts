import express from "express";
import config from "config";
import router from "./router";
import db from "../config/db";

const app = express();

app.use(express.json());

app.use("/api/", router);

const port = config.get<number>("port");

app.listen(port, async () => {
    await db();

    console.log("Server is running!")
});