import React from 'react'
// Material ui components
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Paper from '@mui/material/Paper';
import UpdateValidateReject from '../../icons/UpdateValidateReject';

const InterviewTable = ({rows}) => {

  const formatDate = (dateString) => {
    const options = {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    };
  
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', options).format(date);
  };

  return (
    <div>
  {rows.map(row => (
 <Paper elevation={0} sx={{ marginBottom: '20px', padding: "16px", backgroundColor: "rgb(255, 255, 255);", width: "100%" }}>
 <Box display="flex" flexDirection={{ xs: 'column', sm: 'row' }} justifyContent="space-between" padding="16px">
   <Box flex={1} sx={{ marginBottom: { xs: '10px', sm: '0' } }}>
     <Typography style={{ color: "gray", marginBottom: "8px", textAlign: 'center' }}>Collaborateur</Typography>
     <Typography style={{ textAlign: 'center' }}>{row.collaboratorId}</Typography>
   </Box>
   
   <Box flex={1} sx={{ marginBottom: { xs: '10px', sm: '0' }, paddingLeft: { xs: '0', sm: '10px' } }}>
     <Typography style={{ color: "gray", marginBottom: "8px", textAlign: 'center' }}>Type entretien</Typography>
     <Typography style={{ textAlign: 'center' }}>{row.type}</Typography>
   </Box>
   <Box flex={1} sx={{ marginBottom: { xs: '10px', sm: '0' }, paddingLeft: { xs: '0', sm: '10px' } }}>
     <Typography style={{ color: "gray", marginBottom: "8px", textAlign: 'center' }}>Date d'entretien</Typography>
     <Typography style={{ textAlign: 'center' }}>{formatDate(row.date)}</Typography>
   </Box>
   
   <Box flex={1} sx={{ paddingRight: { xs: '0', sm: '18px' } }}>
     <Typography style={{ color: "gray", marginBottom: "8px", textAlign: 'center' }}>Commentaire</Typography>
     <Typography style={{ textAlign: 'center' }}>{row.notice}</Typography>
   </Box>
   <Box flex={1} sx={{ paddingLeft: { xs: '0', sm: '20px' } }}>
     <Typography style={{ color: "gray", marginBottom: "8px", textAlign: 'center' }}>Actions</Typography>
     <Typography style={{ textAlign: '-webkit-center' }}>
       <UpdateValidateReject />
     </Typography>
   </Box>
 </Box>
</Paper>

       ))}
 </div>
  )
}

export default InterviewTable
