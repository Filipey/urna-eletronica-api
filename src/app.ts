import dotenv from "dotenv";
import express from "express";
import { serve, setup } from "swagger-ui-express";
import { appRouter } from "./routes";

dotenv.config();

const app = express();

app.use(express.json());

app.use(
  "/docs",
  serve,
  setup(undefined, {
    swaggerOptions: {
      url: "/swagger.json",
    },
  })
);

app.get("/api", (_req, res) => res.send("Hello from API!"));

app.use("/api", appRouter);

export { app };
