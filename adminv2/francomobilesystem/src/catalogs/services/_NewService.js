import * as React from 'react';
import { useEffect, useState } from 'react'
import { useForm, Controller } from 'react-hook-form';
import axios from 'axios'
import { Grid, Card, Button, Paper, Select, CardHeader, IconButton, Stepper, StepContent, Step, Box, Typography, StepLabel, Container } from '@mui/material';
import { FormInputText } from '../../form-components/FormInputText';
import { IconPlus } from '@tabler/icons';
import MyModal from '../../shared/Modal';
import MainCard from '../../ui-component/cards/MainCard';
import EditVehicle from '../../catalogs/administration/_EditVehicles.js';
import EditGeneralInfoService from './_GeneralInfoService';
import ServiceCommonFailuresList from './_ServiceFailuresDetailList.js';
const steps = ['Selecciona Cliente', 'Selecciona Vehiculo', 'Agregar Detalles', 'Datos Generales'];

export default function EditCompany({ idCompany, closeModal }) {
  const [company, setCompany] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [locations, setLocation] = useState([]);
  const [vehicles, setVehicles] = useState([]);
  let [idCustomer, setIdCustomer] = useState(0);
  let [idVehicle, setIdVehicle] = useState(0);
  let [idLocation, setIdLocation] = useState(0);
  const [openModalVehicle, setOpenModalVehicle] = useState(false);
  const [activeStep, setActiveStep] = useState(0);
  const [completed, setCompleted] = useState({});
  const [failuresList, setFailuresList] = useState([]);
  const totalSteps = () => {
    return steps.length;
  };

  const completedSteps = () => {
    return Object.keys(completed).length;
  };

  const isLastStep = () => {
    return activeStep === totalSteps() - 1;
  };

  const allStepsCompleted = () => {
    return completedSteps() === totalSteps();
  };

  const handleNext = () => {
    const newActiveStep =
      isLastStep() && !allStepsCompleted()
        ? // It's the last step, but not all steps have been completed,
        // find the first step that has been completed
        steps.findIndex((step, i) => !(i in completed))
        : activeStep + 1;
    setActiveStep(newActiveStep);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleStep = (step) => () => {
    setActiveStep(step);
  };

  const handleComplete = () => {
    const newCompleted = completed;
    newCompleted[activeStep] = true;
    setCompleted(newCompleted);
    handleNext();
  };


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

  const handleClose = () => {
    setOpenModalVehicle(false);
    getVehicles();
  };

  useEffect(() => {
    getCustomers();
    getLocationsList();
  }, [])


  useEffect(() => {
    console.log("idCustomer");
    console.log(idCustomer);
    getVehicles();
  }, [idCustomer])

  //mostrar companies
  const getVehicles = async () => {
    const UriVehicles = 'http://localhost:3001/customervehicles/'
    const res = await axios.get(UriVehicles + idCustomer);
    setVehicles(res.data);
    console.log(res.data);
  }



  //mostrar customers
  const getCustomers = async () => {
    const URICustomers = 'http://localhost:3001/customers/'
    const res = await axios.get(URICustomers);
    setCustomers(res.data);
    console.log(res.data);
  }

  //mostrar locations
  const getLocationsList = async () => {
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
    <MainCard title={<CardHeader title="Nuevo Servicio" />} >
      <Stepper nonLinear activeStep={activeStep}>
        <Step key={steps[0]} >
          <StepLabel  >{steps[0]}</StepLabel>
        </Step>
        <Step key={steps[1]} >
          <StepLabel  >{steps[1]}</StepLabel>
        </Step>
        <Step key={steps[2]} >
          <StepLabel  >{steps[2]}</StepLabel>
        </Step>
        <Step key={steps[3]} >
          <StepLabel  >{steps[3]}</StepLabel>
        </Step>
      </Stepper>
      {(() => {
        switch (activeStep) {
          case 0:
            return <React.Fragment>
              <MainCard>
                <CardHeader title={"Datos de Cliente"} ></CardHeader>
                <EditGeneralInfoService></EditGeneralInfoService>
              </MainCard>
            </React.Fragment>
          case 1:
            return <React.Fragment>
              <MainCard>
                <CardHeader title={"Datos de Fallas"} ></CardHeader>
                <ServiceCommonFailuresList failuresList={failuresList} setFailuresList={setFailuresList}></ServiceCommonFailuresList>
              </MainCard>

            </React.Fragment>
          case activeStep === steps.length: //case steps.length :
            return <React.Fragment>
              <Typography sx={{ mt: 2, mb: 1 }}>
                All steps completed - you&apos;re finished
              </Typography>
            </React.Fragment>
          default:
            return <React.Fragment>
              <Typography sx={{ mt: 2, mb: 1 }}>Step {activeStep + 1}</Typography>
            </React.Fragment>
        }

      })()}
      <React.Fragment>
        <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
          <Button
            color="inherit"
            disabled={activeStep === 0}
            onClick={handleBack}
            sx={{ mr: 1 }}
          >
            Back
          </Button>
          <Box sx={{ flex: '1 1 auto' }} />

          <Button onClick={handleNext}>
            {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
          </Button>
        </Box>
      </React.Fragment>
    </MainCard>
  )
}
