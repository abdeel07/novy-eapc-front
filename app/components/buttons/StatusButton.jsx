import React from 'react'
import { Button } from '@mui/material'
const StatusButton = ({textButton}) => {
  let backgroundColor, textColor;

  if (textButton === 'En cours') {
    backgroundColor = 'rgba(123, 175, 255, 0.2)';
    textColor = 'rgb(123, 175, 255)';
  } else if (textButton === 'Accepté') {
    backgroundColor = 'rgba(86, 225, 86, 0.2)';
    textColor = 'rgb(69, 145, 69)';
  } else if (textButton === 'Refusé') {
    backgroundColor = 'rgba(255, 0, 0, 0.2)';
    textColor = 'rgb(255, 0, 0)';
  } 
  return (
    <Button
        type='submit'
        variant='contained'
        size='small' // Set the size to small
        
        style={{
        backgroundColor: backgroundColor,
        color: textColor,
        borderRadius: "6px",
        padding:"0px 20px",
        height:"32px",
        width:"90%",
        textTransform: "none", // Set the text transform to none to keep lowercase letters
        }}
        >
       {textButton}
 </Button>
  )
}

export default StatusButton
