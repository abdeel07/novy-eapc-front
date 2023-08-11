import React from 'react'
import { Button } from '@mui/material';

const AddButton = ({ handleOpen, text }) => {
  return (
      <Button type='submit' variant='contained' size='large' style={{backgroundColor:"rgb(48, 49, 103)"}} onClick={handleOpen}>
     { text}
    </Button>
  )
}

export default AddButton
