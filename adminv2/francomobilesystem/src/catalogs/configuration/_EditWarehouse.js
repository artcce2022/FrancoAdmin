import {  useEffect, useState} from 'react'
import { useForm  } from 'react-hook-form';
import axios from 'axios'
import { Grid, Divider, Button, Paper } from '@mui/material';
import { FormInputText } from '../../form-components/FormInputText.js';
const URI = 'http://localhost:3001/warehouse/';
 
 
export default function EditWarehouse({idWarehouse, closeModal }) {
  const [warehouse, setWarehouse] = useState([]);
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


  useEffect(()=>{
    axios.get(URI + idWarehouse).then((response) => { 
      setWarehouse(response.data);
      console.log("data");
      
      console.log(response.data);
      const fields = ['warehousename', 'address',  'phone', 'manager'];
      fields.forEach(field => {setValue(field, response.data[field]); });
  })
},[]) // empty array makes hook working once
    
const onSubmit = async data => { console.log(data);
    if(idWarehouse>0){
      const URI = 'http://localhost:3001/warehouse/' + idWarehouse;
      axios.put(URI, {
        idWarehouse: idWarehouse,
        idCompany: 1,
        warehousename:data.warehousename ,
        address:data.address ,
        phone:data.phone , 
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
      const URI = 'http://localhost:3001/warehouse/' ;
      axios.post(URI, {
        idLocation: idWarehouse,
        idCompany: 1,
        warehousename:data.warehousename ,
        address:data.address ,
        phone:data.phone , 
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
              <FormInputText control={control} label={"Nombre de Almacen"} name={"warehousename"} ></FormInputText>
            </Grid>
            <Grid item xs={12}>
              <FormInputText control={control} label={"Address"} name={"address"} ></FormInputText>
            </Grid>
            <Grid item xs={6}>
              <FormInputText control={control} label={"Phone"} name={"phone"} ></FormInputText>
            </Grid>
            <Grid item xs={6}>
              <FormInputText control={control} label={"Manager"} name={"manager"} ></FormInputText>
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
