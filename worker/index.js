// import amqp from "amqplib"
// import { PrismaClient } from "@prisma/client";
// import express from "express"
// import 'dotenv/config'

// const app = express();
// const prisma = new PrismaClient();
// const PORT = 3001;

// // Environment variables
// const QUEUE_URL = process.env.QUEUE_URL 
// const QUEUE_NAME = "payment_tasks";
// const DLQ_NAME = "payment_dlq";

// // RabbitMQ connection
// let channel, connection;
// async function connectQueue() {
//   try {
//     connection = await amqp.connect(QUEUE_URL);
//     channel = await connection.createChannel();

//     // Create the main queue and Dead Letter Queue (DLQ)
//     await channel.assertQueue(QUEUE_NAME, { durable: true });
//     await channel.assertQueue(DLQ_NAME, { durable: true });

//     console.log("Worker connected to RabbitMQ");

//     // Consume messages from the queue
//     channel.consume(QUEUE_NAME, async (msg) => {
//       const transaction = JSON.parse(msg.content.toString());
//       console.log("Processing transaction:", transaction);

//       try {
//         // Simulate payment processing
//         const success = Math.random() > 0.2; // 80% success rate
//         if (!success) throw new Error("Payment processing failed");

//         // Update transaction status to SUCCESS
//         await prisma.transaction.update({
//           where: { id: transaction.id },
//           data: { status: "SUCCESS" },
//         });

//         console.log("Transaction successful:", transaction.id);
//     //TODO :    // channel.ack is coming undefined 
//         console.log("ack msg :" ,channel.ack(msg));
//         channel.ack(msg);
//       } catch (error) {
//         console.error("Transaction failed:", transaction.id, error);

//         // Retry logic or move to DLQ
//         const retryCount = transaction.retryCount || 0;
//         if (retryCount < 3) {
//           transaction.retryCount = retryCount + 1;
//           channel.sendToQueue(
//             QUEUE_NAME,
//             Buffer.from(JSON.stringify(transaction)),
//             { persistent: true }
//           );
//         } else {
//           channel.sendToQueue(
//             DLQ_NAME,
//             Buffer.from(JSON.stringify(transaction)),
//             { persistent: true }
//           );
//         }
//         console.log("ack msg :" ,channel.ack(msg));
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


import amqp from "amqplib";
import { PrismaClient } from "@prisma/client";
import express from "express";
import 'dotenv/config';

const app = express();
const prisma = new PrismaClient();
const PORT = 3001;

// Environment variables
const QUEUE_URL = process.env.QUEUE_URL;
const QUEUE_NAME = "payment_tasks";
const RESPONSE_QUEUE_NAME = "response_queue";
const DLQ_NAME = "payment_dlq";

// RabbitMQ connection
let channel, connection;
async function connectQueue() {
  try {
    connection = await amqp.connect(QUEUE_URL);
    channel = await connection.createChannel();

    // Create the main queue, response queue, and Dead Letter Queue (DLQ)
    await channel.assertQueue(QUEUE_NAME, { durable: true });
    await channel.assertQueue(RESPONSE_QUEUE_NAME, { durable: true });
    await channel.assertQueue(DLQ_NAME, { durable: true });

    console.log("Worker connected to RabbitMQ");

    // Consume messages from the queue
    channel.consume(QUEUE_NAME, async (msg) => {
      const transaction = JSON.parse(msg.content.toString());
      console.log("Processing transaction:", transaction);

      try {
        // Simulate payment processing
        const success = Math.random() > 0.2; // 80% success rate
        if (!success) throw new Error("Payment processing failed");

        // Update transaction status to SUCCESS
        await prisma.transaction.update({
          where: { id: transaction.id },
          data: { status: "SUCCESS" },
        });

        console.log("Transaction successful:", transaction.id);

        // Publish success status to the response queue
        channel.sendToQueue(
          RESPONSE_QUEUE_NAME,
          Buffer.from(JSON.stringify({
            transactionId: transaction.id,
            status: "SUCCESS",
          })),
          { persistent: true }
        );

        channel.ack(msg); // Acknowledge the message
      } catch (error) {
        console.error("Transaction failed:", transaction.id, error);

        // Retry logic or move to DLQ
        const retryCount = transaction.retryCount || 0;
        if (retryCount < 3) {
          transaction.retryCount = retryCount + 1;
          channel.sendToQueue(
            QUEUE_NAME,
            Buffer.from(JSON.stringify(transaction)),
            { persistent: true }
          );
        } else {
          channel.sendToQueue(
            DLQ_NAME,
            Buffer.from(JSON.stringify(transaction)),
            { persistent: true }
          );
        }

        // Publish failure status to the response queue
        channel.sendToQueue(
          RESPONSE_QUEUE_NAME,
          Buffer.from(JSON.stringify({
            transactionId: transaction.id,
            status: "FAILED",
          })),
          { persistent: true }
        );

        channel.ack(msg); // Acknowledge the message
      }
    });
  } catch (error) {
    console.error("Failed to connect to RabbitMQ:", error);
  }
}

// Healthcheck endpoint
app.get("/health", (req, res) => {
  res.status(200).json({ status: "OK", timestamp: new Date() });
});

// Start server
app.listen(PORT, async () => {
  console.log(`Worker is running on http://localhost:${PORT}`);
  await connectQueue();
});
