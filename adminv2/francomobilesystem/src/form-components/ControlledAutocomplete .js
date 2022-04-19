import React from "react";
import { Controller } from "react-hook-form";
import { Autocomplete, TextField, CircularProgress } from '@mui/material';
const ControlledAutocomplete = ({
    options,
    name,
    control,
    defaultValue,
    error,
    rules,
    helperText,
  }) => (
    <Controller
      name={name}
      control={control}
      defaultValue={defaultValue}
      rules={rules}
      render={({ field }) => (
        <Autocomplete
          disablePortal
          options={options}
          getOptionLabel={(option) =>
            option?.label ??
            options.find(({ code }) => code === option)?.label ??
            ''
          }
          {...field}
          renderInput={(params) => (
            <TextField
              {...params}
              error={Boolean(error)}
              helperText={helperText}
            />
          )}
          onChange={(_event, data) => field.onChange(data?.code ?? '')}
        />
      )}
    />
  );
  
//   ControlledAutocomplete.propTypes = {
//     options: PropTypes.arrayOf({
//       label: PropTypes.string,
//       code: PropTypes.string,
//     }),
//     name: PropTypes.string,
//     control: PropTypes.func,
//     defaultValue: PropTypes.string,
//     error: PropTypes.object,
//     rules: PropTypes.object,
//     helperText: PropTypes.string,
//   };