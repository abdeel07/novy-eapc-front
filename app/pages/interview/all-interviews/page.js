"use client";
import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import InterviewTable from "../../../components/tables/interview";
import FiltreButton from "../../../components/buttons/FiltreButton";
import CustomPagination from "../../../components/pagination/CustomPagination";
import LeftModal from "../../../components/modals";
import CustomDatePicker from "../../../components/datePicker";
import AddButton from "@/app/components/buttons/AddButton";
import ExportButton from "@/app/components/buttons/exportButton/ExportButton";
import ExportForm from "@/app/components/forms/objective/exportObjective";
import { useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { CircularProgress, Skeleton } from "@mui/material";
import { getRequest } from "@/app/utils/api";

const AllInterviews = () => {
  const router = useRouter();
  const [domLoaded, setDomLoaded] = useState(false);

  useEffect(() => {
    setDomLoaded(true);
  }, []);

  let [page, setPage] = useState(0);

  const { isLoading, isError, error, data, isFetching, isPreviousData } =
    useQuery({
      queryKey: ["interviews", page],
      queryFn: () => getRequest("interview/?page=" + page + "&size=2"),
      keepPreviousData: true,
    });

  const handleChange = (event, newPage) => {
    setPage(newPage - 1);
  };

  return (
    <>
      {domLoaded && (
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
                    Les Entretiens
                  </Typography>
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
                <AddButton
                  text="Ajouter un entretien"
                  handleOpen={() =>
                    router.push("/pages/interview/add-interview")
                  }
                />
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
              {isLoading ? (
                <Skeleton
                  sx={{ bgcolor: "grey.900" }}
                  variant="text"
                  width={200}
                  height={50}
                />
              ) : (
                data?.totalElements + " Entretiens"
              )}
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
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "end",
            }}
          >
            <LeftModal
              button={<ExportButton text="Exporter tous les entretiens" />}
              form={<ExportForm />}
            />
          </Grid>
          {isLoading ? (
            <div style={{ display: "flex", justifyContent: "center" }}>
              <CircularProgress
                style={{ width: "70px", height: "70px" }}
                color="info"
              />
            </div>
          ) : isError ? (
            <div>Error: {error.message}</div>
          ) : (
            <Grid
              sx={{
                width: "100%",
                marginTop: "20px",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Box>
                <InterviewTable rows={data?.content} />
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
      )}
    </>
  );
};

export default AllInterviews;
