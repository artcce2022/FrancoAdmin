import React, {useEffect, useState } from 'react'
import { Controller } from "react-hook-form";
import { Autocomplete, TextField, CircularProgress } from '@mui/material'; 

export  const FormAutoCompleteText = ({ name, control, open, setOpen, options, loading, setFilter, setLoading, setSelected, defaultValue  }) => {
   const [value, setValue] = useState(null) // <String | null>(null);
   useEffect(() => {
    console.log(defaultValue);
       setValue(options[0]);
  }, []);
    return (
        <Controller
            name={name}
            control={control}
            render={({
                field: { onChange, value },
                fieldState: { error },
            }) => ( 
                <Autocomplete
                    id={name}
                    style={{ width: 300 }}
                    open={open}
                    onOpen={() => {
                        setOpen(true);
                    }}
                    onClose={() => {
                        setOpen(false);
                        setLoading(false);
                    }}
                    // onChange={(_event, zipcode) => { 
                    //     setSelected(zipcode.value);
                    //   }}
                      onChange={(event,newValue) =>{ console.log("value"); console.log(newValue.value);setValue(newValue.value); setSelected(newValue.value);}} 
                      isOptionEqualToValue={(option, value) => option.name === value.name}
                    getOptionLabel={(option) => option.name || ""}
                    options={options}
                    loading={loading}   
                    value={value}                
                    renderInput={(params) => (
                        <TextField
                            {...params}
                            label="ZIPCodes"
                            variant="standard" 
                            onChange={(data) => {
                                setFilter(data.target.value); 
                                // dont fire API if the user delete or not entered anything
                                if (data.target.value !== "" || data.target.value !== null) {
                                    setFilter(data.target.value); 
                                }}  } 
                            InputProps={{
                                ...params.InputProps,
                                endAdornment: (
                                    <React.Fragment>
                                        {loading ? <CircularProgress color="inherit" size={20} /> : null}
                                        {params.InputProps.endAdornment}
                                    </React.Fragment>
                                ),
                            }}
                        />
                    )}
                />
            )}
        />
    );
};