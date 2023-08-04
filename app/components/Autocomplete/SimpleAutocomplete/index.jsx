import Autocomplete from '@mui/material/Autocomplete';
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";
import PropTypes from "prop-types";
import { useState } from "react";

const SimpleAutocomplete = ({
  name,
  menuItems,
  label,
  placeholder,
  error,
  multiple,
  value,
  onChange,
  fullWidth,
  MenuProps,
  ...rest
}) => {

  const [autocompleteValue, setAutocompleteValue] = useState("");
  const handleInputChange = (_, value) => { setAutocompleteValue(value); }
  const handleChange = (event, value, reason, option) => {
    onChange(event, value, reason, option);
  }

  const renderInput = (params) => <TextField {...params} placeholder={placeholder} label={label} error={error} />;
  const getOptionLabel = ({ name }) => name
  const getOptionSelected = (option, value) => option.id == value.id;
  const renderOption = (props, option) => <li {...props} key={option.id}>{option.name}</li>;

  return (
    <FormControl fullWidth={fullWidth}>
      <Autocomplete
        options={menuItems}
        multiple={multiple}
        value={value}
        onChange={handleChange}
        inputValue={autocompleteValue}
        onInputChange={handleInputChange}
        placeholder={placeholder}
        renderInput={renderInput}
        getOptionLabel={getOptionLabel}
        renderOption={renderOption}
        isOptionEqualToValue={getOptionSelected}
        {...rest}
      />
    </FormControl>
  );
}

SimpleAutocomplete.propTypes = {
  name: PropTypes.string,
  menuItems: PropTypes.array.isRequired,
  label: PropTypes.string,
  placeholder: PropTypes.string,
  multiple: PropTypes.bool,
  value: PropTypes.any.isRequired,
  onChange: PropTypes.func.isRequired,
  fullWidth: PropTypes.bool,
  MenuProps: PropTypes.object,
};

SimpleAutocomplete.defaultProps = {
  name: "",
  label: "",
  placeholder: "",
  multiple: false,
  fullWidth: false,
  MenuProps: {
    PaperProps: {
      style: {
        maxHeight: 350
      }
    }
  }
}

export default SimpleAutocomplete;