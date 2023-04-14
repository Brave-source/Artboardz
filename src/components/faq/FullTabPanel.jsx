import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import CollectorQuestions from './CollectorQuestions';
import CreatorQuestions from './CreatorQuestions';
import { styled } from '@mui/material/styles';


function TabPanel(props) {
    const { children, value, index, ...other } = props;
  
    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box sx={{ p: 3 }}>
            <Typography>{children}</Typography>
          </Box>
        )}
      </div>
    );
  }
  TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
  };
  function a11yProps(index) {
    return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`,
    };
  }
  const StyledTabs = styled((props) => (
    <Tabs
      {...props}
      TabIndicatorProps={{ children: <span className="MuiTabs-indicatorSpan" /> }}
    />
  ))({
    '& .MuiTabs-indicator': {
      display: 'flex',
      justifyContent: 'center',
      backgroundColor: 'transparent',
    },
    '& .MuiTabs-indicatorSpan': {
      maxWidth: 0,
      width: '100%',
      backgroundColor: '#635ee7',
    },
  });
  
  const StyledTab = styled((props) => <Tab disableRipple {...props} />)(
    ({ theme }) => ({
      textTransform: 'none',
      fontWeight: theme.typography.fontWeightRegular,
      fontSize: theme.typography.pxToRem(15),
      marginRight: theme.spacing(1),
      color: 'rgba(255, 255, 255, 0.7)',
      '&.Mui-selected': {
        color: '#fff',
        backgroundColor: 'rgba(18, 61, 145, 1)',
        borderRadius: '6px'
      },
      '&.Mui-focusVisible': {
        backgroundColor: 'rgba(100, 95, 228, 0.32)',
      },
    }),
  );
  
  
  
const FullTabPanel = () => {
    const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
 
  return (
    <div>
        <Box sx={{ width: '85%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider', width:{xl: '1242px',lg: '950px', md: '850px', sm:'590px',xs:'320px'}, display: 'flex',
          flexDirection: 'row', justifyContent:'center', marginX:'auto'}}>
            <Box sx={{  width:{xl: '1192px', lg: '900px', md: '800px',sm:'540px', xs:'270px'}, display: 'flex',
          flexDirection: 'row', justifyContent:'left' }}>
      <StyledTabs
          value={value}
          onChange={handleChange}
          aria-label="styled tabs example"
        >
          <StyledTab label="Collectors (7)" />
          <StyledTab label="Creators (4)" />
        </StyledTabs>
        </Box>
      </Box>
      <TabPanel value={value} index={0} sx={{ width: '100%' }}>
      
        <CollectorQuestions/>
  
      </TabPanel>
      <TabPanel value={value} index={1}>
      <CreatorQuestions/>
      </TabPanel>
    </Box> 

    </div>
  )
}

export default FullTabPanel
