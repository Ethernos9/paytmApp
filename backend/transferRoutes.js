import { Router } from "express";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const transferRoutes = Router();

transferRoutes.post("/", async (req, res) => {

})

transferRoutes.get("/:id",async(req,res)=>{
   // get status of a transaction by id 
})



export default transferRoutes



