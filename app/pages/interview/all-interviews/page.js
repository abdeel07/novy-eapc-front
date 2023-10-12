"use client";
import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import InterviewTable from "../../../components/tables/interview";
import FiltreButton from "../../../components/buttons/filter/FiltreButton";
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
import { useRole } from "@/app/components/Role";
const AllInterviews = () => {
  const router = useRouter();
  const { role } = useRole();
  const [domLoaded, setDomLoaded] = useState(false);
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [selectedFilterValues, setSelectedFilterValues] = useState({});
  let [size, setSize] = useState(3);
  let [year, setYear] = useState(new Date().getFullYear());
  let [searchField, setSearchField] = useState("");
  const updateSelectedFilterValues = (newValues) => {
    setSelectedFilterValues(newValues);
    console.log(selectedFilterValues);
  };
  const { isLoading:isLoadingCollab, isError:isErrorCollab, error:errorCollab, data:dataCollab} =
  useQuery({
    queryKey: ["collaborator"],
    queryFn: () => getRequest("collaborator/all"),
    keepPreviousData: true,
  });

  const collaborators = dataCollab?.map((collaborator) => ({
    id: collaborator.id, 
    name: collaborator.firstName + ' ' + collaborator.lastName,
  }));
  
  const filterData = [
    {  
      title: "Type d'entretien",
      data: [
        { id: "1", name: "Performance" },
        { id: " 2", name: "Increase" },
      
      ],
      group: "types_interview",
      displayType: "checkbox", 
      quickAccess: true, 
    },
    {
      title: "Collaborateurs",
      data: collaborators,
      group: "collaborateurs",
      displayType: "SimpleAutocomplete", 
    },
   
    ];

  useEffect(() => {
    setDomLoaded(true);
  }, []);
 

  let [page, setPage] = useState(0);

  const fetchFilteredData = async () => {



const interviewTypesParam = selectedFilterValues && selectedFilterValues.types_interview && selectedFilterValues.types_interview.length > 0
  ? selectedFilterValues.types_interview.join(',')
  : '';
  const collaborateursParam = selectedFilterValues && selectedFilterValues.collaborateurs && selectedFilterValues.collaborateurs.length > 0
  ? selectedFilterValues.collaborateurs.join(',')
  : '';
console.log(collaborateursParam);
   
   
    

    const requestUrl =
      `interview/filters?page=${page}&size=${size}&name=${searchField}&year=${year}` +
      `&interviewTypes=${interviewTypesParam}&collaboratorsId=${collaborateursParam}`;

    const responseData = await getRequest(requestUrl);
    return responseData;
  };

  const { isLoading, isError, error, data, isFetching, isPreviousData, refetch } = useQuery(
    ["objectives", page, searchField, year, selectedFilterValues.types_interview],
    fetchFilteredData,
    {
      keepPreviousData: true,
    }
  );
  useEffect(()=>{
      refetch()
  },[selectedFilterValues])

  const handleYearChange = (selectedYear) => {
    setYear(selectedYear);
    setPage(0);
  };


  const handleChange = (event, newPage) => {
    setPage(newPage - 1);
  };

  const handleSearch = (value) => {
    setSearchField(value);
    setPage(0);
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
                <CustomDatePicker  onSelectYear={handleYearChange}/>
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
             <FiltreButton handleSearch={handleSearch} searchField={searchField} updateSelectedFilterValues={updateSelectedFilterValues} filterData={filterData} />
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
                style={{ width: "70px", height: "70px" ,color:"rgb(255, 6, 126)"}}
                color="info"
              />
            </div>
          ) : isError ? (
            <div>Error: {error.message}</div>
          ) : data?.totalElements == 0 ? (
            <div style={{ alignSelf: "center" }}>
              Aucun entretien{" "}
            </div>
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
                <InterviewTable rows={data?.content} role={role}/>
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
