import React from 'react'
import { Box } from '@mui/system';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { styled } from '@mui/material/styles';
import Link from 'next/link';



const CollectorQuestions = () => {

  const [expanded, setExpanded] = React.useState(false);
  const [expanded2, setExpanded2] = React.useState(false);
  const [expanded3, setExpanded3] = React.useState(false);
  const [expanded4, setExpanded4] = React.useState(false);
  const [expanded5, setExpanded5] = React.useState(false);
  const [expanded6, setExpanded6] = React.useState(false);
  const [expanded7, setExpanded7] = React.useState(false);
  const handleExpandClick = () => {
  setExpanded(!expanded);
};

const handleExpandClick2 = () => {
  setExpanded2(!expanded2);
};
const handleExpandClick3 = () => {
  setExpanded3(!expanded3);
};
const handleExpandClick4 = () => {
  setExpanded4(!expanded4);
};
const handleExpandClick5 = () => {
  setExpanded5(!expanded5);
};
const handleExpandClick6 = () => {
  setExpanded6(!expanded6);
};
const handleExpandClick7 = () => {
  setExpanded7(!expanded7);
};

  const ExpandMore = styled((props) => {
    const { expand, ...other } = props;
    return <IconButton {...other} />;
  })(({ theme, expand }) => ({
    // transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
    // marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  }));
  
  const CollectorsData = [
  
    {
   
  title: "What is Artboardz?",
  description: "Artboardz supports the creation of Cardano NFTs in the real world. It is an art initiative that is incubated by The Art Bank Group. Learn more ",
  ref: "q1",
  handleClick: handleExpandClick,
  expanded: expanded,
  href:"/about",
  link:"here"
  },
  {
    title: "What is the Artboardz mint price?",
    description: "The mint price for each Artboardz collection varies depending on a number of factors including who the artist is, their location, the size of the collection and others.",
    ref: "q2",
    handleClick: handleExpandClick2,
    expanded: expanded2,
    href:"",
    link:"",
  },
  
  {
    title: "What wallets are compatible with Artboardz platform?",
  description: "Artboardz NFTs are sold on the Cardano blockchain. All of the following wallets are supported including: Nami, Eternl & Gero wallets",
  ref: "q3",
  handleClick: handleExpandClick3,
  expanded: expanded3,
  href:"",
  link:"",
  },
  {
    title: "How can I buy Artboardz NFTs?",
    description: "Visit the New Releases tab for more information on mint dates to mint new Artboardz collections. For secondary market sales, visit the Artboardz tab to Purchase NFTs on JPG Store.",
    ref: "q4",
    handleClick: handleExpandClick4,
    expanded: expanded4,


    href:"",
    link:"",
  },
  {
    title: "How do the Leaderboardz work?",
    description: "Collectors that help to support Artboardz mints will be rewarded with a digital tag on the Leaderboardz tab as well as the opportunity of getting their tag on the physical mural if certain conditions are met. Collect NFTs from Artboardz mints to make your way up the Leaderboardz and support the creation of Cardano NFTs in the real world.",
    ref: "q5",
    handleClick: handleExpandClick5,
    expanded: expanded5,


    href:"",
    link:"",
  },
  {
  title: "How can I contact Artboardz if I run into any issues?",
  description: "Check out our Discord channel over at The Art Bank and submit any query there.",
  ref: "q6",
  handleClick: handleExpandClick6,
  expanded: expanded6,

  href:"",
  link:"",
  }
  ,
  {
    title: "What is policy on sharing personal information?",
    description: "Profile information is used expressly to display Leaderboardz rankings and is not shared with any third-party. [insert disclaimer]",
    ref: "q7",
    handleClick: handleExpandClick7,
    expanded: expanded7,


    href:"",
    link:"",
  }
  
  
  ];
  const displayQuestions = CollectorsData.map((question, index) => {
    return (
      
        
        <Box key={index} onClick={question.handleClick} sx={{ width:{xl: '1242px',lg: '950px', md: '850px', sm:'590px',xs:'320px'}, height:'full', display: 'flex',
        flexDirection: 'row', justifyContent:'center'}}>
      <Card sx={{ border:1, borderColor:"#6E028F" , background:question.expanded ? 'rgba(255,255,255,.08)' : 'transparent',  boxShadow: 0, marginY:'10px',}}>
      <ExpandMore
        expand={question.expanded}
        onClick={question.handleClick}
        aria-expanded={question.expanded}
        aria-label="show more"
      >
         
          
    <CardContent sx={{ width:{xl: '1192px', lg: '900px', md: '800px',sm:'540px', xs:'270px'}, display: 'flex',
        flexDirection: 'row', justifyContent:'space-between'}}>
    <p className="text-base text-white font-semibold md:text-xl text-md text-left">{question.title}</p>
      
    </CardContent>

    <CardActions disableSpacing    sx={{m:'auto', width:'20px', marginRight:'10px'}}>
     {question.expanded?   <RemoveIcon sx={{ color: 'white', m:'auto'  }}/>:  <AddIcon sx={{ color: 'white', m:'auto'  }}/>}
       
      
     
      {/* <p className="text-base text-white font-semibold">
        See More
      </p> */}
    </CardActions>
  
    
    </ExpandMore> 
    <Collapse in={question.expanded} timeout="auto" unmountOnExit>
   
      <CardContent sx={{width:{xl: '1168px', lg: '900px', md: '800px',sm:'540px', xs:'310px'}}} className='relative bottom-2.5'>
   
      <p className="text-base text-white ml-2"> {question.description} <Link className=" underline " href={question.href}>{question.link}</Link></p>

     
      </CardContent>
     
    </Collapse>
  </Card>
  </Box>
    );
  })

  return (

    <div className='mx-auto'>
      {displayQuestions}
    </div>
  )
}

export default CollectorQuestions
