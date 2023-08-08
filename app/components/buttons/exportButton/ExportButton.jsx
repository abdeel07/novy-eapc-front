import React from 'react'
import Button from '@mui/material/Button/Button'
const ExportButton = ({handleOpen,text}) => {
  return (
    <Button type='submit' variant='contained' size='large' style={{backgroundColor:"transparent",color:"rgb(255, 6, 126)",border:"1px solid rgba(255, 6, 126, 0.5)"}} onClick={handleOpen}>
       {text}
    </Button>
  )
}

export default ExportButton
