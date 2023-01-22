import express, { Request, Response } from "express";
import cors from "cors";
import bodyParser from "body-parser";
import { MONGO_URI } from "./libs/db";

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static(process.cwd() + "/public"));

app.get("/", (req: Request, res: Response) => {
    res.sendFile(process.cwd() + "/views/index.html");
});



app.listen(3000, () => {
    console.log("Listening on port 3000");
});
