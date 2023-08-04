"use client";
import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import NotificationDropdown from "../../../components/notification";
import TableObjectives from "../../../components/tables/TableObjectives";
import FiltreButton from "../../../components/buttons/FiltreButton";
import CustomPagination from "../../../components/pagination/CustomPagination";
import { default as rows } from "../../../constantes/data.json";
import usePagination from "../../../components/pagination/Pagination";
import LeftModal from "../../../components/modals";
import FormObjective from "@/app/components/forms/objective/addObjective";
import CustomDatePicker from "../../../components/datePicker";
import AddButton from "@/app/components/buttons/AddButton";
import ExportButton from "@/app/components/buttons/exportButton/ExportButton";
import ExportForm from "@/app/components/forms/objective/exportObjective";
const ShowObjectives = () => {
  let [page, setPage] = useState(0);

  const fetchObjectives = (page = 0) =>
    fetch("http://localhost:8080/api/objective/?page=" + page + "&size=2").then(
      (res) => res.json()
    );

  const { isLoading, isError, error, data, isFetching, isPreviousData } =
    useQuery({
      queryKey: ["objectives", page],
      queryFn: () => fetchObjectives(page),
      keepPreviousData: true,
    });

  const handleChange = (event, newPage) => {
    setPage(newPage - 1); 
  };

  return (
    <Grid
      container
      style={{ width: "100%" }}
      sx={{ display: "flex", flexDirection: "column" }}
    >
      {/* Ajouter un objectif */}
      <Grid item xs={12}>
        <Box
          sx={{
            gap: 5,
            display: "flex",
            flexWrap: "wrap",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              flexWrap: "wrap",
            }}
          >
            <Box
              sx={{
                gap: 5,
                display: "flex",
                flexWrap: "wrap",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <Typography variant="h5" component="h1" sx={{ mr: 2 }}>
                Les Objectives
              </Typography>
              <NotificationDropdown></NotificationDropdown>
            </Box>
            <CustomDatePicker />
          </Box>

          <Box
            sx={{
              display: "flex",
              alignItems: { xs: "flex-start", sm: "center" },
            }}
          >
            {/* modal form */}
            <LeftModal button={<AddButton />} form={<FormObjective />} />
          </Box>
        </Box>
      </Grid>

      {/* Rechercher & Filtrer */}
      <Grid
        item
        xs={12}
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: { xs: "flex-start", sm: "center" },
        }}
      >
        <Typography variant="h4" component="h1" style={{ fontWeight: 500 }}>
          {data?.totalElements} Objectives
        </Typography>
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", sm: "row" },
            alignItems: "center",
            justifyContent: { xs: "flex-start", sm: "center" },
            gap: { xs: "10px", sm: "16px" },
          }}
        >
          <FiltreButton />
        </Box>
      </Grid>

      {/* Table pour afficher les objectifs */}

      <Grid
        item
        xs={12}
        style={{ display: "flex", flexDirection: "column", alignItems: "end" }}
      >
        <LeftModal button={<ExportButton />} form={<ExportForm />} />
      </Grid>
      <Grid
        sx={{
          width: "100%",
          marginTop: "20px",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Box>
          <TableObjectives rows={data?.content} />
        </Box>
        <Box
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <CustomPagination
            count={data?.totalPages} // Replace "totalPages" with the actual property name from the backend response
            page={data?.currentPage + 1} // Replace "currentPage" with the actual property name from the backend response
            handleChange={handleChange}
          />
        </Box>
      </Grid>
    </Grid>
  );
};

export default ShowObjectives;
