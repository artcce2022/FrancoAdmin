import React from "react";
import { Controller, useFormContext } from "react-hook-form";
import {TextField} from "@material-ui"; 

export const FormInputText = ({ name, control, label }) => {

  const handleChange =(e) =>{   
    console.log("entr e y");
   this.setState({value: e.target.value}); 
  }

    return (
    <Controller
      name={name}
      control={control}      
      render={({
        field: { onChange, value },
        fieldState: { error },
        formState,
      }) => (
        <TextField
          helperText={error ? error.message : null}
          size="medium"
          error={!!error}
          onChange={(e)=>handleChange}
          value={value}
          fullWidth
          label={label}
          variant="outlined"
          required
        />
      )}
    />
  );
};