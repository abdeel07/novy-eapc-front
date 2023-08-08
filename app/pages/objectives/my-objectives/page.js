"use client"
import React,{ useState,useEffect} from 'react'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import NotificationDropdown from '../../../components/notification'
import TableObjectives from '../../../components/tables/objectives'
import FiltreButton from '../../../components/buttons/FiltreButton'
import CustomPagination from '../../../components/pagination/CustomPagination'
import {default as rows } from '../../../constantes/data.json'
import usePagination from "../../../components/pagination/Pagination";
import LeftModal from '../../../components/modals'
import FormObjective from '@/app/components/forms/objective/addObjective'
import CustomDatePicker from '../../../components/datePicker'
import AddButton from '@/app/components/buttons/AddButton'
import ExportButton from '@/app/components/buttons/exportButton/ExportButton'
import ExportForm from '@/app/components/forms/objective/exportObjective'
const ShowObjectives = () => {
    const [domLoaded, setDomLoaded] = useState(false);

    useEffect(() => {
      setDomLoaded(true);
    }, []);
 
  let [page, setPage] = useState(1);
  const PER_PAGE = 3;

  const count = Math.ceil(rows.length / PER_PAGE);
  const _DATA = usePagination(rows, PER_PAGE);

  const handleChange = (e, p) => {
    setPage(p);
    _DATA.jump(p);
  };
    
  return (
    <>
   {domLoaded && (<Grid container style={{ width: "100%" }} sx={{ display: 'flex', flexDirection: 'column',}}>
    {/* Ajouter un objectif */}
    <Grid item xs={12} >
      <Box
        sx={{
          gap: 5,
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}
      >
  
             <Box  sx={{
                  
                  display: 'flex',
                  flexDirection:"column",
                  flexWrap: 'wrap',
                  
               
                }}>
                  <Box    sx={{
                  gap: 5,
                  display: 'flex',
                  flexWrap: 'wrap',
                  alignItems: 'center',
                  justifyContent: 'space-between'
                }}>
                  <Typography variant="h5" component="h1"  sx={{ mr: 2 }}>My Objectives</Typography>
                  <NotificationDropdown></NotificationDropdown>
                  </Box>
                  <CustomDatePicker/>
            </Box>
            
  
        <Box sx={{ display: 'flex', alignItems: { xs: 'flex-start', sm: 'center' } }}>
          {/* modal form */}
          <LeftModal button={<AddButton text="Ajouter un Objectif"/>} form={<FormObjective />} />
        </Box>
      </Box>
    </Grid>
  
   
  
    {/* Table pour afficher les objectifs */}
   
    <Grid item xs={12} style={{ display: "flex", flexDirection: "column", alignItems: "end" }}>
   
    </Grid>
      <Grid sx={{ width: '100%', marginTop: '20px', justifyContent: 'center', alignItems: 'center' }}>
        <Box>
          <TableObjectives rows={_DATA} />
        </Box>
        <Box style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <CustomPagination count={count} page={page} handleChange={handleChange} />
        </Box>
      </Grid>
    </Grid>
)}
    </>
  )
}

export default ShowObjectives
