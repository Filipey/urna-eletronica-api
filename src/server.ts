import { PrismaClient } from "@prisma/client";
import dotenv from "dotenv";
import express, { Request, Response } from "express";

dotenv.config();

const app = express();
const port = process.env.PORT;
const prisma = new PrismaClient();

app.use(express.json());

app.get("/", async (req: Request, res: Response) => {
  const persons = await prisma.person.findMany();
  return res.json(persons);
});

app.listen(port, () => console.log(`[server]: Server is runnig at https://localhost:${port}`));