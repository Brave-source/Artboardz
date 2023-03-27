import { useEffect } from "react";
import ArtBoardzDetails from "@/components/ArtBoardz/ArtBoardzDetails";
import releaseImg from "@/assets/images/new_release.png";
import { useRouter } from 'next/router'
import SergeImage from "@/assets/images/SergeImage.png"
import { useSelector } from "react-redux";

  // const DUMMY_DETAILS = {
  //   Art: "Origins",
  //   Artist: "SergeOne", 
  //   image: releaseImg,
  //   location: { city: "Cape Town", country: "South Africa" },
  //   links: { instagram: "/", twitter: "/", discord: "/" },
  //   mintDate: "Feb 22, 2023",
  //   price:"100",
  //   items:"40",
  //   royalty:"5%",
  //   artDesc:
  //     "Origins pays homage to the genesis of graffiti art originating from the San Bushmen. The bushmen crushed up a red ochre mineral into fine powder. They would then put it in their mouth and spray it over their hands and onto the rock face which would create a hand print. This made them the original graffiti artists. ",
  //   patrons: {
  //     title: "Patrons",
  //     patron: [
  //       {
  //         image: "https://images.unsplash.com/photo-1554151228-14d9def656e4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=686&q=80",
  //         name: "The Art Guy",
  //         twitter: "twitter.com",
  //         country: "China",
  //         assets: 20
  //       },
  //       {
  //         image: "https://images.unsplash.com/photo-1554151228-14d9def656e4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=686&q=80",
  //         name: "Some Guy",
  //         twitter: "twitter.com",
  //         country: "USA",
  //         assets: 18
  //       },
  //       {
  //         image: "https://images.unsplash.com/photo-1554151228-14d9def656e4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=686&q=80",
  //         name: "The Random Guy",
  //         twitter: "",
  //         country: "Spain",
  //         assets: 10
  //       },
  //       {
  //         image: "https://images.unsplash.com/photo-1554151228-14d9def656e4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=686&q=80",
  //         name: "Rodrigo Borgues",
  //         twitter: "",
  //         country: "Spain",
  //         assets: 6
  //       },
  //       {
  //         image: "https://images.unsplash.com/photo-1554151228-14d9def656e4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=686&q=80",
  //         name: "Fatima",
  //         twitter: "twitter.com",
  //         country: "Argentina",
  //         assets: 6
  //       },
  //       {
  //         image: "https://images.unsplash.com/photo-1554151228-14d9def656e4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=686&q=80",
  //         name: "Michael",
  //         twitter: "twitter.com",
  //         country: "Argentina",
  //         assets: 6
  //       },
  //       {
  //         image: "https://images.unsplash.com/photo-1554151228-14d9def656e4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=686&q=80",
  //         name: "David",
  //         twitter: "twitter.com",
  //         country: "Argentina",
  //         assets: 6
  //       },
  //       {
  //         image: "https://images.unsplash.com/photo-1554151228-14d9def656e4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=686&q=80",
  //         name: "Lucy",
  //         twitter: "twitter.com",
  //         country: "Argentina",
  //         assets: 6
  //       }
  //     ]

  //   },
  //   evolution: 
      
  //     {
  //       title: "Evolution",
  //       image: hero0Image,
  //       image2: hero1Image,
  //     },

  //   moreDetails: [
      
  //     {
  //       title: "Creator",
  //       image: SergeImage,
  //       desc: "Origins is the first in a collection centering on South African tribal groups, biodiversity, and upliftment. The collection, as well as the first piece, is called Origins.",
  //       desc2:"Origins pays homage to the genesis of graffiti art originating from the San Bushmen. The bushmen crushed up haematite or red ochre minerals into a fine powder they would put in their mouth and “spray” from their mouth over their hands onto the rock face creating the hand print—making them the original graffiti artists.  In the piece, you can see the bushman is in the middle of a vision as he’s painting, where old meets new from right to left.",
  //       desc3: "SergeOne is an award-winning Cape Town-based graffiti artist and illustrator. He started writing graffiti in 2008, focusing on letter forms and style writing.",
  //     },
  //   ],
  // };

const ArtBoardzDetailsPage = () => {
  const router = useRouter()
  const { id } = router.query
  const collectors = useSelector((item) => item.collector.collectors);
  const collection = useSelector((state) => state.collection.collections.filter((item) => item._id === id))[0];
  useEffect(() => { 
    document.querySelector("#main-layout").scrollTop = 0;
  }, []);

  const policyIdList = collection?.patronId.map((item) => {
    return item
  })

  const patrons = collectors.filter((item) => policyIdList?.includes(item._id))

  return (
    <>
      {/* <h1 className="text-2xl md:text-4xl font-medium tracking-wide text-center my-4 text-white font-Montserrat">
        Artboardz {id}
      </h1> */}
      <ArtBoardzDetails
        image={collection?.bannerUrl}
        artist={collection?.name}
        artDesc={collection?.desc}
        patrons={patrons}
        physicalUrl={collection?.physicalArtUrl}
        digitalUrl={collection?.digitalArtUrl}
        mintDate={collection?.mintDate}
        price={collection?.price}
        items={collection?.supply}
        royalty={collection?.royalty}
        id={collection?._id}
        discord={collection?.discord}
        twitter={collection?.twitter}
        policyId={collection?.policy}
      />
    </>
  );
};

export default ArtBoardzDetailsPage;
