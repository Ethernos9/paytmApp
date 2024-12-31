

// import amqp from "amqplib";
// import { PrismaClient } from "@prisma/client";
// import express from "express";
// import 'dotenv/config';

// const app = express();
// const prisma = new PrismaClient();
// const PORT = 3001;

// // Environment variables
// const QUEUE_URL = process.env.QUEUE_URL;
// const QUEUE_NAME = "payment_tasks";
// const RESPONSE_QUEUE_NAME = "response_queue";
// const DLQ_NAME = "payment_dlq";

// // RabbitMQ connection
// let channel, connection;
// async function connectQueue() {
//   console.log("Inside worker processing payment")
//   try {
//     connection = await amqp.connect(QUEUE_URL);
//     channel = await connection.createChannel();

//     // Create the main queue, response queue, and Dead Letter Queue (DLQ)
//     await channel.assertQueue(QUEUE_NAME, { durable: true });
//     await channel.assertQueue(RESPONSE_QUEUE_NAME, { durable: true });
//     await channel.assertQueue(DLQ_NAME, { durable: true });

//     console.log("Worker connected to RabbitMQ");

//     // Consume messages from the queue
//     channel.consume(QUEUE_NAME, async (msg) => {
//       const transaction = JSON.parse(msg.content.toString());
   
//         try {

//           const result = await prisma.$transaction(async (tx) => {
//             // Deduct money from sender's account
//             const sender = await tx.account.update({
//                 where: { accountNumber: transaction.senderAccountNumber },
//                 data: { balance: { decrement: transaction.amount } },
//             });
  
//             // Add money to receiver's account
//             await tx.account.update({
//                 where: { accountNumber: transaction.receiverAccountNumber },
//                 data: { balance: { increment:  transaction.amount } },
//             });
              
//       const transactionToCreate = await prisma.transaction.create({
//               data: {
//                 senderUserId: transaction.senderUserId,
//                 receiverUserId: transaction.receiverUserId,
//                 senderAccountNumber: transaction.senderAccountNumber,
//                 receiverAccountNumber:  transaction.receiverAccountNumber,
//                 amount : transaction.amount,
//                 description: transaction.description,
//                 status: "SUCCESS",
//               },
              
//             })

//             console.log("transactionToCreate from Success : ----->", transactionToCreate)

//             channel.sendToQueue(
//               RESPONSE_QUEUE_NAME,
//               Buffer.from(JSON.stringify({
//                 transactionId: transactionToCreate.id,
//                 status: "SUCCESS",
//               })),
//               { persistent: true }
//             );
    
//             channel.ack(msg);
//             return { message: 'Transaction successful' };
//         });
          
//         } catch (error) {

//           console.error("Transaction failed ERROR :", error);

//           // Retry logic or move to DLQ
//           let retryCount = 0;
//           if (retryCount < 3) {
//            retryCount = retryCount + 1;
//             channel.sendToQueue(
//               QUEUE_NAME,
//               Buffer.from(JSON.stringify(transaction)),
//               { persistent: true }
//             );
//           } else {
//             channel.sendToQueue(
//               DLQ_NAME,
//               Buffer.from(JSON.stringify(transaction)),
//               { persistent: true }
//             );
//           }
  
     
//       const transactionToCreate  =  await prisma.transaction.create({
//             data: {
//               senderUserId: transaction.senderUserId,
//               receiverUserId: transaction.receiverUserId,
//               senderAccountNumber: transaction.senderAccountNumber,
//               receiverAccountNumber:   transaction.receiverAccountNumber,
//               amount : transaction.amount,
//               description: transaction.description,
//               status: "FAILED",
//             },
//           }) 
//           console.log("transactionToCreate from failure : ----->", transactionToCreate)

//         }
//         // Publish failure status to the response queue
//         channel.sendToQueue(
//           RESPONSE_QUEUE_NAME,
//           Buffer.from(JSON.stringify({
//             transactionId:  transactionToCreate.id,
//             status: "FAILED",
//           })),
//           { persistent: true }
//         );

//         channel.ack(msg);
//     });
//   } catch (error) {
//     console.error("Failed to connect to RabbitMQ:", error);
//   }
// }

// // Healthcheck endpoint
// app.get("/health", (req, res) => {
//   res.status(200).json({ status: "OK", timestamp: new Date() });
// });

// // Start server
// app.listen(PORT, async () => {
//   console.log(`Worker is running on http://localhost:${PORT}`);
//   await connectQueue();
// });





// import amqp from "amqplib";
// import { PrismaClient } from "@prisma/client";
// import express from "express";
// import "dotenv/config";

// const app = express();
// const prisma = new PrismaClient();
// const PORT = 3001;

// // Environment variables
// const QUEUE_URL = process.env.QUEUE_URL;
// const QUEUE_NAME = "payment_tasks";
// const RESPONSE_QUEUE_NAME = "response_queue";
// const DLQ_NAME = "payment_dlq";

// // RabbitMQ connection
// let channel, connection;

// async function connectQueue() {
//   console.log("Inside worker processing payment");
//   try {
//     connection = await amqp.connect(QUEUE_URL);
//     channel = await connection.createChannel();

//     // Create the main queue, response queue, and Dead Letter Queue (DLQ)
//     await channel.assertQueue(QUEUE_NAME, { durable: true });
//     await channel.assertQueue(RESPONSE_QUEUE_NAME, { durable: true });
//     await channel.assertQueue(DLQ_NAME, { durable: true });

//     console.log("Worker connected to RabbitMQ");

//     // Consume messages from the queue
//     channel.consume(QUEUE_NAME, async (msg) => {
//       const transaction = JSON.parse(msg.content.toString());
//       try {
//         const result = await prisma.$transaction(async (tx) => {
//           // Deduct money from sender's account
//           await tx.account.update({
//             where: { accountNumber: transaction.senderAccountNumber },
//             data: { balance: { decrement: transaction.amount } },
//           });

