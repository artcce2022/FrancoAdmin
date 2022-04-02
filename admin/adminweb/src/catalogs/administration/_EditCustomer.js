import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form';
import axios from 'axios' 

const URI = 'http://localhost:3001/customers/';

export default function EditCustomer({ idCustomer, closeModal, idsymptomcategorydefault }) {
  //const [commonFailure] =useCommonFailures({idCommonFailure}); 
  const [customer, setCustomer] = useState([]);
  // const [categoriesFailure] = useSymptomsCategory ();   
  const { register, handleSubmit, setValue, reset, formState: { errors } } = useForm({
    mode: 'onBlur',
    defaultValues: {
      shortname: "",
      company: "",
      firstname: "",
      lastname: "",
      address: "",
      zipcode: "",
      city: "",
      state: "",
      phone: "",
      mobilephone: "",
      email: ""
    }
  });



  useEffect(() => {
    axios.get(URI + idCustomer).then((response) => {
      setCustomer(response.data);
      // setIdsymptomcategory(response.data.idsymptomcategory);
      const fields = ['shortname', 'company', 'firstname', 'lastname', 'address', 'zipcode', 'city', 'state', 'phone', 'mobilephone', 'email'];
      fields.forEach(field => { setValue(field, response.data[field]); });
    });
  }, []);


  // const fields = ['idcommonfailures', 'shortdescription', 'symtomdescription','workrequested', 'hours', 'price','idsymptomcategory'];
  // fields.forEach(field => {setValue(field, commonFailure[field]); console.log("Entre a foreach")}); 

  const handleChange = (e) => {
    console.log("entr e y");
    this.setState({ value: e.target.value });
  }

  const onSubmit = async (data, e) => {
    e.preventDefault();
    console.log(data);
    if (idCustomer > 0) {
      const URI = 'http://localhost:3001/customers/' + idCustomer;
      axios.put(URI, {
        idCustomer: idCustomer,
        shortname: data.shortname,
        company: data.company,
        firstname: data.firstname,
        lastname: data.lastname,
        address: data.address,
        zipcode: data.zipcode,
        city: data.city,
        state: data.state,
        phone: data.phone,
        mobilephone: data.mobilephone,
        email: data.email
      })
        .then(function (response) {
          console.log(response);
          closeModal();
        })
        .catch(function (error) {
          console.log(error);
        });
    } else {
      const URI = 'http://localhost:3001/customers/';
      axios.post(URI, {
        shortname: data.shortname,
        company: data.company,
        firstname: data.firstname,
        lastname: data.lastname,
        address: data.address,
        zipcode: data.zipcode,
        city: data.city,
        state: data.state,
        phone: data.phone,
        mobilephone: data.mobilephone,
        email: data.email
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
            <label>Nombre Comercial:</label>
            <input className='form-control' type="text" defaultValue={customer.shortname ?? ""} name="shortname"  {...register('shortname', { required: "* Dato Requerido" })} onChange={(e) => handleChange} placeholder="Nombre Comercial" />
            <span className="badge badge-light"> {errors.shortname?.message}</span>
          </div>
          <div className="form-group">
            <label>Compania:</label>
            <input className='form-control' type="text" defaultValue={customer.company ?? ""} name="company" {...register('company', { required: "* Dato Requerido" })} onChange={(e) => handleChange} placeholder="Agregar Compañia" />
            <span className="badge badge-light"> {errors.company?.message}</span>
          </div>
          <div className="form-group">
            <div className='row'>
              <div className='col col-lg-6'>
                <label>Nombre:</label>
                <input className='form-control' type="text" name="firstname" defaultValue={customer.firstname ?? ""}  {...register('firstname', { required: "* Dato Requerido" })} onChange={(e) => handleChange} placeholder="Nombre" />
                <span className="badge badge-light"> {errors.firstname?.message}</span>
              </div>
              <div className='col col-lg-6'>
                <label>Apellido:</label>
                <input className='form-control' type="text" name="lastname" defaultValue={customer.lastname ?? ""}  {...register('lastname', { required: "* Dato Requerido" })} onChange={(e) => handleChange} placeholder="Apellido" />
                <span className="badge badge-light"> {errors.lastname?.message}</span>
              </div>
            </div>
          </div>
          <div className="form-group">
            <label>Direccion:</label>
            <textarea className='form-control' type="textarea" name="address" defaultValue={customer.address ?? ""}   {...register('address', { required: "* Dato Requerido" })} onChange={(e) => handleChange} placeholder="Agregar Direccion" />
            <span className="badge badge-light"> {errors.address?.message}</span>
          </div>
          <div className="form-group">
            <div className='row'>
              <div className='col col-lg-6'>
              <label>Zip Code:</label>
               <input className='form-control' type="text" name="zipcode" defaultValue={customer.zipcode ?? ""}   {...register('zipcode', { required: "* Dato Requerido" })} onChange={(e) => handleChange} placeholder="Agregar zipcode" />
                <span className="badge badge-light"> {errors.zipcode?.message}</span>
              </div>
              <div className='col col-lg-6'>
              <label>Ciudad:</label>
            <input className='form-control' type="text" name="city" defaultValue={customer.city ?? ""}   {...register('city', { required: "* Dato Requerido" })} onChange={(e) => handleChange} placeholder="Agregar Ciudad" />
            <span className="badge badge-light"> {errors.city?.message}</span>
              </div>
            </div>
          </div>        
          <div className="form-group">
            <label>Estado:</label>
            <input className='form-control' type="text" name="state" defaultValue={customer.state ?? ""}   {...register('state', { required: "* Dato Requerido" })} onChange={(e) => handleChange} placeholder="Agregar Estado" />
            <span className="badge badge-light"> {errors.state?.message}</span>
          </div>
          <div className="form-group">
            <div className='row'>
              <div className='col col-lg-6'>
                <label>Telefono:</label>
                <input className='form-control' type="text" name="phone" defaultValue={customer.phone ?? ""}   {...register('phone', { required: "* Dato Requerido" })} onChange={(e) => handleChange} placeholder="Agregar Telefono" />
                <span className="badge badge-light"> {errors.phone?.message}</span>
            </div>
              <div className='col col-lg-6'>
               <label>Mobilephone:</label>
                <input className='form-control' type="text" name="mobilephone" defaultValue={customer.mobilephone ?? ""}   {...register('mobilephone', { required: "* Dato Requerido" })} onChange={(e) => handleChange} placeholder="Agregar Telefono Mobil" />
               <span className="badge badge-light"> {errors.mobilephone?.message}</span>
            </div>
            </div>
          </div>                  
          <div className="form-group">
            <label>Email:</label>
            <input className='form-control' type="text" name="email" defaultValue={customer.email ?? ""}   {...register('email', { required: "* Dato Requerido" })} onChange={(e) => handleChange} placeholder="Agregar Email" />
            <span className="badge badge-light"> {errors.email?.message}</span>
          </div>
          <div className="col-md-offset-2 col-md-10">
            <input type="submit" defaultValue="Guardar" className="btn btn-primary float-left" />
            <button type="button" onClick={closeModal} className="btn btn-secondary float-right" >Cancel</button>
          </div>
        </div>
      </form>
    </div>
  )
}
