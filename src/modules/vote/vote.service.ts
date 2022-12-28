import { PrismaClient } from "@prisma/client";

export class VoteService {
  constructor(private readonly db: PrismaClient) {}
}
