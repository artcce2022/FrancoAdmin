import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form';
import axios from 'axios'

const useZipCode = ({ idZipCode }) => {
  const URI = 'http://localhost:3001/zipcodes/' + idZipCode;
  const [zipCode, setZipCode] = useState([]);



  console.log(idZipCode);
  //mostrar companies
  const getZipCode = async () => {
    const res = await axios.get(URI);
    console.log(res.data);

    setZipCode(res.data);
  }

  useEffect(() => {
    getZipCode()
  }, [])
  return [zipCode, setZipCode];
};

export default function EditZipCode({ idZipCode, closeModal }) {
  const [zipCode] = useZipCode({ idZipCode });
  const { register, handleSubmit, setValue, formState: { errors } } = useForm({
    mode: 'onBlur',
    defaultValues: {
      zip: "",
      city: "",
      state_id: "",
      state_name: "",
      county_fips: "",
      county_name: ""
    }
  });

  const fields = ['zip', 'city', 'state_id', 'state_name', 'county_fips', 'county_name',];
  fields.forEach(field => setValue(field, zipCode[field]));

  const onSubmit = async data => {
    console.log(data);
    if (idZipCode > 0) {
      const URI = 'http://localhost:3001/zipcodes/' + idZipCode;
      axios.put(URI, {
        zip: data.zip,
        city: data.city,
        state_id: data.state_id,
        state_name: data.state_name,
        county_fips: data.county_fips,
        county_name: data.county_name
      })
        .then(function (response) {
          console.log(response);
          closeModal();
        })
        .catch(function (error) {
          console.log(error);
        });
    } else {
      const URI = 'http://localhost:3001/zipcodes/';
      axios.post(URI, {
        zip: data.zip,
        city: data.city,
        state_id: data.state_id,
        state_name: data.state_name,
        county_fips: data.county_fips,
        county_name: data.county_name
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
            <label>ZipCode:</label>
            <input className='form-control' type="text" name="zip"  {...register('zip', { required: "* Dato Requerido" })} placeholder="ZipCode" />
            <span className="badge badge-light"> {errors.zip?.message}</span>
          </div>
          <div className="form-group">
            <label>Ciudad:</label>
            <input className='form-control' type="text" name="city" {...register('city', { required: "* Dato Requerido" })} placeholder="Agregar Ciudad" />
            <span className="badge badge-light"> {errors.city?.message}</span>
          </div>
          <div className="form-group">
            <div className='row'>
              <div className='col col-lg-6'>
                <label>StateId:</label>
                <input className='form-control' type="text" name="state_id"  {...register('state_id', { required: "* Dato Requerido" })} placeholder="Agregar State ID" />
                <span className="badge badge-light"> {errors.state_id?.message}</span>
              </div>
              <div className='col col-lg-6'>
                <label>State:</label>
                <input className='form-control' type="text" name="state_name"  {...register('state_name', { required: "* Dato Requerido" })} placeholder="Agregar State" />
                <span className="badge badge-light"> {errors.state_name?.message}</span>
              </div>
            </div>
          </div>
          <div className="form-group">
            <div className='row'>
              <div className='col col-lg-6'>
                <label>County:</label>
                <input className='form-control' type="text" name="county_name"  {...register('county_name', { required: "* Dato Requerido" })} placeholder="Agregar County" />
                <span className="badge badge-light"> {errors.county_name?.message}</span>
              </div>
              <div className='col col-lg-6'>
                <label>County Fips:</label>
                <input className='form-control' type="text" name="county_fips"  {...register('county_fips', { required: "* Dato Requerido" })} placeholder="Agregar County Fips" />
                <span className="badge badge-light"> {errors.county_fips?.message}</span>
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
