/* eslint-disable prefer-const */
/* eslint-disable no-var */
import { PrismaClient } from "@prisma/client";

let db: PrismaClient;

declare global {
  var __db: PrismaClient | undefined;
}

if (!global.__db) {
  global.__db = new PrismaClient({
    datasources: {
      db: {
        url: process.env.RUNTIME_DATABASE_URL,
      },
    },
    errorFormat: "minimal",
  });
}

db = global.__db;

export { db };
