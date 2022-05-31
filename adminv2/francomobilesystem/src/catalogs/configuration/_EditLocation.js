import {  useEffect, useState} from 'react'
import { useForm  } from 'react-hook-form';
import axios from 'axios'
import { Grid, Divider, Button, Paper, Stack } from '@mui/material';
import { FormInputText } from '../../form-components/FormInputText.js';
import { FormDateText } from '../../form-components/FormDateText.js';
import i18next from 'i18next';
const URI = 'http://localhost:3001/locations/';
 
 
export default function EditLocation({idLocation, closeModal }) {
  const [location, setLocation] = useState([]);
  const { register, control, handleSubmit, setValue, formState: { errors }} = useForm({
    mode: 'onBlur',
    defaultValues:{
      idLocation: "",
      idCompany:"1",
      locationName:"",
      address:"",
      phone:"",
      schedule:"",
      manager:""
    }
  }); 

  const handleChange = (e) => {
    console.log("entr e y");
    this.setState({ value: e.target.value });
  }

  useEffect(() => {
    axios.get(URI + idLocation).then((response) => {
        setLocation(response.data);
       const fields = ['idLocation', 'idCompany', 'locationName','address', 'phone', 'schedule','manager'];
       fields.forEach(field => { setValue(field, response.data[field]); });
    });
  }, []);
    
  const onSubmit = async data => { console.log(data);
    if(idLocation>0){
      const URI = 'http://localhost:3001/locations/' + idLocation;
      axios.put(URI, {
        idLocation: idLocation,
        idCompany: data.idCompany,
        locationName:data.locationName ,
        address:data.address ,
        phone:data.phone ,
        schedule:data.schedule ,
        manager:data.manager 
      })
      .then(function (response) {
        console.log(response);
        closeModal();
      })
      .catch(function (error) {
        console.log(error);
      }); 
    }else{
      const URI = 'http://localhost:3001/locations/' ;
      axios.post(URI, {
        idLocation: idLocation,
        idCompany: 1,
        locationName:data.locationName ,
        address:data.address ,
        phone:data.phone ,
        schedule:data.schedule ,
        manager:data.manager 
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
    <Paper variant="elevation">
        <form>
<Grid container spacing={3}>
<Grid item xs={12}>
            <hr></hr>
          </Grid>
          <Grid item xs={6}>
              <FormInputText control={control} label={i18next.t('label.locationName')} name={"locationName"} ></FormInputText>
            </Grid>
            <Grid item xs={12}>
              <FormInputText control={control} label={i18next.t('label.Address')} name={"address"} ></FormInputText>
            </Grid>
            <Grid item xs={6}>
              <FormInputText control={control} label={i18next.t('label.Phone')} name={"phone"} ></FormInputText>
            </Grid>
            <Grid item xs={6}>
              <FormInputText control={control} label={i18next.t('label.schedule')} name={"schedule"} ></FormInputText>
            </Grid>
            <Grid item xs={6}>
              <FormInputText control={control} label={i18next.t('label.manager')} name={"manager"} ></FormInputText>
            </Grid>
            <Grid item xs={6}> 
          </Grid>
          <Grid item xs={12}>
            <Divider variant="inset" />
          </Grid>
          <Grid item xs={12}>
          <Stack item xs={12} alignContent="right" direction="row" spacing={2}>
            <Button onClick={handleSubmit(onSubmit)}  variant="contained" >
              Guardar
            </Button>
            <Button variant="contained" color='secondary' onClick={closeModal} >
              Cancel
            </Button>
            </Stack>
          </Grid>
        </Grid>
      </form>
    </Paper>
  )
}
