import Chip from '@mui/material/Chip';
import React from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'
import { capitalizeFirstLetter } from '../../../utils/stringUtils'

export default function ActiveChips({
  selectedFilters,
  toggleFilter,
  filters,
  criteria
}) {
  const getNameById = (filterId, filterGroup) => { // by amine nafid
    // console.log(filters?.find(({ group }) => group === filterGroup)
    // ?.data?.find(({ id }) => id === filterId)?.name)
    if (filterGroup === 'month') {
      return capitalizeFirstLetter(
        moment(selectedFilters[group][0]).format('MMMM'),
      )
    }
    return filters
      ?.find(({ group }) => group === filterGroup)
      ?.data?.find(({ id }) => id === filterId)?.name
  }


  return (
    <>
      {Object.keys(selectedFilters)
        .map((index) =>
          Array.isArray(selectedFilters[index]) && index != criteria && selectedFilters[index]?.map((id) =>
            getNameById(id, index) ? (
              <Chip
                label={getNameById(id, index)}
                style={{backgroundColor:"rgb(255, 6, 126)",color:"white"}}
                onDelete={() => {
                  toggleFilter(id, index, true)
                }}
             
                sx={{
                  '& .MuiSvgIcon-root': {
                    color: 'white', // Change the color to your desired color
                  },
                  mb:1
                }}
              />
            ) : null,
          ),
        )
      }
    </>
  )
}
ActiveChips.propTypes = {
  selectedFilters: PropTypes.object.isRequired,
  toggleFilter: PropTypes.func.isRequired,
  filters: PropTypes.arrayOf(PropTypes.any).isRequired,
}
