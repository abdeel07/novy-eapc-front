import React ,{useState} from 'react'
import Icon from '@mdi/react';
import { mdiAlignVerticalDistribute } from '@mdi/js';
import { Button } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import { getRequest } from '@/app/utils/api';
import Filter from '../../Filter';
import xor from "lodash/xor";


<Icon path={mdiAlignVerticalDistribute} size={1} />
const FiltreButton = ({ handleSearch, searchField,updateSelectedFilterValues,filterData}) => {
  const [selectedFilterValues, setSelectedFilterValues] = useState({});


  const criteria = filterData[0]?.group ;
  const sx={};

  const [selectedFilters, setSelectedFilters] = useState({
    status: [],
    collaborateurs: [],
    types_interview: [],
  });
  const onFilter=()=>{
 
  }

  const debounceQuery = (updatedSelectedFilters) => {
    console.log('Searching with query:');
    const newSelectedFilterValues = {};
  
    filterData.forEach((filterGroup) => {
      const { group, data } = filterGroup;
      const selectedIds = updatedSelectedFilters[group] || [];
  
      if (group === "collaborateurs") {
        newSelectedFilterValues[group] = data
        .filter((item) => selectedIds.includes(item.id))
        .map((item) => item.id);
      } else {
        newSelectedFilterValues[group] = data
          .filter((item) => selectedIds.includes(item.id))
          .map((item) => item.name);
      }
    });
  
    console.log(newSelectedFilterValues);
    updateSelectedFilterValues(newSelectedFilterValues);
  };
  
  const toggleFilter = (filterId, filterGroup) => {
    setSelectedFilters((prevState) => {
      const updatedGroup = xor(prevState[filterGroup], [filterId]);
      const newState = {
        ...prevState,
        [filterGroup]: updatedGroup,
        p: 1,
      };
      debounceQuery(newState); // Pass the updated state to debounceQuery
      return newState;
    });
  };

  // Function to reset filters
  const resetFilter = () => {
    setSelectedFilters((prevState) => ({
      ...prevState,
  
    }));
  };
  return (
 


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
      onFilter={onFilter}
      toggleFilter={toggleFilter}
    />
   
  )
}

export default FiltreButton
