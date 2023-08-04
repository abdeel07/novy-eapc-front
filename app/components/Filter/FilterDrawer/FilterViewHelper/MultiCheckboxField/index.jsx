import Checkbox from '@mui/material/Checkbox';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormGroup from '@mui/material/FormGroup';
import PropTypes from 'prop-types'

export default function MultiCheckboxField(props) {
  const { group, updateCheckedState, data, defaultSelected } = props
  return (
    <FormControl component="fieldset" variant="standard">
      {data.map((item) => (
        <FormGroup key={item.id}>
          <FormControlLabel
            label={item?.name}
            control={
              <Checkbox
                checked={!!(Array.isArray(defaultSelected[group]) && defaultSelected[group].includes(item?.id))}
                onChange={() => {
                  updateCheckedState(item?.id, group)
                }}
              />
            }
          />
        </FormGroup>
      ))}
    </FormControl>
  )
}

MultiCheckboxField.propTypes = {
  data: PropTypes.array.isRequired,
  defaultSelected: PropTypes.array.isRequired,
  updateCheckedState: PropTypes.func.isRequired,
  group: PropTypes.string.isRequired,
}
