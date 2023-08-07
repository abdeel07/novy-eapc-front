import React, { useState, forwardRef } from 'react'


// ** MUI Imports
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import Button from '@mui/material/Button'
import Divider from '@mui/material/Divider'
import MenuItem from '@mui/material/MenuItem'
import TextField from '@mui/material/TextField'
import CardHeader from '@mui/material/CardHeader'
import InputLabel from '@mui/material/InputLabel'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'
import CardActions from '@mui/material/CardActions'
import FormControl from '@mui/material/FormControl'
import OutlinedInput from '@mui/material/OutlinedInput'
import InputAdornment from '@mui/material/InputAdornment'
import Select from '@mui/material/Select'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import Textarea from '@mui/joy/Textarea';



// ** Icons Imports
import EyeOutline from 'mdi-material-ui/EyeOutline'
import EyeOffOutline from 'mdi-material-ui/EyeOffOutline'

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { postRequest } from '@/app/utils/api';
import { useFormik } from 'formik';

const FormObjective = () => {

  // Define the mutation using useMutation
  const mutation = useMutation((formData) => postRequest('objective/', formData));

  // Handle form submission
  const handleSubmit = async (values, event) => {
    event.preventDefault();
    const formData = values;
    console.log('formData');
    console.log(formData);
    try {
      await mutation.mutateAsync(formData); // Start the mutation with the form data
      // Reset the form after successful submission (optional)
      event.target.reset();
    } catch (error) {
      console.error('Error submitting form:', error.message);
    }
  };

  const formik = useFormik({
    initialValues: { title: '', interviewType: '', collaboratorId: '', startDate: null, endDate: null, achievement: '', status: '', comment: '' },
    onSubmit: values => {
      handleSubmit(values, event)
    },
  });

  return (
    <Card sx={{ marginTop: "40px" }}>
      <CardHeader title='Ajouter un objectif' titleTypographyProps={{ variant: 'h6' }} />
      <Divider sx={{ margin: 0 }} />

      <form onSubmit={formik.handleSubmit}>
        <CardContent>
          <Grid container spacing={5}>
            <Grid item xs={12} sm={12}>
              <TextField name='title' fullWidth label='Nom Objectif' placeholder='...' onChange={formik.handleChange}
                value={formik.values.title} />
            </Grid>

            <Grid item xs={12} sm={12}>
              <FormControl fullWidth>
                <InputLabel >Type Entretien</InputLabel>
                <Select
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
            <Grid item xs={12} sm={12}>
              <FormControl fullWidth>
                <InputLabel >Affecté à</InputLabel>
                <Select
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
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker name='startDate' fullWidth label="Date debut"
                    onChange={(date) => formik.setFieldValue('startDate', date ? date : null)}
                    value={formik.values.startDate} />
                </LocalizationProvider>
              </FormControl>
            </Grid>

            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker name='endDate' label="Date fin" onChange={(date) => formik.setFieldValue('endDate', date, true)}
                    value={formik.values.endDate} />
                </LocalizationProvider>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField name='achievement' type="number" fullWidth label='Réalisatioin en %' placeholder='...' onChange={formik.handleChange}
                value={formik.values.achievement} />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel >Status</InputLabel>
                <Select
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
    </Card>
  )
}

export default FormObjective
