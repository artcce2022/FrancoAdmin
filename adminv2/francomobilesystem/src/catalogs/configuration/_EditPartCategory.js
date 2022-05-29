import {  useEffect, useState} from 'react'
import { useForm  } from 'react-hook-form';
import axios from 'axios'
import {  Grid, Divider, Button, Paper, Stack } from '@mui/material';
import { FormInputText } from '../../form-components/FormInputText';
import i18next from 'i18next';
const URI = 'http://localhost:3001/partscategories/';
    
export default function EditPartCategory({idPartCategory, closeModal }) {
    const [sCategory, setSCatgegory] =useState([]);
    const { register, handleSubmit, control, setValue, formState: { errors } } = useForm({
        mode: 'onBlur',
      defaultValues:{
        idPartCategory: "",
        category:""
      }
    }); 
  
    useEffect(() => {
        axios.get(URI + idPartCategory).then((response) => {
            setSCatgegory(response.data);
          
          console.log('data');
          console.log(response.data);
          const fields = ['idPartCategory', 'category'];
        fields.forEach(field => {setValue(field, response.data[field]); });    
        });
      }, []); 
      
    const onSubmit = async data => { console.log(data);
      if(idPartCategory>0){
        const URI = 'http://localhost:3001/partscategories/' + idPartCategory;
        axios.put(URI, {
            idPartCategory: idPartCategory,
            category: data.category
        })
        .then(function (response) {
          console.log(response);
          closeModal();
        })
        .catch(function (error) {
          console.log(error);
        }); 
      }else{
        const URI = 'http://localhost:3001/partscategories/' ;
        axios.post(URI, {
            idPartCategory: idPartCategory,
            category: data.category 
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
            <FormInputText   control={control} label={i18next.t('label.Categoria')} name={"category"} ></FormInputText>
         </Grid>
        <Grid item xs={12}>
          <Divider variant="inset" />
        </Grid>
        <Grid item xs={12}>
        <Stack item xs={12} alignContent="right" direction="row" spacing={2}>
          <Button onClick={handleSubmit(onSubmit)}  variant="contained" >
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
   )
}
   