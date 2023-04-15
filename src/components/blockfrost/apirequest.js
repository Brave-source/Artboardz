// import { MongoClient} from "mongodb";
// import cron from "node-cron";
// import blockfrostApi from "blockfrost-api";

// const client = await MongoClient.connect(process.env.MONGODB_URL, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
// });
// const db = cleint.db();

// async function updateNFTs() {
//     const wallets = await db.connect('wallets').find().toArray();

//     for(const wallet of wallets) {
//         const blockfrost = new blockfrostApi(process.env.BLOCKFROST_API_KEY);
//         const nfts = await blockfrost.getAccountNFTs(wallet.address);

//         const storedNFTs = await db.collection('nfts').find({walletId: wallet._id}).toArray();
        
//         const newNFTs = nfts.filter((nft) => !storedNFTs.some((s) => s.token == nft.token));

//         for(const nft of newNFTs) {
//             await db.collection('nft').insertOne({ walletId: wallet._id, token: nft.token });
//         }
//     }
// }

// cron.schedule('0 0 * * *', () => {
//     updateNFTs();
// });

// export default function handler(req, res) {
//     updateNFTs();
//     res.status(200).send("NFTs updated");
// }