import React , { useState } from 'react'
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import usePagination from "./Pagination";
import { createTheme, ThemeProvider } from '@mui/material/styles';
const CustomPagination = ({ count, page, handleChange }) => {
  const theme = createTheme({
    palette: {
      primary: {
        main: 'rgb(255, 6, 126)', // Your desired primary color
      },
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <Stack spacing={2}>
        <Pagination count={count} page={page} color='primary' onChange={handleChange} />
      </Stack>
    </ThemeProvider>
  );
};

export default CustomPagination
