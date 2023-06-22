import dbConnect from "../../../utils/mongo";
import User from "../../../models/User";
import Collection from "@/models/Collection";

export default async function handler (req, res) {
    const {method} = req;

    await dbConnect();

    // setInterval(() => {
    //   updateNFTs();
    //   console.log("interval running")
    // }, 86400000)

    if(method === "POST") {
        console.log('post method')
        const {email, password} = req.body;
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
          const user = await User.find({email: req.body.email});
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

