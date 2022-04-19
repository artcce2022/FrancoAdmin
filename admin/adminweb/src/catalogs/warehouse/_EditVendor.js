import {  useEffect, useState} from 'react'
import { useForm  } from 'react-hook-form';
import axios from 'axios'
 
export default function EditVendor({idVendor, closeModal }) {
 //const [warehouse] =useWarehouse({idWarehouse}); 
  const [vendor, setVendor] = useState([]);
  const URI = 'http://localhost:3001/vendors/' + idVendor; 
  const {register,handleSubmit,setValue,   formState:{errors}} = useForm({
    mode: 'onBlur',
    defaultValues:{
        name: "",
        contact:"1",
      address:"",
      zipcode:"",
      phone:"", 
      extension:"", 
      fax:"", 
      email:"", 
      terms:"30", 
      limits:"", 
      comments:""
    }
  }); 

  
  useEffect(()=>{
    axios.get(URI).then((response) => { 
        setVendor(response.data);
      console.log("data");
      
      console.log(response.data);
      const fields = ['name', 'contact',  'address', 'zipcode', 'phone', 'extension'
      , 'fax', 'email', 'terms', 'limits', 'comments'];
      fields.forEach(field => {setValue(field, response.data[field]); });
  })
},[]) // empty array makes hook working once

  const handleChange = (e) => {
    console.log("entr e y");
    this.setState({ value: e.target.value });
  }

  
  // const fields = ['warehousename', 'address',  'phone', 'manager'];
  // fields.forEach(field => setValue(field, warehouse[field])); 
    
  const onSubmit = async data => { console.log(data);
    if(idVendor>0){
      const URI = 'http://localhost:3001/vendors/' + idVendor;
      axios.put(URI, {
        idVendor: idVendor,
        name: data.name,
        contact:data.contact ,
        address:data.address ,
        phone:data.phone , 
        zipcode:data.zipcode , 
        extension:data.extension , 
        fax:data.fax , 
        email:data.email , 
        terms:data.terms , 
        limits:data.limits , 
        comments:data.comments 
      })
      .then(function (response) {
        console.log(response);
        closeModal();
      })
      .catch(function (error) {
        console.log(error);
      }); 
    }else{
      const URI = 'http://localhost:3001/vendors/' ;
      axios.post(URI, {
        idVendor: idVendor,
        name: data.name,
        contact:data.contact ,
        address:data.address ,
        phone:data.phone , 
        zipcode:data.zipcode , 
        extension:data.extension , 
        fax:data.fax , 
        email:data.email , 
        terms:data.terms , 
        limits:data.limits , 
        comments:data.comments 
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
                 <label>Vendedor:</label>
                 <input className='form-control' type="text" name="name"  {...register('name', {required:"* Dato Requerido"})}  placeholder="Nombre" onChange={(e) => handleChange} />
                <span className="badge badge-light"> {errors.name?.message}</span>
                  </div>
                  <div className="form-group">
                 <label>Contacto:</label>
                 <input className='form-control' type="text" name="contact"  {...register('contact', {required:"* Dato Requerido"})}  placeholder="Contacto" onChange={(e) => handleChange} />
                <span className="badge badge-light"> {errors.contact?.message}</span>
                  </div>
               <div className="form-group">
                 <label>Direccion:</label>
                 <textarea className='form-control'  type="textarea" name="address" {...register('address', {required:"* Dato Requerido"})}   placeholder="Agregar Direccion" onChange={(e) => handleChange} />
                 <span className="badge badge-light"> {errors.address?.message}</span>
               </div>
               <div className="form-group">
                 <label>ZipCode:</label>
                 <input className='form-control'  type="text" name="zipcode"  {...register('zipcode', {required:"* Dato Requerido"})}placeholder="Agregar ZipCode" onChange={(e) => handleChange}  />
                 <span className="badge badge-light"> {errors.zipcode?.message}</span>
               </div>
               <div className="form-group">
                 <label>Telefono:</label>
                 <input className='form-control'  type="text" name="phone"  {...register('phone', {required:"* Dato Requerido"})}placeholder="Agregar Telefono" onChange={(e) => handleChange}  />
                 <span className="badge badge-light"> {errors.phone?.message}</span>
               </div>
               <div className="form-group">
                 <label>Extension:</label>
                 <input className='form-control'  type="text" name="extension"  {...register('extension', {required:"* Dato Requerido"})}placeholder="Agregar Extension" onChange={(e) => handleChange}  />
                 <span className="badge badge-light"> {errors.extension?.message}</span>
               </div>
               <div className="form-group">
                 <label>Fax:</label>
                 <input className='form-control'  type="text" name="fax"  {...register('fax', {required:"* Dato Requerido"})}placeholder="Agregar Fax" onChange={(e) => handleChange}  />
                 <span className="badge badge-light"> {errors.fax?.message}</span>
               </div>
               <div className="form-group">
                 <label>Email:</label>
                 <input className='form-control'  type="text" name="email"  {...register('email', {required:"* Dato Requerido"})}  placeholder="Agregar Email" onChange={(e) => handleChange} />
                 <span className="badge badge-light"> {errors.email?.message}</span>
               </div>
               <div className="form-group">
                 <label>Terms:</label>
                 <input className='form-control'  type="text" name="terms"  {...register('terms', {required:"* Dato Requerido"})}  placeholder="Agregar Terms" onChange={(e) => handleChange} />
                 <span className="badge badge-light"> {errors.terms?.message}</span>
               </div>
               <div className="form-group">
                 <label>Limits:</label>
                 <input className='form-control'  type="text" name="limits"  {...register('limits', {required:"* Dato Requerido"})}  placeholder="Agregar Limits" onChange={(e) => handleChange} />
                 <span className="badge badge-light"> {errors.limits?.message}</span>
               </div>
               <div className="form-group">
                 <label>Comments:</label>
                 <input className='form-control'  type="text" name="comments"  {...register('comments', {required:"* Dato Requerido"})}  placeholder="Agregar Comments" onChange={(e) => handleChange} />
                 <span className="badge badge-light"> {errors.comments?.message}</span>
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
 