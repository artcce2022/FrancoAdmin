import {  useEffect, useState} from 'react'
import { useForm  } from 'react-hook-form';
import axios from 'axios'
 
const useLocation = ({ idLocation }) => {
  const URI = 'http://localhost:3001/locations/' + idLocation;
  const [location, setLocation] = useState([]);
 
  

  console.log(idLocation);
    //mostrar companies
    const getLocation = async () => {
      const res = await axios.get(URI );
      console.log(res.data);
      
      setLocation(res.data);
    }

    useEffect(() => {
      getLocation()
    },[])
  return [location, setLocation];
};

export default function EditLocation({idLocation, closeModal }) {
  const [location] =useLocation({idLocation}); 
  const {register,handleSubmit,setValue,   formState:{errors}} = useForm({
    mode: 'onBlur',
    defaultValues:{
      idLocation: "",
      idCompany:"1",
      locationName:"",
      address:"",
      phone:"",
      schedule:"",
      manager:""
    }
  }); 

  const handleChange = (e) => {
    console.log("entr e y");
    this.setState({ value: e.target.value });
  }

  
  const fields = ['idLocation', 'idCompany', 'locationName','address', 'phone', 'schedule','manager'];
  fields.forEach(field => setValue(field, location[field])); 
    
  const onSubmit = async data => { console.log(data);
    if(idLocation>0){
      const URI = 'http://localhost:3001/locations/' + idLocation;
      axios.put(URI, {
        idLocation: idLocation,
        idCompany: data.idCompany,
        locationName:data.locationName ,
        address:data.address ,
        phone:data.phone ,
        schedule:data.schedule ,
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
      const URI = 'http://localhost:3001/locations/' ;
      axios.post(URI, {
        idLocation: idLocation,
        idCompany: 1,
        locationName:data.locationName ,
        address:data.address ,
        phone:data.phone ,
        schedule:data.schedule ,
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
                 <label>Nombre de Patio:</label>
                 <input className='form-control' type="text" name="locationName"  {...register('locationName', {required:"* Dato Requerido"})} onChange={(e) => handleChange} placeholder="Nombre de Empresa"  />
                <span className="badge badge-light"> {errors.locationName?.message}</span>
                  </div>
               <div className="form-group">
                 <label>Telefono:</label>
                 <input className='form-control'  type="text" name="address" {...register('address', {required:"* Dato Requerido"})} onChange={(e) => handleChange}  placeholder="Agregar Telefono" />
                 <span className="badge badge-light"> {errors.address?.message}</span>
               </div>
               <div className="form-group">
                 <label>Email:</label>
                 <input className='form-control'  type="text" name="phone"  {...register('phone', {required:"* Dato Requerido"})} onChange={(e) => handleChange} placeholder="Agregar Email"  />
                 <span className="badge badge-light"> {errors.phone?.message}</span>
               </div>
               <div className="form-group">
                 <label>Horario:</label>
                 <input className='form-control'  type="text" name="schedule"  {...register('schedule', {required:"* Dato Requerido"})} onChange={(e) => handleChange} placeholder="Agregar Email"  />
                 <span className="badge badge-light"> {errors.schedule?.message}</span>
               </div>
               <div className="form-group">
                 <label>Gerente:</label>
                 <input className='form-control'  type="text" name="manager"  {...register('manager', {required:"* Dato Requerido"})} onChange={(e) => handleChange}placeholder="Agregar Email"  />
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
 