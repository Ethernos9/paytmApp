import { Router } from "express";
import { PrismaClient } from "@prisma/client";
import amqp from "amqplib"
import { authenticateToken } from "./middleware.js";
const prisma = new PrismaClient();

const transferRoutes = Router();

const QUEUE_URL = process.env.QUEUE_URL;
const QUEUE_NAME = "payment_tasks";
const RESPONSE_QUEUE_NAME = "response_queue";

let channel , connection ;
export async function connectQueue(){
 try {
    connection = await amqp.connect(QUEUE_URL);
    channel = await connection.createChannel();
    await channel.assertQueue(QUEUE_NAME, { durable: true });
    await channel.assertQueue(RESPONSE_QUEUE_NAME, { durable: true });
    console.log("Connected to RabbitMQ");

    
 } catch (error) {
    console.error("Failed to connect to RabbitMQ:", error);
 }
}


transferRoutes.post("/transfer/money",authenticateToken, async (req, res) => {
  const {senderAccountNumber ,receiverAccountNumber, amount  , description,receiverUserId}  = req.body;

  const senderUserId  = req.userId;
  console.log("senderUserId: " ,  senderUserId);

  try {
    // Check if sender and receiver accounts exist
    const senderAccount = await prisma.account.findFirst({
      where: {
        userId: senderUserId,
        accountNumber: senderAccountNumber,
      },

    });
    if (!senderAccount) {
      res.status(400).json({ success: false, message: "Invalid sender account number" });
      return;
    }

    if (senderAccount.balance < amount) {
        // TODO : WE CAN USE WS HERE 
      res.status(400).json({ success: false, message: "Insufficient balance" });
      return;
    }

    const receiverAccount =  await prisma.account.findFirst({
        where:{
            accountNumber: receiverAccountNumber,
        },
        select:{
          userId:true,
          accountNumber:true,
          balance:true,
        }
    })
    console.log("receiverAccount: " , receiverAccount)
    const receiverUserId = receiverAccount.userId
    if (!receiverAccount) {
        // TODO WS HERE TO NOTIFY thAT USER doesn't exist
      res.status(400).json({ success:false, message: "Invalid account number" });
      return;
    }
    // WS  NOT NEEDED I GUEsS 
   // TODO:  // USE WS OVER HERE TO SENd MEESage in frontend
    channel.sendToQueue(QUEUE_NAME, Buffer.from(JSON.stringify({
      senderUserId,
      receiverUserId,
      senderAccountNumber,
      receiverAccountNumber,
      amount,
      description,
      receiverUserId,
    })), { persistent: true });

    let paymentUpdate;
   const msg = await channel.consume(RESPONSE_QUEUE_NAME, async (msg) => {
        paymentUpdate = JSON.parse(msg.content.toString());
        console.log("Received payment status update:", paymentUpdate);
      });

    console.log("msg from Responsequeue PaymentUpdate from main-server which is received through worker:",paymentUpdate )
   
   res.status(200).json({success:true, message:"payment successfull", amount:paymentUpdate.amount, status:paymentUpdate.status,transactionId:paymentUpdate.transactionId})

     
  } catch (error) {
    res.status(200).json({message:"Unable to process payment", success:false ,error:error.message})
  }
})

transferRoutes.get("/:id",async(req,res)=>{
   // get status of a transaction by id 
})



export default transferRoutes



