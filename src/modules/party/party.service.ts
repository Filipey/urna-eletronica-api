import { PrismaClient } from "@prisma/client";

export class PartyService {
  constructor(private readonly db: PrismaClient) {}
}
