import dbConnect from "../../../utils/mongo";
import User from "../../../models/User";
import Collection from "@/models/Collection";
import bcrypt from "bcryptjs";

export default async function handler (req, res) {
    const {method} = req;

    await dbConnect();

    // setInterval(() => {
    //   updateNFTs();
    //   console.log("interval running")
    // }, 86400000)

    if(method === "POST") {
        let {email, password} = req.body;

        // Validation
        if (!email || !password) {
          res.status(400);
          throw new Error("Please fill in all the required fields.");
        }

        if (password.length < 6) {
          res.status(400);
          throw new Error("Password must be up to 6 characters.");
        }
        const userExists = await User.findOne({ email });

        if (userExists) {
          res.status(400);
          throw new Error("Email already in use.");
        }
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.password, salt);
        password = hashedPassword;
        try {
          const savedUser = await User.create({email, password});
          res.status(200).json(savedUser[0]) 
        }catch(err) {
          console.log(err)
            res.status(500).json(err)
        }
       
    }
    if (method === "PUT") {
        try {
          const user = await User.findOne({email: req.body.email});
          if(!user) return "User not found";
          if(user.password != req.body.password) return "Password mismatch";
          res.status(200).json(user[0]);
        } catch (err) {
          res.status(500).json(err);
        }
      }
    
    //   if(method === "GET") {
    //     try {
    //       const result = await User.find().sort({assets: -1});
    //       res.status(200).json(result);
    //     }catch(err){
    //       res.status(500).json(err);
    //     }
    //   }
}