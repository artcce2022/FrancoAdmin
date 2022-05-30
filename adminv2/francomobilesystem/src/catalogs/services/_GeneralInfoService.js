import * as React from 'react';
import { useEffect, useState } from 'react'
import { useForm, Controller } from 'react-hook-form';
import axios from 'axios'
import MainCard from '../../ui-component/cards/MainCard';
import { CardHeader, Grid, Divider, Button, Paper, Select, MenuItem, InputLabel, IconButton, Box, CardContent } from '@mui/material';
import { FormInputText } from '../../form-components/FormInputTextV2';
import StepButtons from '../../form-components/Steps/StepButtons';

const steps = ['Selecciona Cliente', 'Selecciona Vehiculo', 'Agregar Detalles', 'Datos Generales'];

export default function EditGeneralInfoService({ handleBack, handleNext, isLastStep, isFirstStep, formValues, setLocation,  setComments,  setRecibe }) {
  const [locations, setLocations] = useState([]);  
  const [values, setValues] = useState({
    idLocation: "0",
    idCustomer: "0",
    idVehicle: "0",
    comments: "",
    recibe: ""
  });
  const URI = 'http://localhost:3001/companies/';

  const { handleSubmit, control, setValue, formState: { errors } } = useForm({
    mode: 'onBlur'
  });
 

  useEffect(() => { 
    getLocationsList();
    if(formValues.length>0){
      const newData =JSON.parse(formValues).step_0; 
      console.log("newData")
      console.log(newData)
      setValues(newData);     
    }    
  }, [])

 

  //mostrar locations
  const getLocationsList = async () => {
    const UriLocations = 'http://localhost:3001/locations/'
    const res = await axios.get(UriLocations);
    setLocations(res.data);
  }

  const onChange = (event) => {
    console.log(`${event.target.name}`+ ":" + `${event.target.value}`)
    setValues((prev) => ({
      ...prev,
      [event.target.name]: event.target.value
    }));
  };

  return (
    <>
      <MainCard>
        <CardHeader title={"Datos de Cliente"} ></CardHeader>
        <CardContent >
          <form  > 
            <Grid item xs={12}>
              <InputLabel variant="standard" htmlFor="uncontrolled-native">
                Patio
              </InputLabel>
              <Select style={{ minWidth: "250px" }}
                value={values.idLocation}
                name='idLocation'
                onChange={(selectedOption) => { setLocation(`${selectedOption.target.value}`); console.log(`${selectedOption.target.value}`); onChange(selectedOption); }}
              >
                {!!locations?.length &&
                  locations.map((location) => (
                    <MenuItem key={location.idLocation} value={location.idLocation}>
                      {location.locationName}
                    </MenuItem>
                  ))}
              </Select>
            </Grid>
            <Grid item xs={12}>
              <FormInputText newValue={values.recibe} control={control} label={"Recibe"} name={"recibe"} changeHandler={(event)=>{setComments(event.target.value); onChange(event); }} ></FormInputText>
            </Grid>
            <Grid item xs={12}>
              <FormInputText newValue={values.comments} control={control} label={"Comments"} name={"comments"} changeHandler={(event)=>{setRecibe(event.target.value); onChange(event);}} ></FormInputText>
            </Grid>
          </form> 
        </CardContent>
        <StepButtons handleBack={() => { handleBack(values) }} handleNext={() => { handleNext(values) }} isFirstStep={isFirstStep} isLastStep={isLastStep}></StepButtons>
      </MainCard>
    </>
  )
}
