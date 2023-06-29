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
        const user = await User.findById(req.user._id);

        if (!user) {
            res.status(404);
            throw new Error("User not found");
        }

        if (user.isVerified) {
            res.status(400);
            throw new Error("User already verified");
        }

        // Delete Token if it exists in DB
        let token = await Token.findOne({ userId: user._id });
        if (token) {
            await token.deleteOne();
        }

        //   Create Verification Token and Save
        const verificationToken = crypto.randomBytes(32).toString("hex") + user._id;
        console.log(verificationToken);

        // Hash token and save
        const hashedToken = hashToken(verificationToken);
        await new Token({
            userId: user._id,
            vToken: hashedToken,
            createdAt: Date.now(),
            expiresAt: Date.now() + 60 * (60 * 1000), // 60mins
        }).save();

        // Construct Verification URL
        const verificationUrl = `${process.env.FRONTEND_URL}/verify/${verificationToken}`;

        // Send Email
        const subject = "Verify Your Account - AUTH:Z";
        const send_to = user.email;
        const sent_from = process.env.EMAIL_USER;
        const reply_to = "noreply@zino.com";
        const template = "verifyEmail";
        const name = user.name;
        const link = verificationUrl;

        try {
            await sendEmail(
            subject,
            send_to,
            sent_from,
            reply_to,
            template,
            name,
            link
            );
            res.status(200).json({ message: "Verification Email Sent" });
        } catch (error) {
            res.status(500);
            throw new Error("Email not sent, please try again");
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