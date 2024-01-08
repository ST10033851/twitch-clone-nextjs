//This code prevents the hot reload from creating multiple instances of the 
//PrismaClient

import { PrismaClient } from "@prisma/client"

declare global {
    var prisma: PrismaClient | undefined;
}

export const db = globalThis.prisma || new PrismaClient();

if(process.env.NODE_ENV !== "production") globalThis.prisma = db;