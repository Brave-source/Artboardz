import React from 'react'
import Image from 'next/image'
import roadmapCircle from  '@/assets/images/roadmapCircle.png'

const Roadmap = () => {
  return (
    <div>
      <Image src={roadmapCircle} width={'full'}></Image>
    </div>
  )
}

export default Roadmap
