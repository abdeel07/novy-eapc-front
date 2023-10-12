"use client";
import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import NotificationDropdown from "../../../components/notification";
import TableObjectives from "@/app/components/tables/objectives";
import FiltreButton from "../../../components/buttons/filter/FiltreButton";
import CustomPagination from "../../../components/pagination/CustomPagination";
import LeftModal from "../../../components/modals";
import FormObjective from "@/app/components/forms/objective/addObjective";
import CustomDatePicker from "../../../components/datePicker";
import AddButton from "@/app/components/buttons/AddButton";
import ExportButton from "@/app/components/buttons/exportButton/ExportButton";
import ExportForm from "@/app/components/forms/objective/exportObjective";
import { CircularProgress, Skeleton } from "@mui/material";
import { getRequest } from "@/app/utils/api";
import { useRole } from "@/app/components/Role";
const ShowObjectives = () => {
  let [page, setPage] = useState(0);
  const { role } = useRole();
  let [year, setYear] = useState(new Date().getFullYear());

  const { isLoading, isError, error, data, isFetching, isPreviousData } =
    useQuery({
      queryKey: ["objectives", page,year],
      queryFn: () => getRequest("objective/collaborator/2?page=" + page + "&size=3&year="+year),
      keepPreviousData: true,
    });

  const handleChange = (event, newPage) => {
    setPage(newPage - 1);
  };
  
  const handleYearChange = (selectedYear) => {
    setYear(selectedYear);
    setPage(0);
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
                Mes Objectifs
              </Typography>
              <NotificationDropdown></NotificationDropdown>
            </Box>
            <CustomDatePicker onSelectYear={handleYearChange} />
          </Box>

          <Box
            sx={{
              display: "flex",
              alignItems: { xs: "flex-start", sm: "center" },
            }}
          >
            {/* modal form */}
            <LeftModal
              button={<AddButton text="Ajouter un objectif" />}
              form={<FormObjective role={role} />}
            />
          </Box>
        </Box>
      </Grid>

    

      {/* Table pour afficher les objectifs */}

      

      {isLoading ? (
        <Grid container justifyContent="center" alignItems="center" style={{ minHeight: '100vh' }}>
        <CircularProgress size={70} style={{ color: "rgb(255, 6, 126)" }} />
      </Grid>
      ) : isError ? (
        <div>Error: {error.message}</div>
      ) : (
        <Grid
          sx={{
            width: "100%",
            marginTop: "70px",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Box>
            <TableObjectives rows={data?.content} action="true" role={role}  />
          </Box>
          <Box
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <CustomPagination
              count={data?.totalPages}
              page={data?.currentPage + 1}
              handleChange={handleChange}
            />
          </Box>
        </Grid>
      )}
    </Grid>
  );
};

export default ShowObjectives;
