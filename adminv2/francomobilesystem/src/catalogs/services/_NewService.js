import * as React from 'react';
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form';
import axios from 'axios'
import { CardHeader, Stepper, Step, Typography, StepLabel, Grid, CardContent } from '@mui/material';
import { useLocation } from 'react-router';
import MainCard from '../../ui-component/cards/MainCard';
import EditGeneralInfoService from './_GeneralInfoService';
import EditVehicleInfoService from './_EditVehicleService.js'
import ServiceCommonFailuresList from './_ServiceFailuresDetailList.js';
import ServiceCommonDetailsList from './_ServiceDetails';
import queryString from 'query-string';
import EditCustomerService from './_EditCustomerService';
const steps = ['Selecciona Cliente', 'Selecciona Vehiculo', 'Fallas Reportadas', 'Detalles Reportados', 'Datos Generales'];

export default function EditCompany({ idCompany, closeModal }) {
  const location = useLocation();
  let currentId = queryString.parse(location.search)
  const [activeStep, setActiveStep] = useState(0);
  const [completed, setCompleted] = useState({});
  const [failuresList, setFailuresList] = useState([]);
  const [detailList, setDetailList] = useState([]);
  const [idCustomer, setIdCustomer] = useState(0);
  const [idVehicle, setIdVehicle] = useState(0);
  const [values, setValues] = useState({});
  //currentId.id

  useEffect(() => {
    //localStorage.setItem(currentId.id, '')
    const data = localStorage.getItem(`${currentId.id}`)

    
    console.log(data);
    console.log("Data")
    if (data != null) {
      setValues(JSON.parse(data) || {});
      let newIdCustomer =  JSON.parse(data).idCustomer;
      let newIdVehicle =  JSON.parse(data).idVehicle;
      setIdCustomer(newIdCustomer || 0);
      setIdVehicle(newIdVehicle || 0); 

      const newFailureList = JSON.parse(data).FailureList;
      if(newFailureList!=null){
        setFailuresList(newFailureList);
      }      
      const newDetailList = JSON.parse(data).DetailList;
      if(newDetailList!=null){
        console.log(newDetailList);
        console.log("newDetailList")
        setDetailList(newDetailList);
      }     
    }
  }, []); // empty array makes hook working once

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

  const goToNextStep = () => {
    const newActiveStep =
      isLastStep() && !allStepsCompleted()
        ? // It's the last step, but not all steps have been completed,
        // find the first step that has been completed
        steps.findIndex((step, i) => !(i in completed))
        : activeStep + 1;
    setActiveStep(newActiveStep);
  };


  const handleBack = (form) => {
    // let newId = "step_" + activeStep;
    // setValues(prev => ({ ...prev, [newId]: form }));
    // localStorage.setItem(`${currentId.id}`, JSON.stringify(values))
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleNext = (form) => {
    console.log("activeStep");
    console.log(form);
    console.log(activeStep);

    let newId = "activeStep_" + activeStep; 
    if (activeStep===0 || activeStep===1 ){
      //Do nothing
    }    
    else if(activeStep===2){
       newId = "FailureList"; 
      setValues(prev => ({ ...prev, [newId]: failuresList }));
      localStorage.setItem(`${currentId.id}`, JSON.stringify(values))     
    }
    else if(activeStep===3){
      newId = "DetailList"; 
      setValues(prev => ({ ...prev, [newId]: form }));
      localStorage.setItem(`${currentId.id}`, JSON.stringify(values))     
    }
  goToNextStep();
  };

  const preSaveData = (form) => { 
    let newId = "step_" + activeStep;
    setValues(prev => ({ ...prev, [newId]: form }));
    localStorage.setItem(`${currentId.id}`, JSON.stringify(values))
  };

  useEffect(() => { 
    setValues(prev => ({ ...prev, "idCustomer": idCustomer }));
  }, [idCustomer]); //run when idcustomer change

  useEffect(() => { 
    setValues(prev => ({ ...prev, "idVehicle": idVehicle }));
  }, [idVehicle]); //run when idvehicle change

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
      <CardContent>
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
          const props = { handleBack, handleNext, isFirstStep: activeStep === 0, isLastStep: activeStep === steps.length - 1 }
          switch (activeStep) {
            case 0:
              return <EditCustomerService currentId={currentId.id}  formValues={values} {...props} action={setIdCustomer} idCustomerSelected={idCustomer} > </EditCustomerService>
            case 1:
              return <EditVehicleInfoService  currentId={currentId.id}  formValues={values} {...props} action={setIdVehicle} idCustomer={idCustomer} selectedIdVehicle={idVehicle} ></EditVehicleInfoService>
            case 2: //EditVehicleInfoService
              return <ServiceCommonFailuresList preSaveData={preSaveData} failuresList={failuresList} setFailuresList={setFailuresList} handleBack={handleBack} handleNext={handleNext} isFirstStep={activeStep === 0} isLastStep={activeStep === steps.length - 1} ></ServiceCommonFailuresList>
            case 3:
              return <ServiceCommonDetailsList preSaveData={preSaveData} detailList={detailList} setDetailList={setDetailList} handleBack={handleBack} handleNext={handleNext} isFirstStep={activeStep === 0} isLastStep={activeStep === steps.length - 1} ></ServiceCommonDetailsList>
            case 4:
              return <EditGeneralInfoService formValues={values} {...props} idCustomer={idCustomer} > </EditGeneralInfoService>
            case activeStep === steps.length: //case steps.length :
              return <Typography sx={{ mt: 2, mb: 1 }}>All steps completed - you&apos;re finished</Typography>
            default:
              return <Typography sx={{ mt: 2, mb: 1 }}>steps</Typography>
          }
        })()}
      </CardContent>

    </MainCard>
  )
}
