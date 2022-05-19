import React, { useEffect, useState } from 'react'
import { Controller } from "react-hook-form";
import { Autocomplete, TextField, CircularProgress } from '@mui/material';

export const FormSimpleAutoCompleteText = ({ name, control, options, label, setFilter, setSelected, defaultValue }) => {
    const [value, setValue] = useState(null) // <String | null>(null);

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
                    //freeSolo
                    style={{ width: 300 }}
                    onChange={(event, newValue) => {
                        if (typeof newValue === 'string') {
                            // timeout to avoid instant validation of the dialog's form.
                            setSelected(newValue);
                        }
                        else {
                            console.log(newValue.value); setValue(newValue.value); setSelected(newValue.value);
                        }
                    }
                    }
                    options={options}
                   // autoSelect
                    value={value}
                    renderInput={(params) => (
                        <TextField
                            {...params}
                            label={label}
                            variant="standard"
                            InputProps={{
                                ...params.InputProps,
                                endAdornment: (
                                    <React.Fragment>
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