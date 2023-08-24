"use client"
import React,{useState} from 'react'
import { styled } from '@mui/material/styles'
import MuiDrawer from '@mui/material/Drawer'
import List from '@mui/material/List'
import Box from '@mui/material/Box'
import { Grid } from '@mui/material'
import IconButton from '@mui/material/IconButton'
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft'
import ChevronRightIcon from '@mui/icons-material/ChevronRight'
import FolderIcon from '@mui/icons-material/Folder';
import FolderCopyIcon from '@mui/icons-material/FolderCopy';
import ContactPhoneIcon from '@mui/icons-material/ContactPhone';
import ContactsOutlinedIcon from "@mui/icons-material/ContactsOutlined";
import ReceiptOutlinedIcon from "@mui/icons-material/ReceiptOutlined";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import MenuItem from '@mui/material/MenuItem'
import ListItem from '@mui/material/ListItem'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import Hidden from '@mui/material/Hidden';

import Typography from '@mui/material/Typography';
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import logo from "../../../public/images/logo.png"
import useUserPreferencesStore from '../../store/userPreferences'
import { useTranslation } from 'next-i18next'
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import SwitchAccountIcon from '@mui/icons-material/SwitchAccount';
import { useRole } from '../Role'

const drawerWidth = 240
const SKELETON_COUNT = 4

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
})

const closedMixin = (theme) => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `0`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(9)} + 7px)`,
  },
})

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: 'nowrap',
  boxSizing: 'border-box',
  ...(open && {
    ...openedMixin(theme),
    '& .MuiDrawer-paper': openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    '& .MuiDrawer-paper': closedMixin(theme),
  }),
  [theme.breakpoints.down('sm')]: {
    position: 'absolute',
    height: '100vh',
  },
}))

// à completer
const checkUrlSelected = (url, asPath) => false

export default function LeftMenu() {
  const { toggleNavState, navState } = useUserPreferencesStore()
  const router  = useRouter();
  const { t } = useTranslation('common');
  const [clickedItemId, setClickedItemId] = useState(1);
  const { role } = useRole();
  const handleMenuItemClick = (id) => {
    setClickedItemId(id);
  };

  // if you have data loading, replace this to match your requirements
  const isLoading = false;
  const routes = [
    {
      id: 1, 
      label:'Home', 
      path: '/', 
      icon: <HomeOutlinedIcon />
    }, 
    {
      id: 2, 
      label: 'my-objectives', 
      path: '/pages/objectives/my-objectives', 
      icon:     <FolderIcon />
    }, 
    {
      id: 3, 
      label: 'all-objectives', 
      path: '/pages/objectives/show-all-objectives', 
      icon:   <FolderCopyIcon/>
    },
    {
      id: 4, 
      label: 'my-interviews', 
      path: '/pages/interview/my-interviews', 
      icon:   <AccountBoxIcon/>
    },
    {
      id: 5, 
      label: 'all-interviews', 
      path: '/pages/interview/all-interviews', 
      icon:   <SwitchAccountIcon />
    }
  ];
  const filtredRoutes = role === 'user' ? routes.filter(route => route.id !== 3 && route.id !== 5) : routes.filter(route => route.id !== 4);
  
  const activeRoute = (routeName, currentRoute) => {
    return routeName === currentRoute? true : false;
  }
  
  
  return (
    <Drawer variant="permanent" open={navState}>
       <Grid className="menu">
          <Box style={{ marginBottom: 150,marginLeft:"25px" }}>
            <Image src={logo} alt="Promptopia Logo" width={40} height={40} style={{ marginTop: 10 }} />
          </Box>
          {filtredRoutes.map((item, index) => (


          <Link  href={item.path} style={{ textDecoration: 'none',color:"black ",marginLeft:"25px"}} key={item.id}>
            <MenuItem
                  selected={activeRoute(item.path, router.pathname)}
                  onClick={() => handleMenuItemClick(item.id)}
                  style={{
                    color: activeRoute(item.path, router.pathname) ? 'rgb(255, 6, 126)' : 'black',
                    textDecoration: 'none',
                    backgroundColor: clickedItemId === item.id ? 'lightgray' : 'transparent',
                  }}
              >
              <ListItem button key={item.id}  >
                <ListItemIcon style={{marginRight:17.5,color:"rgb(255, 6, 126)",marginLeft:-7}}> {item.icon} </ListItemIcon>
                    <ListItemText primary={item.label} />
                </ListItem>
              </MenuItem>
          </Link>

          ))}

          
     </Grid>
      <Hidden smDown>
        <IconButton
          sx={{
            width: '50px',
            height: '50px',
            marginRight: 'auto',
            marginLeft: '10px',
          }}
          onClick={toggleNavState}
        >
          {!navState ? <ChevronRightIcon /> : <ChevronLeftIcon />}
        </IconButton>
      </Hidden>
    </Drawer>
  )
}
