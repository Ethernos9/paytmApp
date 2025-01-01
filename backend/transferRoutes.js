// import { Router } from "express";
// import { PrismaClient } from "@prisma/client";
// import amqp from "amqplib"
// import { authenticateToken } from "./middleware.js";
// import winston from "winston"
// const prisma = new PrismaClient();

// const transferRoutes = Router();

// const QUEUE_URL = process.env.QUEUE_URL;
// const QUEUE_NAME = "payment_tasks";
// const RESPONSE_QUEUE_NAME = "response_queue";


// const logger = winston.createLogger({
//   level: "info",
//   format: winston.format.combine(
//     winston.format.timestamp(),
//     winston.format.json()
//   ),
//   transports: [
//     new winston.transports.Console({
//       format: winston.format.simple(),
//     }),
//     new winston.transports.File({ filename: "server.log" }),
//   ],
// });


// let channel , connection ;
// export async function connectQueue(){
//  try {
//     connection = await amqp.connect(QUEUE_URL);
//     channel = await connection.createChannel();
//     await channel.assertQueue(QUEUE_NAME, { durable: true });
//     await channel.assertQueue(RESPONSE_QUEUE_NAME, { durable: true });
//     logger.info("Connected to RabbitMQ");

    
//  } catch (error) {
//     logger.error("Failed to connect to RabbitMQ:", error);
//  }
// }


// transferRoutes.post("/transfer/money",authenticateToken, async (req, res) => {
//   const {senderAccountNumber ,receiverAccountNumber, amount  , description}  = req.body;

//   const senderUserId  = req.userId;
//   logger.info("senderUserId: " ,  senderUserId);

//   try {
//     // Check if sender and receiver accounts exist
//     const senderAccount = await prisma.account.findFirst({
//       where: {
//         userId: senderUserId,
//         accountNumber: senderAccountNumber,
//       },

//     });
//     if (!senderAccount) {
//       res.status(400).json({ success: false, message: "Invalid sender account number" });
//       return;
//     }

//     if (senderAccount.balance < amount) {
//         // TODO : WE CAN USE WS HERE 
//       res.status(400).json({ success: false, message: "Insufficient balance" });
//       return;
//     }

//     const receiverAccount =  await prisma.account.findFirst({
//         where:{
//             accountNumber: receiverAccountNumber,
//         },
//         select:{
//           userId:true,
//           accountNumber:true,
//           balance:true,
//         }
//     })
//     if (!receiverAccount) {
//       // TODO WS HERE TO NOTIFY thAT USER doesn't exist
//     res.status(400).json({ success:false, message: "Invalid account number" });
//     return;
//   }

//     const receiverUserId = receiverAccount.userId
   
//     // WS  NOT NEEDED I GUEsS 
//    // TODO:  // USE WS OVER HERE TO SENd MEESage in frontend
//     channel.sendToQueue(QUEUE_NAME, Buffer.from(JSON.stringify({
//       senderUserId,
//       receiverUserId,
//       senderAccountNumber,
//       receiverAccountNumber,
//       amount,
//       description,
     
//     })), { persistent: true });
//     console.log(senderUserId, receiverUserId,senderAccountNumber, receiverAccountNumber,amount, description,)
//     logger.info(senderUserId, receiverUserId,senderAccountNumber, receiverAccountNumber,amount, description,)
//   //   let paymentUpdate;
//   //  const msg = await channel.consume(RESPONSE_QUEUE_NAME, async (msg) => {
//   //       paymentUpdate = JSON.parse(msg.content.toString());
//   //       console.log("Received payment status update:", paymentUpdate);
//   //     });

//   //   console.log("msg from Responsequeue PaymentUpdate from main-server which is received through worker:",paymentUpdate )
   
//   //  res.status(200).json({success:true, message:"payment successfull", amount:paymentUpdate.amount, status:paymentUpdate.status,transactionId:paymentUpdate.transactionId})

