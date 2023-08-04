import React from 'react'
import { Button } from '@mui/material'
const StatusButton = ({textButton}) => {
  return (
    <Button
        type='submit'
        variant='contained'
        size='small' // Set the size to small
        
        style={{
        backgroundColor: "rgba(123, 175, 255, 0.2)",
        color: "rgb(123, 175, 255)",
        borderRadius: "6px",
        padding:"0px 20px",
        height:"32px",
        width:"60%",
        textTransform: "none", // Set the text transform to none to keep lowercase letters
        }}
        >
       {textButton}
 </Button>
  )
}

export default StatusButton
