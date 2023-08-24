import React, { useState } from 'react'


// ** MUI Imports
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import Button from '@mui/material/Button'
import Divider from '@mui/material/Divider'
import MenuItem from '@mui/material/MenuItem'
import TextField from '@mui/material/TextField'
import CardHeader from '@mui/material/CardHeader'
import InputLabel from '@mui/material/InputLabel'
import CardContent from '@mui/material/CardContent'
import CardActions from '@mui/material/CardActions'
import FormControl from '@mui/material/FormControl'
import Select from '@mui/material/Select'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import Textarea from '@mui/joy/Textarea';
import { useRole } from '@/app/components/Role'



// ** Icons Imports

import { useMutation } from '@tanstack/react-query';
import { postRequest } from '@/app/utils/api';
import { useFormik } from 'formik';
import { Alert, AlertTitle, FormHelperText, Snackbar } from '@mui/material'

const FormObjective = ({ handleCloseModal }) => {
  const {role}=useRole()
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);
  const [showErrorAlert, setShowErrorAlert] = useState(false);

  const { vertical, horizontal } = { vertical: 'bottom', horizontal: 'center' };

  // Define the mutation using useMutation
  const mutation = useMutation((formData) => postRequest('objective/', formData));

  // Handle form submission
  const handleSubmit = async (values) => {
    const formData = values;

    try {
      await mutation.mutateAsync(formData);

      setShowSuccessAlert(true);

      formik.resetForm();
    } catch (error) {
      setShowErrorAlert(true);
    }
  };

  const formik = useFormik({
    initialValues: { title: '', interviewType: '', collaboratorId:role=="user"? '2':'', startDate: null, endDate: null, achievement: '', status:role=="user"? 'En cours':'', comment: '' },

    validate: (values) => {
      const errors = {};

      if (!values.startDate) {
        errors.startDate = 'Start Date is required';
      }

      if (!values.endDate) {
        errors.endDate = 'End Date is required';
      }

      if (values.startDate && values.endDate && values.startDate >= values.endDate) {
        errors.endDate = 'End Date must be greater than Start Date';
      }

      if (values.achievement && (values.achievement < 0 || values.achievement > 100)) {
        errors.achievement = 'Achievement must be between 0 and 100';
      }

      if (values.title && values.title.length < 3) {
        errors.title = 'Title must be at least 3 characters';
      }

      return errors;
    },

    onSubmit: values => {
      handleSubmit(values)
    },
  });

  const handleCancel = () => {
    formik.resetForm();
    handleCloseModal();
  };

  return (
    <Card sx={{ marginTop: "40px" }}>
      <CardHeader title='Ajouter un objectif' titleTypographyProps={{ variant: 'h6' }} />
      <Divider sx={{ margin: 0 }} />

      <form onSubmit={formik.handleSubmit}>
        <CardContent>
          <Grid container spacing={5}>
            <Grid item xs={12} sm={12}>
              <TextField required name='title' fullWidth label='Nom Objectif' placeholder='...' onChange={formik.handleChange}
                value={formik.values.title} />
              {formik.touched.title && formik.errors.title && <FormHelperText style={{ color: 'red' }}>{formik.errors.title}</FormHelperText>}
            </Grid>

            <Grid item xs={12} sm={12}>
              <FormControl fullWidth>
                <InputLabel >Type Entretien</InputLabel>
                <Select
                  required
                  label='Country'
                  defaultValue=''
                  id='form-layouts-separator-select'
                  labelId='form-layouts-separator-select-label'
                  name='interviewType'
                  onChange={formik.handleChange}
                  value={formik.values.interviewType}
                >
                  <MenuItem value='Performance'>Performance</MenuItem>
                  <MenuItem value='Increase'>Evaluation</MenuItem>

                </Select>
              </FormControl>
            </Grid>
            {role==="admin" && (
                  <Grid item xs={12} sm={12}>
                  <FormControl fullWidth>
                    <InputLabel >Affecté à</InputLabel>
                    <Select
                      required
                      label='Country'
                      defaultValue=''
                      id='form-layouts-separator-select'
                      labelId='form-layouts-separator-select-label'
                      name='collaboratorId'
                      onChange={formik.handleChange}
                      value={formik.values.collaboratorId}
                    >
                      <MenuItem value='1'>Abdou </MenuItem>
                      <MenuItem value='2'>Redouane</MenuItem>
                      <MenuItem value='3'>Youssef</MenuItem>

                    </Select>
                  </FormControl>
                </Grid>
            )}
            
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth error={formik.touched.startDate && formik.errors.startDate}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker required name='startDate' fullWidth label="Date debut"
                    onChange={(date) => formik.setFieldValue('startDate', date ? date : null)}
                    value={formik.values.startDate} />
                </LocalizationProvider>
                {formik.touched.startDate && formik.errors.startDate && <FormHelperText style={{ color: 'red' }}>{formik.errors.startDate}</FormHelperText>}
              </FormControl>
            </Grid>

            <Grid item xs={12} sm={6}>
              <FormControl fullWidth error={formik.touched.endDate && formik.errors.endDate}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker required name='endDate' label="Date fin" onChange={(date) => formik.setFieldValue('endDate', date, true)}
                    value={formik.values.endDate} />
                </LocalizationProvider>
                {formik.touched.endDate && formik.errors.endDate && <FormHelperText style={{ color: 'red' }}>{formik.errors.endDate}</FormHelperText>}
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={role === "user" ? 12 : 6}>
              <TextField required name='achievement' type="number" fullWidth label='Réalisatioin en %' placeholder='...' onChange={formik.handleChange}
                value={formik.values.achievement} />
              {formik.touched.achievement && formik.errors.achievement && <FormHelperText style={{ color: 'red' }}>{formik.errors.achievement}</FormHelperText>}
            </Grid>
            {role==="admin" && (
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel >Status</InputLabel>
                <Select
                  required
                  label='Country'
                  defaultValue=''
                  id='form-layouts-separator-select'
                  labelId='form-layouts-separator-select-label'
                  name='status'
                  onChange={formik.handleChange}
                  value={formik.values.status}
                >
                  <MenuItem value='En cours'>En cours</MenuItem>
                  <MenuItem value='Refusé'>Réfusé</MenuItem>
                  <MenuItem value='Accepté'>Accepté</MenuItem>

                </Select>
              </FormControl>
            </Grid>
            )}

            <Grid item xs={12} sm={12}>
              <Textarea name='comment' minRows={2} label="Commentaire" placeholder='Commentaire...' onChange={formik.handleChange}
                value={formik.values.comment} />
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
  )
}

export default FormObjective
