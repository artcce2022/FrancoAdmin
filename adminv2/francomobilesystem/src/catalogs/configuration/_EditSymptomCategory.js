import {  useEffect, useState} from 'react'
import { useForm  } from 'react-hook-form';
import axios from 'axios'
import {  Grid, Divider, Button, Paper } from '@mui/material';
import { FormInputText } from '../../form-components/FormInputText';
const URI = 'http://localhost:3001/scategories/';
   

  
export default function EditSymptomCategory({idSymptomCategory, closeModal }) {
    const [sCategory, setSCatgegory] =useState([]);
    const { register, handleSubmit, control, setValue, formState: { errors } } = useForm({
        mode: 'onBlur',
      defaultValues:{
        idSymptomCategory: "",
        category:""
      }
    }); 
  
    useEffect(() => {
        axios.get(URI + idSymptomCategory).then((response) => {
            setSCatgegory(response.data);
          
          console.log('data');
          console.log(response.data);
          const fields = ['idSymptomCategory', 'category'];
          fields.forEach(field => {setValue(field, response.data[field]); });    
        });
      }, []); 
 
      
    const onSubmit = async data => { console.log(data);
      if(idSymptomCategory>0){
        const URI = 'http://localhost:3001/scategories/' + idSymptomCategory;
        axios.put(URI, {
            idSymptomCategory: idSymptomCategory,
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
        const URI = 'http://localhost:3001/scategories/' ;
        axios.post(URI, {
            idSymptomCategory: idSymptomCategory,
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
               <FormInputText   control={control} label={"Categoria"} name={"category"} ></FormInputText>
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
   