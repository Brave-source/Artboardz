import Link from "next/link";
import NewReleaseImage from "./NewReleaseImage";
import NewReleaseInfo from "./NewReleaseInfo";

const NewReleaseItem = ({ image, artist, id, city, country, instagram, discord, title, twitter, price }) => {
  return (
    <div className="mb-[16px] xl:mb-[0px] xl:w-full bg-primary-colorborder border border-light-purple  rounded-[10px] xl:rounded-[20px] overflow-hidden ">
      <div>
      <Link href={`/new-releases/${id}`}>
        <NewReleaseImage image={image} unoptimized={true} />
      </Link>
      </div>
      <div className="items-center xl:h-[12vh] xl:w-full">
        <NewReleaseInfo
          artist={artist}
          discord={discord}
          title={title}
          instagram={instagram}
          twitter={twitter}
          city={city}
          country={country}
          price={price}
        />
      </div>
    </div>
  );
};

export default NewReleaseItem;
 