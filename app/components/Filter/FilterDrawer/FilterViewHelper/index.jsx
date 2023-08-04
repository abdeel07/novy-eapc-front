import React from 'react'
import MultiCheckboxField from './MultiCheckboxField'
import SearchWithMultiSelectField from './SearchWithMultiSelectField'
import MonthPickerField from './MonthPickerField'
import SimpleAutocomplete from '../../../Autocomplete/SimpleAutocomplete'

export const getNodeByDisplayType = (
  displayType,
  filterData,
  selectedFilters,
  updateCheckedState,
  group,
  label= ""
) => {
  const defaultDisplay = (
    <MultiCheckboxField
      data={filterData}
      group={group}
      updateCheckedState={updateCheckedState}
      defaultSelected={selectedFilters}
    />
  )

  switch (displayType) {
    case 'AccordionWithCheckbox':
      return defaultDisplay
    case 'AccordionWithMultiSelectInput':
      return (
        <SearchWithMultiSelectField
          data={filterData}
          group={group}
          updateCheckedState={updateCheckedState}
          defaultSelected={selectedFilters}
        />
      )
    case 'AccordionWithMothPicker':
      return (
        <MonthPickerField
          updateCheckedState={updateCheckedState}
          selectedFilters={selectedFilters}
        />
      )
    case 'SimpleAutocomplete':
      const value = filterData.filter(({ id }) => selectedFilters[group]?.includes(id))
      const onChange = (_, _v, _r, addedOption) => (
        updateCheckedState(addedOption?.option?.id || selectedFilters[group], group)
      );
      return (
        <SimpleAutocomplete
          menuItems={filterData}
          label={label}
          multiple
          value={value || []}
          onChange={onChange}
          disableCloseOnSelect
          fullWidth
        />
      )
    default:
      return defaultDisplay
  }
}

export default null
