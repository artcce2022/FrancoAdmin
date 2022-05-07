import * as React from 'react';
import { useEffect, useState } from 'react'
import { useForm, Controller } from 'react-hook-form';
import axios from 'axios'
import { Grid, Divider, Button, Paper, Select, MenuItem, InputLabel, IconButton } from '@mui/material';
import { FormInputText } from '../../form-components/FormInputText';
import { IconPlus } from '@tabler/icons';
import MyModal from '../../shared/Modal';
import EditVehicle from '../../catalogs/administration/_EditVehicles.js'; 

const steps = ['Selecciona Cliente', 'Selecciona Vehiculo', 'Agregar Detalles', 'Datos Generales'];

export default function EditGeneralInfoService({ idCompany, closeModal }) {
  const [company, setCompany] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [locations, setLocation] = useState([]);
  const [vehicles, setVehicles] = useState([]);
  let  [idCustomer, setIdCustomer] = useState(0);
  let  [idVehicle, setIdVehicle] = useState(0);
  let  [idLocation, setIdLocation] = useState(0);  
  const [openModalVehicle,setOpenModalVehicle] = useState(false);

  const URI = 'http://localhost:3001/companies/';
  const { register, handleSubmit, control, setValue, formState: { errors } } = useForm({
    mode: 'onBlur',
    defaultValues: {
      idLocation: "0",
      idCustomer: "0",
      idVehicle: "0", 
      comments: "",
      recibe: ""
    }
  });

  const handleClose = () =>{ 
    setOpenModalVehicle(false);
    getVehicles();
};
    
  useEffect(()=>{
    getCustomers();    
    getLocationsList();
},[])


useEffect(()=>{
    console.log("idCustomer");
    console.log(idCustomer);
    getVehicles();
},[idCustomer])

 //mostrar companies
 const getVehicles= async () =>{    
    const UriVehicles = 'http://localhost:3001/customervehicles/'
    const res = await axios.get(UriVehicles + idCustomer);
    setVehicles(res.data);
    console.log(res.data);
}



//mostrar customers
const getCustomers= async () =>{
    const URICustomers = 'http://localhost:3001/customers/'
    const res = await axios.get(URICustomers);
    setCustomers(res.data);
    console.log(res.data);
} 

//mostrar locations
const getLocationsList= async () =>{
    const UriLocations = 'http://localhost:3001/locations/'
   const res = await axios.get(UriLocations);
    setLocation(res.data);
} 
 
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
          <InputLabel variant="standard" htmlFor="uncontrolled-native">
            Cliente
        </InputLabel>
            <Select style={{ width: "150px" }}
                value={idCustomer}
                name='idCustomer'   getOptionLabel={(option) => option.label}  getOptionValue={(option) => option.value}    
                onChange={(selectedOption) => { setIdCustomer(`${selectedOption.target.value}`); console.log(`${selectedOption.target.value}`); }}
                >
                {!!customers?.length &&
                customers.map((customer) => (
                    <MenuItem key={customer.idcustomer} value={customer.idcustomer}>
                    {customer.shortname}
                    </MenuItem>
                ))}
            </Select>
           </Grid>
           <Grid item xs={12}>
           <InputLabel variant="standard" htmlFor="uncontrolled-native">
            Vehiculo
        </InputLabel>
         <Select style={{ width: "150px" }}
                value={idVehicle}
                name='idVehicle'   getOptionLabel={(option) => option.label}  getOptionValue={(option) => option.value}    
                onChange={(selectedOption) => { setIdVehicle(`${selectedOption.target.value}`); console.log(`${selectedOption.target.value}`); }}
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
           <InputLabel variant="standard" htmlFor="uncontrolled-native">
            Patio
        </InputLabel>
            <Select style={{ width: "150px" }}
                value={idLocation}
                name='idLocation'   getOptionLabel={(option) => option.label}  getOptionValue={(option) => option.value}    
                onChange={(selectedOption) => { setIdLocation(`${selectedOption.target.value}`); console.log(`${selectedOption.target.value}`); }}
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
              <FormInputText control={control} label={"Recibe"} name={"recibe"} ></FormInputText>
          </Grid>
          <Grid item xs={12}>
            <FormInputText control={control} label={"Comments"} name={"comments"} ></FormInputText>
          </Grid>
          <Grid item xs={6}>
          </Grid>
        </Grid>
      </form>
      {openModalVehicle && <MyModal id="id_myModal" title={idCustomer > 0 ? "Editar Vehiculo" : "Agregar Vehiculo"} openModal={openModalVehicle} closeModal={handleClose} >
                    <EditVehicle  idCustomer={idCustomer} idVehicle={idVehicle} closeModal={handleClose}/> 
            </MyModal>}   
    </Paper>
  )
}
