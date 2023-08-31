"use client";
import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import InterviewTable from "../../../components/tables/interview";
import CustomPagination from "../../../components/pagination/CustomPagination";
import CustomDatePicker from "../../../components/datePicker";
import { useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { CircularProgress, Skeleton } from "@mui/material";
import { getRequest } from "@/app/utils/api";
import { useRole } from "@/app/components/Role";
import NotificationDropdown from "@/app/components/notification";
const AllInterviews = () => {
  const { role } = useRole();
  const [domLoaded, setDomLoaded] = useState(false);
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());

  useEffect(() => {
    setDomLoaded(true);
  }, []);
 

  let [page, setPage] = useState(0);

  const { isLoading, isError, error, data, isFetching, isPreviousData ,refetch} =
    useQuery({
      queryKey: ["interviews", page,selectedYear],
      queryFn: () => getRequest("interview/collaborator/2?year="+selectedYear+"&page="+page+"&size=2"),
      keepPreviousData: true,
    });
    const { isLoading:isLoadingNotification, isError:isErrorNotification,data:notification, isFetching:isFetchingNotification, isPreviousData:isPreviousDataNotification ,refetch:refetchNotification} =
    useQuery({
      queryKey: ["notifications", page],
      queryFn: () => getRequest("notification/2?&page="+page+"&size=2"),
      keepPreviousData: true,
    });
    const modifiedContent = data?.content.map((row) => {
      const hasNullAnswer = row.quizzes.some((quiz) => quiz.answer === null);
    
      return {
        ...row,
        statusAnswer: hasNullAnswer
      };
    });
  
    const handleYearChange = (year) => {

      setSelectedYear(year);
      console.log(year)
      refetch({ queryKey: ["interviews", page, selectedYear] });
    };

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
                    Mes Entretiens
                  </Typography>
                
                  {notification &&<NotificationDropdown rows={notification}></NotificationDropdown>}
                </Box>
                <CustomDatePicker  onSelectYear={handleYearChange}/>
              </Box>

             
            </Box>
          </Grid>


        
          {isLoading ? (
            <div style={{ display: "flex", justifyContent: "center" }}>
              <CircularProgress
                style={{ width: "70px", height: "70px" ,color:"rgb(255, 6, 126)"}}
                color="info"
              />
            </div>
          ) : isError ? (
            <div>Error: {error.message}</div>
          ) : (
            <Grid
              sx={{
                width: "100%",
                marginTop: "100px",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Box>
                <InterviewTable rows={modifiedContent} role={role}/>
              </Box>
             
            </Grid>
          )}
        </Grid>
      )}
    </>
  );
};

export default AllInterviews;
