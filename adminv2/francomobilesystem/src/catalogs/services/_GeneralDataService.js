import * as React from 'react';
import { useEffect, useState } from 'react'
import { useForm, Controller } from 'react-hook-form';
import axios from 'axios'
import MainCard from '../../ui-component/cards/MainCard';
import { CardHeader, Grid, Divider, Button, Paper, Select, MenuItem, InputLabel, IconButton, Box, CardContent } from '@mui/material';
import { FormInputText } from '../../form-components/FormInputTextV2';
import { IconPlus } from '@tabler/icons';
import MyModal from '../../shared/Modal';
import EditVehicle from '../../catalogs/administration/_EditVehicles.js';
import StepButtons from '../../form-components/Steps/StepButtons';
import i18next from 'i18next';

const steps = ['Selecciona Cliente', 'Selecciona Vehiculo', 'Agregar Detalles', 'Datos Generales'];

export default function EditGeneralInfoService({ handleBack, handleNext, isLastStep, isFirstStep, formValues, idCustomer }) {
  const [customers, setCustomers] = useState([]);
  const [locations, setLocation] = useState([]);
  const [vehicles, setVehicles] = useState([]);
  let [idVehicle, setIdVehicle] = useState(0);
  let [idLocation, setIdLocation] = useState(0);
  const [openModalVehicle, setOpenModalVehicle] = useState(false);
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

  const handleClose = () => {
    setOpenModalVehicle(false);
    getVehicles();
  };

  useEffect(() => { 
    getLocationsList();
    if(formValues.length>0){
      const newData =JSON.parse(formValues).step_0; 
      console.log("newData")
      console.log(newData)
      setValues(newData);     
      getVehicles();
      setIdVehicle(newData.idVehicle);
    }    
  }, [])


  useEffect(() => {
    getVehicles();
  }, [idCustomer])

  //mostrar companies
  const getVehicles = async () => {
    const UriVehicles = 'http://localhost:3001/customervehicles/'
    const res = await axios.get(UriVehicles + idCustomer);
    setVehicles(res.data);
    console.log(res.data);
  }


  //mostrar locations
  const getLocationsList = async () => {
    const UriLocations = 'http://localhost:3001/locations/'
    const res = await axios.get(UriLocations);
    setLocation(res.data);
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
        <CardHeader title= {i18next.t('label.CustomerData')} ></CardHeader>
        <CardContent >
          <form  >
            <Grid item xs={12}>
              <InputLabel variant="standard" htmlFor="uncontrolled-native">
              {i18next.t('label.Vehicle')}
              </InputLabel>
              <Select style={{ minWidth: "250px" }}
                value={values.idVehicle}
                name='idVehicle'  getOptionValue={(option) => option.value}
                onChange={(selectedOption) => { setIdVehicle(`${selectedOption.target.value}`); console.log(`${selectedOption.target.value}`); onChange(selectedOption); }}
              >
                {!!vehicles?.length &&
                  vehicles.map((vehicle) => (
                    <MenuItem key={vehicle.idVehicle} value={vehicle.idVehicle}>
                      {vehicle.vin}
                    </MenuItem>
                  ))}
              </Select>
              <IconButton aria-label={i18next.t('label.Add')} onClick={() => { setIdVehicle(0); setOpenModalVehicle(true); }}>
                <IconPlus />
              </IconButton>
            </Grid>
            <Grid item xs={12}>
              <InputLabel variant="standard" htmlFor="uncontrolled-native">
              {i18next.t('label.Location')}
              </InputLabel>
              <Select style={{ minWidth: "250px" }}
                value={values.idLocation}
                name='idLocation' getOptionValue={(option) => option.value}
                onChange={(selectedOption) => { setIdLocation(`${selectedOption.target.value}`); console.log(`${selectedOption.target.value}`); onChange(selectedOption); }}
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
              <FormInputText newValue={values.recibe} control={control} label={"Recibe"} name={"recibe"} changeHandler={onChange} ></FormInputText>
            </Grid>
            <Grid item xs={12}>
              <FormInputText newValue={values.comments} control={control} label={"Comments"} name={"comments"} changeHandler={onChange} ></FormInputText>
            </Grid>
          </form>
          {openModalVehicle && <MyModal id="id_myModal" title={idCustomer > 0 ? "Editar Vehiculo" : "Agregar Vehiculo"} openModal={openModalVehicle} closeModal={handleClose} >
            <EditVehicle idCustomer={idCustomer} idVehicle={idVehicle} closeModal={handleClose} />
          </MyModal>}
        </CardContent>
        <StepButtons handleBack={() => { handleBack(values) }} handleNext={() => { handleNext(values) }} isFirstStep={isFirstStep} isLastStep={isLastStep}></StepButtons>
      </MainCard>
    </>
  )
}
