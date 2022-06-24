import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form';
import axios from 'axios'
import { Grid, Divider, Button, Paper, Select, MenuItem, InputLabel, Stack } from '@mui/material';
import { FormInputText } from '../../form-components/FormInputTextV2.js';
import { v4 as uuidv4 } from 'uuid';
import { AlertNotification } from '../../form-components/NotifyAlert.js';
import i18next from 'i18next';
import { FormInputFile } from '../../form-components/FileUpload.js';


export default function EditServiceFailure({  closeModal, idCommonFailureService, idCommonFailureStatus }) {
    const [alertMessage, setAlertMessage] = useState("");
    const [openAlert, setOpenAlert] = useState(false);
    const [typeAlert, setTypeAlert] = useState("success");
    const [comments, setComments] = useState("");
    const [attachment, setAttachment] = useState(null);
    const URISaveFile = 'http://localhost:3001/service/savefile/';
    const { register, control, handleSubmit, reset, setValue, formState: { errors } } = useForm({
        mode: 'onBlur',
        defaultValues: {
            comments: ""
        }
    });

    console.log("idCommonFailureStatus");
    console.log(idCommonFailureStatus);
    const handleCloseAlert = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpenAlert(false);
    };
   
    
  const onChange = (event) => {
    // setDescription(event.target.value); 
  };

  const onSubmit = async data => {
    console.log(idCommonFailureStatus);
    if (idCommonFailureService > 0) {
      const URI = 'http://localhost:3001/services/failures/' + idCommonFailureService;
      axios.put(URI, {
        idservicefailures: idCommonFailureService,
        idcommonfailurestatus: idCommonFailureStatus,
        comments: comments
      })
        .then(function (response) {
          console.log(response);
          closeModal();
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  };
    return (
        <div>
            <Paper variant="elevation">
                <form onSubmit={handleSubmit(onSubmit)}>
                    <Grid container spacing={3}>
                        <Grid item xs={12}>
                            {/* <FormInputText control={control} newValue={description} label={i18next.t('label.Description')} name={"description"}></FormInputText> */}
                            <FormInputText newValue={comments} control={control} label={i18next.t('label.Comments')} name={"comments"} changeHandler={(event)=>{setComments(event.target.value); onChange(event); }} ></FormInputText>
                         </Grid>
                        <Grid item xs={12}>
                            <Divider variant="inset" />
                        </Grid>
                        <Grid item xs={12} alignContent="right">
                            <Stack spacing={2} direction="row">
                            <Button onClick={handleSubmit(onSubmit)} variant="contained" >
                              {i18next.t('label.Save')}
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
