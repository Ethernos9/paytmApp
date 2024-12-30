import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import userRoutes from "./userRoutes.js";
import accountRoutes from "./accountRoutes.js";
import transferRoutes, { connectQueue } from "./transferRoutes.js";
import { connect } from "amqplib";


dotenv.config({
  path: process.env.NODE_ENV === "production" ? ".env.production" : ".env.development",
});

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(cors());

// RabbitMQ connection
connectQueue()

// Base route
app.use("/api/v1",userRoutes );
app.use("/api/v2",accountRoutes);
app.use("/api/v3",transferRoutes);

const PORT = process.env.PORT ;


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});






























































































































































































            









































































































































































































// import express from "express";
// import amqp from "amqplib"
// import { PrismaClient } from "@prisma/client";
// import 'dotenv/config'


// const app = express();
// const prisma = new PrismaClient();
// const PORT = 5000;

// // Environment variables
// const QUEUE_URL = process.env.QUEUE_URL;
// const QUEUE_NAME = "payment_tasks";
// const RESPONSE_QUEUE_NAME = "response_queue";

// // Middleware
// app.use(express.json());

// // RabbitMQ connection

// // async function connectQueue() {
// //   try {
// //     connection = await amqp.connect(QUEUE_URL);
// //     channel = await connection.createChannel();
// //     await channel.assertQueue(QUEUE_NAME, { durable: true });
// //     console.log("Connected to RabbitMQ");
// //   } catch (error) {
// //     console.error("Failed to connect to RabbitMQ:", error);
// //   }
// // }

// let channel, connection;
// async function connectQueue() {
//   try {
//     connection = await amqp.connect(QUEUE_URL);
//     channel = await connection.createChannel();
//     await channel.assertQueue(QUEUE_NAME, { durable: true });
//     await channel.assertQueue(RESPONSE_QUEUE_NAME, { durable: true });
//     console.log("Connected to RabbitMQ");

//     // Consume messages from the response queue
//     channel.consume(RESPONSE_QUEUE_NAME, async (msg) => {
//       const paymentUpdate = JSON.parse(msg.content.toString());
//       console.log("Received payment status update:", paymentUpdate);

//       try {
//         // Update transaction status in the database
//         await prisma.transaction.update({
//           where: { id: paymentUpdate.transactionId },
//           data: { status: paymentUpdate.status },
//         });
//         console.log("Updated transaction status in the database");
//         channel.ack(msg); // Acknowledge the message
//       } catch (error) {
//         console.error("Failed to update transaction status:", error);
//       }
//     });
//   } catch (error) {
//     console.error("Failed to connect to RabbitMQ:", error);
//   }
// }




// Payment initiation endpoint
// app.post("/api/transfer/phoneNumber", async (req, res) => {
//   const { userId, senderNumber, receiverNumber, amount,accountNumber } = req.body;
//   try {
//     // Create a new transaction
//     const transaction = await prisma.transaction.create({
//       data: {
//         userId,
//         senderNumber,
//         receiverNumber,
//         amount,
//         accountNumber,
   
//       },
//     });
//     console.log("transaction : ",transaction)

//     // Push transaction to queue
//     channel.sendToQueue(QUEUE_NAME, Buffer.from(JSON.stringify(transaction)), {
//       persistent: true,
//     });

//     res.status(200).json({ message: "Payment initiated", transaction });
//   } catch (error) {
//     console.error("Error initiating payment:", error);
//     res.status(500).json({ error: "Failed to initiate payment" });
//   }
// });



// // Payment initiation endpoint
// app.post("/api/transfer/phoneNumber", async (req, res) => {
//   const { userId, senderNumber, receiverNumber, amount, accountNumber } = req.body;
//   try {
//     // Create a new transaction
//     const transaction = await prisma.transaction.create({
//       data: {
//         userId,
//         senderNumber,
//         receiverNumber,
//         amount,
//         accountNumber,
//         status: "PENDING",
//       },
//     });

//     console.log("Transaction:", transaction);

//     // Push transaction to the payment queue
//     channel.sendToQueue(QUEUE_NAME, Buffer.from(JSON.stringify(transaction)), {
//       persistent: true,
//     });

//     res.status(200).json({ message: "Payment initiated", transaction });
//   } catch (error) {
//     console.error("Error initiating payment:", error);
//     res.status(500).json({ error: "Failed to initiate payment" });
//   }
// });

// app.get("/api/getAccounts",async(req,res)=>{

// // TODO : fetch userId from token
  
// const userId = 1;

// try {
//   const accounts = await prisma.account.findMany({
//     where: { userId },
//     // TODO : understand SELECT statement
//     select: {
//       accountNumber: true,
//       balance: true,
//     },
//      // TODO : understand ORDERBY statement
//     orderBy: {
//       id: "asc",
//     },

