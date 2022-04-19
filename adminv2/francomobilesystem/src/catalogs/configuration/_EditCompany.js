import * as React from 'react';
import { useEffect, useState } from 'react'
import { useForm, Controller } from 'react-hook-form';
import axios from 'axios'
import {  Grid, Divider, Button, Paper } from '@mui/material';
import { FormInputText } from '../../form-components/FormInputText';


export default function EditCompany({ idCompany, closeModal }) {
  const [company, setCompany] = useState([]);
  const URI = 'http://localhost:3001/companies/';
  const { register, handleSubmit, control, setValue, formState: { errors } } = useForm({
    mode: 'onBlur',
    defaultValues: {
      companyName: "",
      phone: "",
      email: ""
    }
  });

  useEffect(() => {
    axios.get(URI + idCompany).then((response) => {
      setCompany(response.data);
      
      console.log('data');
      console.log(response.data);
    const fields = ['companyName', 'phone', 'email'];
    fields.forEach(field => {setValue(field, response.data[field]); });    
    });
  }, []);
 
  const onSubmit = async data => {
    console.log(data);
    if (idCompany > 0) {
      const URI = 'http://localhost:3001/companies/' + idCompany;
      axios.put(URI, {
        companyName: data.companyName,
        phone: data.phone,
        email: data.email
      })
        .then(function (response) {
          console.log(response);
          closeModal();
        })
        .catch(function (error) {
          console.log(error);
        });
    } else {
      const URI = 'http://localhost:3001/companies/';
      axios.post(URI, {
        companyName: data.companyName,
        phone: data.phone,
        email: data.email
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
      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
              <FormInputText   control={control} label={"Nombre de Empresa"} name={"companyName"} ></FormInputText>
           </Grid>
          <Grid item xs={12}>
          <FormInputText control={control} label={"Email"} name={"email"} ></FormInputText>
          </Grid>
          <Grid item xs={12}>
          <FormInputText control={control} label={"Phone"} name={"phone"} ></FormInputText>
          </Grid>
          <Grid item xs={6}>
          {/* <FormControl>
              <Controller
                name={"phone"}
                control={control}
                render={({ field: { onChange, value } }) => (
                  <TextField onChange={onChange} value={value} id="phone" label="Phone" name="phone" required variant='standard' aria-describedby="phone"  {...register('phone', { required: "* Dato Requerido" })} />
                )}
              />
            </FormControl>   */}
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
