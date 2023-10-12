"use client";

import React, { useState, useEffect } from "react";
// ** MUI Imports
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import MenuItem from "@mui/material/MenuItem";
import TextField from "@mui/material/TextField";
import CardHeader from "@mui/material/CardHeader";
import InputLabel from "@mui/material/InputLabel";
import { Alert, AlertTitle, FormHelperText, Snackbar } from '@mui/material'
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import FormControl from "@mui/material/FormControl";
import { IconButton } from "@mui/material";
import Select from "@mui/material/Select";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import Textarea from "@mui/joy/Textarea";
import Icon from "@mdi/react";
import { mdiPlus, mdiMinus } from "@mdi/js";
import TableObjectives from "@/app/components/tables/objectives";
import CustomPagination from "@/app/components/pagination/CustomPagination";
import { getRequest } from "@/app/utils/api";
import { postRequest } from '@/app/utils/api';
import { useQuery } from "@tanstack/react-query";
import { useFormik } from "formik";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { CircularProgress } from '@mui/material';


const FormInterview = () => {
  // ** States
  const router = useRouter();
  const [questionFields, setQuestionFields] = useState([""]); // Initial state with an empty TextField for "Questionnaire" Card
  const [accomplishmentFields, setAccomplishmentFields] = useState([""]); // Initial state with an empty TextField for "Accomplissement" Card
  const [domLoaded, setDomLoaded] = useState(false);
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);
  const [showErrorAlert, setShowErrorAlert] = useState(false);
  const [progress, setProgress] = useState(false);
  let [page, setPage] = useState(0);
  const { vertical, horizontal } = { vertical: 'bottom', horizontal: 'center' };
  
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
  const handleChange = (event, newPage) => {
    setPage(newPage - 1);
  };

  useEffect(() => {
    setDomLoaded(true);
  }, []);

  const PER_PAGE = 1;

  const handleAddQuestionField = () => {
    setQuestionFields([...questionFields, ""]); // Add an empty TextField to the "Questionnaire" Card state
  };

  const handleRemoveQuestionField = (index) => {
    if (questionFields.length != 1) {
      const newFields = [...questionFields];
      newFields.splice(index, 1); // Remove the TextField at the specified index for "Questionnaire" Card
      setQuestionFields(newFields);
    }
  };

  const handleQuestionFieldChange = (index, value) => {
    const newFields = [...questionFields];
    newFields[index] = value; // Update the TextField value at the specified index for "Questionnaire" Card
    setQuestionFields(newFields);
  };

  const handleAddAccomplishmentField = () => {
    setAccomplishmentFields([...accomplishmentFields, ""]); // Add an empty TextField to the "Accomplissement" Card state
  };

  const handleRemoveAccomplishmentField = (index) => {
    if (accomplishmentFields.length != 1) {
      const newFields = [...accomplishmentFields];
      newFields.splice(index, 1); // Remove the TextField at the specified index for "Accomplissement" Card
      setAccomplishmentFields(newFields);
    }
  };

  const handleAccomplishmentFieldChange = (index, value) => {
    const newFields = [...accomplishmentFields];
    newFields[index] = value; // Update the TextField value at the specified index for "Accomplissement" Card
    setAccomplishmentFields(newFields);
  };
  // Define the mutation using useMutation
  const mutation = useMutation((formData) => postRequest('interview/', formData));

  // Handle form submission
  const handleSubmit = async (values) => {
    setProgress(true);
    const formData = values;
    const quizzes = questionFields.map(question => {
      return {
        question: question,
      };
    });
    const fulfillments = accomplishmentFields.map(accomplishment => {
      return {
        title: accomplishment,
      };
    });
    const objectives = data?.content.map(objective=> objective.id);
    formData["quizzes"]=quizzes
    formData["fulfillments"]=fulfillments
    formData["objectivesId"]=objectives;

    try {
      await mutation.mutateAsync(formData);

      setShowSuccessAlert(true);

      formik.resetForm();
      setQuestionFields([""])
      setAccomplishmentFields([""])
    } catch (error) {
      setShowErrorAlert(true);
    }finally {
      setProgress(false); 
    }
  };

  const formik = useFormik({
    initialValues: { type: '', notice: '', collaboratorId: '', date: null },


    onSubmit: values => {
      handleSubmit(values)
    },
  });


  const handleCancel = () => {

    formik.resetForm();
    router.back();
   
  };
  const fetchObjectives = async (page, type, date) => {
  const response = await getRequest(
    `objective/collaborator-interview/?page=${page}&size=2&id=2&year=${date.getFullYear()}&interviewType=${type}`
  );
  return response.data; // Assuming you want to return the data from the response
};
  

  const { isLoading, isError, error, data, isFetching, isPreviousData } =
    useQuery({
      queryKey: ["objectives", page,formik.values.collaboratorId,formik.values.date,formik.values.type],
      queryFn: () =>
        getRequest(
          `objective/collaborator-interview/?page=${page}&size=2&id=${formik.values.collaboratorId}&year=${formik.values.date?.$y}&interviewType=${formik.values.type}`
        ),
      keepPreviousData: true,
    });
    console.log(formik.values.date)
    console.log(formik.values.type)
    console.log(isLoading)
  return (
    <>
   
      {domLoaded && (
        <Card sx={{ marginTop: "40px" }}>
          <CardHeader
            title="Ajouter un entretien"
            titleTypographyProps={{ variant: "h6" }}
          />
          <Divider sx={{ margin: 0 }} />
          <form onSubmit={formik.handleSubmit}>
            <CardContent>
            {progress && (
                <CircularProgress
                  style={{
                    position: 'absolute',
                    top: '60%', 
                    left: '50%', 
                    width:"70px",
                    height:"70px",
                    transform: 'translate(-50%, -50%)',
                    zIndex: 9999, 
                    color:"rgb(255, 6, 126)"
                  }}
                />
              )}
              <Grid container spacing={5}>
                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth>
                    <InputLabel>Type Entretien</InputLabel>
                    <Select
                      label="Country"
                      defaultValue=""
                      id="form-layouts-separator-select"
                      labelId="form-layouts-separator-select-label"
                      value={formik.values.type}
                      onChange={formik.handleChange}
                      name="type"
                    >
                      <MenuItem value="Performance">Performance</MenuItem>
                      <MenuItem value="Increase">Evaluation</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth>
                    <InputLabel>Affecté à</InputLabel>
                    <Select
                      label="Country"
                      defaultValue=""
                      id="form-layouts-separator-select"
                      labelId="form-layouts-separator-select-label"
                      value={formik.values.collaboratorId}
                      name="collaboratorId"
                      onChange={formik.handleChange}
                    >
                   {collaborators?.map((item) => (
                                <MenuItem key={item.id} value={item.id}>
                                    {item.name}
                                </MenuItem>
                                 ))}
                    </Select>
                  </FormControl>
                </Grid>

                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <DatePicker fullWidth label="Date d'entretien"
                      onChange={(date) => formik.setFieldValue('date', date ? date : null)}
                      value={formik.values.date}
                      />
                    </LocalizationProvider>
                  </FormControl>
                </Grid>

                <Grid item xs={12} sm={6}>
                  <Textarea
                    minRows={2}
                    label="Commentaire"
                    placeholder="Commentaire..."
                    name="notice"
                    value={formik.values.notice}
                    onChange={formik.handleChange}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Card>
                    <CardHeader
                      title="Questionnaire"
                      titleTypographyProps={{ variant: "h6" }}
                      style={{ backgroundColor: "rgb(248, 248, 248)" }}
                    />
                    <Divider sx={{ margin: 0 }} />
                    <CardContent>
                      <Grid
                        item
                        xs={12}
                        sm={12}
                        style={{ display: "flex", flexDirection: "column" }}
                      >
                        {questionFields.map((text, index) => (
                          <Grid
                            item
                            xs={12}
                            sm={12}
                            style={{ display: "flex", flexDirection: "row" }}
                            key={index}
                          >
                            <TextField
                              fullWidth
                              label={"Question " + (index + 1)}
                              placeholder="..."
                              value={text}
                              style={{ marginBottom: "8px" }}
                              onChange={(e) =>
                                handleQuestionFieldChange(index, e.target.value)
                              }
                            />
                            {questionFields.length !== 1 && (
                              <IconButton
                                style={{ marginLeft: "7px", padding: "10px" }}
                                onClick={() => handleRemoveQuestionField(index)}
                              >
                                <Icon path={mdiMinus} size={0.8} />
                              </IconButton>
                            )}
                            {index + 1 == questionFields.length && (
                              <IconButton onClick={handleAddQuestionField}>
                                <Icon path={mdiPlus} size={0.8} />
                              </IconButton>
                            )}
                          </Grid>
                        ))}
                      </Grid>
                    </CardContent>
                  </Card>
                </Grid>

                <Grid item xs={12} sm={6}>
                  <Card>
                    <CardHeader
                      title="Accomplissement"
                      titleTypographyProps={{ variant: "h6" }}
                      style={{ backgroundColor: "rgb(248, 248, 248)" }}
                    />
                    <Divider sx={{ margin: 0 }} />
                    <CardContent>
                      <Grid
                        item
                        xs={12}
                        sm={12}
                        style={{ display: "flex", flexDirection: "column" }}
                      >
                        {accomplishmentFields.map((text, index) => (
                          <Grid
                            item
                            xs={12}
                            sm={12}
                            style={{ display: "flex", flexDirection: "row" }}
                            key={index}
                          >
                            <TextField
                              fullWidth
                              label={"Accomplissement " + (index + 1)}
                              placeholder="..."
                              value={text}
                              style={{ marginBottom: "8px" }}
                              onChange={(e) =>
                                handleAccomplishmentFieldChange(
                                  index,
                                  e.target.value
                                )
                              }
                            />
                            {accomplishmentFields.length !== 1 && (
                              <IconButton
                                style={{ marginLeft: "7px" }}
                                onClick={() =>
                                  handleRemoveAccomplishmentField(index)
                                }
                              >
                                <Icon path={mdiMinus} size={1} />
                              </IconButton>
                            )}
                            {index + 1 == accomplishmentFields.length && (
                              <IconButton
                                onClick={handleAddAccomplishmentField}
                              >
                                <Icon path={mdiPlus} size={1} />
                              </IconButton>
                            )}
                          </Grid>
                        ))}
                      </Grid>
                    </CardContent>
                  </Card>
                </Grid>
                <Grid item xs={12} sm={12}>
                  <Card>
                    <CardHeader
                      title="Objectives"
                      titleTypographyProps={{ variant: "h6" }}
                      style={{ backgroundColor: "rgb(248, 248, 248)" }}
                    />
                    <Divider sx={{ margin: 0 }} />
                    <CardContent
                      style={{ backgroundColor: "rgb(248, 248, 248)" }}
                    >
                      <Grid
                        item
                        xs={12}
                        sm={12}
                        style={{ marginRight: "20px" }}
                      >
                       {formik.values.type === '' || formik.values.date === null || isError ? (
                          <div style={{ display: "flex", justifyContent: "center" }}>
                            <CircularProgress style={{ width: "50px", height: "50px" ,color:"rgb(255, 6, 126)"}} color="info" />
                          </div>
                        ) : (
                          <>
                            <TableObjectives rows={data?.content} />
                            <Grid
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
                            </Grid>
                          </>
                        )}

                      
                      </Grid>
                    </CardContent>
                  </Card>
                </Grid>
              </Grid>
            </CardContent>
            <Divider sx={{ margin: 0 }} />
            <CardActions sx={{ paddingLeft: "18px" }}>
              <Button
                size="large"
                type="submit"
                sx={{
                  flex: 1, // Use flex property to make the button expand and fill the available space
                  mr: 2,
                  maxWidth: "140px",
                  backgroundColor: "rgb(255, 6, 126)",
                  color: "white",
                  "&:hover": {
                    backgroundColor: "rgba(255, 6, 126, 0.8)",
                  },
                }}
              >
                Submit
              </Button>
              <Button
              onClick={handleCancel}
                size="large"
                sx={{
                  flex: 1, // Use flex property to make the button expand and fill the available space
                  color: "rgb(255, 6, 126)",
                  maxWidth: "140px",
                  border: "solid 1px rgb(255, 6, 126)",
                }}
                variant="outlined"
              >
                Cancel
              </Button>
            </CardActions>
          </form>
          {showSuccessAlert && (
        <Snackbar
          open={showSuccessAlert}
          autoHideDuration={5000}
          onClose={() => setShowSuccessAlert(false)}
          anchorOrigin={{ vertical, horizontal }}
          key={vertical + horizontal}
        >
          <Alert severity="success" sx={{ width: '100%' }}>
            <AlertTitle>Ajout avec succès</AlertTitle>
          </Alert>
        </Snackbar>
      )}

      {showErrorAlert && (
        <Snackbar
          open={showErrorAlert}
          autoHideDuration={5000}
          onClose={() => setShowErrorAlert(false)}
          anchorOrigin={{ vertical, horizontal }}
          key={vertical + horizontal}
        >
          <Alert severity="error" sx={{ width: '100%' }}>
            <AlertTitle>Échec de l'ajout</AlertTitle>
          </Alert>
        </Snackbar>
      )}
        </Card>
      )}
    </>
  );
};

export default FormInterview;
