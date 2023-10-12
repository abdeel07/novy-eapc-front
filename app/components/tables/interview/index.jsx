import React from 'react'
// Material ui components
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Paper from '@mui/material/Paper';
import { useRouter } from 'next/navigation';
import IconButton from '@mui/material/IconButton'
import TaskAltIcon from '@mui/icons-material/TaskAlt';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import VisibilityIcon from '@mui/icons-material/Visibility';
import ControlPointIcon from '@mui/icons-material/ControlPoint';
import LeftModal from '../../modals';
import QuizForm from '../../forms/interview/quizzes';
import UpdateButton from '../../buttons/UpdateButton';
import AccomplishementForm from '../../forms/interview/accomplissement';
const InterviewTable = ({ rows, role }) => {
  const router = useRouter();

  const formatDate = (dateString) => {
    if (!dateString) {
      return ''; // Handle the case where dateString is empty or undefined
    }
  
    const options = {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit'
    };
  
    const date = new Date(dateString);
    if (isNaN(date)) {
      return ''; // Handle the case where date is invalid
    }
  
    return new Intl.DateTimeFormat('en-US', options).format(date);
  };
  
  
  return (
    <div>
      {rows?.map(row => (
        <Paper elevation={0} sx={{
          marginBottom: '20px', padding: "16px", backgroundColor: "rgb(255, 255, 255);", width: "100%",
          borderLeft: `5px solid ${row.type === "Increase" ? "rgb(236, 64, 122)" : "rgb(41, 182, 246)"}`, borderRight: "5px solid white"
        }}>
          <Box display="flex" flexDirection={{ xs: 'column', sm: 'row' }} justifyContent="space-between" padding="16px">
            {role=="admin" &&
            
            (
                  <Box flex={1} sx={{ marginBottom: { xs: '10px', sm: '0' } }}>
                  <Typography style={{ color: "gray", marginBottom: "8px", textAlign: 'center' }}>Collaborateur</Typography>
                  <Typography style={{ textAlign: 'center' }}>{row.collaboratorName}</Typography>
                </Box>
            )}
           

            <Box flex={1} sx={{ marginBottom: { xs: '10px', sm: '0' }, paddingLeft: { xs: '0', sm: '10px' } }}>
              <Typography style={{ color: "gray", marginBottom: "8px", textAlign: 'center' }}>Type entretien</Typography>
              <Typography style={{ textAlign: 'center' }}>{row.type}</Typography>
            </Box>
            <Box flex={1} sx={{ marginBottom: { xs: '10px', sm: '0' }, paddingLeft: { xs: '0', sm: '10px' } }}>
              <Typography style={{ color: "gray", marginBottom: "8px", textAlign: 'center' }}>Date d'entretien</Typography>
              <Typography style={{ textAlign: 'center' }}>{formatDate(row.date)}</Typography>
            </Box>
              {role === "user" && (
              <Box flex={1} sx={{ marginBottom: { xs: '10px', sm: '0' }, paddingLeft: { xs: '0', sm: '10px' } }}>
                <Typography style={{ color: "gray", marginBottom: "8px", textAlign: 'center' }}>Questionnaire</Typography>
                {row.statusAnswer ? (
                <div style={{ display: 'flex', flexDirection: 'row', justifyContent: "center" }}>
                  <Typography style={{ textAlign: 'center' ,color:"rgb(255, 6, 126)",marginRight:"4px"}}>pas encore répondu</Typography>
                  <LeftModal
                  button={<UpdateButton />}
                  form={<QuizForm data={row.quizzes} />}
                />
                  
                  </div>
                ) : (
                  <div style={{ display: 'flex', flexDirection: 'row', justifyContent: "center" }}>
                       <IconButton type='submit' aria-label="update" size="small" >
                  <TaskAltIcon fontSize="small" style={{color:"rgb(41, 182, 246)"}}/>
                  </IconButton>
                {console.log(row.statusAnswer)}
                  <LeftModal
                  button={<UpdateButton />}
                  form={<QuizForm data={row.quizzes} />}
                />
                  
                  </div>
                )}
              </Box>
            )}


            <Box flex={1} sx={{ paddingRight: { xs: '0', sm: '18px' } }}>
              <Typography style={{ color: "gray", marginBottom: "8px", textAlign: 'center' }}>Accomplissement</Typography>
              <Typography style={{ textAlign: 'center' }}>
              <LeftModal
                  button={<UpdateButton />}
                  form={<AccomplishementForm data={row.fulfillments} interviewId={row.id}/>}
                />
              </Typography>
            </Box>
            <Box flex={1} sx={{ paddingLeft: { xs: '0', sm: '20px' } }}>
              {role === 'admin' ? (
                <Typography style={{ color: 'gray', marginBottom: '8px', textAlign: 'center' }}>
                  Actions
                </Typography>
              ) : (
                <Typography style={{ color: 'gray', marginBottom: '8px', textAlign: 'center' }}>
                  Status
                </Typography>
              )}
              <div style={{ display: 'flex', flexDirection: 'row', justifyContent: "center" }}>
                {role === "admin" && <UpdateButton handleOpen={() =>
                  router.push(`/pages/interview/update-interview/${row.id}`)
                } />}
                {role === "admin" && <IconButton type='submit' aria-label="update" size="small" >
                  <DeleteForeverIcon fontSize="small" style={{ color: "rgb(255, 6, 126)" }} />
                </IconButton>}
                <IconButton type='submit' aria-label="update" size="small" >
                  <TaskAltIcon fontSize="small"
                  />
                </IconButton>
             
               
              </div>
            </Box>
          </Box>
        </Paper>

      ))}
    </div>
  )
}

export default InterviewTable
