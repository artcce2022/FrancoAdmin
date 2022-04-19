import React from "react";
import { Controller } from "react-hook-form";
import {TextField} from '@mui/material'; 

export const FormInputText = ({ name, control, label }) => {
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
         // error={errors[fieldName]}
          onChange={onChange}
          value={value}
          fullWidth
          label={label}
          variant="standard"
          required 
        />
      )}
    />
  );
};