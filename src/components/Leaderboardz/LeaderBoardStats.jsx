import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const LeaderBoardStats = () => {
  // const [totalNfts, setTotalNfts] = useState([]);
  const collections = useSelector((collection) => collection.collection.collections.filter((item) => item.patronId.length > 0));
  const collectors = useSelector((collector) => collector.collector.collectors);
  const patrons = collectors?.filter((collector) => collector.policyIds.length > 0);

  // Calculating the number of supply
  const supply = collections.map((item) => { return item.supply});
  const totalSupply = supply.reduce((output, cal) => {
    return Number(output) + Number(cal);
  });
 

  const doublePolicyIds = patrons.map((item) => {
    return item.policyIds
  })

  const singlePolicyIds = []?.concat(...doublePolicyIds);
//  console.log(singlePolicyIds)
  // useEffect(() => {
  //   setNfts(patrons[0].assets?.map((item) => {
  //     return singlePolicyIds.includes(item.policyId)
  //   }))
  // },[collectors])
  // const nfts = patrons[0]?.assets?.filter((item) => singlePolicyIds?.includes(item.policyId))
  const testNfts =patrons.map((item) => { 
    return item.assets.filter((ass) => singlePolicyIds.includes(ass.policyId))
  })
  const nfts = [].concat(...testNfts);


  // useEffect(() => {
  //   nfts.length > 0 && setTotalNfts(nfts?.reduce((accumulator, value) => {
  //     return accumulator + value;
  //   }))
  // }, [nfts])
  // console.log(patrons[0].assets)

  return (
    <div className="text-white font-Montserrat tracking-wide">
      {/* <p className="text-xl text-center">Statistics</p> */}
      <div className="max-w-md mx-auto">
        <div className="grid grid-cols-3 gap-2 my-[8px] items-center justify-center text-base sm:text-xl">
          <div className="p-2 border rounded-lg border-light-purple text-center">
            <p>Collections</p>
            <p className="font-semibold">{collections?.length}</p>
          </div>
          <div className="p-2 border rounded-lg border-light-purple text-center">
            <p>NFTs</p>
            <p className="font-semibold">{totalSupply}</p>
          </div>
          <div className="p-2  border rounded-lg border-light-purple text-center">
            <p>Owners</p>
            <p className="font-semibold">{patrons?.length}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LeaderBoardStats;
