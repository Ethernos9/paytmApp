import { Router } from "express";

import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
import bcrypt from "bcryptjs"

import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { authenticateToken } from "./middleware.js";
const envFile = process.env.NODE_ENV === "production" ? ".env.production" : ".env.development";
dotenv.config({ path: envFile });

const userRoutes = Router();

userRoutes.post('/user/signup',async(req,res)=>{

  const { name, email, phoneNumber, password } = req.body;
  console.log(" JWT_SECRERt:" ,process.env.JWT_SECRET)
  try {
    // Check if the user already exists in the database
    const existingUser = await prisma.user.findFirst({
      where: {
        OR: [
          { email: email },
          { phoneNumber: phoneNumber },
        ],
      },
    });
    if (existingUser) return res.status(409).json({ success: false, message: "User already exists" });

 
   const salt = await bcrypt.genSalt(10); // Generate a salt
   const hashedPassword = await bcrypt.hash(password, salt); 
   
   
    // Create a new user

    const user = await prisma.user.create({
      data: {
        name,
        email,
        phoneNumber,
       password : hashedPassword,
      },
      select: {
        id: true, // Include the `id` for token generation
        name: true,
        email: true,
      },
    });

    // Generate a JWT token
    const token = jwt.sign(
        { id: user.id, phoneNumber: user.phoneNumber }, // Payload
        process.env.JWT_SECRET, // Secret key (should be stored in .env file)
        { expiresIn: "1h" } // Token expiration
      );

    // Store token in cookies 
    
    res
    .cookie("authToken", token, {
      httpOnly: true,
      expires: new Date(Date.now() + 60 * 60 * 1000), // 1 hour
      secure: process.env.NODE_ENV === "production", // Secure only in production
      sameSite: "strict",
    })
    .status(201)
    .json({ success: true, message: "User created successfully", user });
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).json({ error: "Failed to create user" });
  }
}
);


userRoutes.post("/user/login", async (req, res) => {
    const { email, phoneNumber, password } = req.body;
  
    try {
      // Find the user by email or phoneNumber
      const user = await prisma.user.findFirst({
        where: {
          OR: [
            { email: email },
            { phoneNumber: phoneNumber },
          ],
        },
      });
  
      if (!user) {
        return res.status(404).json({ success: false, message: "User not found" });
      }
  
      // Verify the hashed password

      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        return res.status(401).json({ success: false, message: "Invalid credentials" });
      }
  
      // Generate a JWT token
      const token = jwt.sign(
        { id: user.id, phoneNumber: user.phoneNumber }, // Payload
        process.env.JWT_SECRET, // Secret key
        { expiresIn: "1h" } // Token expiration
      );
  
      // Set the cookie and return the response
      res
        .cookie("authToken", token, {
          httpOnly: true,
          expires: new Date(Date.now() + 60 * 60 * 1000), // 1 hour
          secure: process.env.NODE_ENV === "production", // Secure only in production
          sameSite: "strict",
        })
        .status(200)
        .json({
          success: true,
          message: "User logged in successfully",
          user: { id: user.id, name: user.name, email: user.email },
        });
    } catch (error) {
      console.error("Error logging in user:", error);
      res.status(500).json({ error: "Failed to login user" });
    }
  });
  
userRoutes.post("/user/logout", (req, res) => {
    try {
      // Clear the authToken cookie
      res
        .clearCookie("authToken", {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production", // Match the cookie settings in the login route
          sameSite: "strict",
        })
        .status(200)
        .json({
          success: true,
          message: "User logged out successfully",
        });
    } catch (error) {
      console.error("Error logging out user:", error);
      res.status(500).json({ success: false, message: "Failed to logout user" });
    }
  });


userRoutes.get("/get/user",authenticateToken, async(req,res)=>{
  const id = req.userId;
  console.log("userId from get/user:  --->", id)
try {
  const user = await prisma.user.findUnique({
    where: { id: id},
    select: {
      id: true,
      name: true,
      email: true,
      phoneNumber:true
    },
  })
  if (!user) return res.status(404).json({ success: false, message: "User not found" });
  return res.status(200).json({sucess:true, message :"user found", user})
} catch (error) {
  return res.status(500).json({ success: false, message: "Something went wrong" });
}
})
  

export default userRoutes;




