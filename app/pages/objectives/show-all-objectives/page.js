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
import { useEffect } from "react";

const ShowObjectives = () => {
  let [page, setPage] = useState(0);

  let [size, setSize] = useState(3);

  let [searchField, setSearchField] = useState("");

  let [year, setYear] = useState(new Date().getFullYear());

  const [selectedFilterValues, setSelectedFilterValues] = useState({});

  const { role } = useRole();
  const {
    isLoading: isLoadingCollab,
    isError: isErrorCollab,
    error: errorCollab,
    data: dataCollab,
  } = useQuery({
    queryKey: ["collaborator"],
    queryFn: () => getRequest("collaborator/all"),
    keepPreviousData: true,
  });

  const collaborators = dataCollab?.map((collaborator) => ({
    id: collaborator.id,
    name: collaborator.firstName + " " + collaborator.lastName,
  }));
  const filterData = [
    {
      title: "Status",
      data: [
        { id: "1", name: "En cours" },
        { id: "2", name: "Refusé" },
        { id: "3", name: "Accepté" },
      ],
      group: "status",
      displayType: "checkbox", // Example displayType (adjust according to your needs)
      quickAccess: true,
    },
    {
      title: "Collaborateurs",
      data: collaborators,
      group: "collaborateurs",
      displayType: "SimpleAutocomplete",
    },
    {
      title: "Type d'entretien",
      data: [
        { id: "1", name: "Performance" },
        { id: " 2", name: "Increase" },
      ],
      group: "types_interview",
      displayType: "checkbox",
    },
  ];

  const updateSelectedFilterValues = (newValues) => {
    setSelectedFilterValues(newValues);
    console.log(selectedFilterValues);
  };

  const fetchFilteredData = async () => {
    console.log("Selected Status:", selectedFilterValues.status);
    const statusParam =
      selectedFilterValues &&
      selectedFilterValues.status &&
      selectedFilterValues.status.length > 0
        ? selectedFilterValues.status.join(",")
        : "";

    const interviewTypesParam =
      selectedFilterValues &&
      selectedFilterValues.types_interview &&
      selectedFilterValues.types_interview.length > 0
        ? selectedFilterValues.types_interview.join(",")
        : "";
    const collaborateursParam =
      selectedFilterValues &&
      selectedFilterValues.collaborateurs &&
      selectedFilterValues.collaborateurs.length > 0
        ? selectedFilterValues.collaborateurs.join(",")
        : "";
    console.log(collaborateursParam);

    const requestUrl =
      `objective/filters?page=${page}&size=${size}&name=${searchField}&year=${year}` +
      `&interviewTypes=${interviewTypesParam}&status=${statusParam}&collaboratorsId=${collaborateursParam}`;

    const responseData = await getRequest(requestUrl);
    return responseData;
  };

  const {
    isLoading,
    isError,
    error,
    data,
    isFetching,
    isPreviousData,
    refetch,
  } = useQuery(
    [
      "objectives",
      page,
      searchField,
      year,
      selectedFilterValues.types_interview,
      selectedFilterValues.status,
    ],
    fetchFilteredData,
    {
      keepPreviousData: true,
    }
  );
  useEffect(() => {
    refetch();
  }, [selectedFilterValues]);

  const handleChange = (event, newPage) => {
    setPage(newPage - 1);
  };

  const handleSearch = (value) => {
    setSearchField(value);
    setPage(0);
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
                Les Objectifs
              </Typography>
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
              form={<FormObjective role="admin" />}
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
              sx={{ bgcolor: "gray" }}
              variant="text"
              width={200}
              height={50}
            />
          ) : (
            data?.totalElements + " Objectifs"
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
          <FiltreButton
            handleSearch={handleSearch}
            searchField={searchField}
            updateSelectedFilterValues={updateSelectedFilterValues}
            filterData={filterData}
          />
        </Box>
      </Grid>

      {/* Table pour afficher les objectifs */}

      <Grid
        item
        xs={12}
        style={{ display: "flex", flexDirection: "column", alignItems: "end" }}
      >
        <LeftModal
          button={<ExportButton text="Exporter Tous les Objectifs" />}
          form={<ExportForm />}
        />
      </Grid>

      {isLoading ? (
        <div style={{ display: "flex", justifyContent: "center" }}>
          <CircularProgress
            style={{ width: "70px", height: "70px", color: "rgb(255, 6, 126)" }}
          />
        </div>
      ) : isError ? (
        <div style={{ alignSelf: "center" }}>Error: {error.message}</div>
      ) : data?.totalElements == 0 ? (
        <div style={{ alignSelf: "center" }}>Aucun objectif </div>
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
            <TableObjectives
              rows={data?.content}
              action="true"
              role={role}
              refetch={refetch}
            />
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
