import dbConnect from "../../../utils/mongo";
import User from "../../../models/User";

export default async function handler (req, res) {
    const {method} = req;

    await dbConnect();

    if(method === "POST") {
      
      if(req.body.stakeAddress.slice(0,9) == "addr_test") {
        res.status(500).json("Please connect mainnet wallet");
      }

      try {
          const savedUser = await User.findOneAndUpdate(req.body.stakeAddress, req.body, {new : true});
          res.status(200).json(savedUser[0])
      }catch(err) {
          res.status(500).json(err);
          console.log(err)
      }
    }
    if (method === "PUT") {
       
      }
    
      if(method === "GET") {
        
      }
}

