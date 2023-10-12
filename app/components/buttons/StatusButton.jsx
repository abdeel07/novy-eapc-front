import React from 'react';
import Paper from '@mui/material/Paper';

const StatusButton = ({ text }) => {
  let backgroundColor, textColor;

  if (text === 'En cours') {
    backgroundColor = 'rgba(123, 175, 255, 0.2)';
    textColor = 'rgb(123, 175, 255)';
  } else if (text === 'Accepté') {
    backgroundColor = 'rgba(86, 225, 86, 0.2)';
    textColor = 'rgb(69, 145, 69)';
  } else if (text === 'Refusé') {
    backgroundColor = 'rgba(255, 0, 0, 0.2)';
    textColor = 'rgb(255, 0, 0)';
  }

  return (
    <Paper
      elevation={0} // No elevation to make it flat
      sx={{
        backgroundColor: backgroundColor,
        color: textColor,
        borderRadius: "6px",
        padding: "6px 20px",
        height: "26px",
        width: "90%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",

        fontSize: "14px",
      }}
    >
      {text}
    </Paper>
  );
};

export default StatusButton;
