import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function connectToDB() {
  try{
    await prisma.$connect();
    console.log("Database connected");
  } catch (error) {
    console.log("Error connecting to database", error);
    throw error;
  }
};

export { prisma, connectToDB };