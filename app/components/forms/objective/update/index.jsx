import { putRequest } from '@/app/utils/api';
import { useMutation } from '@tanstack/react-query';
import { useFormik } from 'formik';
import React from 'react'

function UpdateObjective({ objective, id }) {

    const mutation = useMutation((formData) => putRequest('objective/' + { id }, formData));

    // Handle form submission
    const handleSubmit = async (values, event) => {
        event.preventDefault();
        const formData = values;

        try {
            await mutation.mutateAsync(formData);
            event.target.reset();
        } catch (error) {
            console.error('Error submitting form:', error.message);
        }
    };

    const formik = useFormik({
        initialValues: {
            title: objective.title,
            interviewType: objective.interviewType,
            collaboratorId: objective.collaboratorId,
            startDate: objective.startDate,
            endDate: startDate.endDate,
            achievement: startDate.achievement,
            status: startDate.status,
            comment: startDate.comment
        },

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

            return errors;
        },

        onSubmit: values => {
            handleSubmit(values, event)
        },
    });

    return (
        <Card sx={{ marginTop: "40px" }}>
            <CardHeader title='Modifier un objectif' titleTypographyProps={{ variant: 'h6' }} />
            <Divider sx={{ margin: 0 }} />

            <form onSubmit={formik.handleSubmit}>
                <CardContent>
                    <Grid container spacing={5}>
                        <Grid item xs={12} sm={12}>
                            <TextField required name='title' fullWidth label='Nom Objectif' placeholder='...' onChange={formik.handleChange}
                                value={formik.values.title} />
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
                        <Grid item xs={12} sm={6}>
                            <FormControl fullWidth error={formik.touched.startDate && formik.errors.startDate}>
                                <LocalizationProvider dateAdapter={AdapterDayjs}>
                                    <DatePicker required name='startDate' fullWidth label="Date debut"
                                        onChange={(date) => formik.setFieldValue('startDate', date ? date : null)}
                                        value={formik.values.startDate} />
                                </LocalizationProvider>
                                {formik.touched.startDate && formik.errors.startDate && <FormHelperText>{formik.errors.startDate}</FormHelperText>}
                            </FormControl>
                        </Grid>

                        <Grid item xs={12} sm={6}>
                            <FormControl fullWidth error={formik.touched.endDate && formik.errors.endDate}>
                                <LocalizationProvider dateAdapter={AdapterDayjs}>
                                    <DatePicker required name='endDate' label="Date fin" onChange={(date) => formik.setFieldValue('endDate', date, true)}
                                        value={formik.values.endDate} />
                                </LocalizationProvider>
                                {formik.touched.endDate && formik.errors.endDate && <FormHelperText>{formik.errors.endDate}</FormHelperText>}
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField required name='achievement' type="number" fullWidth label='Réalisatioin en %' placeholder='...' onChange={formik.handleChange}
                                value={formik.values.achievement} />
                        </Grid>
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

export default UpdateObjective