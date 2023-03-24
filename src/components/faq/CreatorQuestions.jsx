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



const CreatorQuestions = () => {
    const [expanded, setExpanded] = React.useState(false);
    const [expanded2, setExpanded2] = React.useState(false);
    const [expanded3, setExpanded3] = React.useState(false);
    const [expanded4, setExpanded4] = React.useState(false);
    const [expanded5, setExpanded5] = React.useState(false);
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

  const CreatorsData = [
  
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
    title: "What kind of creators does Artbordz work with?",
    description: "Artboardz works with creators that have digital illustration and marketing skills to develop and promote NFT collections.",
    ref: "q2",
    handleClick: handleExpandClick2,
    href:"",
    link:"",
   
expanded: expanded2  },
  
  {
    title: "Do I need to be an NFT creator to join Artboardz?",
  description: "Artboardz strives to onboard new artists into the ecosystem, so we welcome artists of all disciplines to join us.",
  ref: "q3",
  handleClick: handleExpandClick3,
  href:"",
    link:"",
 
expanded: expanded3},
  {
    title: "What does  the creation process entail?",
    description: "Preparing for an Artboardz mint takes place over 3 months including the following steps:",
    step1:"  -Partnership (T-3 months) - jointly develop concept and narrative.",
    step2:"  -NFT Creation (T-2 months) - Artboardz assists creators with minting their digital images.",
    step3:"  -Marketing (T-1 month) - Artboardz in cooperation with the creators own marketing efforts promote the project on multiple social media platforms",
    step4:"  -Minting (T-0 months) - Artboardz runs the NFT mint from its website.",
    step5:"  -Physical Artwork Creation (T+1 months) - Artboardz collects the patrons tags and the creator needs to secure permits and create the physical artwork.",
    ref: "q4",
    handleClick: handleExpandClick4,
    href:"",
    link:"",
    expanded: expanded4  },
  {
    title: "How do I become a creator with Artboardz?",
  description: "Artboardz works with creators around the world to bring their digital art to life. To apply to work with Artboardz, please submit the form at the bottom of the page.",
  ref: "q5",
  handleClick: handleExpandClick5,  
  expanded: expanded5,
  href:"",
  link:"",
  
},
  
  
  ];
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
  
  const displayQuestions = CreatorsData.map((question, index) => {
    return (
      
        
        <Box key={index} onClick={question.handleClick} sx={{ width:{xl: '1242px',lg: '950px', md: '850px', sm:'590px',xs:'320px'}, display: 'flex',
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
     {question.expanded?   <RemoveIcon sx={{ color: 'white', }}/>:  <AddIcon sx={{ color: 'white',  }}/>}
       
      
     
      {/* <p className="text-base text-white font-semibold">
        See More
      </p> */}
    </CardActions>
  
    
    </ExpandMore> 
    <Collapse in={question.expanded} timeout="auto" unmountOnExit>
   
      <CardContent sx={{width:{xl: '1168px', lg: '900px', md: '800px',sm:'540px', xs:'310px'}}} className='relative bottom-2.5'>
   
      <p className="text-base text-white  mx-2 align-text-top"> {question.description}<Link className=" underline " href={question.href}>{question.link}</Link></p>
      <p className="text-base text-white  mx-4 align-text-top"> {question.step1}</p>
      <p className="text-base text-white  mx-4 align-text-top"> {question.step2}</p>
      <p className="text-base text-white  mx-4 align-text-top"> {question.step3}</p>
      <p className="text-base text-white  mx-4 align-text-top"> {question.step4}</p>
      <p className="text-base text-white  mx-4 align-text-top"> {question.step5}</p>
     
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

export default CreatorQuestions
