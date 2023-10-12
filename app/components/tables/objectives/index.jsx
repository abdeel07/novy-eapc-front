import React, { useState } from 'react'
// Material ui components
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Paper from '@mui/material/Paper';
import StatusButton from '../../buttons/StatusButton';
import LeftModal from '../../modals';
import UpdateObjective from '../../forms/objective/update';
import UpdateButton from '../../buttons/UpdateButton';
import { Alert, AlertTitle, IconButton, Snackbar } from '@mui/material';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import TaskAltIcon from '@mui/icons-material/TaskAlt';
import { deleteRequest, putRequest } from '@/app/utils/api';
import { useMutation } from '@tanstack/react-query';

const TableObjectives = ({ rows,action ,role,refetch}) => {

  const formatDate = (dateString) => {
    const options = {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit'
    };

    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', options).format(date);
  };

  const deleteMutation = useMutation(deleteRequest);
  const validateMutation = useMutation(({ url, data }) => putRequest(url, data));

  const handleDelete = async (id) => {
    try {
      // Perform the mutation
      await deleteMutation.mutateAsync('objective/' + id);

      setShowSuccessAlert(true);
    } catch (error) {
      console.log(error);
    }
  };

  const [showSuccessAlert, setShowSuccessAlert] = useState(false);
  const vertical = 'bottom';
  const horizontal = 'center';

  const handleValide = async (row) => {
    try {
      row.status = 'Accepté';

      const data = {
        title: row?.title,
        interviewType: row?.interviewType,
        interviewId: row?.interviewId,
        collaboratorId: row?.collaboratorId,
        startDate: row?.startDate,
        endDate: row?.endDate,
        achievement: row?.achievement,
        status: row?.status,
        comment: row?.comment,
      };

      await validateMutation.mutateAsync({ url: 'objective/' + row.id, data: data });

      setShowSuccessAlert(true);
    } catch (error) {
      console.log(error);
    }finally{
      refetch();
    }
  }

  return (
    <div>
      {rows?.map((row) => (
        <Paper
          key={row.id}
          elevation={0}
          sx={{ marginBottom: '20px', padding: '16px', backgroundColor: 'rgb(255, 255, 255);', width: '100%' }}
        >
          <Box display="flex" flexDirection={{ xs: 'column', sm: 'row' }} justifyContent="space-between" padding="16px">
            <Box flex={1} sx={{ marginBottom: { xs: '10px', sm: '0' }, paddingLeft: { xs: '0', sm: '10px' } }}>
              <Typography style={{ color: 'gray', marginBottom: '8px', textAlign: 'center' }}>Collaborateur</Typography>
              <Typography style={{ textAlign: 'center' }}>{row.collaboratorName}</Typography>
            </Box>
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
              <Typography style={{ textAlign: 'center', color: row.achievement < 30 ? 'rgb(255, 6, 126)' : row.achievement < 60 ? 'rgb(235, 156, 38)' : 'rgb(41, 182, 246)' }}>
                {row.achievement}%
              </Typography>
           </Box>
            <Box flex={1} sx={{ paddingRight: { xs: '0', sm: '18px' } }}>
              <Typography style={{ color: 'gray', marginBottom: '8px', textAlign: 'center' }}>Statut</Typography>
              <Typography style={{ alignItems: 'center' }}>
                <StatusButton text={row.status} />
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
            {action && (
            <Box flex={1} sx={{ paddingLeft: { xs: '0', sm: '10px' } }}>
              <Typography style={{ color: "gray", marginBottom: "8px", textAlign: 'center' }}>Actions</Typography>

              <div style={{ display: 'flex', flexDirection: 'row', justifyContent: "center" }}>

                <LeftModal
                  button={<UpdateButton />}
                  form={<UpdateObjective objective={row} />}
                />

                <IconButton type='submit' aria-label="update" size="small" onClick={() => handleDelete(row.id)}>
                  <DeleteForeverIcon fontSize="small" style={{color:"rgb(255, 6, 126)"}}/>
                </IconButton>

                {showSuccessAlert && (
                  <Snackbar
                    open={showSuccessAlert}
                    autoHideDuration={3000}
                    onClose={() => setShowSuccessAlert(false)}
                    anchorOrigin={{ vertical, horizontal }}
                    key={vertical + horizontal}
                  >
                    <Alert severity="success" sx={{ width: '100%' }}>
                      <AlertTitle>Supprimé avec succès</AlertTitle>
                    </Alert>
                  </Snackbar>
                )}
                    {role==="admin" &&( 
                        <IconButton type='submit' aria-label="update" size="small" onClick={() => handleValide(row)}>
                        <TaskAltIcon fontSize="small"
                       style={{
                        color: row.status === 'Accepté' ? 'rgb(38, 116, 233)' : row.status === 'Refusé' ? 'rgb(255, 0, 0)' : ''
                      }}
                      
                      />
                      </IconButton>
                    )}
              

                {showSuccessAlert && (
                  <Snackbar
                    open={showSuccessAlert}
                    autoHideDuration={3000}
                    onClose={() => setShowSuccessAlert(false)}
                    anchorOrigin={{ vertical, horizontal }}
                    key={vertical + 1 + horizontal + 1}
                  >
                    <Alert severity="success" sx={{ width: '100%' }}>
                      <AlertTitle>Validé avec succès</AlertTitle>
                    </Alert>
                  </Snackbar>
                )}

              </div>
            </Box>
            )}
          </Box>
        </Paper>

      ))}
    </div>
  )
}

export default TableObjectives
