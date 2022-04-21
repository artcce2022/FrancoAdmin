import React, {useEffect, useState } from 'react'
import { FormControl, TextField } from '@mui/material';
import isEmail from 'validator/lib/isEmail';
import { Controller } from "react-hook-form";

export default function InputEmailField( props) {       
    const [value, setValue] = useState('');
    const [isValid, setIsValid] = useState(false);
    const [dirty, setDirty] = useState(false);
    // useEffect(() => {
    //     console.log(props.value);
    //        setValue(props.value);
    //        props.handleChange(props.value, true);
    //   }, []);

    const handleChange = event => {
        const val = event.target.value;                
        
        if(isEmail(val)) {
            setIsValid(true);              
        } else {
            setIsValid(false);              
        }
        
        setValue(val);                
        props.handleChange(val, isValid);
    }

    return (
        <Controller
            name={props.name}
            control={props.control}            
            render={({
                field: { onChange, value },
                fieldState: { error },                
            }) => ( 
                <TextField         
                    error={dirty && isValid === false}                                        
                    onBlur={() => setDirty(true)}
                    id={props.fieldName}                    
                    label={props.label}
                    name={props.fieldName}                    
                    variant="standard" 
                    size={'small'}
                    helperText={props.helperText}
                    value={value}
                    InputLabelProps={{
                      shrink: true,
                    }}
                    onChange={(e) => handleChange(e)}
                    style={{marginTop: 1}}
                />
            )}
        />
    );
}