import React from 'react'
import { Button } from '@mui/material'
const AddButton = ({handleOpen}) => {
  return (
    <Button type='submit' variant='contained' size='large' style={{backgroundColor:"rgb(48, 49, 103)"}} onClick={handleOpen}>
    Ajouter un objectif
  </Button>
  )
}

export default AddButton
