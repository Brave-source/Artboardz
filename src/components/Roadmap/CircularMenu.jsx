
import AddIcon from '@mui/icons-material/Add';
import React, { useState } from 'react';
import Image from 'next/image'
import Home from '../../assets/icons/radial-menu/home.svg'
import Route from '../../assets/icons/radial-menu/route.svg'
import Write from '../../assets/icons/radial-menu/write.svg'
import Shop from '../../assets/icons/radial-menu/shop.svg'
import Glasses from '../../assets/icons/radial-menu/glasses.svg'
import Walking from '../../assets/icons/radial-menu/walking.svg'
import Wall from '../../assets/icons/radial-menu/wall.svg'
import Faq from '../../assets/icons/radial-menu/faq.svg'
import { Icon, IconButton } from '@mui/material';


const CircularMenu = (props) => {
  const [menuActive, setMenuActive] = useState(true);
  const [activeLink, setActiveLink] = useState(0);

  const activateLink = (index) => {
    setActiveLink(index);
    props.setRoadmapInfo(index);
  };

  const icons = [
    Home,Route,Write,Shop,Glasses,Walking,Wall,Faq
  ]

  return (
    <div className="menu-container mx-auto">
      <ul className={`menu ${menuActive ? 'active' : ''}`}>
        <div className={`toggle ${menuActive ? 'active' : ''}`} >
          <AddIcon />
        </div>
        {[0, 1, 2, 3, 4, 5, 6, 7].map((index) => (
          <li
            key={index}
            style={{ '--i': index }}
            className={`${
              activeLink === index ? 'active' : ''
            }`}
            onClick={() => activateLink(index)}
          >
            <a href="#">
            <Icon sx={{ fontSize: '2.5rem' }} >
              <Image src={icons[index]} width={200} height={200} alt={'Shop'} />
            </Icon>
            </a>
          </li>
        ))}
        <div className="indicator"></div>
      </ul>
    </div>
  );
};

export default CircularMenu;