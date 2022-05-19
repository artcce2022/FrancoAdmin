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
import VehicleDetail from '../../Components/SelectVehicle';

export default function EditVehicleInfoService({ handleBack, handleNext, isLastStep, isFirstStep, formValues, action, idCustomer, currentId }) {
  const [vehicles, setVehicles] = useState([]);
  let [idVehicle, setIdVehicle] = useState(0);
  const [openModalVehicle, setOpenModalVehicle] = useState(false);
  let [refreshData, setRefreshData] = useState(false); 
  const [values, setValues] = useState({
    idVehicle: "0"
  });
  
  const { handleSubmit, control, setValue, formState: { errors } } = useForm({
    mode: 'onBlur'
  });
  
  const handleClose = () => {
    setOpenModalVehicle(false);
    getVehicles();
  };

  useEffect(() => {
    
    setRefreshData(true); 
    //localStorage.setItem(currentId.id, '')
    const data = localStorage.getItem(`${currentId}`)
    if (data != null) {
      
      let newIdVehicle =  JSON.parse(data).idVehicle;
      setIdVehicle(parseInt(newIdVehicle) || 0); 
    }
  }, []); // empty array makes hook working once

  useEffect(() => {
    //getVehicles();
    setRefreshData(true); 
    action(idVehicle);
  }, [idVehicle])

  // useEffect(() => { 
  //   setIdVehicle(selectedIdVehicle);
  //   // if(formValues.length>0){
  //   //   const newData =JSON.parse(formValues).step_0; 
  //   //   console.log("newData")
  //   //   console.log(newData)
  //   //   setValues(newData);     
  //   //   getVehicles();
  //   //   setIdVehicle(newData.idVehicle);
  //   // }    
  // }, [])


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
         <CardContent >
          <form  >
            <Grid item xs={12}>
              <InputLabel variant="standard" htmlFor="uncontrolled-native">
                Vehiculo
              </InputLabel>
              <Select style={{ minWidth: "250px" }}
                value={idVehicle}
                name='idVehicle'
                onChange={(selectedOption) => { setRefreshData(false); setIdVehicle(`${selectedOption.target.value}`); onChange(selectedOption); }}
              >
                {!!vehicles?.length &&
                  vehicles.map((vehicle) => (
                    <MenuItem key={vehicle.idVehicle} value={vehicle.idVehicle}>
                      {vehicle.vin}
                    </MenuItem>
                  ))}
              </Select>
              <IconButton aria-label="Agregar Nuevo" onClick={() => { setIdVehicle(0); setOpenModalVehicle(true); }}>
                <IconPlus />
              </IconButton>
            </Grid>                  
            <Grid item xs={12}>
                {refreshData &&  <VehicleDetail idVehicle={idVehicle}></VehicleDetail>}
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
