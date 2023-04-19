import { useRouter } from 'next/router';
import React from "react";
import Image from 'next/image';
import CardanoIcon from "@/assets/images/icons8-cardano-50.png"


const UserArtboardzInfo = ({ name, jpgLink }) => {
    const router = useRouter();
  return (
    <div className="w grid grid-cols-1 space-y-1 tracking-wide text-white font-Montserrat content-evenly">
      <div className="flex flex-row gap-1 items-center justify-between">
        <p className="text-sm font-semibold ">{name?.slice(0,20)}</p>
        {/* <div className='flex flex-row gap-x-2'>
        <Image src={CardanoIcon} height={20} unoptimized={true}></Image>
        </div> */}
        
        {/* <p className="text-sm">Listings: 3/30</p> */}
      </div>
      <div className="flex gap-1 items-center justify-between">
        <a href={jpgLink} target="_blank" rel="noreferrer">
         <button className={ "mt-[5px] bg-active-link rounded-xl font-semibold w-full h-[30px]  px-2 mx-auto block tracking-wide text-base"}>
            Trade
          </button>
        </a>
      </div>
    </div>
  )
}

export default UserArtboardzInfo
