import {  useEffect, useState} from 'react'
import { useForm  } from 'react-hook-form';
import axios from 'axios'
 
export default function EditWarehouse({idWarehouse, closeModal }) {
 //const [warehouse] =useWarehouse({idWarehouse}); 
  const [warehouse, setWarehouse] = useState([]);
  const URI = 'http://localhost:3001/warehouse/' + idWarehouse; 
  const {register,handleSubmit,setValue,   formState:{errors}} = useForm({
    mode: 'onBlur',
    defaultValues:{
      idLocation: "",
      idCompany:"1",
      warehousename:"",
      address:"",
      phone:"", 
      manager:""
    }
  }); 

  
  useEffect(()=>{
    axios.get(URI).then((response) => { 
      setWarehouse(response.data);
      console.log("data");
      
      console.log(response.data);
      const fields = ['warehousename', 'address',  'phone', 'manager'];
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
    if(idWarehouse>0){
      const URI = 'http://localhost:3001/warehouse/' + idWarehouse;
      axios.put(URI, {
        idWarehouse: idWarehouse,
        idCompany: 1,
        warehousename:data.warehousename ,
        address:data.address ,
        phone:data.phone , 
        manager:data.manager 
      })
      .then(function (response) {
        console.log(response);
        closeModal();
      })
      .catch(function (error) {
        console.log(error);
      }); 
    }else{
      const URI = 'http://localhost:3001/warehouse/' ;
      axios.post(URI, {
        idLocation: idWarehouse,
        idCompany: 1,
        warehousename:data.warehousename ,
        address:data.address ,
        phone:data.phone , 
        manager:data.manager 
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
                 <label>Nombre de Almacen:</label>
                 <input className='form-control' type="text" name="warehousename"  {...register('warehousename', {required:"* Dato Requerido"})}  placeholder="Nombre de Almacen" onChange={(e) => handleChange} />
                <span className="badge badge-light"> {errors.warehousename?.message}</span>
                  </div>
               <div className="form-group">
                 <label>Direccion:</label>
                 <textarea className='form-control'  type="textarea" name="address" {...register('address', {required:"* Dato Requerido"})}   placeholder="Agregar Direccion" onChange={(e) => handleChange} />
                 <span className="badge badge-light"> {errors.address?.message}</span>
               </div>
               <div className="form-group">
                 <label>Telefono:</label>
                 <input className='form-control'  type="text" name="phone"  {...register('phone', {required:"* Dato Requerido"})}placeholder="Agregar Telefono" onChange={(e) => handleChange}  />
                 <span className="badge badge-light"> {errors.phone?.message}</span>
               </div>
               <div className="form-group">
                 <label>Encargado:</label>
                 <input className='form-control'  type="text" name="manager"  {...register('manager', {required:"* Dato Requerido"})}  placeholder="Agregar Encargado" onChange={(e) => handleChange} />
                 <span className="badge badge-light"> {errors.manager?.message}</span>
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
 