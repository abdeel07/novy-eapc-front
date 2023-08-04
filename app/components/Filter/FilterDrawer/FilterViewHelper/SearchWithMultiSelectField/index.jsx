import Autocomplete from '@mui/material/Autocomplete'
import TextField from '@mui/material/TextField'
import CircularProgress from '@mui/material/CircularProgress';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import PropTypes from 'prop-types'
import { i18n } from 'next-i18next'

export default function SearchWithMultiSelectField({
  group,
  updateCheckedState,
  data,
  placeholder,
  noOptionText,
  defaultSelected,
  isCollabs,
  sx,
  freeSolo,
  variant,
}) {
  const handleDataValues = (dataValue) =>
    dataValue?.filter(({ id }) =>
      typeof defaultSelected[group] === 'object'
        ? defaultSelected[group]?.includes(id)
        : defaultSelected[group] === id,
    )

  return (
    <Autocomplete
      disablePortal
      id="tags-standard"
      autoHighlight
      multiple
      freeSolo={freeSolo}
      disableClearable
      value={handleDataValues(data)}
      disableCloseOnSelect
      noOptionsText={i18n.t(noOptionText)}
      options={data || []}
      getOptionLabel={(option) =>
        isCollabs ? `${option.firstName} ${option.lastName}` : option.title
      }
      defaultValue={defaultSelected ? handleDataValues(data) : []}
      filterSelectedOptions
      renderInput={(params) => (
        <TextField
          sx={sx}
          variant={variant}
          {...params}
          placeholder={
            params?.InputProps?.startAdornment?.length > 0
              ? ''
              : i18n.t(placeholder)
          }
        />
      )}
      onChange={(_, _v, _r, addedOptions) => {
        updateCheckedState(addedOptions?.option?.id, group)
      }}
      renderOption={(props, option) =>
        !data ? (
          <Stack display="flex" width="100%" alignItems="center" my={2}>
            <CircularProgress size={25} />
          </Stack>
        ) : (
          <Typography {...props}>
            {isCollabs
              ? `${option.firstName} ${option.lastName}`
              : option.title}
          </Typography>
        )
      }
      getOptionDisabled={(option) =>
        typeof defaultSelected[group] === 'object'
          ? defaultSelected[group]?.includes(option?.id)
          : defaultSelected[group] === option?.id
      }
      sx={{
        maxWidth: '100%',
      }}
    />
  )
}

SearchWithMultiSelectField.propTypes = {
  data: PropTypes.array.isRequired,
  defaultSelected: PropTypes.array.isRequired,
  updateCheckedState: PropTypes.func.isRequired,
  group: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  noOptionText: PropTypes.string,
  isCollabs: PropTypes.bool,
  sx: PropTypes.object,
  freeSolo: PropTypes.bool,
  variant: PropTypes.string,
}
SearchWithMultiSelectField.defaultProps = {
  placeholder: 'search_here',
  noOptionText: 'not_found',
  isCollabs: false,
  sx: {},
  freeSolo: false,
  variant: 'outlined',
}
