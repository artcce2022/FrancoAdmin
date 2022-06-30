import { useEffect, useState, useMemo } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { Button, Card, Col, Form, Row } from 'react-bootstrap';
import { ApiEndpoint } from 'utils/ApiEndPont';
import { FormInputText } from 'form-components/FormInputText';
import AlertNotification from 'form-components/AlertNotification.js';
import i18next from 'i18next';

const URI = ApiEndpoint + 'locations/';

export default function EditLocation({
  idLocation,
  closeModal,
  setOpenAlert,
  setTypeAlert,
  setAlertMessage
}) {
  const [validated, setValidated] = useState(false);
  const {
    control,
    handleSubmit,
    formState: { errors }
  } = useForm({
    mode: 'onBlur',
    defaultValues: {
      idLocation: '',
      idCompany: '1',
      locationName: '',
      address: '',
      phone: '',
      schedule: '',
      manager: ''
    }
  });
  const [values, setValues] = useState({
    idLocation: '',
    idCompany: '1',
    locationName: '',
    address: '',
    phone: '',
    schedule: '',
    manager: ''
  });
  const [location, setLocation] = useState(values);

  useEffect(() => {
    axios.get(URI + idLocation).then(response => {
      setLocation(response.data);
    });
  }, []);

  const onSubmit = (data, e) => {
    const form = e.target;
    if (form.checkValidity() === false) {
      setValidated(true);
      e.preventDefault();
      e.stopPropagation();
      return;
    }

    setValidated(true);
    if (idLocation > 0) {
      axios
        .put(URI + idLocation, {
          idLocation: idLocation,
          idCompany: 1,
          locationName: location.locationName,
          address: location.address,
          phone: location.phone,
          schedule: location.schedule,
          manager: location.manager
        })
        .then(function (response) {
          setAlertMessage(i18next.t('label.SuccessfulRecord'));
          setTypeAlert('success');
          setOpenAlert(true);
          console.log(response);
          closeModal();
        })
        .catch(function (error) {
          console.log(error);
        });
    } else {
      axios
        .post(URI, {
          idCompany: location.idCompany,
          locationName: location.locationName,
          address: location.address,
          phone: location.phone,
          schedule: location.schedule,
          manager: location.manager
        })
        .then(function (response) {
          setAlertMessage(i18next.t('label.SuccessfulRecord'));
          setTypeAlert('success');
          setOpenAlert(true);
          console.log(response);
          closeModal();
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  };
  const onChange = event => {
    const { name, value } = event.target;
    setLocation({ ...location, [name]: value });
  };

  return (
    <>
      <Card style={{ width: '100%' }}>
        <Card.Body>
          <Form
            noValidate
            validated={validated}
            onSubmit={handleSubmit(onSubmit)}
          >
            <Form.Group className="mb-3" controlId="locationName">
              <FormInputText
                label={i18next.t('label.LocationName')}
                changeHandler={onChange}
                name={'locationName'}
                control={control}
                defaultValue={location.locationName}
              ></FormInputText>
            </Form.Group>
            <Form.Group className="mb-3" controlId="address">
              <FormInputText
                label={i18next.t('label.Address')}
                changeHandler={onChange}
                name={'address'}
                control={control}
                defaultValue={location.address}
              ></FormInputText>
            </Form.Group>
            <Form.Group className="mb-3" controlId="phone">
              <FormInputText
                label={i18next.t('label.Phone')}
                changeHandler={onChange}
                name={'phone'}
                control={control}
                defaultValue={location.phone}
              ></FormInputText>
            </Form.Group>
            <Form.Group className="mb-3" controlId="schedule">
              <FormInputText
                label={i18next.t('label.schedule')}
                changeHandler={onChange}
                name={'schedule'}
                control={control}
                defaultValue={location.schedule}
              ></FormInputText>
            </Form.Group>
            <Form.Group className="mb-3" controlId="manager">
              <FormInputText
                label={i18next.t('label.manager')}
                changeHandler={onChange}
                name={'manager'}
                control={control}
                defaultValue={location.manager}
              ></FormInputText>
            </Form.Group>

            <Button
              type="submit"
              onClick={handleSubmit(onSubmit)}
              color="primary"
              size="sm"
            >
              {i18next.t('label.Save')}
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </>
  );
}
