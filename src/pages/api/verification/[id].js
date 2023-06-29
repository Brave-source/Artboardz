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
    
  }

  if (method === "PUT") {
   
  }

  if (method === "DELETE") {
   
  }

  if(method === "POST") {
    const { verificationToken } = req.params;

  const hashedToken = hashToken(verificationToken);

  const userToken = await Token.findOne({
    vToken: hashedToken,
    expiresAt: { $gt: Date.now() },
  });

  if (!userToken) {
    res.status(404);
    throw new Error("Invalid or Expired Token");
  }

  // Find User
  const user = await User.findOne({ _id: userToken.userId });

  if (user.isVerified) {
    res.status(400);
    throw new Error("User is already verified");
  }

  // Now verify user
  user.isVerified = true;
  await user.save();

  res.status(200).json({ message: "Account Verification Successful" });
   
  }
}
