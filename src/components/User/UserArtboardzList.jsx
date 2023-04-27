import UserArtBoardItem from "./UserArtBoardItem";

const UserArtboardzList = ({ assets }) => {
  return (
    <div className="w-[302px] sm:w-[612px] md:w-[630px] lg:w-[1000px] xl:w-[1290px] m-auto">
    <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-y-6 gap-x-1 ">
      {assets?.map((asset, id) => {
        return (
          <UserArtBoardItem
            key={asset?.id}
            image={asset?.image}
            name={asset?.name}
            policyId={asset.policyId}
          />
        );
      })}
    </ul>
    </div>
  );
};

export default UserArtboardzList;
