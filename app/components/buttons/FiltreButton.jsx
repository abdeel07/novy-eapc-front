import React ,{useState} from 'react'
import Icon from '@mdi/react';
import { mdiAlignVerticalDistribute } from '@mdi/js';
import { Button } from '@mui/material';
import Filter from '../Filter';

<Icon path={mdiAlignVerticalDistribute} size={1} />
const FiltreButton = ({ handleSearch, searchField }) => {

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
    displayType: "checkbox", 
  },
  {
    title: "Status",
    data: [
      { id: "1", name: "En cours" },
      { id: "2", name: "Refusé" },
      { id: "3", name: "Accepté" },
      
    ],
    group: "2",
    displayType: "checkbox", // Example displayType (adjust according to your needs)
  },
  {
    title: "Collaborateur",
    data: [
      { id: "1", name: "Redouane" },
      { id: "2", name: "Abde" },
      { id: "3", name: "Youssef" },
  
      
    ],
    group: "3",
    displayType: "textField", 
  },
  {  
    id:12,
    title: "Type d'entretien",
    data: [
      { id: "1", name: "Performance" },
      { id: " 2", name: "Increase" },
    
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
      handleSearch={handleSearch}
      searchField={searchField}
    />
   
  )
}

export default FiltreButton
