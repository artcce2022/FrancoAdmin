import React from "react";
import { Controller } from "react-hook-form";
import {TextField} from '@mui/material'; 

export const FormDateText = ({ name, control, label }) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({
        field: { onChange, value },
        fieldState: { error }, 
      }) => (
        <TextField
          helperText={error ? error.message : null}
          size="medium"
          error={!!error}
          onChange={onChange}
          value={value}
          fullWidth
          type="date"
          label={label}
          variant="standard"
          required 
        />
      )}
    />
  );
};