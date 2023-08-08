import React from 'react'
// Material ui components
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import Paper from '@mui/material/Paper';
import StatusButton from '../../buttons/StatusButton';
import UpdateValidateReject from '../../icons/UpdateValidateReject';
const TableObjectives = ({rows}) => {
  return (
    <div>


      {rows.map((row) => (
        <Paper
          key={row.id}
          elevation={0}
          sx={{ marginBottom: '20px', padding: '16px', backgroundColor: 'rgb(255, 255, 255);', width: '100%' }}
        >
          <Box display="flex" flexDirection={{ xs: 'column', sm: 'row' }} justifyContent="space-between" padding="16px">
            <Box flex={1} sx={{ marginBottom: { xs: '10px', sm: '0' } }}>
              <Typography style={{ color: 'gray', marginBottom: '8px', textAlign: 'center' }}>Objective Title</Typography>
              <Typography style={{ textAlign: 'center' }}>{row.title}</Typography>
            </Box>
            <Box flex={1} sx={{ marginBottom: { xs: '10px', sm: '0' }, paddingLeft: { xs: '0', sm: '10px' } }}>
              <Typography style={{ color: 'gray', marginBottom: '8px', textAlign: 'center' }}>Interview Type</Typography>
              <Typography style={{ textAlign: 'center' }}>{row.interviewType}</Typography>
            </Box>
            <Box flex={1} sx={{ marginBottom: { xs: '10px', sm: '0' }, paddingLeft: { xs: '0', sm: '10px' } }}>
              <Typography style={{ color: 'gray', marginBottom: '8px', textAlign: 'center' }}>Achievement</Typography>
              <Typography style={{ textAlign: 'center' }}>{row.achievement}%</Typography>
            </Box>
            <Box flex={1} sx={{ marginBottom: { xs: '10px', sm: '0' }, paddingLeft: { xs: '0', sm: '10px' } }}>
              <Typography style={{ color: 'gray', marginBottom: '8px', textAlign: 'center' }}>Collaborator ID</Typography>
              <Typography style={{ textAlign: 'center' }}>{row.collaboratorId}</Typography>
            </Box>
            <Box flex={1} sx={{ paddingRight: { xs: '0', sm: '18px' } }}>
              <Typography style={{ color: 'gray', marginBottom: '8px', textAlign: 'center' }}>Status</Typography>
              <Typography style={{ textAlign: 'center' }}>
                <StatusButton textButton={row.status} />
              </Typography>
            </Box>
            <Box flex={1} sx={{ paddingLeft: { xs: '0', sm: '10px' } }}>
              <Typography style={{ color: 'gray', marginBottom: '8px', textAlign: 'center' }}>Start Date</Typography>
              <Typography style={{ textAlign: 'center' }}>{row.startDate}</Typography>
            </Box>
            <Box flex={1} sx={{ paddingLeft: { xs: '0', sm: '10px' } }}>
              <Typography style={{ color: 'gray', marginBottom: '8px', textAlign: 'center' }}>End Date</Typography>
              <Typography style={{ textAlign: 'center' }}>{row.endDate}</Typography>
            </Box>
            <Box flex={1} sx={{ paddingLeft: { xs: '0', sm: '10px' } }}>
              <Typography style={{ color: "gray", marginBottom: "8px", textAlign: 'center' }}>Actions</Typography>
              <Typography  style={{ textAlign: '-webkit-center' }}>
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