//           // Add money to receiver's account
//           await tx.account.update({
//             where: { accountNumber: transaction.receiverAccountNumber },
//             data: { balance: { increment: transaction.amount } },
//           });

//           const transactionToCreate = await tx.transaction.create({
//             data: {
//               senderUserId: transaction.senderUserId,
//               receiverUserId: transaction.receiverUserId,
//               senderAccountNumber: transaction.senderAccountNumber,
//               receiverAccountNumber: transaction.receiverAccountNumber,
//               amount: transaction.amount,
//               description: transaction.description,
//               status: "SUCCESS",
//             },
//           });

//           console.log("Transaction successful:", transactionToCreate);

//           await channel.sendToQueue(
//             RESPONSE_QUEUE_NAME,
//             Buffer.from(
//               JSON.stringify({
//                 transactionId: transactionToCreate.id,
//                 amount: transactionToCreate.amount,
//                 status: "SUCCESS",
//               })
//             ),
//             { persistent: true }
//           );

//           channel.ack(msg);
//           return transactionToCreate;
//         });
//       } catch (error) {
//         console.error("Transaction failed:", error);

//         const retryCount = transaction.retryCount || 0;
//         if (retryCount < 3) {
//           transaction.retryCount = retryCount + 1;
//           await channel.sendToQueue(
//             QUEUE_NAME,
//             Buffer.from(JSON.stringify(transaction)),
//             { persistent: true }
//           );
//         } else {
//           await channel.sendToQueue(
//             DLQ_NAME,
//             Buffer.from(JSON.stringify(transaction)),
//             { persistent: true }
//           );
//         }

//         const transactionToCreate = await prisma.transaction.create({
//           data: {
//             senderUserId: transaction.senderUserId,
//             receiverUserId: transaction.receiverUserId,
//             senderAccountNumber: transaction.senderAccountNumber,
//             receiverAccountNumber: transaction.receiverAccountNumber,
//             amount: transaction.amount,
//             description: transaction.description,
//             status: "FAILED",
//           },
//         });

//         await channel.sendToQueue(
//           RESPONSE_QUEUE_NAME,
//           Buffer.from(
//             JSON.stringify({
//               transactionId: transactionToCreate.id,
//               status: "FAILED",
//             })
//           ),
//           { persistent: true }
//         );

//         channel.ack(msg);
//       }
//     });
//   } catch (error) {
//     console.error("Failed to connect to RabbitMQ:", error);
//   }
// }

// // Healthcheck endpoint
// app.get("/health", (req, res) => {
//   res.status(200).json({ status: "OK", timestamp: new Date() });
// });

// // Start server
// app.listen(PORT, async () => {
//   console.log(`Worker is running on http://localhost:${PORT}`);
//   await connectQueue();
// });
































// Retry logic inside the `consume` callback
try {
  const result = await prisma.$transaction(async (tx) => {
    // Deduct money from sender's account
    await tx.account.update({
      where: { accountNumber: transaction.senderAccountNumber },
      data: { balance: { decrement: transaction.amount } },
    });

    // Add money to receiver's account
    await tx.account.update({
      where: { accountNumber: transaction.receiverAccountNumber },
      data: { balance: { increment: transaction.amount } },
    });

    // Create a transaction record with SUCCESS status
    const transactionToCreate = await tx.transaction.create({
      data: {
        senderUserId: transaction.senderUserId,
        receiverUserId: transaction.receiverUserId,
        senderAccountNumber: transaction.senderAccountNumber,
        receiverAccountNumber: transaction.receiverAccountNumber,
        amount: transaction.amount,
        description: transaction.description,
        status: "SUCCESS",
      },
    });

    console.log("Transaction successful:", transactionToCreate);

    // Send response back to the response queue
    await channel.sendToQueue(
      RESPONSE_QUEUE_NAME,
      Buffer.from(
        JSON.stringify({
          transactionId: transactionToCreate.id,
          amount: transactionToCreate.amount,
          status: "SUCCESS",
        })
      ),
      { persistent: true }
    );

    // Acknowledge the message
    channel.ack(msg);
    return transactionToCreate;
  });
} catch (error) {
  console.error("Transaction failed:", error);

  // Add an entry in PaymentRetry table
  await prisma.paymentRetry.create({
    data: {
      transactionId: transaction.id,
      reason: error.message || "Unknown error",
    },
  });

  // Count total retry attempts for this transaction
  const retryCount = await prisma.paymentRetry.count({
    where: { transactionId: transaction.id },
  });

  if (retryCount < 3) {
    // Retry transaction by re-queuing
    console.log(`Retrying transaction ${transaction.id}, attempt ${retryCount}`);
    await channel.sendToQueue(
      QUEUE_NAME,
      Buffer.from(JSON.stringify(transaction)),
      { persistent: true }
    );
  } else {
    // Max retries reached, mark transaction as FAILED
    console.log(`Max retry attempts reached for transaction ${transaction.id}`);

    // Update transaction status to FAILED
    await prisma.transaction.update({
      where: { id: transaction.id },
      data: { status: "FAILED" },
    });

    // Send to Dead Letter Queue (DLQ)
    await channel.sendToQueue(
      DLQ_NAME,
      Buffer.from(JSON.stringify(transaction)),
      { persistent: true }
    );

    // Send failure response to the response queue
    await channel.sendToQueue(
      RESPONSE_QUEUE_NAME,
      Buffer.from(
        JSON.stringify({
          transactionId: transaction.id,
          status: "FAILED",
        })
      ),
      { persistent: true }
    );
  }

  // Acknowledge the message to avoid reprocessing
  channel.ack(msg);
}
