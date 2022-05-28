import {  useEffect, useState} from 'react'
import { useForm  } from 'react-hook-form';
import axios from 'axios'
import { Grid, Divider, Button, Paper } from '@mui/material';
import { FormInputText } from '../../form-components/FormInputText.js';
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
            <FormInputText control={control} label={"Title"} name={"title"} ></FormInputText>
          </Grid>
          <Grid item xs={4}>
            <FormInputText control={control} label={"Name"} name={"name"} ></FormInputText>
          </Grid>
          <Grid item xs={4}>
            <FormInputText control={control} label={"Lastname"} name={"lastname"} ></FormInputText>
          </Grid>         
          <Grid item xs={6}>
          <FormInputText control={control} label={"Phone"} name={"phone"} ></FormInputText>
          </Grid>
          <Grid item xs={6}>
          <FormInputText control={control} label={"Mobilephone"} name={"mobile"} ></FormInputText>
          </Grid>
          <Grid item xs={6}>
          <FormInputText control={control} label={"Email"} name={"email"} ></FormInputText>
          </Grid>
          <Grid item xs={6}>
          <FormInputText control={control} label={"Password"} name={"password"} ></FormInputText>
          </Grid>
          <Grid item xs={6}>
          <FormInputText control={control} label={"Confirmar Password"} name={"password"} ></FormInputText>
          </Grid>
          <Grid item xs={6}> 
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