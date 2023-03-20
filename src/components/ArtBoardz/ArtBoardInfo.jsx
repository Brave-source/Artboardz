const ArtBoardzInfo = ({ artist, city, country, title }) => {
  return (
    <div className=" grid grid-cols-1 space-y-3 tracking-wide text-white font-Montserrat content-evenly">
      <div className="flex gap-1 items-center justify-between">
        <p className="text-lg font-semibold ">{title}</p>
        <p className="text-sm">Listings: 3/30</p>
      </div>

      <div className="flex gap-1 items-center justify-between">
        <p className="text-sm"> by {artist}</p>
        <p className="text-sm text-right">{city}, {country}</p>
      </div>
    </div>
  );
};

export default ArtBoardzInfo;
