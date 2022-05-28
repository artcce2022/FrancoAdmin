import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form';
import axios from 'axios'
import { Grid, Divider, Button, Paper, Stack } from '@mui/material';
import { FormInputText } from '../../form-components/FormInputText.js';
import { FormDateText } from '../../form-components/FormDateText.js';
import i18next from 'i18next';
const URI = 'http://localhost:3001/employees/';




export default function EditEmployee({ idEmployee, closeModal }) {
  const [employee, setEmployee] = useState([]);
  const { register, control, handleSubmit, setValue, formState: { errors } } = useForm({
    mode: 'onBlur',
    defaultValues: {
      firstname: "",
      lastname: "",
      birthdate: "",
      ssn: "",
      address: "",
      city: "",
      zipcode: "",
      phone: "",
      email: "",
      isActive: "",
      employenumber: "",
      hiredate: "",
      ismechanic: ""
    }
  });
  const [selectedBirthDate, setSelectedBirthDate] = useState(new Date());

  // const fields = ['firstname', 'lastname', 'birthdate', 'ssn',
  //   'address', 'city', 'zipcode', 'phone',
  //   'email', 'isActive', 'employenumber', 'hiredate', 'ismechanic'];
  // fields.forEach(field => setValue(field, employee[field]));

  useEffect(() => {
    axios.get(URI + idEmployee).then((response) => {
      setEmployee(response.data);
      const fields = ['firstname', 'lastname', 'ssn',
        'address', 'city', 'zipcode', 'phone',
        'email', 'isActive', 'employenumber', 'hiredate', 'ismechanic'];
      fields.forEach(field => { setValue(field, response.data[field]); });

      setSelectedBirthDate(new Date(parseInt(response.data["birthdate"].split('-')[0]), (parseInt(response.data["birthdate"].split('-')[1]) - 1),
        parseInt(response.data["birthdate"].split('-')[2])));
      // setSelectedBirthDate({ year: parseInt(response.data["birthdate"].split('-')[0]), 
      //             month:parseInt(response.data["birthdate"].split('-')[1]), 
      //             day:parseInt(response.data["birthdate"].split('-')[2])});
    });
  }, []);

  const onSubmit = async data => {
    console.log(data);
    if (idEmployee > 0) {
      const URI = 'http://localhost:3001/employees/' + idEmployee;
      axios.put(URI, {
        firstname: data.firstname,
        lastname: data.lastname,
        birthdate: data.birthdate,
        ssn: data.ssn,
        address: data.address,
        city: data.city,
        zipcode: data.zipcode,
        phone: data.phone,
        email: data.email,
        isActive: data.isActive,
        employenumber: data.employenumber,
        hiredate: data.hiredate,
        ismechanic: data.ismechanic
      })
        .then(function (response) {
          console.log(response);
          closeModal();
        })
        .catch(function (error) {
          console.log(error);
        });
    } else {
      const URI = 'http://localhost:3001/employees/';
      axios.post(URI, {
        firstname: data.firstname,
        lastname: data.lastname,
        birthdate: data.birthdate,
        ssn: data.ssn,
        address: data.address,
        city: data.city,
        zipcode: data.zipcode,
        phone: data.phone,
        email: data.email,
        isActive: data.isActive,
        employenumber: data.employenumber,
        hiredate: data.hiredate,
        ismechanic: data.ismechanic
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
          {/* <Grid item xs={12}>
            <hr></hr>
          </Grid> */}
            <Grid item xs={6}>
              <FormInputText control={control} label={i18next.t('label.Name')} name={"firstname"} ></FormInputText>
            </Grid>
            <Grid item md={6}>
              <FormInputText control={control} label={i18next.t('label.Lastname')} name={"lastname"} ></FormInputText>
            </Grid>
          <Grid item xs={6}>
            <FormInputText control={control} label={i18next.t('label.Lastname')} name={"lastname"} ></FormInputText>
          </Grid>
          <Grid item xs={6}>
            <FormDateText control={control} label={i18next.t('label.birthdate')} name={"birthdate"} ></FormDateText>
          </Grid>
          <Grid item xs={6}>
            <FormInputText control={control} label={i18next.t('label.ssn')} name={"ssn"} ></FormInputText>
          </Grid>
          <Grid item xs={12}>
            <FormInputText control={control} label={i18next.t('label.Address')} name={"address"} ></FormInputText>
          </Grid>
          <Grid item xs={6}>
            <FormInputText control={control} label={i18next.t('label.City')} name={"city"} ></FormInputText>
          </Grid>
          <Grid item xs={6}>
            <FormInputText control={control} label={i18next.t('label.Phone')} name={"phone"} ></FormInputText>
          </Grid>
          <Grid item xs={12}>
            <FormInputText control={control} label={i18next.t('label.Email')} name={"email"} ></FormInputText>
          </Grid> 
          <Grid item xs={6}>
            <FormDateText control={control} label={i18next.t('label.hiredate')} name={"hiredate"} ></FormDateText>
          </Grid>
           <Grid item xs={12}>
           <Stack item xs={12} alignContent="right" direction="row" spacing={2}>
            <Button onClick={handleSubmit(onSubmit)} variant="contained" >
              Guardar
            </Button>
            <Button variant="contained" color='secondary' onClick={closeModal} >
              Cancel
            </Button>
            </Stack>
          </Grid>
        </Grid>
      </form>
    </Paper>
  );
}
