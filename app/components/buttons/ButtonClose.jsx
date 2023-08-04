import React from 'react'
import { Button ,Box} from '@mui/material'
import Icon from '@mdi/react';
import { mdiCloseCircle } from '@mdi/js';


const ButtonClose = ({textButton}) => {
  return (
    <Button
    endIcon={<Icon path={mdiCloseCircle} style={{ color: "rgba(255, 255, 255, 0.7)",'&:hover': { color: "white" } }}  size={0.9} />}
  
     style={{borderRadius:"16px",
     backgroundColor:"rgb(255, 6, 126)",
     height:'32px',
     textTransform: "none", 
     width:"82px",
     color:"white",
     fontSize:"0.8125rem"}} 
     size='small'
    >
      <Box sx={{ paddingLeft: '4px'}}>{textButton}</Box>
    </Button>
  )
}

export default ButtonClose