//   channel.consume(RESPONSE_QUEUE_NAME, (msg) => {
//     const paymentUpdate = JSON.parse(msg.content.toString());
//     logger.info("Received payment status update:", paymentUpdate);
//     if (paymentUpdate) {
//         // Acknowledge the message after processing
//         channel.ack(msg);
//         console.log("Received payment status update from worker :", paymentUpdate.success, paymentUpdate.message,paymentUpdate.amount, paymentUpdate.status, paymentUpdate.transactionId)
//         logger.info("Received payment status update from worker :", paymentUpdate.success, paymentUpdate.message,paymentUpdate.amount, paymentUpdate.status, paymentUpdate.transactionId)

//         res.status(200).json({
//             success: paymentUpdate.success,
//             message: paymentUpdate.message,
//             amount: paymentUpdate.amount,
//             status: paymentUpdate.status,
//             transactionId: paymentUpdate.transactionId,
//         });
//     }
// });



     
//   } catch (error) {
//     res.status(200).json({message:"Unable to process payment", success:false ,error:error.message})
//   }
// })

// transferRoutes.get("/:id",async(req,res)=>{
//    // get status of a transaction by id 
// })



// export default transferRoutes


































































import { Router } from "express";
import { PrismaClient } from "@prisma/client";
import amqp from "amqplib";
import { authenticateToken } from "./middleware.js";
import winston from "winston";

const prisma = new PrismaClient();
const transferRoutes = Router();

const QUEUE_URL = process.env.QUEUE_URL;
const QUEUE_NAME = "payment_tasks";
const RESPONSE_QUEUE_NAME = "response_queue";

const logger = winston.createLogger({
  level: "info",
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json()
  ),
  transports: [
    new winston.transports.Console({
      format: winston.format.simple(),
    }),
    new winston.transports.File({ filename: "server.log" }),
  ],
});

let channel, connection;

// Connect to RabbitMQ
export async function connectQueue() {
  try {
    connection = await amqp.connect(QUEUE_URL);
    channel = await connection.createChannel();
    await channel.assertQueue(QUEUE_NAME, { durable: true });
    await channel.assertQueue(RESPONSE_QUEUE_NAME, { durable: true });
    logger.info("Connected to RabbitMQ");
  } catch (error) {
    logger.error("Failed to connect to RabbitMQ:", error);
  }
}

