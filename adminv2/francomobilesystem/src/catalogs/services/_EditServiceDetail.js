import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form';
import axios from 'axios'
import { Grid, Divider, Button, Paper, Select, MenuItem, InputLabel, Stack } from '@mui/material';
import { FormInputText } from '../../form-components/FormInputText.js';
import { v4 as uuidv4 } from 'uuid';


export default function EditServiceDetail({ action, closeModal,  detailList }) {
    const { register, control, handleSubmit, reset, setValue, formState: { errors } } = useForm({
        mode: 'onBlur',
        defaultValues: {
            description: ""
        }
    }); 

    

    const onSubmit = async (data, e) => {
        e.preventDefault();
        let newData = data;
        newData.rowId = uuidv4();
        detailList.push(newData);
        reset();
        //action(newData);
    };
    const onSubmitAndClose = async (data, e) => {
        e.preventDefault();
        let newData = data;
        newData.rowId = uuidv4();
        detailList.push(newData);
        // action(newData);
        closeModal();
    };
    return (
        <div>
            <Paper variant="elevation">
                <form onSubmit={handleSubmit(onSubmit)}>
                    <Grid container spacing={3}>
                        <Grid item xs={12}>
                            <FormInputText control={control} label={"Descripcion"} name={"description"} ></FormInputText>
                        </Grid>
                        <Grid item xs={12}>
                            <Divider variant="inset" />
                        </Grid>
                        <Grid item xs={12} alignContent="right">
                            <Stack spacing={2} direction="row">
                                <Button onClick={handleSubmit(onSubmit)} variant="contained" >
                                    Agregar
                                </Button>
                                <Button onClick={handleSubmit(onSubmitAndClose)} variant="contained" >
                                    Agregar y Cerrar
                                </Button>
                                <Button variant="contained" color='secondary' onClick={closeModal} >
                                    Cancel
                                </Button>
                            </Stack>
                        </Grid>
                    </Grid>
                </form>
            </Paper>
        </div>
    )
}
