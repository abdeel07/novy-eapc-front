import React from 'react'
import { IconButton } from '@mui/material';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
const  UpdateButton = ({ handleOpen }) => {
  return (
    <IconButton type='submit' aria-label="update" size="small" onClick={handleOpen}>
      <ModeEditIcon fontSize="small" />
    </IconButton>
  )
}

export default UpdateButton
