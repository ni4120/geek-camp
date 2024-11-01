import { PrismaClient } from "@prisma/client"

// eslint-disable-next-line no-var, vars-on-top
declare global {
  // eslint-disable-next-line no-var
  var prisma: PrismaClient | undefined
}

export const db = globalThis.prisma || new PrismaClient()

if (process.env.NODE_ENV !== "production") globalThis.prisma = db
