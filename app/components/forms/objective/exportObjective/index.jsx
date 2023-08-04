import React ,{useState} from 'react'


// ** MUI Imports
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import Button from '@mui/material/Button'
import Divider from '@mui/material/Divider'
import MenuItem from '@mui/material/MenuItem'
import TextField from '@mui/material/TextField'
import CardHeader from '@mui/material/CardHeader'
import InputLabel from '@mui/material/InputLabel'

import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'
import CardActions from '@mui/material/CardActions'
import FormControl from '@mui/material/FormControl'

import Select from '@mui/material/Select'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';


const ExportForm = () => {
    
    const [language, setLanguage] = useState([])
    const [date, setDate] = useState(null)
  
   
  

  
   
  
   
  
 
  
  
    return (
      <Card sx={{marginTop:"40px"}}>
       
        <form onSubmit={e => e.preventDefault()}>
          <CardContent>
            <Grid container spacing={5}>
              
             
            
              
             
            
              <Grid item xs={12} sm={12}>
                <Typography>
                    Veuillez sélectionner la période
                </Typography>
              </Grid>
              
              <Grid item xs={12} sm={12}>
              <FormControl fullWidth>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker fullWidth label="De"/>
                </LocalizationProvider>
              </FormControl>
              </Grid>
  
              <Grid item xs={12} sm={12}>
              <FormControl fullWidth>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                   <DatePicker  label="A"/>
              </LocalizationProvider>
              </FormControl>
              </Grid>
              
         
    
              
           
            </Grid>
          </CardContent>
          <Divider sx={{ margin: 0 }} />
          <CardActions sx={{paddingLeft:"18px",justifyContent:"space-between"}}>

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
            <Button
                size="large"
                type="submit"
                sx={{
                  flex: 1, // Use flex property to make the button expand and fill the available space
             
                  maxWidth: "140px",
                  backgroundColor: "rgb(255, 6, 126)",
                  color: "white",
                  "&:hover": {
                    backgroundColor: "rgba(255, 6, 126, 0.8)",
                  },
                }}
                >
                    EXPORTER
         </Button>
  
            
          </CardActions>
        </form>
      </Card>
    )
}

export default ExportForm
