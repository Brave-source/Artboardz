import releaseImg from "@/assets/images/new_release.png";
import ArtBoardzItem from "./ArtBoardzItem";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const DUMMY_ARTS = [
  {
    id: "R1",
    image: releaseImg,
    source: "Origins",
    location: { city: "Cape Town", country: "South Africa" },
    author: "SergeOne",
  },
  {
    id: "R2",
    image: releaseImg,
    source: "Origins",
    location: { city: "Cape Town", country: "South Africa" },
    author: "SergeOne",
  },
  {
    id: "R3",
    image: releaseImg,
    source: "Origins",
    location: { city: "Cape Town", country: "South Africa" },
    author: "SergeOne",
  },
  {
    id: "R4",
    image: releaseImg,
    source: "Origins",
    location: { city: "Cape Town", country: "South Africa" },
    author: "SergeOne",
  },
];

const ArtBoardzList = () => {
  const [collections, setCollections] = useState([])
  const store = useSelector(state => state);

  useEffect(() => {
    if (store) {
      setCollections(store.collection.collections);
    }
  }, [store]);

  return (
    <ul className="grid sm:grid-cols-2 lg:grid-cols-3 gap-y-4 gap-x-[20px]  ">
      {collections.map((release) => {
        return (
          <ArtBoardzItem
            key={release?._id}
            id={release?._id}
            image={release?.bannerUrl}
            art={release?.source}
            artist={release?.name}
            city={release?.city}
            country={release?.country}
            title={release?.title}
            items={release?.supply}
          />
        );
      })}
    </ul>
  );
};

export default ArtBoardzList;
