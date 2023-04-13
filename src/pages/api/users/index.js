import { Buffer } from "buffer";
import { COSESign1, COSEKey, BigNum, Label, Int } from "@emurgo/cardano-message-signing-nodejs";
import { Ed25519Signature, RewardAddress, PublicKey, Address } from "@emurgo/cardano-serialization-lib-nodejs";
import dbConnect from "../../../utils/mongo";
import User from "../../../models/User";
import Collection from "@/models/Collection";

export default async function handler (req, res) {
    const {method} = req;

    await dbConnect();

    if(method === "POST") {
      const sigData = req.body;
      const user = await User.find({stakeAddress: req.body.stakeAddress})
      try {
          if(user.length > 0) {
              res.status(200).json(user[0])
          } else {
              const savedUser = await User.create(sigData);
              res.status(200).json(savedUser[0])
          }
      }catch(err) {
          res.status(500).json(err)
      }
       
    }
    if (method === "PUT") {
        try {
          const user = await User.findByIdAndUpdate(req.body._id, req.body, {
            new: true,
          });
          res.status(200).json(user[0]);
        } catch (err) {
          res.status(500).json(err);
        }
      }
    
      if(method === "GET") {
        try {
          const result = await User.find();
          res.status(200).json(result);
        }catch(err){
          res.status(500).json(err);
        }
      }
}

