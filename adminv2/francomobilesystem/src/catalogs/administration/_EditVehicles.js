import {  useEffect, useState} from 'react'
import { useForm  } from 'react-hook-form';
import axios from 'axios' 
import { Grid, Divider, Button, Paper, Stack } from '@mui/material';
import { FormInputText } from '../../form-components/FormInputText.js';
import i18next from 'i18next';
const URI = 'http://localhost:3001/vehicles/';

export default function EditVehicles({idVehicle, idCustomer, closeModal }) {
//const [commonFailure] =useCommonFailures({idCommonFailure}); 
const [vehicle, setVehicle] = useState([]); 

 // const [categoriesFailure] = useSymptomsCategory (); 
 const { register, control, handleSubmit, setValue, formState: { errors }} = useForm({
    mode: 'onBlur',
    defaultValues:{
        idCustomer: idCustomer,
        vin:"",
        license:"",
        year:"",
        make:"",
        model:"",
        color:"",
        unit:"",
        memo:""
    }
  }); 

 
  useEffect(() => {
    axios.get(URI + idVehicle).then((response) => {
        setVehicle(response.data);
    const fields = ['vin', 'license', 'year','make', 'model', 'color','unit','memo'];
    fields.forEach(field => {setValue(field, response.data[field]); });    
    });
  }, []);


  const handleChange =(e) =>{   
     console.log("entr e y");
    this.setState({value: e.target.value}); 
   }

  const onSubmit = async (data, e) => { 
    e.preventDefault();
    console.log(data);
    if(idVehicle>0){
      const URI = 'http://localhost:3001/vehicles/' + idVehicle;
      axios.put(URI, {
        idVehicle: idVehicle,
        idCustomer:idCustomer,
        vin: data.vin,
        license:data.license ,
        year:data.year ,
        make:data.make ,
        model:data.model , 
        color:data.color , 
        unit:data.unit , 
        memo:data.memo 
      })
      .then(function (response) {
        console.log(response);
        closeModal();
      })
      .catch(function (error) {
        console.log(error);
      }); 
    }else{
      const URI = 'http://localhost:3001/vehicles/' ;
      axios.post(URI, {
        idCustomer:idCustomer,
        vin: data.vin,
        license:data.license ,
        year:data.year ,
        make:data.make ,
        model:data.model , 
        color:data.color , 
        unit:data.unit , 
        memo:data.memo 
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
 return (<Paper>
     <form onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={3}>
          <Grid item xs={2}>
            <FormInputText control={control} label={i18next.t('label.Vin')} name={"vin"} ></FormInputText>
          </Grid>
          <Grid item xs={4}>
            <FormInputText control={control} label={i18next.t('label.License')} name={"license"} ></FormInputText>
          </Grid>
          <Grid item xs={4}>
            <FormInputText control={control} label={i18next.t('label.Year')} name={"year"} ></FormInputText>
          </Grid>         
          <Grid item xs={6}>
          <FormInputText control={control} label={i18next.t('label.Make')} name={"make"} ></FormInputText>
          </Grid>
          <Grid item xs={6}>
          <FormInputText control={control} label={i18next.t('label.Model')} name={"model"} ></FormInputText>
          </Grid>
          <Grid item xs={6}>
          <FormInputText control={control} label={i18next.t('label.Color')} name={"color"} ></FormInputText>
          </Grid>
          <Grid item xs={6}>
          <FormInputText control={control} label={i18next.t('label.Unit')} name={"unit"} ></FormInputText>
          </Grid>
          <Grid item xs={6}>
          <FormInputText control={control} label={i18next.t('label.Memo')} name={"memo"} ></FormInputText>
          </Grid>
          <Grid item xs={6}> 
          </Grid>
          <Grid item xs={12}>
            <Divider variant="inset" />
          </Grid>
          <Grid item xs={12}  alignContent="right">
          <Stack item xs={12} alignContent="right" direction="row" spacing={2}>
            <Button onClick={handleSubmit(onSubmit)}  variant="contained" >
              {i18next.t('label.Save')}
            </Button>
            <Button variant="contained" color='secondary' onClick={closeModal} >
              {i18next.t('label.Cancel')}
            </Button>
            </Stack>
          </Grid>
        </Grid>
      </form>
 </Paper>
   
 )
}