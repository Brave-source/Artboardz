import dbConnect from "@/utils/mongo";
import User from "@/models/User";
import { getNFTByAddress, getNFTsForAddress } from "@/components/blockfrost/Blockfrost";
import Collection from "@/models/Collection";

const updateNFTs = async() => {

    await dbConnect();
    const users = await User.find();
    
    for(let user of users) {
        const storeAssets = user.assets.map((asset) => { return asset.unit});
        const storedPolicyIds = user.policyIds;

        let res = await getNFTByAddress(user.stakeAddress);
        const assets = res.amount.map((asset) => asset.unit);
        const filteredAssets = assets.filter((asset) => asset !== "lovelace");
        
        let policyIds = [];
        let units = [];

        await Promise.all(
            filteredAssets.map(async(item) => {
                const block = await getNFTsForAddress(item);
                return policyIds.push(block.policy_id), units.push(block.asset)
            })
        )
       const newPolicyIds = [].concat(...new Set(policyIds));
       const newUnits = [].concat(...new Set(units));
       const filteredUnits = storeAssets.filter((item) => !newUnits.includes(item));
       
       const filteredPolicyIds = storedPolicyIds.filter((item) => !newPolicyIds.includes(item));
       await Promise.all(
        filteredPolicyIds.map(async(policy_id) => {
            await User.findByIdAndUpdate(user._id, {
                $pull : {
                    policyIds: policy_id
                }
            });
            await Collection.findOneAndUpdate(
                {policy: policy_id},
                {
                    $pull : { patronId: user._id } 
                }
                )
        })
       )
      await Promise.all(
        filteredUnits.map(async(unit) => {
            await User.findByIdAndUpdate(user._id, {
                $pull: {
                    assets: {
                        unit: unit
                    }
                }
            })
        })
      )
    }
}

export default updateNFTs;