import React ,{useState,forwardRef} from 'react'


// ** MUI Imports
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import Button from '@mui/material/Button'
import Divider from '@mui/material/Divider'
import MenuItem from '@mui/material/MenuItem'
import TextField from '@mui/material/TextField'
import CardHeader from '@mui/material/CardHeader'
import InputLabel from '@mui/material/InputLabel'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'
import CardActions from '@mui/material/CardActions'
import FormControl from '@mui/material/FormControl'
import OutlinedInput from '@mui/material/OutlinedInput'
import InputAdornment from '@mui/material/InputAdornment'
import Select from '@mui/material/Select'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import Textarea from '@mui/joy/Textarea';



// ** Icons Imports
import EyeOutline from 'mdi-material-ui/EyeOutline'
import EyeOffOutline from 'mdi-material-ui/EyeOffOutline'



const FormObjective = () => {
  // ** States
  const [language, setLanguage] = useState([])
  const [date, setDate] = useState(null)

  const [values, setValues] = useState({
    password: '',
    password2: '',
    showPassword: false,
    showPassword2: false
  })

  // Handle Password
  const handlePasswordChange = prop => event => {
    setValues({ ...values, [prop]: event.target.value })
  }


  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword })
  }

  const handleMouseDownPassword = event => {
    event.preventDefault()
  }

  // Handle Confirm Password
  const handleConfirmChange = prop => event => {
    setValues({ ...values, [prop]: event.target.value })
  }

  const handleClickShowConfirmPassword = () => {
    setValues({ ...values, showPassword2: !values.showPassword2 })
  }

  const handleMouseDownConfirmPassword = event => {
    event.preventDefault()
  }

  // Handle Select
  const handleSelectChange = event => {
    setLanguage(event.target.value)
  }

  return (
    <Card sx={{marginTop:"40px"}}>
      <CardHeader title='Ajouter un objectif' titleTypographyProps={{ variant: 'h6' }} />
      <Divider sx={{ margin: 0 }} />
      <form onSubmit={e => e.preventDefault()}>
        <CardContent>
          <Grid container spacing={5}>
            
          
            
            <Grid item xs={12} sm={12}>
              <TextField fullWidth label='Nom Objectif' placeholder='...' />
            </Grid>
          
            <Grid item xs={12} sm={12}>
              <FormControl fullWidth>
                <InputLabel >Type Entretien</InputLabel>
                <Select
                  label='Country'
                  defaultValue=''
                  id='form-layouts-separator-select'
                  labelId='form-layouts-separator-select-label'
                >
                  <MenuItem value=''>Performance</MenuItem>
                  <MenuItem value=''>Evaluation</MenuItem>
                  
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={12}>
              <FormControl fullWidth>
                <InputLabel >Affecté à</InputLabel>
                <Select
                  label='Country'
                  defaultValue=''
                  id='form-layouts-separator-select'
                  labelId='form-layouts-separator-select-label'
                >
                  <MenuItem value=''>Abde </MenuItem>
                  <MenuItem value=''>Redouane</MenuItem>
                  <MenuItem value=''>Youssef</MenuItem>
                  
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
            <FormControl fullWidth>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker fullWidth label="Date debut"/>
              </LocalizationProvider>
            </FormControl>
            </Grid>

            <Grid item xs={12} sm={6}>
            <FormControl fullWidth>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                 <DatePicker  label="Date fin"/>
            </LocalizationProvider>
            </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField type="number" fullWidth label='Réalisatioin en %' placeholder='...' />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel >Status</InputLabel>
                <Select
                  label='Country'
                  defaultValue=''
                  id='form-layouts-separator-select'
                  labelId='form-layouts-separator-select-label'
                >
                  <MenuItem value='En cours'>En cours</MenuItem>
                  <MenuItem value='Refusé'>Réfusé</MenuItem>
                  <MenuItem value='Accepté'>Accepté</MenuItem>
                  
                </Select>
              </FormControl>
            </Grid>
  
            <Grid item xs={12} sm={12}>
            <Textarea minRows={2} label="Commentaire" placeholder='Commentaire...'/>
            </Grid>
         
          </Grid>
        </CardContent>
        <Divider sx={{ margin: 0 }} />
        <CardActions sx={{paddingLeft:"18px"}}>
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

export default FormObjective
