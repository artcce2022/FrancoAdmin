import * as React from 'react';
import { useEffect, useState } from 'react'
import { useForm, Controller } from 'react-hook-form';
import axios from 'axios'
import MainCard from '../../ui-component/cards/MainCard';
import { CardHeader, Grid, Divider, Button, Paper, Select, MenuItem, InputLabel, IconButton, Box, CardContent } from '@mui/material';
import { FormInputT0ext } from '../../form-components/FormInputTextV2';
import { IconPlus } from '@tabler/icons';
import MyModal from '../../shared/Modal';
import StepButtons from '../../form-components/Steps/StepButtons';
import CustomerDetail from '../../Components/SelectCustomer';

export default function EditCustomerService({ handleBack, handleNext, isLastStep, isFirstStep, formValues, action, idCustomerSelected, currentId }) {
  const [customers, setCustomers] = useState([]);
  let [idCustomer, setIdCustomer] = useState(0);
  let [refreshData, setRefreshData] = useState(false);
  const [values, setValues] = useState({
    idLocation: "0",
    idCustomer: "0",
    idVehicle: "0",
    comments: "",
    recibe: ""
  });
  const URI = 'http://localhost:3001/companies/';

  useEffect(() => {
    setRefreshData(true);
    getCustomers();
    //localStorage.setItem(currentId.id, '')
    const data = localStorage.getItem(`${currentId}`)
    if (data != null) {
      setRefreshData(false);
      let newIdCustomer = `${JSON.parse(data).idCustomer}`;
      setIdCustomer(parseInt(newIdCustomer) || 0);
      setRefreshData(true);
    }
  }, []); // empty array makes hook working once

  // useEffect(() => {
  //   getCustomers();  
  //       setIdCustomer(formValues.idCustomer); 
  //     setRefreshData(true); 
  // }, [])

  useEffect(() => {
    setRefreshData(true);
    action(idCustomer);
  }, [idCustomer])


  //mostrar customers
  const getCustomers = async () => {
    const URICustomers = 'http://localhost:3001/customers/'
    const res = await axios.get(URICustomers);
    setCustomers(res.data); 
  }
  return (
    <>
      <MainCard>
        <CardContent >
          <form  >
            <Grid item xs={12}>
              <InputLabel variant="standard" htmlFor="uncontrolled-native">
                Cliente
              </InputLabel>
              <Select value={idCustomer} style={{ minWidth: "250px" }}
                name='idCustomer'
                onChange={
                  (selectedOption) => {setRefreshData(false); setIdCustomer(selectedOption.target.value);}}
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
              {refreshData  && <CustomerDetail idCustomer={idCustomer}></CustomerDetail>}
            </Grid>
          </form>
        </CardContent>
        <StepButtons handleBack={() => { handleBack(values) }} handleNext={() => { handleNext(values) }} isFirstStep={isFirstStep} isLastStep={isLastStep}></StepButtons>
      </MainCard>
    </>
  )
}
