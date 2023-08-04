import React from 'react'
import{ Button} from '@mui/material'
import { useState } from 'react'

const SmallButton = ({ textButton }) => {
    const [isClicked, setIsClicked] = useState(false);
const handleClick = () => {
    setIsClicked((prevIsClicked) => !prevIsClicked);
  };

  const color = isClicked ? 'white' : 'rgba(0, 0, 0, 0.87)';
  const backgroundColor = isClicked ? 'rgb(255, 6, 126)' : 'rgba(0, 0, 0, 0.08)';

  return (
    <Button
      style={{
        borderRadius: '16px',
        backgroundColor: backgroundColor,
        color: color,
        textTransform: 'none',
        width: '82px',
        fontSize: '0.8125rem',
      }}
      size='small'
      onClick={handleClick}
    >
      {textButton}
    </Button>
  );
}

export default SmallButton
