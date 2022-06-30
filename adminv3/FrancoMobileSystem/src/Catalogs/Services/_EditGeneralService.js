import axios from 'axios';
import { ServiceContext } from 'context/Context';
import { FormInputText } from 'form-components/FormInputText';
import i18next from 'i18next';
import React, { useContext, useEffect, useState } from 'react';
import { Form } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { ApiEndpoint } from 'utils/ApiEndPont';
const URI = ApiEndpoint + 'companies/';
const EditGeneralInfoService = () => {
  const [locations, setLocations] = useState([]);
  const {
    locationId,
    setLocationId,
    recibe,
    setRecibe,
    comments,
    setComments
  } = useContext(ServiceContext);
  const [values, setValues] = useState({
    idLocation: '0',
    idCustomer: '0',
    idVehicle: '0',
    comments: '',
    recibe: ''
  });
  const {
    handleSubmit,
    control,
    setValue,
    formState: { errors }
  } = useForm({
    mode: 'onBlur'
  });

  useEffect(() => {
    getLocationsList();
  }, []);

  //mostrar locations
  const getLocationsList = async () => {
    const UriLocations = ApiEndpoint + 'locations/';
    const res = await axios.get(UriLocations);
    setLocations(res.data);
  };

  const onChange = event => {
    console.log(`${event.target.name}` + ':' + `${event.target.value}`);
    setValues(prev => ({
      ...prev,
      [event.target.name]: event.target.value
    }));
  };
  const onChangeComment = event => {
    setComments(`${event.target.value}`);
  };
  const onChangeRecibe = event => {
    setRecibe(`${event.target.value}`);
  };
  return (
    <>
      <Form.Select
        aria-label="Default select"
        name="patio"
        style={{ minWidth: '250px' }}
        onChange={selectedOption => {
          setLocationId(`${selectedOption.target.value}`);
          console.log(`${selectedOption.target.value}`);
          onChange(selectedOption);
        }}
      >
        <option key={'location_0'} value={0}>
          {i18next.t('label.SelectSomeValue')}
        </option>
        {!!locations?.length &&
          locations.map(location => (
            <option key={location.idLocation} value={location.idLocation}>
              {location.locationName}
            </option>
          ))}
      </Form.Select>
      <FormInputText
        label={i18next.t('label.Receives')}
        name={'recibe'}
        control={control}
        defaultValue={recibe}
        changeHandler={onChangeRecibe}
      ></FormInputText>
      <FormInputText
        label={i18next.t('label.Comments')}
        name={'comments'}
        control={control}
        defaultValue={comments}
        changeHandler={onChangeComment}
      ></FormInputText>
    </>
  );
};

export default EditGeneralInfoService;
