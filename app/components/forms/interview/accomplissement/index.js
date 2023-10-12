import React, { useState } from 'react'


// ** MUI Imports
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import Button from '@mui/material/Button'
import Divider from '@mui/material/Divider'

import TextField from '@mui/material/TextField'
import CardHeader from '@mui/material/CardHeader'

import CardContent from '@mui/material/CardContent'
import CardActions from '@mui/material/CardActions'

import { useRole } from '@/app/components/Role'

import IconButton from '@mui/material/IconButton';
import Icon from '@mui/material/Icon';
import { mdiPlus, mdiMinus } from "@mdi/js";

// ** Icons Imports

import { useMutation } from '@tanstack/react-query';
import { postRequest } from '@/app/utils/api';
import { useFormik } from 'formik';
import { Alert, AlertTitle, FormHelperText, Snackbar } from '@mui/material'
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
const AccomplishementForm = ({ handleCloseModal,data,interviewId }) => {
  const {role}=useRole()
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);
  const [showErrorAlert, setShowErrorAlert] = useState(false);
  const [accomplishmentFields, setAccomplishmentFields] = useState(
    data && data.length > 0
      ? data.map((fulfillment) => ({
          id: fulfillment.id,
          title: fulfillment.title,
        }))
      : [
          {
            id: null,
            title: '',
          },
        ]
  );

  const { vertical, horizontal } = { vertical: 'bottom', horizontal: 'center' };

  // Define the mutation using useMutation
  const mutation = useMutation((formData) => postRequest("fulfillments/"+interviewId, formData));

  // Handle form submission
  const handleSubmit = async () => {
   
    try {
      await mutation.mutateAsync(accomplishmentFields);

      setShowSuccessAlert(true);

      formik.resetForm();
    } catch (error) {
      setShowErrorAlert(true);
    }
  };

  const formik = useFormik({
    initialValues: { id: '', question: '', answer:''},
    onSubmit: handleSubmit
  });

  const handleCancel = () => {
    formik.resetForm();
    handleCloseModal();
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
    if(newFields[index].title!=null){
      newFields[index].title = value; 
    }
    else{
      newFields[index]={
        id:null,
        title :value ,
      } ;
    }
   
    setAccomplishmentFields(newFields);
  };


  return (
    <Card sx={{ marginTop: "40px",width:"100%" }}>
      <CardHeader title='Accomplissement' titleTypographyProps={{ variant: 'h6' }} />
      <Divider sx={{ margin: 0 }} />

      <form onSubmit={formik.handleSubmit}>
        <CardContent>
                    <Grid
                        item
                        xs={12}
                        sm={12}
                        style={{ display: "flex", flexDirection: "column" }}
                      >
                        {accomplishmentFields.map((accomplishment, index) => (
                    
                          <Grid
                            item
                            xs={12}
                            sm={12}
                            key={index}
                            style={{ display: "flex", flexDirection: "row" }}
                          >
                            <TextField
                              fullWidth
                              label={"Accomplissement " + (index + 1)}
                              placeholder="..."
                              value={accomplishment.title}
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
                                
                              <RemoveIcon/>
                              </IconButton>
                            )}
                            {index + 1 == accomplishmentFields.length && (
                              <IconButton
                                onClick={handleAddAccomplishmentField}
                              >
                                <AddIcon/>
                              </IconButton>
                            )}
                          </Grid>
                         
                        ))}
                     
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
  )
}

export default AccomplishementForm;
