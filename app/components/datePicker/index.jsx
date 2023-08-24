import React, { useState } from "react";
import { Box, IconButton, Typography, Menu, MenuItem, Button } from "@mui/material";
import Icon from "@mdi/react";
import { mdiChevronLeft, mdiChevronRight } from "@mdi/js";

const CustomDatePicker = ({ onSelectYear }) => {
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [yearMenuAnchor, setYearMenuAnchor] = useState(null);

  const handlePreviousYear = () => {
    setSelectedYear((prevYear) => prevYear - 1);
    onSelectYear((prevYear) => prevYear - 1);
  };

  const handleNextYear = () => {
    setSelectedYear((prevYear) => prevYear + 1);
    onSelectYear((prevYear) => prevYear + 1);
  };

  const handleYearClick = (event) => {
    setYearMenuAnchor(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setYearMenuAnchor(null);
  };

  const handleSelectYear = (year) => {
    setSelectedYear(year);
    handleCloseMenu();
    onSelectYear(year);
  };
  const renderYearOptions = () => {
    const currentYear = new Date().getFullYear();
    const startYear = currentYear - 6;
    const endYear = currentYear + 6;

    const years = Array.from({ length: endYear - startYear + 1 }, (_, index) => startYear + index);

    return years.map((year) => (
      <MenuItem key={year} onClick={() => handleSelectYear(year)}

        sx={year === selectedYear ? { backgroundColor: "rgb(255, 6, 126)", color: "white" } : {}}>
        {year}
      </MenuItem>
    ));
  };


  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        maxWidth: "250px",

      }}
    >
      <IconButton onClick={handlePreviousYear}>
        <Icon path={mdiChevronLeft} size={1} />
      </IconButton>

      <Typography
        variant="h6"
        onClick={handleYearClick}
        sx={{ cursor: "pointer", fontSize: "0.875rem", color: "rgba(0, 0, 0, 0.87)" }}
      >
        {selectedYear}
      </Typography>

      <IconButton onClick={handleNextYear}>
        <Icon path={mdiChevronRight} size={1} />
      </IconButton>

      <Menu
        anchorEl={yearMenuAnchor}
        open={Boolean(yearMenuAnchor)}
        onClose={handleCloseMenu}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        transformOrigin={{ vertical: "top", horizontal: "center" }}
        sx={{ maxHeight: "400px", overflowY: "auto" }}
      >
        {renderYearOptions()}
      </Menu>
    </Box>
  );
};

export default CustomDatePicker;
