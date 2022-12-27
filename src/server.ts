import { PrismaClient } from "@prisma/client";
import dotenv from "dotenv";
import express, { Request, Response } from "express";
import { serve, setup } from "swagger-ui-express";

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;
const prisma = new PrismaClient();

app.use(express.json());
app.use("/docs", serve, setup(undefined, {
  swaggerOptions: {
    url: "/swagger.json"
  }
}));

app.get("/", (req, res) => {
  return res.json("Hello World from API");
});

app.get("/persons", async (req: Request, res: Response) => {
  const persons = await prisma.person.findMany();
  return res.json(persons);
});

app.listen(port, () => console.log(`[server]: Server is runnig at https://localhost:${port}`));