transferRoutes.post("/transfer/money", authenticateToken, async (req, res) => {
  const { senderAccountNumber,  receiverAccountNumber, amount, description } = req.body;
  const senderUserId = req.userId;
  console.log("senderuserId: ---->", senderUserId)

  logger.info("senderUserId:-----> ", senderUserId);

  try {
    // Validate sender account
    const senderAccount = await prisma.account.findFirst({
      where: {
        userId: senderUserId,
        accountNumber: senderAccountNumber,
      },
    });
    console.log("senderAccount:----->", senderAccount)
    if (!senderAccount) {
      return res.status(400).json({ success: false, message: "Invalid sender account number" });
    }

    if (senderAccount.balance < amount) {
      return res.status(400).json({ success: false, message: "Insufficient balance" });
    }

    // Validate receiver account
    const receiverAccount = await prisma.account.findFirst({
      where: { accountNumber:  receiverAccountNumber },
      select: { userId: true },
    });
    if (!receiverAccount) {
      return res.status(400).json({ success: false, message: "Invalid receiver account number" });
    }
    console.log("receiverAccount:----->", receiverAccount)

    const receiverUserId = receiverAccount.userId;
     console.log("receiverAccount:----->", receiverUserId)
     logger.info("receiverAccount:----->", receiverUserId)
    // Send payment task to RabbitMQ
    channel.sendToQueue(
      QUEUE_NAME,
      Buffer.from(
        JSON.stringify({
          senderUserId,
          receiverUserId,
          senderAccountNumber,
          receiverAccountNumber,
          amount,
          description,
        })
      ),
      { persistent: true }
    );
    console.log("message send to queue:----->")

    logger.info("Payment task sent to queue:", {
      senderUserId,
      receiverUserId,
      senderAccountNumber,
      receiverAccountNumber,
      amount,
      description,
    });


    // Send response to client

    // try {
    //   // Wait for a single response from the response queue
    //   const paymentUpdate = await new Promise((resolve, reject) => {
    //     const onMessage = (msg) => {
    //       const paymentUpdate = JSON.parse(msg.content.toString());
    //       logger.info("Received payment status update:", paymentUpdate);
    
    //       // Acknowledge the message and resolve the promise
    //       channel.ack(msg);
    //       resolve(paymentUpdate);
    //     };
    
    //     // Set up a consumer for the response queue
    //     channel.consume(RESPONSE_QUEUE_NAME, onMessage, { noAck: false });
    //   });
    
    //   // Send response to the client
    //   return res.status(200).json({
    //     success: paymentUpdate.success,
    //     message: paymentUpdate.message,
    //     amount: paymentUpdate.amount,
    //     status: paymentUpdate.status,
    //     transactionId: paymentUpdate.transactionId,
    //   });
    // } catch (error) {
    //   logger.error("Error processing payment:", error);
    //   return res.status(500).json({ success: false, message: "Unable to process payment", error: error.message });
    // }
    
    // try {
    //   // Set up a consumer for the response queue
    //   channel.consume(RESPONSE_QUEUE_NAME, (msg) => {
    //     const paymentUpdate = JSON.parse(msg.content.toString());
    //     logger.info("Received payment status update:", paymentUpdate);
    
    //     // Acknowledge the message
    //     channel.ack(msg);
    
    //     // Send response to the client immediately
    //     return res.status(200).json({
    //       success: paymentUpdate.success,
    //       message: paymentUpdate.message,
    //       amount: paymentUpdate.amount,
    //       status: paymentUpdate.status,
    //       transactionId: paymentUpdate.transactionId,
    //     });
    //   }, { noAck: false });
    
    // } catch (error) {
    //   logger.error("Error processing payment:", error);
    //   return res.status(500).json({ success: false, message: "Unable to process payment", error: error.message });
    // }



    // try {
    //   let responseSent = false; // Flag to track if the response has already been sent
    
    //   // Set up a consumer for the response queue
    //   channel.consume(
    //     RESPONSE_QUEUE_NAME,
    //     (msg) => {
    //       if (responseSent) {
    //         // Skip if the response has already been sent
    //         return;
    //       }
    
    //       const paymentUpdate = JSON.parse(msg.content.toString());
    //       logger.info("Received payment status update:", paymentUpdate);
    
    //       // Acknowledge the message
    //       channel.ack(msg);
    
    //       // Send response to the client
    //       responseSent = true; // Mark response as sent
    //       return res.status(200).json({
    //         success: paymentUpdate.success,
    //         message: paymentUpdate.message,
    //         amount: paymentUpdate.amount,
    //         status: paymentUpdate.status,
    //         transactionId: paymentUpdate.transactionId,
    //       });
    //     },
    //     { noAck: false }
    //   );
    
    // } catch (error) {
    //   logger.error("Error processing payment:", error);
    //   return res.status(500).json({ success: false, message: "Unable to process payment", error: error.message });
    // }


    try {
      // Declare a unique consumer tag for each payment request
      const consumerTag = `payment-consumer-${Date.now()}`;
    
      // Set up a consumer for the response queue
      const paymentUpdate = await new Promise((resolve, reject) => {
        const onMessage = (msg) => {
          const paymentUpdate = JSON.parse(msg.content.toString());
          logger.info("Received payment status update:", paymentUpdate);
    
          // Acknowledge the message
          channel.ack(msg);
    
          // Cancel the consumer after processing
          channel.cancel(consumerTag);
    
          // Resolve the promise with payment details
          resolve(paymentUpdate);
        };
    
        // Attach the consumer to the response queue with a unique consumer tag
        channel.consume(
          RESPONSE_QUEUE_NAME,
          onMessage,
          { noAck: false, consumerTag },
          (err) => {
            if (err) {
              logger.error("Error setting up consumer:", err);
              reject(new Error("Error setting up response queue consumer"));
            }
          }
        );
      });
    
      // Send the response to the client
      return res.status(200).json({
        success: paymentUpdate.success,
        message: paymentUpdate.message,
        amount: paymentUpdate.amount,
        status: paymentUpdate.status,
        transactionId: paymentUpdate.transactionId,
      });
    } catch (error) {
      logger.error("Error processing payment:", error);
      return res
        .status(500)
        .json({ success: false, message: "Unable to process payment", error: error.message });
    }
    
    
    

    
  } catch (error) {
    logger.error("Error processing payment:", error);
    return res.status(500).json({ success: false, message: "Unable to process payment", error: error.message });
  }
});

