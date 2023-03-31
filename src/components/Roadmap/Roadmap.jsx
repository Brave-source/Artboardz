import React, { useState, useEffect } from 'react'


import { Icon, IconButton } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import CircularMenu from './CircularMenu'

const roadmapData = [
  {
    title: 'MAPZ',
    info: 'Explore Artboardz locations and collection info, vote on cities you’d like to see Artboardz in and have a visual display of all Artboardz NFTs you own around the world.'
  },
  {
    title: 'MAPZ',
    info: 'Explore Artboardz locations and collection info, vote on cities you’d like to see Artboardz in and have a visual display of all Artboardz NFTs you own around the world.'
  },
  {
    title: 'HODLER REWARDZ',
    info: 'Get monthly token rewardz for being an Artboardz NFT hodler, enjoy whitelist access to future drops and discounts on creator merch.'
  },
  {
    title: 'MARKETPLACE',
    info: 'Buy and sell Artboardz NFTs, trade to complete your collection of Artboardz and support Cardano creators.'
  },
  {
    title: 'AUGMENTED REALITY',
    info: 'Visit Artboardz locations and use your smartphone to animate physical artworks that add another dimension to your viewing experience.'
  },
  {
    title: 'WALKING TOURZ',
    info: 'Explore new cities through a walking street art tour and enjoy discounts at local vendors for owning Artboardz NFTs.'
  },
  {
    title: 'KING SPRAY',
    info: 'Advanced digital spray painting VR software helping train creators to create digital versions of their artwork to recreate in the real world.'
  },
  {
    title: 'LEADERBOARDZ',
    info: 'Become a part of the Artboardz community, make your way up the Leaderboardz and rank as the top collector for promoting Cardano art in the real world.'
  }
]

const Roadmap = () => {

  const [roadmapInfo, setRoadmapInfo] = useState(0)



  return (
    // <div className='bg-[#011335]'>
    <section className="tracking-wide mb-8 text-white  mx-auto w-[95%] max-w-[1192px] lg:w-full  font-Montserrat font-medium space-y-6  sm:p-4  text-center">
    
    <h1 className="text-[20px] sm:text-[40px] p-4">Our Roadmap</h1>
    <div className='grid grid-cols-1 lg:grid-cols-2 mb-8'>
        <CircularMenu setRoadmapInfo={setRoadmapInfo}/>
  
        <div className='px-4'>
          <h1 className='text-4xl lg:text-6xl font-bold text-[#939393] mb-2'>{roadmapData[roadmapInfo].title}</h1>
          <p className='text-xl font-bold text-[#FEFEFE]'>{roadmapData[roadmapInfo].info}</p>
      </div>
    </div>
    </section>
    
    
  );
}

export default Roadmap
