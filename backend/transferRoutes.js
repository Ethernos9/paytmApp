import { Router } from "express";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const transferRoutes = Router();

transferRoutes.post("/", async (req, res) => {

})

export default transferRoutes



