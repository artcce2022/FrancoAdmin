import {  useEffect, useState} from 'react'
import { useForm  } from 'react-hook-form';
import axios from 'axios'
import Select from 'react-select'; 
const URI = 'http://localhost:3001/customercontact/';

export default function EditCustomerContact({idCustomerContact, idCustomer, closeModal }) {
//const [commonFailure] =useCommonFailures({idCommonFailure}); 
const [customerContact, setCustomerContact] = useState([]); 

 // const [categoriesFailure] = useSymptomsCategory (); 
  const {register,handleSubmit,setValue, reset,   formState:{errors}} = useForm({
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
   <div>
      <form onSubmit={handleSubmit(onSubmit)}>
           <div className='card-body'>
               <div className="form-group">
                 <label>Name:</label>
                 <input className='form-control' type="text" defaultValue={customerContact.name ?? "" } name="name"  {...register('name', {required:"* Dato Requerido"})}  onChange={(e)=>handleChange}  placeholder="Name"  />
                <span className="badge badge-light"> {errors.name?.message}</span>
                  </div>
               <div className="form-group">
                 <label>lastname:</label>
                 <input className='form-control'  type="text" defaultValue={customerContact.lastname ?? "" }   name="lastname" {...register('lastname', {required:"* Dato Requerido"})}   onChange={(e)=>handleChange}  placeholder="Agregar Lastname" />
                 <span className="badge badge-light"> {errors.lastname?.message}</span>
               </div>
               <div className="form-group">
                 <label>title:</label>
                 <input className='form-control'  type="text" name="title" defaultValue={customerContact.title ?? "" }   {...register('title', {required:"* Dato Requerido"})}  onChange={(e)=>handleChange}  placeholder="Agregar Title"  />
                 <span className="badge badge-light"> {errors.title?.message}</span>
               </div>
               <div className="form-group">
                 <div className='row'> 
                  <div className='col col-lg-6'>
                    <label>phone:</label>
                    <input className='form-control'  type="text" name="phone" defaultValue={customerContact.phone?? "" }  {...register('phone', {required:"* Dato Requerido"})}  onChange={(e)=>handleChange}  placeholder="Phone"  />
                    <span className="badge badge-light"> {errors.phone?.message}</span>
                  </div>
                  <div className='col col-lg-6'>
                    <label>mobile:</label>
                    <input className='form-control'  type="text" name="mobile" defaultValue={customerContact.mobile ?? "0" }    {...register('mobile', {required:"* Dato Requerido"})} onChange={(e)=>handleChange}   placeholder="Agregar mobile"  />
                    <span className="badge badge-light"> {errors.mobile?.message}</span>
                  </div>
                 </div>                
               </div> 
               <div className="form-group">
                 <div className='row'> 
                  <div className='col col-lg-6'>
                    <label>email:</label>
                    <input className='form-control'  type="text" name="email" defaultValue={customerContact.email?? "" }  {...register('email', {required:"* Dato Requerido"})}  onChange={(e)=>handleChange}  placeholder="Email"  />
                    <span className="badge badge-light"> {errors.email?.message}</span>
                  </div>
                  <div className='col col-lg-6'>
                    <label>password:</label>
                    <input className='form-control'  type="text" name="password" defaultValue={customerContact.password ?? "0" }    {...register('password', {required:"* Dato Requerido"})} onChange={(e)=>handleChange}   placeholder="Agregar password"  />
                    <span className="badge badge-light"> {errors.password?.message}</span>
                  </div>
                 </div>                
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
 