import React from 'react'
import PropTypes from 'prop-types';
import Chip from '@mui/material/Chip';

export default function FilterChips({
  selectedFilters,
  toggleFilter,
  filters,
  criteria
}) {
  const toggleFilterChips = (index, group) => {
    toggleFilter(index, group)
  }
  const getQuickAccessData = () => {
    const o = filters && filters.find(({ quickAccess }) => quickAccess)
    return o || {}
  }
  return (
    <>
      {getQuickAccessData().data?.map((item) => (
        <Chip
          key={item.id}
          label={item.name}
          onClick={() =>
            toggleFilterChips(item.id, getQuickAccessData().group)
          }
          // color={
          //   selectedFilters && selectedFilters[criteria] && Array.isArray(selectedFilters[criteria]) && selectedFilters[criteria].includes(item.id)
          //     ? 'primary'
          //     : 'default'
          // }
          sx={{
            minWidth: '80px',
            mb: 1,
            backgroundColor:
              selectedFilters && selectedFilters[criteria] && Array.isArray(selectedFilters[criteria]) && selectedFilters[criteria].includes(item.id)
              ? ' rgb(255, 6, 126)'
              : 'default'
            
          }}
        />
      ))}
    </>
  )
}
FilterChips.propTypes = {
  toggleFilter: PropTypes.func.isRequired,
  filters: PropTypes.arrayOf(PropTypes.any).isRequired,
  selectedFilters: PropTypes.object.isRequired,
}
