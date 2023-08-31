import React from 'react'
import { Chip, SwipeableDrawer } from '@mui/material'
import FilterList from '@mui/icons-material/FilterList'
import PropTypes from 'prop-types'
import { useTranslation } from 'next-i18next'
import FilterCriteriaList from './FilterCriteriaList'

export default function FilterDrawer({
  filters,
  toggleFilter,
  selectedFilters,
  onReset,
  onFilter,
}) {
  const [open, setOpen] = React.useState(false)
  const { t } = useTranslation('common')

  const closeDrawer = () => {
    onReset();
    setOpen(false);
  }

  const toggleDrawer = () => {
    setOpen((prevState) => !prevState)
  }

  return (
    <>
      <Chip
        icon={<FilterList />}
        label={t('Filtres')}
        onClick={() => toggleDrawer(true)}
        color={open ? 'primary' : 'default'}
        style={{backgroundColor:open?"rgb(255, 6, 126)":"rgb(221, 247, 255)"}}
      />
      <SwipeableDrawer
        anchor="right"
        open={open}
        onClose={toggleDrawer}
        onOpen={toggleDrawer}
      >
        <FilterCriteriaList
          filters={filters}
          toggleFilter={toggleFilter}
          selectedFilters={selectedFilters}
          onReset={closeDrawer}
          onFilter={() => {
            toggleDrawer()
            onFilter()
          }}
        />
      </SwipeableDrawer>
    </>
  )
}

FilterDrawer.propTypes = {
  filters: PropTypes.arrayOf(PropTypes.any).isRequired,
  toggleFilter: PropTypes.func.isRequired,
  selectedFilters: PropTypes.object.isRequired,
  onReset: PropTypes.func,
  onFilter: PropTypes.func,
}

FilterDrawer.defaultProps = {
  onReset: () => {},
  onFilter: () => {},
}
