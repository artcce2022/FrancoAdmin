import {  useEffect, useState} from 'react'
import { useForm  } from 'react-hook-form';
import axios from 'axios'
import Select from 'react-select'; 
const URI = 'http://localhost:3001/vehicles/';

export default function EditVehicles({idVehicle, idCustomer, closeModal }) {
//const [commonFailure] =useCommonFailures({idCommonFailure}); 
const [vehicle, setVehicle] = useState([]); 

 // const [categoriesFailure] = useSymptomsCategory (); 
  const {register,handleSubmit,setValue, reset,   formState:{errors}} = useForm({
    mode: 'onBlur',
    defaultValues:{
        idCustomer: idCustomer,
        vin:"",
        license:"",
        year:"",
        make:"",
        model:"",
        color:"",
        unit:"",
        memo:""
    }
  }); 

 
  useEffect(() => {
    axios.get(URI + idVehicle).then((response) => {
        setVehicle(response.data);
    const fields = ['vin', 'license', 'year','make', 'model', 'color','unit','memo'];
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
    if(idVehicle>0){
      const URI = 'http://localhost:3001/vehicles/' + idVehicle;
      axios.put(URI, {
        idVehicle: idVehicle,
        idCustomer:idCustomer,
        vin: data.vin,
        license:data.license ,
        year:data.year ,
        make:data.make ,
        model:data.model , 
        color:data.color , 
        unit:data.unit , 
        memo:data.memo 
      })
      .then(function (response) {
        console.log(response);
        closeModal();
      })
      .catch(function (error) {
        console.log(error);
      }); 
    }else{
      const URI = 'http://localhost:3001/vehicles/' ;
      axios.post(URI, {
        idCustomer:idCustomer,
        vin: data.vin,
        license:data.license ,
        year:data.year ,
        make:data.make ,
        model:data.model , 
        color:data.color , 
        unit:data.unit , 
        memo:data.memo 
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
                 <label>Vin:</label>
                 <input className='form-control' type="text" defaultValue={vehicle.vin ?? "" } name="vin"  {...register('vin', {required:"* Dato Requerido"})}  onChange={(e)=>handleChange}  placeholder="Vin"  />
                <span className="badge badge-light"> {errors.vin?.message}</span>
                  </div>
               <div className="form-group">
                 <label>License:</label>
                 <input className='form-control'  type="text" defaultValue={vehicle.license ?? "" }   name="license" {...register('license', {required:"* Dato Requerido"})}   onChange={(e)=>handleChange}  placeholder="Agregar license" />
                 <span className="badge badge-light"> {errors.license?.message}</span>
               </div>
               <div className="form-group">
                 <label>Año:</label>
                 <input className='form-control'  type="text" name="year" defaultValue={vehicle.year ?? "" }   {...register('year', {required:"* Dato Requerido"})}  onChange={(e)=>handleChange}  placeholder="Agregar Año"  />
                 <span className="badge badge-light"> {errors.year?.message}</span>
               </div>
               <div className="form-group">
                 <div className='row'> 
                  <div className='col col-lg-6'>
                    <label>make:</label>
                    <input className='form-control'  type="text" name="make" defaultValue={vehicle.make?? "" }  {...register('make', {required:"* Dato Requerido"})}  onChange={(e)=>handleChange}  placeholder="Make"  />
                    <span className="badge badge-light"> {errors.make?.message}</span>
                  </div>
                  <div className='col col-lg-6'>
                    <label>model:</label>
                    <input className='form-control'  type="text" name="model" defaultValue={vehicle.model ?? "0" }    {...register('model', {required:"* Dato Requerido"})} onChange={(e)=>handleChange}   placeholder="Agregar model"  />
                    <span className="badge badge-light"> {errors.model?.message}</span>
                  </div>
                 </div>                
               </div> 
               <div className="form-group">
                 <div className='row'> 
                  <div className='col col-lg-6'>
                    <label>color:</label>
                    <input className='form-control'  type="text" name="color" defaultValue={vehicle.color?? "" }  {...register('color', {required:"* Dato Requerido"})}  onChange={(e)=>handleChange}  placeholder="Color"  />
                    <span className="badge badge-light"> {errors.color?.message}</span>
                  </div>
                  <div className='col col-lg-6'>
                    <label>unit:</label>
                    <input className='form-control'  type="text" name="unit" defaultValue={vehicle.unit ?? "0" }    {...register('unit', {required:"* Dato Requerido"})} onChange={(e)=>handleChange}   placeholder="Agregar unit"  />
                    <span className="badge badge-light"> {errors.unit?.message}</span>
                  </div>
                 </div>                
               </div> 
               <div className="form-group">
                 <label>Año:</label>
                 <textarea className='form-control'  type="text" name="memo" defaultValue={vehicle.memo ?? "" }   {...register('memo', {required:"* Dato Requerido"})}  onChange={(e)=>handleChange}  placeholder="Agregar memo"  />
                 <span className="badge badge-light"> {errors.memo?.message}</span>
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
 