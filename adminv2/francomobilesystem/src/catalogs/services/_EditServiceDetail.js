import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form';
import axios from 'axios'
import { Grid, Divider, Button, Paper, Select, MenuItem, InputLabel, Stack } from '@mui/material';
import { FormInputText } from '../../form-components/FormInputText.js';
import { v4 as uuidv4 } from 'uuid';
import { AlertNotification } from '../../form-components/NotifyAlert.js';
import i18next from 'i18next';


export default function EditServiceDetail({ action, closeModal, detailList }) {
    const [alertMessage, setAlertMessage] = useState("");
    const [openAlert, setOpenAlert] = useState(false);
    const [typeAlert, setTypeAlert] = useState("success");
    const { register, control, handleSubmit, reset, setValue, formState: { errors } } = useForm({
        mode: 'onBlur',
        defaultValues: {
            description: ""
        }
    });

    const handleCloseAlert = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpenAlert(false);
    };




    const onSubmit = async (data, e) => {
        e.preventDefault();
        if (data.description) {
            let newData = data;
            newData.rowId = uuidv4();
            detailList.push(newData);
            reset();

            setAlertMessage(i18next.t('SuccessfulRecord'));
            setTypeAlert("success");
            setOpenAlert(true);
        } else {
            setAlertMessage(i18next.t('label.ErrorSelectValid')); 
           setTypeAlert("warning");
            setOpenAlert(true);
        }



        //action(newData);
    };
    const onSubmitAndClose = async (data, e) => {
        e.preventDefault();
        if (data.description) {
            let newData = data;
            newData.rowId = uuidv4();
            detailList.push(newData);
            // action(newData);
            closeModal();  
            setAlertMessage(i18next.t('SuccessfulRecord'));          
        } else {
            setAlertMessage(i18next.t('label.ErrorSelectValid')); 
            setTypeAlert("warning");
            setOpenAlert(true);
        }
    };
    return (
        <div>
            <Paper variant="elevation">
                <form onSubmit={handleSubmit(onSubmit)}>
                    <Grid container spacing={3}>
                        <Grid item xs={12}>
                            <FormInputText control={control} label={i18next.t('label.Description')} name={"description"} ></FormInputText>
                        </Grid>
                        <Grid item xs={12}>
                            <Divider variant="inset" />
                        </Grid>
                        <Grid item xs={12} alignContent="right">
                            <Stack spacing={2} direction="row">
                                <Button onClick={handleSubmit(onSubmit)} variant="contained" >
                                {i18next.t('label.Add')}
                                </Button>
                                <Button onClick={handleSubmit(onSubmitAndClose)} variant="contained" >
                                {i18next.t('label.AddAndClose')}
                                </Button>
                                <Button variant="contained" color='secondary' onClick={closeModal} >
                                {i18next.t('label.Cancel')}
                                </Button>
                            </Stack>
                        </Grid>
                    </Grid>
                    {openAlert && <AlertNotification open={openAlert} handleClose={handleCloseAlert} type={typeAlert} message={alertMessage} />}
                </form>
            </Paper>
        </div>
    )
}