//   })
//   if (accounts) res.status(200).json({"success" :true, "msg":"Accounts fetched successfully", "accounts" : accounts})
// } catch (error) {
//   res.status(500).json({"error" :error})
// }
// })

// app.post ("/api/self-transfer", async(req,res)=>{
//   //TODO : ADD middleware to check if user is authenticated or not
//   const { userId, senderNumber, receiverNumber, amount } = req.body;
//   try {
//     const senderAccount = await prisma.account.findFirst({
//       where:{
//         userId: userId,
//         accountNumber: senderNumber
//       }
//     })
//     if (!senderAccount) {
//       res.status(400).json({ message: "Invalid sender account number" });
//       return;
//     }
//     if (senderAccount.balance < amount) {
//       res.status(400).json({ message: "Insufficient balance" });
//       return;
//     }

// } catch(error){
//   console.error("Error while fetching account details:", error);
//   res.status(500).json({ error: "Failed to fetch account details" });
// }  

// })

// // Healthcheck endpoint
// app.get("/health", (req, res) => {
//   res.status(200).json({ status: "OK", timestamp: new Date() });
// });












// app.post ("/api/checkBalance", async (req, res) => {
//   //TODO : ADD middleware to check if user is authenticated or not
//   const { accountNumber } = req.body;
//   try {
//     const account = await prisma.account.findFirst({
//       where:{
//         accountNumber: accountNumber
//       }
//     })
//     if (account)res.status(200).json({ status: "Account Balance fetched successfully","balance":account.balance  });
   
//   }
//   catch (error) {
//     console.error("Error fetching account balance:", error);
//     res.status(500).json({ error: "Failed to fetch account balance" });
//   }
// })

// app.post("/api/user/create",async(req,res)=>{
//   const {name,email,password,phoneNumber}   = req.body
 
//   try {
//         // Check if an account with the given email or phoneNumber already exists
//         const existingAccount = await prisma.user.findFirst({
//           where: {
//               OR: [
//                   { email: email },
//                   { phoneNumber: phoneNumber },
//               ],
//           },
//       });

//       if (existingAccount) {
//           // If the account exists, return an appropriate response
//           return res.status(400).json({ message: "Account already exists with this email or phone number." });
//       }
//       const user = await prisma.user.create({
//           data:{
//               name,
//               email,
//               password,
//               phoneNumber
//           }
      
//       })
//       res.status(201).json({user:user})
//   } catch (error) {
//       res.status(400).json({"error":error})
//   }
// })
// app.post("/api/account/create", async(req,res)=>{
//   const {userId, accountType, balance  } = req.body
 
//   try {
//       const accountNumber = Math.floor(1000000000 + Math.random() * 9000000000).toString()
//       console.log("Generated Account Number:", accountNumber);
//         // Check if an account with the given accountNumber already exists
//         const existingAccount = await prisma.account.findFirst({
//           where: {
//               accountNumber,
//           },
//       });
//       if (existingAccount) {
//           // If the account exists, return an appropriate response
//           return res.status(400).json({ message: "Account already exists with this account number." });
//       }
//       const account = await prisma.account.create({
//           data:{
//               userId,
//               accountType,
//               balance,
//               accountNumber
//           }
//       })
//       res.status(201).json({"account":account,"message":"Account successfully created"})
//   }
//   catch(error){
//       res.status(400).json({"message":"Error creating your account"})
//   }
// })


// // // transactions
// app.get("/api/getTransactions",async(req,res)=>{
//   // TODO : fetch userId from token
//   let  userId = 2
//   try {
//     const transactions = await prisma.transaction.findMany({
//       where: { userId: userId},
//       // TODO : understand SELECT statement
//       select: {
//         id: true,
//         receiverNumber: true,
//         amount: true,
//         status: true,
//         description:true,
//         createdAt: true,
//       },
//       orderBy: {
//         createdAt: "desc",
//       },
//     })
//     if (transactions) res.status(200).json({ "msg":"Transactions fetched successfully", "transactions" : transactions})
//   } catch (error) {
//     console.error(error)
//     res.status(500).json({"error" :error})
//   }
// })

// app.post("/api/getTransactions", async (req, res) => {
//   const {accountNumber} = req.body;
//   try {
//     const transactions  = await prisma.transaction.findMany({
//         where:{
          
//         }
//     })
//   } catch (error) {
    
//   }
// })











// // Start server
// app.listen(PORT, async () => {
//   console.log(`Main-Server is running on http://localhost:${PORT}`);
//   await connectQueue();
// });
