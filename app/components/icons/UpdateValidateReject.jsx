import React from 'react'
import { Box } from '@mui/material';
import Icon from '@mdi/react';
import { mdiPencil, mdiCheckCircle, mdiCloseCircle } from '@mdi/js';
const UpdateValidateReject = () => {
  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="space-between"
      width="100px" 
    >
 
      <Icon path={mdiPencil}  size={1} style={{ color: "rgb(63, 144, 215)" }} sx={{ cursor: 'pointer' }} />

      <Icon path={mdiCheckCircle} size={1} style={{ color: "rgb(84, 172, 100)" }} sx={{ cursor: 'pointer' }} />

      <Icon path={mdiCloseCircle} size={1} style={{ color: "rgb(255, 6, 126)" }} sx={{ cursor: 'pointer' }} />
    </Box>
  )
}

export default UpdateValidateReject
