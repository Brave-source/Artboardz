import LeaderboardItem from "./LeaderBoardItem";
import photo from "@/assets/images/ProfilePhoto.png";
import { useSelector } from "react-redux";

const DUMMY_LEADERS = [
  {
    image: photo,
    name: "The Art Bank ",
    amount: 20,
  },
  {
    image: photo,
    name: "Edmund Moses",
    amount: 20,
  },
  {
    image: photo,
    name: "Edmund",
    amount: 20,
  },
  {
    image: photo,
    name: "Edmund",
    amount: 20,
  },
  {
    image: photo,
    name: "Edmund",
    amount: 20,
  },
  {
    image: photo,
    name: "Edmund",
    amount: 20,
  },
];

const LeaderBoardList = () => {
  const collectors = useSelector((collector) => collector.collector.collectors);
  const patrons = collectors.filter((collector) => collector.policyIds.length > 0);

  return (
    <ul className="bg-primary-color p-4 grid gap-3 rounded-lg sm:max-w-[60vw] m-auto">
      {patrons.map((leader, index) => {
        return (
          <div
            key={index}
            className="border-b border-white last-of-type:border-none"
          >
            <LeaderboardItem
              position={index + 1}
              image={leader.image}
              name={leader.name}
              assets={leader.assets}
              policyId ={leader.policyIds}
            />
          </div>
        );
      })}
    </ul>
  );
};

export default LeaderBoardList;
