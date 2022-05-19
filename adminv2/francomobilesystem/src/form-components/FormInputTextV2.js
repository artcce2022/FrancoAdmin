import React from "react";
import { Controller } from "react-hook-form";
import {TextField} from '@mui/material'; 

export const FormInputText = ({ name, control, label, newValue, changeHandler}) => {
  return (
    <Controller
      name={name + "_controller"}
      control={control}
      render={({ field: { onChange, value }, fieldState: { error },   }) => (
        <TextField
          helperText={error ? error.message : null}  
          size="medium"
          error={!!error}          
         // error={errors[fieldName]}
          onChange={(value) =>{ onChange(value); changeHandler(value);}}
          value={newValue || ""} 
          name={name}
          fullWidth
          label={label}
          variant="standard"
          required 
        />
      )}
    />
  );
};