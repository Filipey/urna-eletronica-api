import { PrismaClient } from "@prisma/client";

export class CandidateService {
  constructor(private readonly db: PrismaClient) {}
}
