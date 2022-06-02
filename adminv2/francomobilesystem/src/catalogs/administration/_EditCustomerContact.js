import {  useEffect, useState} from 'react'
import { useForm  } from 'react-hook-form';
import axios from 'axios'
import { Grid, Divider, Button, Paper, Stack } from '@mui/material';
import { FormInputText } from '../../form-components/FormInputText.js';
import i18next from 'i18next';
const URI = 'http://localhost:3001/customercontact/';

export default function EditCustomerContact({idCustomerContact, idCustomer, closeModal }) {
//const [commonFailure] =useCommonFailures({idCommonFailure}); 
const [customerContact, setCustomerContact] = useState([]); 

 // const [categoriesFailure] = useSymptomsCategory (); 
 const { register, control, handleSubmit, setValue, formState: { errors }} = useForm({
    mode: 'onBlur',
    defaultValues:{
        idcommonfailures: "",
        shortdescription:"",
        symtomdescription:"",
        workrequested:"",
        hours:"",
        price:"",
        idsymptomcategory:""
    }
  }); 

 
  useEffect(() => {
    axios.get(URI + idCustomerContact).then((response) => {
        setCustomerContact(response.data);
    const fields = ['name', 'lastname', 'title','phone', 'mobile', 'email','password'];
    fields.forEach(field => {setValue(field, response.data[field]); });    
    });
  }, []);


  const handleChange =(e) =>{   
     console.log("entr e y");
    this.setState({value: e.target.value}); 
   }

  const onSubmit = async (data, e) => { 
    e.preventDefault();
    console.log(data);
    if(idCustomerContact>0){
      const URI = 'http://localhost:3001/customercontacts/' + idCustomerContact;
      axios.put(URI, {
        idcustomercontact: idCustomerContact,
        idCustomer:idCustomer,
        name: data.name,
        lastname:data.lastname ,
        title:data.title ,
        phone:data.phone ,
        mobile:data.mobile , 
        email:data.email , 
        password:data.password , 
      })
      .then(function (response) {
        console.log(response);
        closeModal();
      })
      .catch(function (error) {
        console.log(error);
      }); 
    }else{
      const URI = 'http://localhost:3001/customercontacts/' ;
      axios.post(URI, {
        idCustomer:idCustomer,
        name: data.name,
        lastname:data.lastname ,
        title:data.title ,
        phone:data.phone ,
        mobile:data.mobile , 
        email:data.email , 
        password:data.password , 
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
          <Grid item xs={2}>
            <FormInputText control={control} label={i18next.t('label.title')} name={"title"} ></FormInputText>
          </Grid>
          <Grid item xs={4}>
            <FormInputText control={control} label={i18next.t('label.Name')} name={"name"} ></FormInputText>
          </Grid>
          <Grid item xs={4}>
            <FormInputText control={control} label={i18next.t('label.Lastname')} name={"lastname"} ></FormInputText>
          </Grid>         
          <Grid item xs={6}>
          <FormInputText control={control} label={i18next.t('label.Phone')} name={"phone"} ></FormInputText>
          </Grid>
          <Grid item xs={6}>
          <FormInputText control={control} label={i18next.t('label.Mobile')} name={"mobile"} ></FormInputText>
          </Grid>
          <Grid item xs={6}>
          <FormInputText control={control} label={i18next.t('label.Email')} name={"email"} ></FormInputText>
          </Grid>
          <Grid item xs={6}>
          <FormInputText control={control} label={i18next.t('label.pass')} name={"password"} ></FormInputText>
          </Grid>
          <Grid item xs={6}>
          <FormInputText control={control} label={i18next.t('label.confirmpass')} name={"password"} ></FormInputText>
          </Grid>
          <Grid item xs={6}> 
          </Grid>
          <Grid item xs={12}>
            <Divider variant="inset" />
          </Grid>
          <Grid item xs={12}  alignContent="right">
            <Button onClick={handleSubmit(onSubmit)}  variant="contained" >
            {i18next.t('label.Save')}
            </Button>
            <Button variant="contained" color='secondary' onClick={closeModal} >
            {i18next.t('label.Cancel')}
            </Button>
          </Grid>
        </Grid>
      </form>
    </Paper>
     
 )
}