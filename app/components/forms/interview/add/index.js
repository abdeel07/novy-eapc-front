"use client"

import React ,{useState,useEffect} from 'react'
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
import FormControl from '@mui/material/FormControl'
import { IconButton } from '@mui/material'
import Select from '@mui/material/Select'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import Textarea from '@mui/joy/Textarea';
import Icon from '@mdi/react';
import { mdiPlus, mdiMinus } from '@mdi/js';
import TableObjectives from '@/app/components/tables/objectives'
import { countBy } from 'lodash'
import usePagination from "@/app/components/pagination/Pagination";
import CustomPagination from '@/app/components/pagination/CustomPagination'


const FormInterview = () => {
  // ** States
  const [language, setLanguage] = useState([])
  const [date, setDate] = useState(null);
  const [Question,setQuestion]=useState([]);
  const [questionFields, setQuestionFields] = useState(['']); // Initial state with an empty TextField for "Questionnaire" Card
  const [accomplishmentFields, setAccomplishmentFields] = useState(['']); // Initial state with an empty TextField for "Accomplissement" Card
  const [domLoaded, setDomLoaded] = useState(false);


  const data = [
    {
      "realisation": 90,
      "status": "current",
      "type_entretien": "Performance",
      "collaborateur": "Redouane MRABET",
      "duree": "4 months",
      "objectif_name": "finish the project"
    },
    {
      "realisation": 99,
      "type_entretien": "Perfomance",
      "duree": "3 months",
      "status": "done",
      "collaborateur": "Akhenchi Asmae",
      "objectif_name": "Data science & cloud computing option"
    }
  ];
  useEffect(() => {
    setDomLoaded(true);
  }, []);

  let [page, setPage] = useState(1);
  const PER_PAGE = 1;

  const count = Math.ceil(data.length / PER_PAGE);
  const _DATA = usePagination(data, PER_PAGE);

  const handleChange = (e, p) => {
    setPage(p);
    _DATA.jump(p);
  };
  const handleAddQuestionField = () => {
    setQuestionFields([...questionFields, '']); // Add an empty TextField to the "Questionnaire" Card state
  };

  const handleRemoveQuestionField = (index) => {
    if(questionFields.length!=1){
    const newFields = [...questionFields];
      newFields.splice(index, 1); // Remove the TextField at the specified index for "Questionnaire" Card
      setQuestionFields(newFields);
    }
  };

  const handleQuestionFieldChange = (index, value) => {
    const newFields = [...questionFields];
    newFields[index] = value; // Update the TextField value at the specified index for "Questionnaire" Card
    setQuestionFields(newFields);
  };

  const handleAddAccomplishmentField = () => {
    setAccomplishmentFields([...accomplishmentFields, '']); // Add an empty TextField to the "Accomplissement" Card state
  };

  const handleRemoveAccomplishmentField = (index) => {
    if(accomplishmentFields.length!=1){
    const newFields = [...accomplishmentFields];
    newFields.splice(index, 1); // Remove the TextField at the specified index for "Accomplissement" Card
    setAccomplishmentFields(newFields);
    }
  };

  const handleAccomplishmentFieldChange = (index, value) => {
    const newFields = [...accomplishmentFields];
    newFields[index] = value; // Update the TextField value at the specified index for "Accomplissement" Card
    setAccomplishmentFields(newFields);
  };


  


  

  return (
    <>
  {domLoaded && (
    <Card sx={{marginTop:"40px"}}>
      <CardHeader title='Ajouter un entretien' titleTypographyProps={{ variant: 'h6' }} />
      <Divider sx={{ margin: 0 }} />
      <form onSubmit={e => e.preventDefault()}>
        <CardContent>
          <Grid container spacing={5}>
            
          
            
          <Grid item xs={12} sm={6}>
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
            <Grid item xs={12} sm={6}>
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
                  <DatePicker fullWidth label="Date d'entretien"/>
              </LocalizationProvider>
            </FormControl>
            </Grid>

          
          
            <Grid item xs={12} sm={6}>
            <Textarea minRows={2} label="Commentaire" placeholder='Commentaire...'/>
            </Grid>
            <Grid item xs={12} sm={6}>
                  <Card >
                        <CardHeader title='Questionnaire' titleTypographyProps={{ variant: 'h6' }} style={{backgroundColor:"rgb(248, 248, 248)"}}/>
                        <Divider sx={{ margin: 0 }} />
                        <CardContent>
                        <Grid item xs={12} sm={12} style={{display:"flex",flexDirection:"column"}}>
                        {questionFields.map((text, index) => (
                            <Grid item xs={12} sm={12} style={{ display: 'flex', flexDirection: 'row' }} key={index}>
                              <TextField
                                fullWidth
                                label={"Question "+(index+1)}
                                placeholder="..."
                                value={text}
                                style={{marginBottom:"8px"}}
                                onChange={(e) => handleQuestionFieldChange(index, e.target.value)}
                              />
                               {questionFields.length !== 1 &&
                              <IconButton style={{ marginLeft: '7px',padding:"10px" }} onClick={() => handleRemoveQuestionField(index)}>
                                <Icon path={mdiMinus} size={0.8} />
                              </IconButton>}
                              {index+1==questionFields.length &&
                                 <IconButton onClick={handleAddQuestionField}>
                                 <Icon path={mdiPlus} size={0.8} />
                               </IconButton>
                              }
                            </Grid>
                          ))}
                       </Grid>
                   </CardContent>
                 </Card>
            </Grid>

            <Grid item xs={12} sm={6}>
                  <Card >
                    <CardHeader title='Accomplissement' titleTypographyProps={{ variant: 'h6' }} style={{backgroundColor:"rgb(248, 248, 248)"}}/>
                      <Divider sx={{ margin: 0 }} />
                      <CardContent>
                        <Grid item xs={12} sm={12} style={{display:"flex",flexDirection:"column"}}>
                        {accomplishmentFields.map((text, index) => (
                            <Grid item xs={12} sm={12} style={{ display: 'flex', flexDirection: 'row' }} key={index}>
                              <TextField
                                fullWidth
                                label={"Accomplissement "+(index+1)}
                                placeholder="..."
                                value={text}
                                style={{marginBottom:"8px"}}
                                onChange={(e) => handleAccomplishmentFieldChange(index, e.target.value)}
                              />
                              {accomplishmentFields.length !== 1 &&
                              <IconButton style={{ marginLeft: '7px' }} onClick={() => handleRemoveAccomplishmentField(index)}>
                                <Icon path={mdiMinus} size={1} />
                              </IconButton>}
                              {index+1==accomplishmentFields.length &&
                                 <IconButton onClick={handleAddAccomplishmentField}>
                                 <Icon path={mdiPlus} size={1} />
                               </IconButton>
                              }
                            </Grid>
                          ))}
                       
                       </Grid>
                   </CardContent>
                 </Card>
            </Grid>
            <Grid item xs={12} sm={12}>
                  <Card >
                    <CardHeader title='Objectives' titleTypographyProps={{ variant: 'h6' }} style={{backgroundColor:"rgb(248, 248, 248)"}}/>
                      <Divider sx={{ margin: 0 }} />
                      <CardContent style={{backgroundColor:"rgb(248, 248, 248)"}}>
                        <Grid item xs={12} sm={12} style={{marginRight:"20px"}}>
                        <TableObjectives rows={_DATA} />
                        <Grid style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                          <CustomPagination count={count} page={page} handleChange={handleChange} />
                        </Grid>
                        </Grid>
                   </CardContent>
                 </Card>
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
    )}
    </>
  )
}

export default FormInterview
