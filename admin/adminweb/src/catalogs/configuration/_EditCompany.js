import {  useEffect, useState} from 'react'
import { useForm  } from 'react-hook-form';
import axios from 'axios'
 
const useCompany = ({ idCompany }) => {
  const URI = 'http://localhost:3001/companies/' + idCompany;
  const [company, setCompany] = useState([]);
 
  

  console.log(idCompany);
    //mostrar companies
    const getCompany = async () => {
      const res = await axios.get(URI );
      console.log(res.data);
      
      setCompany(res.data);
    }

    useEffect(() => {
      getCompany()
    },[])
  return [company, setCompany];
};

export default function EditCompany({idCompany, closeModal }) {
  const [company] =useCompany({idCompany}); 
  const {register,handleSubmit,setValue,   formState:{errors}} = useForm({
    mode: 'onBlur',
    defaultValues:{
      companyName: "",
      phone:"",
      email:""
    }
  }); 

  const fields = ['companyName', 'phone', 'email'];
  fields.forEach(field => setValue(field, company[field])); 
    
  const onSubmit = async data => { console.log(data);
    if(idCompany>0){
      const URI = 'http://localhost:3001/companies/' + idCompany;
      axios.put(URI, {
        companyName: data.companyName,
        phone: data.phone,
        email:data.email 
      })
      .then(function (response) {
        console.log(response);
        closeModal();
      })
      .catch(function (error) {
        console.log(error);
      }); 
    }else{
      const URI = 'http://localhost:3001/companies/' ;
      axios.post(URI, {
        companyName: data.companyName,
        phone: data.phone,
        email:data.email
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
   <div>
      <form onSubmit={handleSubmit(onSubmit)}>
           <div className='card-body'>
               <div className="form-group">
                 <label>Nombre de Empresa:</label>
                 <input className='form-control' type="text" name="companyName"  {...register('companyName', {required:"* Dato Requerido"})}  /*ref={register({required: "Dato Requerido"})} */ placeholder="Nombre de Empresa"  />
                <span className="badge badge-light"> {errors.companyName?.message}</span>
                  </div>
               <div className="form-group">
                 <label>Telefono:</label>
                 <input className='form-control'  type="text" name="phone" {...register('phone', {required:"* Dato Requerido"})} /*ref={register({required: "Dato Requerido"})}*/   placeholder="Agregar Telefono" />
                 <span className="badge badge-light"> {errors.phone?.message}</span>
               </div>
               <div className="form-group">
                 <label>Email:</label>
                 <input className='form-control'  type="email" name="email"  {...register('email', {required:"* Dato Requerido"})} /* ref={register({required: "Dato Requerido"})}*/ placeholder="Agregar Email"  />
                 <span className="badge badge-light"> {errors.email?.message}</span>
               </div>
               <div className="col-md-offset-2 col-md-10">
               <input type="submit"  defaultValue="Guardar" className="btn btn-primary float-left" />
                   <button  type="button" onClick={closeModal} className="btn btn-secondary float-right" >Cancel</button>
               </div>
             </div>
         </form>
   </div>
  


 )
}
 