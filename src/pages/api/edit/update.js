import dbConnect from "@/utils/mongo";
import User from "@/models/User";
import { getNFTByAddress, getNFTsByAsset } from "@/components/blockfrost/Blockfrost";
import Collection from "@/models/Collection";

const updateNFTs = async() => {

    await dbConnect();
    const users = await User.find();
    
    for(let user of users) {
        const storeAssets = user?.assets?.map((asset) => { return asset.unit});
        const storedPolicyIds = user.policyIds;
        try{
            let res = await getNFTByAddress(user.stakeAddress);
            if(res.amount.length > 0) {
                const assets = res?.amount?.map((asset) => asset?.unit);
                const filteredAssets = assets?.filter((asset) => asset !== "lovelace");
                
                let policyIds = [];
                let units = [];
                
                await Promise.all(
                    filteredAssets.map(async(item) => {
                   try{
                       const block = await getNFTsByAsset(item);
                    return policyIds?.push(block.policy_id), units?.push(block.asset)
                   }catch(err) {
                    console.log(err)
                   }
                })
            )
        const newPolicyIds = [].concat(...new Set(policyIds));
        const newUnits = [].concat(...new Set(units));
        const filteredUnits = storeAssets?.filter((item) => !newUnits?.includes(item));
        
        const filteredPolicyIds = storedPolicyIds?.filter((item) => !newPolicyIds.includes(item));
        await Promise.all(
            filteredPolicyIds.map(async(policy_id) => {
                try {
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
                }catch(err) {
                    console.log(err);
                }
            })
            )
            await Promise.all(
                filteredUnits.map(async(unit) => {
                    try {
                        await User.findByIdAndUpdate(user._id, {
                            $pull: {
                                assets: {
                                    unit: unit
                                }
                            }
                        })
                }catch(err) {
                    console.log(err);
                }
            })
            )
        }
        }catch(err) {
            console.log(err)
        }
        
    }
}

export default updateNFTs;