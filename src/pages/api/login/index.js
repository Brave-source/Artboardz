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
      try {
        const user = await User.findOne({
          email,
        });

        if (user) {
          const isPasswordCorrect = await bcrypt.compare(
            password,
            user.password
          );

          if (isPasswordCorrect) {
            res.status(200).json(user);
          } else {
            res.status(201).json("Wrong Credentials!")
          }
        } else {
          res.status(404).json("User not found")
        }
      } catch (err) {
        res.status(500).json("Something went wrong")
      }
       
    }
    
  }