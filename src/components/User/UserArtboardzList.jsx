import UserArtBoardItem from "./UserArtBoardItem";

const UserArtboardzList = ({ assets }) => {
  return (
    <div className="m:w-[920px] md:[920px] xl:w-[1290px]">
    <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-y-6 gap-x-1 ">
      {assets?.map((asset, id) => {
        return (
          <UserArtBoardItem
            key={asset?.id}
            image={asset?.image}
            name={asset?.name}
          />
        );
      })}
    </ul>
    </div>
  );
};

export default UserArtboardzList;
