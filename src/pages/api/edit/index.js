import dbConnect from "../../../utils/mongo";
import User from "../../../models/User";

export default async function handler (req, res) {
    const {method} = req;

    await dbConnect();

    if(method === "POST") {
      try {
          const savedUser = await User.updateOne({stakeAddress: req.body.stakeAddress}, req.body, {new : true});
          res.status(200).json(savedUser[0])
      }catch(err) {
          res.status(500).json(err);
      }
    }
    if (method === "PUT") {
       
      }
    
      if(method === "GET") {
        
      }
}

