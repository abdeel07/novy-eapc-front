"use client"
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import PropTypes from "prop-types";
import FilterChips from "./FilterChips";
import ActiveChips from "./ActiveChips";
import FilterDrawer from "./FilterDrawer";
import xor from "lodash/xor";
import SmallButton from "../buttons/SmallButton";
import React from "react";

const Filter = ({
  sx,
  selectedFilters,
  setSelectedFilters,
  debounceQuery,
  filterData,
  criteria,
  textFieldPlaceHolder,
  resetFilter,
  handleSearch,
  searchField
}) => {

  const toggleFilter = (filterId, filterGroup) => {
    setSelectedFilters((prevState) => ({
      ...prevState,
      p: 1,
      [filterGroup]: xor(prevState[filterGroup], [filterId].flat()),
    }))
  }

  const handleSearchFieldChange = (event) => {
    handleSearch(event.target.value);
  };
 console.log(selectedFilters)
  return (
    <Stack sx={{ ...sx, alignItems: 'center' }}>
      <TextField
        variant="standard"
        fullWidth
        value={searchField}
        sx={{
          maxWidth: 500,
          textAlignLast: 'center',
        }}
        placeholder={textFieldPlaceHolder}
        onChange={handleSearchFieldChange}
      />
      <Stack direction='row' spacing={1} mt={2} flexWrap="wrap" justifyContent="center">
        
     
        <FilterChips
          toggleFilter={toggleFilter}
          selectedFilters={selectedFilters}
          filters={filterData}
          criteria={criteria}
        />

        <ActiveChips
          selectedFilters={selectedFilters}
          toggleFilter={toggleFilter}
          filters={filterData}
          criteria={criteria}
        />
        {filterData.length > 1 && (
          <FilterDrawer 
            toggleFilter={toggleFilter} 
            selectedFilters={selectedFilters} 
            filters={filterData}
            onReset={resetFilter} 
          />
        )}
      </Stack>
    </Stack>);
}

Filter.propTypes = {
  selectedFilters: PropTypes.any.isRequired,
  setSelectedFilters: PropTypes.any.isRequired,
  debounceQuery: PropTypes.func.isRequired,
  filterData: PropTypes.array.isRequired,
  criteria: PropTypes.string.isRequired,
}

export default Filter;