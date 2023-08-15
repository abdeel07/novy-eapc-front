'use client'
import React, { useState } from "react"; 
import { Modal, Box, Typography, Button } from "@mui/material";
import AddButton from "../buttons/AddButton";
import Icon from '@mdi/react';
import { mdiClose } from '@mdi/js';
import IconButton from "@mui/material/IconButton/IconButton";

const LeftModal = ({ button,form }) => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      {React.cloneElement(button, { handleOpen: handleOpen })}
    
      <Modal
        open={open}
        onClose={handleClose}
        sx={{
          overflow: "hidden",
          display: "flex",
          alignItems: "center",
          height: "100%",
          justifyContent: "flex-end",
          transition: "box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",
        }}
      >
        <Box
          sx={{
            width: "100%",
            maxWidth: "430px", // Limit the width for larger screens
            height: "100%",
            backgroundColor: "white",
            position: "relative",
            right: 0,
            top: 0,
            alignItems:"center",
            justifyContent:"center",
            display:"flex",
            padding: 2,
            boxShadow: 24,
            overflow: "auto",
            "@media (max-width: 600px)": {
              width: "100%", // Adjust width for smaller screens
            },
          }}
        >
          <IconButton
            edge="end"
            color="inherit"
            aria-label="close"
            onClick={handleClose}
            sx={{
              position: "absolute",
              top: 16,
              right: 16,
            }}
          >
            <Icon path={mdiClose} size={1} />
          </IconButton>
          {React.cloneElement(form, { handleCloseModal: handleClose })}
        </Box>
      </Modal>
    </div>
  );
};

export default LeftModal;
