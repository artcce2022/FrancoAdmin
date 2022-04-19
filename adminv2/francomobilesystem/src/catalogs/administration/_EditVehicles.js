import {  useEffect, useState} from 'react'
import { useForm  } from 'react-hook-form';
import axios from 'axios' 
import { Grid, Divider, Button, Paper } from '@mui/material';
import { FormInputText } from '../../form-components/FormInputText.js';
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
            <FormInputText control={control} label={"Vin"} name={"vin"} ></FormInputText>
          </Grid>
          <Grid item xs={4}>
            <FormInputText control={control} label={"license"} name={"license"} ></FormInputText>
          </Grid>
          <Grid item xs={4}>
            <FormInputText control={control} label={"year"} name={"year"} ></FormInputText>
          </Grid>         
          <Grid item xs={6}>
          <FormInputText control={control} label={"make"} name={"make"} ></FormInputText>
          </Grid>
          <Grid item xs={6}>
          <FormInputText control={control} label={"model"} name={"model"} ></FormInputText>
          </Grid>
          <Grid item xs={6}>
          <FormInputText control={control} label={"color"} name={"color"} ></FormInputText>
          </Grid>
          <Grid item xs={6}>
          <FormInputText control={control} label={"unit"} name={"unit"} ></FormInputText>
          </Grid>
          <Grid item xs={6}>
          <FormInputText control={control} label={"memo"} name={"memo"} ></FormInputText>
          </Grid>
          <Grid item xs={6}> 
          </Grid>
          <Grid item xs={12}>
            <Divider variant="inset" />
          </Grid>
          <Grid item xs={12}  alignContent="right">
            <Button onClick={handleSubmit(onSubmit)}  variant="contained" >
              Guardar
            </Button>
            <Button variant="contained" color='secondary' onClick={closeModal} >
              Cancel
            </Button>
          </Grid>
        </Grid>
      </form>
 </Paper>
   
 )
}
 