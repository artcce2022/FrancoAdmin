import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form';
import axios from 'axios'
import DatePicker from 'react-datepicker'
import "react-datepicker/dist/react-datepicker.css";
const URI = 'http://localhost:3001/employees/';



export default function EditEmployee({ idEmployee, closeModal }) {
  const [employee, setEmployee] = useState([]);
  const { register, handleSubmit, setValue, formState: { errors } } = useForm({
    mode: 'onBlur',
    defaultValues: {
      firstname: "",
      lastname: "",
      birthdate: "",
      ssn: "",
      address: "",
      city: "",
      zipcode: "",
      phone: "",
      email: "",
      isActive: "",
      employenumber: "",
      hiredate: "",
      ismechanic: ""
    }
  });
  const [selectedBirthDate, setSelectedBirthDate] = useState(new Date());

  // const fields = ['firstname', 'lastname', 'birthdate', 'ssn',
  //   'address', 'city', 'zipcode', 'phone',
  //   'email', 'isActive', 'employenumber', 'hiredate', 'ismechanic'];
  // fields.forEach(field => setValue(field, employee[field]));

  useEffect(() => {
    axios.get(URI + idEmployee).then((response) => {
      setEmployee(response.data);
      const fields = ['firstname', 'lastname', 'ssn',
        'address', 'city', 'zipcode', 'phone',
        'email', 'isActive', 'employenumber', 'hiredate', 'ismechanic'];
      fields.forEach(field => { setValue(field, response.data[field]); });
      setSelectedBirthDate(new Date(parseInt(response.data["birthdate"].split('-')[0]), (parseInt(response.data["birthdate"].split('-')[1]) - 1),
        parseInt(response.data["birthdate"].split('-')[2])));
      // setSelectedBirthDate({ year: parseInt(response.data["birthdate"].split('-')[0]), 
      //             month:parseInt(response.data["birthdate"].split('-')[1]), 
      //             day:parseInt(response.data["birthdate"].split('-')[2])});
    });
  }, []);

  const onSubmit = async data => {
    console.log(data);
    if (idEmployee > 0) {
      const URI = 'http://localhost:3001/employees/' + idEmployee;
      axios.put(URI, {
        firstname: data.firstname,
        lastname: data.lastname,
        birthdate: data.birthdate,
        ssn: data.ssn,
        address: data.address,
        city: data.city,
        zipcode: data.zipcode,
        phone: data.phone,
        email: data.email,
        isActive: data.isActive,
        employenumber: data.employenumber,
        hiredate: data.hiredate,
        ismechanic: data.ismechanic
      })
        .then(function (response) {
          console.log(response);
          closeModal();
        })
        .catch(function (error) {
          console.log(error);
        });
    } else {
      const URI = 'http://localhost:3001/employees/';
      axios.post(URI, {
        firstname: data.firstname,
        lastname: data.lastname,
        birthdate: data.birthdate,
        ssn: data.ssn,
        address: data.address,
        city: data.city,
        zipcode: data.zipcode,
        phone: data.phone,
        email: data.email,
        isActive: data.isActive,
        employenumber: data.employenumber,
        hiredate: data.hiredate,
        ismechanic: data.ismechanic
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
          <div className='row'>
            <div className='col-lg-6'>
              <div className="form-group">
                <label>Nombre:</label>
                <input className='form-control' type="text" name="firstname"  {...register('firstname', { required: "* Dato Requerido" })} placeholder="Nombre" />
                <span className="badge badge-light"> {errors.firstname?.message}</span>
              </div>
            </div>
            <div className='col-lg-6'>
              <div className="form-group">
                <label>Apellido:</label>
                <input className='form-control' type="text" name="lastname" {...register('lastname', { required: "* Dato Requerido" })} placeholder="Apellido" />
                <span className="badge badge-light"> {errors.lastname?.message}</span>
              </div>
            </div>
          </div>
          <div className='row'>
            <div className='col-lg-6'>
              <div className="form-group">
                <label>birthdate:</label>
                <DatePicker selected={selectedBirthDate} dateFormat="dd/MM/yyyy" onChange={(date) => setSelectedBirthDate(date)}  inputPlaceholder="Select a day" className='form-control' name="birthdate" placeholder="Fecha Nacimiento" />
                <span className="badge badge-light"> {errors.birthdate?.message}</span>
              </div>
            </div>
            <div className='col-lg-6'>
              <div className="form-group">
                <label>SSN:</label>
                <input className='form-control' type="text" name="ssn" {...register('ssn', { required: "* Dato Requerido" })} /*ref={register({required: "Dato Requerido"})}*/ placeholder="Agregar Telefono" />
                <span className="badge badge-light"> {errors.ssn?.message}</span>
              </div>
            </div>
          </div>
          <div className='row'>
            <div className='col-lg-12'>
              <div className="form-group">
                <label>Address:</label>
                <input className='form-control' type="text" name="address" {...register('address', { required: "* Dato Requerido" })} /*ref={register({required: "Dato Requerido"})}*/ placeholder="Agregar Telefono" />
                <span className="badge badge-light"> {errors.address?.message}</span>
              </div>
            </div>
          </div>
          <div className='row'>
            <div className='col-lg-6'>
              <div className="form-group">
                <label>City:</label>
                <input className='form-control' type="text" name="city" {...register('city', { required: "* Dato Requerido" })} /*ref={register({required: "Dato Requerido"})}*/ placeholder="Agregar Telefono" />
                <span className="badge badge-light"> {errors.city?.message}</span>
              </div>
            </div>

            <div className='col-lg-6'>
              <div className="form-group">
                <label>Telefono:</label>
                <input className='form-control' type="text" name="phone" {...register('phone', { required: "* Dato Requerido" })} /*ref={register({required: "Dato Requerido"})}*/ placeholder="Agregar Telefono" />
                <span className="badge badge-light"> {errors.phone?.message}</span>
              </div>

            </div>
          </div>
          <div className='row'>
            <div className='col-lg-12'>
              <div className="form-group">
                <label>Email:</label>
                <input className='form-control' type="email" name="email"  {...register('email', { required: "* Dato Requerido" })} /* ref={register({required: "Dato Requerido"})}*/ placeholder="Agregar Email" />
                <span className="badge badge-light"> {errors.email?.message}</span>
              </div>
            </div>
          </div>
          <div className='row'>
            <div className='col-lg-6'>
              <div className="form-group">
                <label>Id Empleado:</label>
                <input className='form-control' type="text" name="employenumber" {...register('employenumber', { required: "* Dato Requerido" })} /*ref={register({required: "Dato Requerido"})}*/ placeholder="Agregar Telefono" />
                <span className="badge badge-light"> {errors.employenumber?.message}</span>
              </div>
            </div>
            <div className='col-lg-6'>
              <div className="form-group">
                <label>Fecha de Contratacion:</label>
                <input className='form-control' type="text" name="hiredate" {...register('hiredate', { required: "* Dato Requerido" })} /*ref={register({required: "Dato Requerido"})}*/ placeholder="Agregar Telefono" />
                <span className="badge badge-light"> {errors.hiredate?.message}</span>
              </div>
            </div>
          </div>
          <div className='row'>
            <div className='col-lg-6'>
              <div className="form-group">
                <label>Mecanico:</label>
                {/* <input className='form-control'  type="text" name="ismechanic" {...register('ismechanic', {required:"* Dato Requerido"})}  placeholder="Agregar Telefono" /> */}
                <input type="checkbox" value="isActive"></input>
                <span className="badge badge-light"> {errors.ismechanic?.message}</span>
              </div>
            </div>
            <div className='col-lg-6'>
              <div className="form-group">
                <label>Activo:</label>
                <input type="checkbox" value="isActive"></input>
                {/* <input className='form-control'  type="text" name="isActive" {...register('isActive', {required:"* Dato Requerido"})}  placeholder="Agregar Telefono" /> */}
                <span className="badge badge-light"> {errors.isActive?.message}</span>
              </div>
            </div>
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
