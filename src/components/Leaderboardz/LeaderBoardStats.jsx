import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const LeaderBoardStats = () => {
  const [nfts, setNfts] = useState([])
  const [totalNfts, setTotalNfts] = useState([]);
  const collections = useSelector((collection) => collection.collection.collections.filter((item) => item.patronId.length > 0));
  const collectors = useSelector((collector) => collector.collector.collectors);
  const patrons = collectors?.filter((collector) => collector.policyIds.length > 0);
  // const nfts = collectors?.map((item) => {
  //   return item.units.length
  // });
  
  // const totalNfts = nfts?.reduce((accumulator, value) => {
  //   return accumulator + value;
  // });
  useEffect(() => {
    setNfts(collectors?.map((item) => {
      return item.units.length
    }))
  },[collectors])

  useEffect(() => {
    nfts.length > 0 && setTotalNfts(nfts?.reduce((accumulator, value) => {
      return accumulator + value;
    }))
  }, [nfts])

  return (
    <div className="text-white font-Montserrat tracking-wide">
      {/* <p className="text-xl text-center">Statistics</p> */}
      <div className="max-w-md mx-auto">
        <div className="grid grid-cols-3 gap-2 my-[8px] items-center justify-center text-base sm:text-xl">
          <div className="p-2 border rounded-lg border-light-purple text-center">
            <p>Collections</p>
            <p className="font-semibold">{collections.length}</p>
          </div>
          <div className="p-2 border rounded-lg border-light-purple text-center">
            <p>NFTs</p>
            <p className="font-semibold">{totalNfts}</p>
          </div>
          <div className="p-2  border rounded-lg border-light-purple text-center">
            <p>Owners</p>
            <p className="font-semibold">{patrons.length}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LeaderBoardStats;
