import dbConnect from "../../../utils/mongo";
import User from "../../../models/User";
import Asset from "../../../models/Asset";
import Collection from "@/models/Collection";


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
     if(user) {
      // console.log("pass user test")
      const policyId = req.body.policyIds;
      // const asset = await Asset.find({userId: user._id})
      // console.log(asset)
      // if(asset.length > 0) {
      //   console.log(asset[0].units)
        // console.log(asset.policyIds.length)
        // console.log(req.body.units.length)
        // console.log(req.body.policyIds.length);
        const unitLength = req.body.units.length;
        const policyLength = req.body.policyIds.length
        if(user.units.length != unitLength || user.policyIds.length != policyLength) {
          const result = await User.findByIdAndUpdate(
            user._id, 
            {
              $set: {
                units: req.body.units,
                policyIds: req.body.policyIds
              }
            }, 
            {new:true}
            )
          await Promise.all(
            policyId.map(async (policyId) => {
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
      // }else {
      //   console.log("Add new assets")
      //   const newAsset = {userId: user._id, units: req.body.units, policyIds:req.body.policyIds}
      //   await Asset.create(newAsset)
      //   await Promise.all(
      //     policyId.map(async (policyId) => {
      //       return await Collection.findOneAndUpdate(
      //         { policy: policyId },
      //         {
      //           $addToSet: { patronId: user._id}
      //         }
      //         );
      //     })
      //   );
      //   res.status(200).json("successfully created");
      // }
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
