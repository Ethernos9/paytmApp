import { Router } from "express";
import { PrismaClient } from "@prisma/client";
import amqp from "amqplib"
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

    channel.consume(RESPONSE_QUEUE_NAME, async (msg) => {
      const paymentUpdate = JSON.parse(msg.content.toString());
      console.log("Received payment status update:", paymentUpdate);

    //   try {
    //     // Update transaction status in the database
    //     await prisma.transaction.update({
    //       where: { id: paymentUpdate.transactionId },
    //       data: { status: paymentUpdate.status },
    //     });
    //     console.log("Updated transaction status in the database");
    //     channel.ack(msg); // Acknowledge the message
    //   } catch (error) {
    //     console.error("Failed to update transaction status:", error);
    //   }

    });

    
 } catch (error) {
    console.error("Failed to connect to RabbitMQ:", error);
 }
}


transferRoutes.post("/transfer/money", async (req, res) => {
  const {senderAccountNumber ,receiverAccountNumber, amount  , description,receiverUserId}  = req.body;

  const senderUserId  = req.userId;
  try {
    // Check if sender and receiver accounts exist
    const senderAccount = await prisma.account.findFirst({
      where: {
        userId: senderUserId,
        accountNumber: senderAccountNumber,
      },
    });

    const receiverAccount =  await prisma.account.findFirst({
        where:{
            accountNumber: receiverAccountNumber,
        }
    })
    if (!receiverAccount) {
      res.status(400).json({ success:false, message: "Invalid account number" });
      return;
    }
    // WS  NOT NEEDED I GUEsS 
   // TODO:  // USE WS OVER HERE TO SENd MEESage in frontend
    channel.sendToQueue(QUEUE_NAME, Buffer.from(JSON.stringify({
      senderUserId,
      senderAccountNumber,
      receiverAccountNumber,
      amount,
      description,
      receiverUserId,
    })));

     
  } catch (error) {
    
  }
})

transferRoutes.get("/:id",async(req,res)=>{
   // get status of a transaction by id 
})



export default transferRoutes



