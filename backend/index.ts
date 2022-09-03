import express, { Express, Request, Response } from "express";
import bodyParser from "body-parser";

const app: Express = express();
const port: number = 8000; // Can replace with input from .env file

// body-parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req: Request, res: Response) => {
    res.send("Express + TypeScript Server");
});

app.listen(port, () => {
    console.log(`Backend server is listening on Port ${port}`);
});
