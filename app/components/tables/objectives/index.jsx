import React from 'react'
// Material ui components
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Paper from '@mui/material/Paper';
import StatusButton from '../../buttons/StatusButton';
import LeftModal from '../../modals';
import UpdateObjective from '../../forms/objective/update';
import UpdateButton from '../../buttons/UpdateButton';

const TableObjectives = ({ rows }) => {

  const formatDate = (dateString) => {
    const options = {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit'
    };

    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', options).format(date);
  };
  return (
    <div>


      {rows?.map((row) => (
        <Paper
          key={row.id}
          elevation={0}
          sx={{ marginBottom: '20px', padding: '16px', backgroundColor: 'rgb(255, 255, 255);', width: '100%' }}
        >
          <Box display="flex" flexDirection={{ xs: 'column', sm: 'row' }} justifyContent="space-between" padding="16px">
            <Box flex={1} sx={{ marginBottom: { xs: '10px', sm: '0' } }}>
              <Typography style={{ color: 'gray', marginBottom: '8px', textAlign: 'center' }}>Titre de l'objectif</Typography>
              <Typography style={{ textAlign: 'center' }}>{row.title}</Typography>
            </Box>
            <Box flex={1} sx={{ marginBottom: { xs: '10px', sm: '0' }, paddingLeft: { xs: '0', sm: '10px' } }}>
              <Typography style={{ color: 'gray', marginBottom: '8px', textAlign: 'center' }}>Type d'entretien</Typography>
              <Typography style={{ textAlign: 'center' }}>{row.interviewType}</Typography>
            </Box>
            <Box flex={1} sx={{ marginBottom: { xs: '10px', sm: '0' }, paddingLeft: { xs: '0', sm: '10px' } }}>
              <Typography style={{ color: 'gray', marginBottom: '8px', textAlign: 'center' }}>Réalisation</Typography>
              <Typography style={{ textAlign: 'center' }}>{row.achievement}%</Typography>
            </Box>
            <Box flex={1} sx={{ marginBottom: { xs: '10px', sm: '0' }, paddingLeft: { xs: '0', sm: '10px' } }}>
              <Typography style={{ color: 'gray', marginBottom: '8px', textAlign: 'center' }}>Collaborateur</Typography>
              <Typography style={{ textAlign: 'center' }}>{row.collaboratorName}</Typography>
            </Box>
            <Box flex={1} sx={{ paddingRight: { xs: '0', sm: '18px' } }}>
              <Typography style={{ color: 'gray', marginBottom: '8px', textAlign: 'center' }}>Statut</Typography>
              <Typography style={{ textAlign: 'center' }}>
                <StatusButton textButton={row.status} />
              </Typography>
            </Box>
            <Box flex={1} sx={{ paddingLeft: { xs: '0', sm: '10px' } }}>
              <Typography style={{ color: 'gray', marginBottom: '8px', textAlign: 'center' }}>Date de début</Typography>
              <Typography style={{ textAlign: 'center' }}>{formatDate(row.startDate)}</Typography>
            </Box>
            <Box flex={1} sx={{ paddingLeft: { xs: '0', sm: '10px' } }}>
              <Typography style={{ color: 'gray', marginBottom: '8px', textAlign: 'center' }}>Date de fin</Typography>
              <Typography style={{ textAlign: 'center' }}>{formatDate(row.endDate)}</Typography>
            </Box>
            <Box flex={1} sx={{ paddingLeft: { xs: '0', sm: '10px' } }}>
              <Typography style={{ color: "gray", marginBottom: "8px", textAlign: 'center' }}>Actions</Typography>

              <LeftModal
                button={ <UpdateButton />}
                form={<UpdateObjective objective={row} id={row.id} />}
              />
            </Box>
          </Box>
        </Paper>

      ))}
    </div>
  )
}

export default TableObjectives