transferRoutes.post("/transfer/money/phonenumber", authenticateToken,async (req,res)=>{
  const {  receiverPhoneNumber, amount, description } = req.body;
  const senderPhoneNumber = req.phoneNumber
  if (!senderPhoneNumber || !receiverPhoneNumber || !amount || amount <= 0) {
    return res.status(400).json({ error: "Invalid input parameters" });
  }

  // const senderPhoneNumber = req.phoneNumber


 
  const sender = await prisma.user.findUnique({
    where: { phoneNumber: senderPhoneNumber },
    include: { accounts: true },
  });

    console.log("Sender:", sender)

   const receiver = await prisma.user.findUnique({
      where: { phoneNumber: receiverPhoneNumber },
      include: { accounts: true },
    });

    console.log("Receiver :---> ", receiver)
    if (!sender) {
      return res.status(404).json({ error: "Sender not found" });
    }

    if (!receiver) {
      return res.status(404).json({ error: "Receiver not found" });
    }
    const senderDefaultAccount = sender.accounts.find((acc) => acc.isDefault);
    const receiverDefaultAccount = receiver.accounts.find((acc) => acc.isDefault);


    console.log("senderDefaultAccount:------->", senderDefaultAccount)
    console.log("receiverDefaultAccount:------->", receiverDefaultAccount)

    if (!senderDefaultAccount) {
      return res.status(400).json({ error: "Sender does not have a default account" });
    }

    if (!receiverDefaultAccount) {
      return res.status(400).json({ error: "Receiver does not have a default account attached with this phone Number" });
    }

    if (senderDefaultAccount.balance < amount) {
      return res.status(400).json({ error: "Insufficient balance " });
    }
   
   
    return res.status(200).json({"msg":"ok"})
  } 

 
)

transferRoutes.get("/transaction/:id", authenticateToken , async (req, res) => {
  // TODO: Implement logic to fetch transaction status by ID
  const { id } = req.params
  // Fetch transaction status from your database or any other data source

  try {

    const transaction = await prisma.transaction.findFirst({
      where: { id: Number(id) },
      select: { receiverAccountNumber: true, status: true, senderAccountNumber: true, amount: true, description: true, receiverUserId: true , id:true},
    })
   

    if (!transaction) {
      return res.status(404).json({ success: true, message: "Transaction not found make sure that this transaction exist", })
    }
    return res.status(200).json({ success: true, message: "Transaction  found", transaction });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Something went wrong ", })
  }



});


transferRoutes.post("/transactions",authenticateToken,async (req,res)=>{
    const userId = req.userId;
   

    try {
      const transactions = await prisma.transaction.findMany({
        where:{
         OR:[
         { senderUserId:userId},
         { receiverUserId:userId },
         ]
        }
      })
   
      if (!transactions){
        return res.status(404).json({ success: true, message: "No transactions found" })
      }
      return res.status(200).json({ success: true, message: "Transactions  found", transactions });
    } catch (error) {
          return res.status(500).json({ success: false, message: "Something went wrong in fetching transactions ", })
    }
})

export default transferRoutes;
// fetch all the transaction with a particular user
// TODO : can be done in frontend 


// transferRoutes.post("/transactions/particular/:userId", async(req,res)=>{
//   const userId = req.params.userId;
//   try {
//     const transactions = await prisma.transaction.findMany({
//       where:{
//         senderUserId: userId,
//         OR:[
//           { receiverUserId: userId },
//         ]
//       }
//     })
//     if (!transactions){
//       return res.status(404).json({ success: true, message: "No transactions found" })

//     }
//     return res.status(200).json({ success: true, message: "Transactions  found", transactions });
//   } catch (error) {
//       return res.status(500).json({ success: false, message: "Something went wrong in fetching transactions ", })
//   }
// })

