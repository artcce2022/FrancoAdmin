import {  useEffect, useState} from 'react'
import { useForm  } from 'react-hook-form';
import axios from 'axios'
 
const useEmployee = ({ idEmployee }) => {
  const URI = 'http://localhost:3001/employees/' + idEmployee;
  const [employee, setEmployee] = useState([]);
 
  

  console.log(idEmployee);
    //mostrar companies
    const getEmployee = async () => {
      const res = await axios.get(URI );
      console.log(res.data);
      
      setEmployee(res.data);
    }

    useEffect(() => {
        getEmployee()
    },[])
  return [employee, setEmployee];
};

export default function EditEmployee({idEmployee, closeModal }) {
  const [employee] =useEmployee({idEmployee}); 
  const {register,handleSubmit,setValue,   formState:{errors}} = useForm({
    mode: 'onBlur',
    defaultValues:{
      firstname: "",
      lastname:"",
      birthdate:"",
      ssn:"",
      address:"",
      city:"",
      zipcode:"",
      phone:"",
      email:"",
      isActive:"",
      employenumber:"",
      hiredate:"",
      ismechanic:""
    }
  }); 

  const fields = ['firstname', 'lastname', 'birthdate', 'ssn', 
  'address', 'city', 'zipcode' , 'phone',
   'email', 'isActive', 'employenumber', 'hiredate', 'ismechanic'];
  fields.forEach(field => setValue(field, employee[field])); 
    
  const onSubmit = async data => { console.log(data);
    if(idEmployee>0){
      const URI = 'http://localhost:3001/employees/' + idEmployee;
      axios.put(URI, {
        firstname: data.firstname,
        lastname: data.lastname,
        birthdate:data.birthdate ,
        ssn:data.ssn ,
        address:data.address ,
        city:data.city ,
        zipcode:data.zipcode ,
        phone:data.phone ,
        email:data.email ,
        isActive:data.isActive ,
        employenumber:data.employenumber ,
        hiredate:data.hiredate ,
        ismechanic:data.ismechanic
      })
      .then(function (response) {
        console.log(response);
        closeModal();
      })
      .catch(function (error) {
        console.log(error);
      }); 
    }else{
      const URI = 'http://localhost:3001/employees/' ;
      axios.post(URI, {
        firstname: data.firstname,
        lastname: data.lastname,
        birthdate:data.birthdate ,
        ssn:data.ssn ,
        address:data.address ,
        city:data.city ,
        zipcode:data.zipcode ,
        phone:data.phone ,
        email:data.email ,
        isActive:data.isActive ,
        employenumber:data.employenumber ,
        hiredate:data.hiredate ,
        ismechanic:data.ismechanic
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
                 <label>Nombre:</label>
                 <input className='form-control' type="text" name="firstname"  {...register('firstname', {required:"* Dato Requerido"})}  /*ref={register({required: "Dato Requerido"})} */ placeholder="Nombre de Empresa"  />
                <span className="badge badge-light"> {errors.firstname?.message}</span>
                  </div>
               <div className="form-group">
                 <label>Apellido:</label>
                 <input className='form-control'  type="text" name="lastname" {...register('lastname', {required:"* Dato Requerido"})} /*ref={register({required: "Dato Requerido"})}*/   placeholder="Agregar Telefono" />
                 <span className="badge badge-light"> {errors.lastname?.message}</span>
               </div>
               <div className="form-group">
                 <label>birthdate:</label>
                 <input className='form-control'  type="text" name="birthdate" {...register('birthdate', {required:"* Dato Requerido"})} /*ref={register({required: "Dato Requerido"})}*/   placeholder="Agregar Telefono" />
                 <span className="badge badge-light"> {errors.birthdate?.message}</span>
               </div> 
               <div className="form-group">
                 <label>SSN:</label>
                 <input className='form-control'  type="text" name="ssn" {...register('ssn', {required:"* Dato Requerido"})} /*ref={register({required: "Dato Requerido"})}*/   placeholder="Agregar Telefono" />
                 <span className="badge badge-light"> {errors.ssn?.message}</span>
               </div> 
               <div className="form-group">
                 <label>Address:</label>
                 <input className='form-control'  type="text" name="address" {...register('address', {required:"* Dato Requerido"})} /*ref={register({required: "Dato Requerido"})}*/   placeholder="Agregar Telefono" />
                 <span className="badge badge-light"> {errors.address?.message}</span>
               </div> 
               <div className="form-group">
                 <label>City:</label>
                 <input className='form-control'  type="text" name="city" {...register('city', {required:"* Dato Requerido"})} /*ref={register({required: "Dato Requerido"})}*/   placeholder="Agregar Telefono" />
                 <span className="badge badge-light"> {errors.city?.message}</span>
               </div> 
               <div className="form-group">
                 <label>Zip Code:</label>
                 <input className='form-control'  type="text" name="zipcode" {...register('zipcode', {required:"* Dato Requerido"})} /*ref={register({required: "Dato Requerido"})}*/   placeholder="Agregar Telefono" />
                 <span className="badge badge-light"> {errors.zipcode?.message}</span>
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
               <div className="form-group">
                 <label>Id Empleado:</label>
                 <input className='form-control'  type="text" name="employenumber" {...register('employenumber', {required:"* Dato Requerido"})} /*ref={register({required: "Dato Requerido"})}*/   placeholder="Agregar Telefono" />
                 <span className="badge badge-light"> {errors.employenumber?.message}</span>
               </div>
               <div className="form-group">
                 <label>Fecha de Contratacion:</label>
                 <input className='form-control'  type="text" name="hiredate" {...register('hiredate', {required:"* Dato Requerido"})} /*ref={register({required: "Dato Requerido"})}*/   placeholder="Agregar Telefono" />
                 <span className="badge badge-light"> {errors.hiredate?.message}</span>
               </div>
               <div className="form-group">
                 <label>Mecanico:</label>
                 {/* <input className='form-control'  type="text" name="ismechanic" {...register('ismechanic', {required:"* Dato Requerido"})}  placeholder="Agregar Telefono" /> */}
                 <input type="checkbox" value="isActive"></input>
                 <span className="badge badge-light"> {errors.ismechanic?.message}</span>
               </div>
               <div className="form-group">
                 <label>Activo:</label>
                 <input type="checkbox" value="isActive"></input>
                 {/* <input className='form-control'  type="text" name="isActive" {...register('isActive', {required:"* Dato Requerido"})}  placeholder="Agregar Telefono" /> */}
                 <span className="badge badge-light"> {errors.isActive?.message}</span>
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
 