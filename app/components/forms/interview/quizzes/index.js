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
import Typography from '@mui/material/Typography'
import { useRole } from '@/app/components/Role'
import { putRequest } from '@/app/utils/api'


// ** Icons Imports

import { useMutation } from '@tanstack/react-query';
import { postRequest } from '@/app/utils/api';
import { useFormik } from 'formik';
import { Alert, AlertTitle, FormHelperText, Snackbar } from '@mui/material'

const QuizForm = ({ handleCloseModal,data }) => {
  const {role}=useRole()
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);
  const [showErrorAlert, setShowErrorAlert] = useState(false);
  const [quizzes, setQuizzes] = useState(
   
       data.map((quiz) => ({
          id: quiz.id,
          question: quiz.question,
          answer:quiz.answer
        }))
     
  );

  const { vertical, horizontal } = { vertical: 'bottom', horizontal: 'center' };

  // Define the mutation using useMutation
  const mutation = useMutation((formData) => putRequest("quizzes/", formData));

  // Handle form submission
  const handleSubmit = async () => {
   
    try {
      await mutation.mutateAsync(quizzes);

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


  const handleAnswerChange = (index, newValue) => {
    const updatedQuizzes = [...quizzes];
    updatedQuizzes[index].answer = newValue;
    setQuizzes(updatedQuizzes);
    console.log(quizzes);
  };


  return (
    <Card sx={{ marginTop: "40px" }}>
      <CardHeader title='Questionnaire' titleTypographyProps={{ variant: 'h6' }} />
      <Divider sx={{ margin: 0 }} />

      <form onSubmit={formik.handleSubmit}>
        <CardContent>
        {quizzes.map((quiz,index) => (
            <Grid container spacing={5} key={quiz.id}>
                <Grid item xs={12} sm={12}>
                <div style={{ marginBottom: '2px',display:"flex",flexDirection:"row" }}>
                        <Typography variant="h6" sx={{ fontWeight: 'bold', marginBottom: '3px' }}>
                        Question {index+1}:
                        </Typography>
                        <Typography sx={{ marginLeft: '10px' }}>
                        {quiz.question}
                        </Typography>
                  </div>
                </Grid>
                <Grid item xs={12} sm={12}>
                <TextField
                    required
                    name='title'
                    fullWidth
                    label='Réponse'
                    placeholder='...'
                    value={quiz.answer}
                    onChange={(event) => handleAnswerChange(index, event.target.value)}
                />
                </Grid>
            </Grid>
            ))}

        
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

export default QuizForm;
