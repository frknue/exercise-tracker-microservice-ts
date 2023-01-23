import express, { Request, Response } from "express";
import cors from "cors";
import bodyParser from "body-parser";
import * as dotenv from "dotenv";
import { MongoClient } from "mongodb";

import { Exercise } from "./libs/types";

dotenv.config();

const MONGO_URI = process.env.MONGO_URI;

const client = new MongoClient(MONGO_URI);

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static(process.cwd() + "/public"));

app.get("/", (req: Request, res: Response) => {
    res.sendFile(process.cwd() + "/public/index.html");
});

app.post("/api/users", (req: Request, res: Response) => {
    const { username } = req.body;

    const createUser: Exercise = {
        username: username,
        count: 0,
        log: [],
    };
    // Check if user already exists
    client.connect((err) => {
        const collection = client.db("exercise-tracker").collection("users");
        collection.findOne({ username: username }, (err, result) => {
            if (err) {
                console.log(err);
            } else if (result) {
                res.json({ error: "Username already taken" });
            } else {
                collection.insertOne(createUser, (err, result) => {
                    if (err) {
                        console.log(err);
                    } else {
                        res.json({ username: username, _id: result.insertedId });
                    }
                });
            }
        });
    });
});

app.get("/api/users", (req: Request, res: Response) => {
    res.send("placeholder");
});

app.listen(3000, () => {
    console.log("Listening on port 3000");
});
