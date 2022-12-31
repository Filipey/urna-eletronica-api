import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import { appRouter } from "./routes";

dotenv.config();

const app = express();

app.use(express.json());
app.use(cors());

app.get("/api", (_req, res) => res.send("Hello from API!"));

app.use("/api", appRouter);

export { app };
