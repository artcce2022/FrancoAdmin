import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form';
import axios from 'axios'
import { Grid, Divider, Button, Paper, Select, MenuItem, InputLabel, Stack, Checkbox, FormControlLabel } from '@mui/material';
import { FormInputText } from '../../form-components/FormInputTextV2.js';
import { v4 as uuidv4 } from 'uuid';
import { AlertNotification } from '../../form-components/NotifyAlert.js';
import i18next from 'i18next';
import { FormInputFile } from '../../form-components/FileUpload.js';


export default function EditServiceFile({ action, closeModal, idService, serviceGuid }) {
    const [alertMessage, setAlertMessage] = useState("");
    const [openAlert, setOpenAlert] = useState(false);
    const [typeAlert, setTypeAlert] = useState("success");
    const [description, setDescription] = useState("");
    const [attachment, setAttachment] = useState(null);
    const [isVisible, setIsVisible] = useState(true);

    const URISaveFile = 'http://localhost:3001/service/savefile/';
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
    const handleChangeFile = (event) => {
        const files = Array.from(event.target.files);
        const [file] = files;
        setAttachment(file);  
        const formData = new FormData();
        formData.append("name", "ServiceFile");
        formData.append("description", description);
        formData.append("uuid", serviceGuid);
        formData.append("visibilitycustomer", isVisible);
        formData.append("ServiceFile", files[0]);
        formData.append("idService", idService);
        axios
          .post(URISaveFile, formData,{
            headers: {'Content-Type': 'multipart/form-data'}
          })  
          .then((res) => {
            setAlertMessage(i18next.t('SuccessfulRecord'));
            setTypeAlert("success");
            setOpenAlert(true);
            closeModal(); 
          })
          .catch((err) => alert("File Upload Error"));

      };
    // const onChangeDescription= (data) =>{
    //     setDescription(data.value);
    // }
    
  const onChange = (event) => {
    // setDescription(event.target.value); 
  };


    const onSubmit = async (data, e) => {
        e.preventDefault();
        if (data.description) {
            let newData = data;
            newData.rowId = uuidv4(); 
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
                            {/* <FormInputText control={control} newValue={description} label={i18next.t('label.Description')} name={"description"}></FormInputText> */}
                            <FormInputText newValue={description} control={control} label={i18next.t('label.Description')} name={"description"} changeHandler={(event)=>{setDescription(event.target.value); onChange(event); }} ></FormInputText>
                         </Grid>
                         <Grid item md={6}>
                         <FormControlLabel control={<Checkbox   checked={isVisible} onClick={(e) => setIsVisible(e.target.checked)}  name="isvisible"  ></Checkbox>} label="Visible para Cliente"  />
                            
                        </Grid>
                        <Grid item md={6}>
                            {idService && <FormInputFile  description={description} handleChangeFile={handleChangeFile} name="ServiceFile" control={control} idService={idService} ></FormInputFile>}
                        </Grid>
                        <Grid item xs={12}>
                            <Divider variant="inset" />
                        </Grid>
                        <Grid item xs={12} alignContent="right">
                            <Stack spacing={2} direction="row">
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
