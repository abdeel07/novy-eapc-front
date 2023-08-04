import React from "react";
import PropTypes from "prop-types";
import { Controller } from "react-hook-form";
import SimpleAutocomplete from "../SimpleAutocomplete";

const CustomAutocomplete = ({
  label,
  menuItems,
  fullWidth,
  name,
  control,
  rules,
  error,
  multiple,
  placeholder,
}) => {

  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      render={({ field: { onChange, ...restFields } }) => (
        <SimpleAutocomplete
          name={name}
          label={label}
          menuItems={menuItems}
          multiple={multiple}
          error={error}
          fullWidth={fullWidth}
          placeholder={placeholder}
          onChange={(event, value, reason, option) => onChange(value)}
          {...restFields}
        />
      )}
    />
  )
};

CustomAutocomplete.propTypes = {
  menuItems: PropTypes.array.isRequired,
  fullWidth: PropTypes.bool,
  name: PropTypes.string,
  multiple: PropTypes.bool,
  placeholder: PropTypes.string,
  withHookForm: PropTypes.bool,
  sx: PropTypes.object,
  menuMaxHeight: PropTypes.number,
};

CustomAutocomplete.defaultProps = {
  menuItems: [],
  fullWidth: false,
  name: "",
  multiple: false,
  placeholder: "",
  withHookForm: false,
  sx: {},
  menuMaxHeight: 350,
}

export default CustomAutocomplete;