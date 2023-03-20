import { useEffect } from "react";
import releaseImg from "@/assets/images/new_release.png";
import NewReleaseDetails from "@/components/New Release/NewReleaseDetails";
import { useRouter } from 'next/router'
import SergeImage from "@/assets/images/SergeImage.png"
import ArtBoardzDetails from "@/components/ArtBoardz/ArtBoardzDetails";
import { useSelector } from "react-redux";
import { Collection } from "mongoose";

const DUMMY_DETAILS = {
  Art: "Origins",
  Artist: "SergeOne",
  image: releaseImg,
  location: { city: "Cape Town", country: "South Africa" },
  links: { instagram: "/", twitter: "/", discord: "/" },
  mintDate: "Feb 22, 2023",
  price:"100",
  items:"40",
  royalty:"5%",
  artDesc:
    "Origins pays homage to the genesis of graffiti art originating from the San Bushmen. The bushmen crushed up a red ochre mineral into fine powder. They would then put it in their mouth and spray it over their hands and onto the rock face which would create a hand print. This made them the original graffiti artists. ",

  moreDetails: [
    {
      title: "Creator",
      image: SergeImage,
      desc: "Origins is the first in a collection centering on South African tribal groups, biodiversity, and upliftment. The collection, as well as the first piece, is called Origins.",
      desc2:"Origins pays homage to the genesis of graffiti art originating from the San Bushmen. The bushmen crushed up haematite or red ochre minerals into a fine powder they would put in their mouth and “spray” from their mouth over their hands onto the rock face creating the hand print—making them the original graffiti artists.  In the piece, you can see the bushman is in the middle of a vision as he’s painting, where old meets new from right to left.",
      desc3: "SergeOne is an award-winning Cape Town-based graffiti artist and illustrator. He started writing graffiti in 2008, focusing on letter forms and style writing.",
    },
  ],
};

const NewReleaseDetailsPage = () => {
  const router = useRouter()
  const { id } = router.query
  useEffect(() => {
    document.querySelector("#main-layout").scrollTop = 0;
  }, []);

  const collection = useSelector((state) => state.collection.collections.filter((item) => item._id == id))[0];

  return (
    <>
      <NewReleaseDetails
        image={collection?.bannerUrl}
        artist={collection?.name}
        country={collection?.country}
        city={collection?.city}
        instagram={collection?.instagram}
        twitter={collection?.twitter}
        discord={collection?.discord}
        artDesc={collection?.desc}
        mintDate={collection?.mintDate}
        price={collection?.price}
        items={collection?.supply}
        royalty={collection?.royalty}
        id={collection?._id}
        />
    </>
  );
};

export default NewReleaseDetailsPage;
