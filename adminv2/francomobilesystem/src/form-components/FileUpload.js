import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Controller } from "react-hook-form";
import { Button } from '@mui/material';

export const FormInputFile = ({ name, control, handleChangeFile, path }) => {
    const [value, setValue] = useState(null) // <String | null>(null);
    // const handleChange = (event) => {
    //     const files = Array.from(event.target.files);
    //     const [file] = files;
    //     setAttachment(file);  
    //     const formData = new FormData();
    //     formData.append("name", name);
    //     formData.append(name, files[0]);
      
    //     axios
    //       .post(URISaveFile, formData,{
    //         headers: {'Content-Type': 'multipart/form-data'}
    //       })  
    //       .then((res) => {
    //         alert("File Upload success");
    //       })
    //       .catch((err) => alert("File Upload Error"));

    //   };
    
   
    return (
        <Controller
            name={name + "-controller"}
            control={control}
            render={({
                field: { onChange, value },
                fieldState: { error },
            }) => (
                <Button
                    variant="contained"
                    component="label"
                    >
                    Upload File
                    <input
                        type="file"
                        hidden 
                        onChange={handleChangeFile}
                        name={name}
                        id={name}
                    />
                    </Button>
            )}
        />
    );
};