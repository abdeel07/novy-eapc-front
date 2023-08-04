import React from 'react'
// Material ui components
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import Paper from '@mui/material/Paper';
import StatusButton from '../buttons/StatusButton';
import UpdateValidateReject from '../icons/UpdateValidateReject';
const TableObjectives = ({ rows }) => {
  return (
    <div>
      {/* <Paper elevation={0}  sx={{ marginBottom: '20px',padding:"16px",backgroundColor:"rgb(240, 233, 238);",width:"100%" }}>
    <Box display="flex" justifyContent="space-between" padding="16px">
    <Box flex={1}>
      <Typography>Collaborateur</Typography>
      </Box>
      <Box flex={1}>
      <Typography>Nom Objectif</Typography>
      </Box>
      <Box flex={1}>
      <Typography>Type entretien</Typography>
      </Box>
      <Box flex={1}>
      <Typography>Durée</Typography>
      </Box>
      <Box flex={1}>
      <Typography>Réalisation</Typography>
      </Box>
      <Box flex={1}>
      <Typography>Status</Typography>
      </Box>
      <Box flex={1}>
      <Typography>Actions</Typography>
      </Box>

    </Box>
  </Paper> */}


      {rows?.map((row) => (
        <Paper
          key={row.id}
          elevation={0}
          sx={{ marginBottom: '20px', padding: '16px', backgroundColor: 'rgb(255, 255, 255);', width: '100%' }}
        >
          <Box display="flex" flexDirection={{ xs: 'column', sm: 'row' }} justifyContent="space-between" padding="16px">
            <Box flex={1} sx={{ marginBottom: { xs: '10px', sm: '0' } }}>
              <Typography style={{ color: 'gray', marginBottom: '8px' }}>Objective Title</Typography>
              <Typography>{row.title}</Typography>
            </Box>
            <Box flex={1} sx={{ marginBottom: { xs: '10px', sm: '0' }, paddingLeft: { xs: '0', sm: '10px' } }}>
              <Typography style={{ color: 'gray', marginBottom: '8px' }}>Interview Type</Typography>
              <Typography>{row.interviewType}</Typography>
            </Box>
            <Box flex={1} sx={{ marginBottom: { xs: '10px', sm: '0' }, paddingLeft: { xs: '0', sm: '10px' } }}>
              <Typography style={{ color: 'gray', marginBottom: '8px' }}>Achievement</Typography>
              <Typography>{row.achievement}</Typography>
            </Box>
            <Box flex={1} sx={{ marginBottom: { xs: '10px', sm: '0' }, paddingLeft: { xs: '0', sm: '10px' } }}>
              <Typography style={{ color: 'gray', marginBottom: '8px' }}>Collaborator ID</Typography>
              <Typography>{row.collaboratorId}</Typography>
            </Box>
            <Box flex={1} sx={{ marginBottom: { xs: '10px', sm: '0' }, paddingLeft: { xs: '0', sm: '10px' } }}>
              <Typography style={{ color: 'gray', marginBottom: '8px' }}>Comment</Typography>
              <Typography>{row.comment}</Typography>
            </Box>
            <Box flex={1} sx={{ paddingRight: { xs: '0', sm: '18px' } }}>
              <Typography style={{ color: 'gray', marginBottom: '8px' }}>Status</Typography>
              <Typography>
                <StatusButton textButton={row.status} />
              </Typography>
            </Box>
            <Box flex={1} sx={{ paddingLeft: { xs: '0', sm: '10px' } }}>
              <Typography style={{ color: 'gray', marginBottom: '8px' }}>Start Date</Typography>
              <Typography>{row.startDate}</Typography>
            </Box>
            <Box flex={1} sx={{ paddingLeft: { xs: '0', sm: '10px' } }}>
              <Typography style={{ color: 'gray', marginBottom: '8px' }}>End Date</Typography>
              <Typography>{row.endDate}</Typography>
            </Box>
            <Box flex={1} sx={{ paddingLeft: { xs: '0', sm: '10px' } }}>
              <Typography style={{ color: "gray", marginBottom: "8px" }}>Actions</Typography>
              <Typography>
                <UpdateValidateReject />
              </Typography>
            </Box>
          </Box>
        </Paper>

      ))}
    </div>
  )
}

export default TableObjectives
