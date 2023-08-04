import React ,{useState} from 'react'
import Icon from '@mdi/react';
import { mdiAlignVerticalDistribute } from '@mdi/js';
import { Button } from '@mui/material';
import Filter from '../Filter';

<Icon path={mdiAlignVerticalDistribute} size={1} />
const FiltreButton = () => {
  const sx={
   
  }
  const filterData = [
  {
    title: "Agences",
    data: [
      { id: "1", name: "paris" },
      { id: " 2", name: "oujda" },
      {id:"3" , name:"rabat"}
      // Add more options as needed
    ],
    group: "1",
    displayType: "checkbox", // Example displayType (adjust according to your needs)
  },
  {
    title: "Pôles",
    data: [
      { id: "1", name: "Service 1" },
      { id: "2", name: "Service 2" },
      { id: "3", name: "Service 3" },
      { id: "4", name: "Service 4" },
      // Add more options as needed
    ],
    group: "2",
    displayType: "checkbox", // Example displayType (adjust according to your needs)
  },
  {
    title: "Postes",
    data: [
      { id: "1", name: "Job 1" },
      { id: "2", name: "Job 2" },
      { id: "3", name: "Job 3" },
      { id: "4", name: "Job 4" },
      // Add more options as needed
    ],
    group: "3",
    displayType: "checkbox", // Example displayType (adjust according to your needs)
  },
  {  
    id:12,
    title: "Type de contrats",
    data: [
      { id: "1", name: "Contrat 1" },
      { id: " 2", name: "Contrat 2" },
      // Add more options as needed
    ],
    group: "4",
    displayType: "checkbox", // Example displayType (adjust according to your needs)
  },
  ];

  const criteria = 'sampleCriteria';

  // State to manage selected filters
  const [selectedFilters, setSelectedFilters] = useState({
    p: 1,
    query: '',
    // Add other initial selected filters if needed
  });

  // Function to handle search debounce
  const debounceQuery = (query) => {
    // Implement your debounce logic here
    console.log('Searching with query:', query);
  };

  // Function to reset filters
  const resetFilter = () => {
    setSelectedFilters((prevState) => ({
      ...prevState,
      p: 1,
      query: '',
      // Add other filters reset logic as needed
    }));
  };
  return (
 

      // <Button
      //   size='small' 
      //   variant="contained"
      //   style={{ borderRadius: "16px", backgroundColor: "rgba(0, 0, 0, 0.08)", color: "rgba(0, 0, 0, 0.87)" }}
      //   startIcon={<Icon path={mdiAlignVerticalDistribute} size={0.8} />}
      // >
      //   Tous les filtres
      // </Button>
      <Filter
      sx={sx}
      selectedFilters={selectedFilters}
      setSelectedFilters={setSelectedFilters}
      debounceQuery={debounceQuery}
      filterData={filterData}
      criteria={criteria}
      textFieldPlaceHolder="Search..."
      resetFilter={resetFilter}
    />
   
  )
}

export default FiltreButton
