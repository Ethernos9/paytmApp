import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

import { Router } from "express";
import { authenticateToken } from "./middleware.js";



const accountRoutes = Router();



// PROTECTED ROUTES --------------------------------


accountRoutes.post("/create/account",authenticateToken,async(req,res)=>{
   const userId = req.userId
   const {accountType, balance }  = req.body
   try {
    const accountNumber = Math.floor(1000000000 + Math.random() * 9000000000).toString();
    console.log("Generated Account Number:", accountNumber);
    
    // Check if an account with the given accountNumber already exists
    const existedAccount = await prisma.account.findFirst({
        where:{
            accountNumber,
        }
    })


    if (existedAccount)  return res.status(400).json({success:false, message:"account already exists"})
        
    const account = await prisma.account.create({
        data:{
            userId,
            accountType,
            balance,
            accountNumber,
        },
        select:{
            accountType:true,
            accountNumber:true,
            balance:true,
        }
        
    })
    res.status(201).json({success:true,message:"account successfully created",account:account})


   } catch (error) {
    res.status(500).json({success:false,message:"Something went wrong, try again after sometime "})
   }
})

accountRoutes.post("/account/set-default",authenticateToken,async(req,res)=>{
    const userId = req.userId
    console.log("userId from set-default:  --->", userId)
    const {accountNumber} = req.body;

    try {
        // unset previous default acount
        await prisma.account.updateMany({
            where:{
                userId,
                isDefault:true,
            },
            data:{
                isDefault:false,
            }
        })
        // set the new default account
      const defaultAccount =   await prisma.account.update({
            where:{
                userId,
                accountNumber,
            },
            data:{
                isDefault:true,
            },
            select:{
                accountNumber:true,
                isDefault:true
            }
        })
        res.status(200).json({success:true,message:"Default account updated successfully", defaultAccount})

    } catch (error) {
        res.status(500).json({success:false,message:"Something went wrong, try again after sometime"})
    }
})

accountRoutes.get("/account/defaultAccount", authenticateToken,async(req,res)=>{
    const userId = req.userId
    console.log("userId from :----->", userId)
    try {
        const defaultAccount = await prisma.account.findFirst({
            where:{
                userId,
                isDefault:true,
            },
            select:{
                accountNumber:true,
                isDefault:true
            }
        })

        if (!defaultAccount) return res.status(404).json({success:false, message:"No default account found"})
            
        res.status(200).json({success:true, message:"Default account found", defaultAccount})
    } catch (error) {
        return res.status(500).json({success:false, message:"Something went wrong", "error":error})
    }

})

accountRoutes.post("/account/balance",authenticateToken,async(req,res)=>{
  const {accountNumber} = req.body;
  try {
    const account = await prisma.account.findFirst({
        where:{
            accountNumber: accountNumber
        },
        select:{
            accountNumber:true,
            balance:true
        }
        
    })
    res.status(200).json({sucess:true,message:"Account balance fetched successfully",account})
  } catch (error) {
    res.status(500).json({sucess:false,message:" Unable to fetch Acount balance",account})
  }
})
accountRoutes.post("/getInfo", authenticateToken, async (req, res) => {
    const { accountNumber } = req.body;
    const userId = req.userId;
   
    try {
      const account = await prisma.account.findFirst({
        where: {
          accountNumber: accountNumber,
          userId : userId
        },
        select: {
          accountNumber: true,
          balance: true,
          senderTransactions: {
            select: {
              id: true,
              receiverAccountNumber: true,
              amount: true,
              status: true,
              description: true,
              createdAt: true,
            },
          },
          receiverTransactions: {
            select: {
              id: true,
              senderAccountNumber: true,
              amount: true,
              status: true,
              description: true,
              createdAt: true,
            },
          },
        },
      });
  
      if (!account) {
        return res
          .status(404)
          .json({ success: false, message: "Account not found" });
      }
  
      res.status(200).json({
        success: true,
        message: "Account details fetched successfully",
        account,
      });
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .json({
          success: false,
          message: "Unable to fetch account details",
          error: error.message,
        });
    }
  });
  
accountRoutes.get("/get/accounts",authenticateToken,async(req,res)=>{
    const userId = req.userId;
    try {
        const accounts = await prisma.account.findMany({
            where : {userId }
        })
         if (!accounts) return res.status(404).json({
            success:false, message : "No accounts found for the user" 
         })

         return res.status(200).json({
            success:true, message : "Successfully fetched Accounts", accounts 
         })

    } catch (error) {
        return res.status(500).json({
            success:false, message : "Unable to fetch Accounts", error : error 
         })
    }
})


export default accountRoutes