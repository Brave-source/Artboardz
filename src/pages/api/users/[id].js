import dbConnect from "../../../utils/mongo";
import User from "../../../models/User";
import Collection from "@/models/Collection";
import { getNFTsByAsset } from "@/components/blockfrost/Blockfrost";


export default async function handler(req, res) {
  const {
    method,
    query: { id },
    cookies
  } = req;
  const token = cookies.token

  await dbConnect();

  if (method === "GET") {
    try {
      const user = await User.findById(id);
      res.status(200).json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  }

  if (method === "PUT") {
    try {
      const user = await User.findById(req.body.id);
      const collections = await Collection.find();
      const policy = collections.map((item) => item.policy);
      
     if(user && req.body.units !== undefined) {
        let ass = [];
        await Promise.all(
          req.body.units.map(async(item) => {
            try{
              const block = await getNFTsByAsset(item)

              return ass.push({
              image:`https://cloudflare-ipfs.com/ipfs/${block.onchain_metadata.image.split("/")[2]}`,
              name: block.onchain_metadata.name,
              policyId: block.policy_id,
              unit: block.asset,
              quantity: block.quantity
            });
            }catch(err) {
              res.status(500).json(err);
            }
          })
        );
        const filteredAss = ass.filter((item) => policy.includes(item.policyId));
        const filteredPolicy = [].concat(...new Set(filteredAss.map((item) => item.policyId)))

        const assetLength = filteredAss.length;
        const policyLength = filteredPolicy.length
        if(user.assets.length != assetLength || user.policyIds.length != policyLength) {
          const result = await User.findByIdAndUpdate(
            user._id,
            {
              $set: {
                assets: filteredAss,
                policyIds: filteredPolicy
              }
            },
            {new:true}
            )
          await Promise.all(
            filteredPolicy.map(async (policyId) => {
              return await Collection.findOneAndUpdate(
                { policy: policyId },
                {
                  $addToSet: { patronId: user._id}
                }
                );
            })
          );
          res.status(200).json("updated successfully");
        } else {
          res.status(200).json(user);
        }
     }else {
      res.status(500).json([])
     }

    }catch(err) {
      console.log(err);
    }
  }

  if (method === "DELETE") {
    try {
      await User.findByIdAndDelete(id);
      res.status(200).json("The collection has been deleted!");
    } catch (err) {
      res.status(500).json(err);
    }
  }

  if(method === "POST") {
  
    try {
      const result = await User.findByIdAndUpdate(id, 
        {
          $set: {
            name: req.body.name,
            image: req.body.image,
            nationality: req.body.nationality,
            twitter: req.body.twitter
          }
        }, {new: true});
      res.status(200).json(result);
    }catch(err) {
      res.status(500).json(err);
    }
  }
}
