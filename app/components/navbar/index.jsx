"use client"
import * as React from 'react';

import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import NotificationDropdown from '../notification';
import UserDropdown from '../user/UserDropdown';
const Nav = () => {
 
    const [value, setValue] = React.useState('1');

    const handleChange = (event, newValue) => {
      setValue(newValue);
    };
  
    return (
    <Box sx={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>

  <Box className='actions-left' sx={{ mr : 2,display: 'flex', alignItems: 'center' }}>
        <TabContext value={value}>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <TabList onChange={handleChange} aria-label="lab API tabs example">
              <Tab label="COLLABORATORS" value="1" />
              <Tab label="OBJECTIVES" value="2" />
              <Tab label="ENTRETIENS" value="3" />
            </TabList>
          </Box>
     
        </TabContext>
      </Box>
      <Box className='actions-right' sx={{ display: 'flex', alignItems: 'center' }}>
      
        <UserDropdown />
        </Box>
    </Box>
    );
  
}

export default Nav
