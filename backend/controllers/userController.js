// import { PrismaClient } from "@prisma/client";
// const prisma = new PrismaClient();

// import jwt from "jsonwebtoken";
// import dotenv from "dotenv";
// const envFile = process.env.NODE_ENV === "production" ? ".env.production" : ".env.development";
// dotenv.config({ path: envFile });


// const userSignup = async(req,res)=>{
//   const { name, email, phoneNumber, password } = req.body;
//   console.log(" JWT_SECRERt:" ,process.env.JWT_SECRET)
//   try {
//     // Check if the user already exists in the database
//     const existingUser = await prisma.user.findFirst({
//       where: {
//         OR: [
//           { email: email },
//           { phoneNumber: phoneNumber },
//         ],
//       },
//     });
//     if (existingUser) return res.status(409).json({ success: false, message: "User already exists" });

//     // Create a new user
//     const user = await prisma.user.create({
//       data: {
//         name,
//         email,
//         phoneNumber,
//         password,
//       },
//       select: {
//         id: true, // Include the `id` for token generation
//         name: true,
//         email: true,
//       },
//     });

//     // Generate a JWT token
//     const token = jwt.sign(
//         { id: user.id, phoneNumber: user.phoneNumber }, // Payload
//         process.env.JWT_SECRET, // Secret key (should be stored in .env file)
//         { expiresIn: "1h" } // Token expiration
//       );
//     // Store token in cookies 
    
//     res.cookie("authToken",token,{
//         httpOnly: true,
//         expires: new Date(Date.now() + 60 * 60 * 1000), // 1 hour
//         secure: true, // Set to true if your site is served via HTTPS
//         sameSite: "strict", // "strict" or "lax",
//       });
   
  
//     // Return the response
//     res.status(200).json({ success: true, message: "User created successfully", user, token });
//   } catch (error) {
//     console.error("Error creating user:", error);
//     res.status(500).json({ error: "Failed to create user" });
//   }
// }


// export default userSignup