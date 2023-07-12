import dbConnect from "../../../utils/mongo";
import User from "../../../models/User";
import Collection from "@/models/Collection";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";

export default async function handler (req, res) {
    const {method} = req;

    await dbConnect();

    if(method === "POST") {
        let {email, password} = req.body;
        // Validation
        if (!email || !password) {
          res.status(400);
          throw new Error("Please fill in all the required fields.");
        }

        // if (password.length < 6) {
        //   res.status(400);
        //   throw new Error("Password must be up to 6 characters.");
        // }
        const userExists = await User.findOne({ email });

        if (userExists) {
          res.status(400);
          throw new Error("Email already in use.");
        }
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        password = hashedPassword;
        
        try {
          const savedUser = await User.create({email, password});
          res.status(200).json(savedUser[0]) 
        }catch(err) {
            return new NextResponse(err.message, { status : 500})
        }
       
    }
    
}