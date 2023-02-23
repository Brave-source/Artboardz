import { useEffect } from "react";
import ArtBoardzDetails from "@/components/ArtBoardz/ArtBoardzDetails";
import releaseImg from "@/assets/images/new_release.png";
import { useRouter } from 'next/router'
import SergeImage from "@/assets/images/SergeImage.png"

const DUMMY_DETAILS = {
  Art: "Origin",
  Artist: "SergeOne",
  image: releaseImg,
  location: { city: "Cape Town", country: "South Africa" },
  links: { instagram: "/", twitter: "/", discord: "/" },
  artDesc:
    "Origins pays homage to the genesis of graffiti art originating from the San Bushmen. The bushmen crushed up a red ochre mineral into fine powder. They would then put it in their mouth and spray it over their hands and onto the rock face which would create a hand print. This made them the original graffiti artists. ",

  patrons: {
    title: "Patrons",
    patron: [
      {
        image: "https://images.unsplash.com/photo-1554151228-14d9def656e4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=686&q=80",
        name: "The Art Guy",
        twitter: "twitter.com",
        country: "China",
        assets: 20
      },
      {
        image: "https://images.unsplash.com/photo-1554151228-14d9def656e4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=686&q=80",
        name: "Some Guy",
        twitter: "twitter.com",
        country: "USA",
        assets: 18
      },
      {
        image: "https://images.unsplash.com/photo-1554151228-14d9def656e4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=686&q=80",
        name: "The Random Guy",
        assets: 10
      },
      {
        image: "https://images.unsplash.com/photo-1554151228-14d9def656e4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=686&q=80",
        name: "Rodrigo Borgues",
        country: "Spain",
        assets: 6
      },
      {
        image: "https://images.unsplash.com/photo-1554151228-14d9def656e4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=686&q=80",
        name: "Fatima",
        twitter: "twitter.com",
        country: "Argentina",
        assets: 6
      },
      {
        image: "https://images.unsplash.com/photo-1554151228-14d9def656e4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=686&q=80",
        name: "Michael",
        twitter: "twitter.com",
        country: "Argentina",
        assets: 6
      },
      {
        image: "https://images.unsplash.com/photo-1554151228-14d9def656e4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=686&q=80",
        name: "David",
        twitter: "twitter.com",
        country: "Argentina",
        assets: 6
      },
      {
        image: "https://images.unsplash.com/photo-1554151228-14d9def656e4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=686&q=80",
        name: "Lucy",
        twitter: "twitter.com",
        country: "Argentina",
        assets: 6
      }
    ]

  },
  evolution: 
    
    {
      title: "Evolution",
      image: SergeImage,
      image2: releaseImg,
    },

  moreDetails: [
    
    {
      title: "Creator",
      image: SergeImage,
      desc: "Origins is the first in a collection centering on South African tribal groups, biodiversity, and upliftment. The collection, as well as the first piece, is called Origins.",
      desc2:"Origins pays homage to the genesis of graffiti art originating from the San Bushmen. The bushmen crushed up haematite or red ochre minerals into a fine powder they would put in their mouth and “spray” from their mouth over their hands onto the rock face creating the hand print—making them the original graffiti artists.  In the piece, you can see the bushman is in the middle of a vision as he’s painting, where old meets new from right to left.",
      desc3: "SergeOne is an award-winning Cape Town-based graffiti artist and illustrator. He started writing graffiti in 2008, focusing on letter forms and style writing.",
    },

   
    
    // {
    //   title: "Location",
    //   desc: "Battery Park Waterfront, Cape Town, South Africa Battery Park is located in the heart of Cape Town and connects the V&A Waterfront to the city through scenic pedestrian routes, canals, and recreational spots.The canal has a biodiverse ecosystem swarming with various fish species and several breeding pairs of Cape Clawless Otters. Access to the area is free and is buzzing with foot traffic from locals and international visitors.",
    // },
    // {
    //   title: "Origins Evolution",
    //   desc: "Digital",
    //   image: releaseImg,
    // },
    // {
    //   desc: "Location",
    //   image: releaseImg,
    // },
    // {
    //   desc: "Artboard",
    //   image: releaseImg,
    // },
  ],
};

const ArtBoardzDetailsPage = () => {
  const router = useRouter()
  const { id } = router.query
  useEffect(() => {
    document.querySelector("#main-layout").scrollTop = 0;
  }, []);

  return (
    <>
      {/* <h1 className="text-2xl md:text-4xl font-medium tracking-wide text-center my-4 text-white font-Montserrat">
        Artboardz {id}
      </h1> */}
      <ArtBoardzDetails
        image={DUMMY_DETAILS.image}
        art={DUMMY_DETAILS.Art}
        artist={DUMMY_DETAILS.Artist}
        location={DUMMY_DETAILS.location}
        links={DUMMY_DETAILS.links}
        artDesc={DUMMY_DETAILS.artDesc}
        patrons={DUMMY_DETAILS.patrons}
        moreInfo={DUMMY_DETAILS.moreDetails}
        evolution={DUMMY_DETAILS.evolution}
      />
    </>
  );
};

export default ArtBoardzDetailsPage;
