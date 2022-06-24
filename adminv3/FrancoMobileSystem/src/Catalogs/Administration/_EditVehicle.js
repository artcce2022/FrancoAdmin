import { useEffect, useState, useMemo } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { Button, Card, Col, Form, Row } from 'react-bootstrap';
import { ApiEndpoint } from 'utils/ApiEndPont';
import { FormInputText } from 'form-components/FormInputText';
import AlertNotification from 'form-components/AlertNotification.js';
import i18next from 'i18next';

const URI = ApiEndpoint + 'vehicles/';

export default function EditVehicle({ idVehicle, idCustomer, closeModal }) {
  //const [commonFailure] =useCommonFailures({idCommonFailure});
  const [alertMessage, setAlertMessage] = useState('');
  const [openAlert, setOpenAlert] = useState(false);
  const [typeAlert, setTypeAlert] = useState('success');

  const {
    control,
    handleSubmit,
    formState: { errors }
  } = useForm({
    mode: 'onBlur',
    defaultValues: {
      idCustomer: idCustomer,
      vin: '',
      license: '',
      year: '',
      make: '',
      model: '',
      color: '',
      unit: '',
      memo: ''
    }
  });
  const [values, setValues] = useState({
    idCustomer: idCustomer,
    vin: '',
    license: '',
    year: '',
    make: '',
    model: '',
    color: '',
    unit: '',
    memo: ''
  });
  const [vehicle, setVehicle] = useState(values);

  useEffect(() => {
    axios.get(URI + idVehicle).then(response => {
      setVehicle(response.data);
    });
  }, []); // empty array makes hook working once

  // const fields = ['warehousename', 'address',  'phone', 'manager'];
  // fields.forEach(field => setValue(field, warehouse[field]));

  const onSubmit = async data => {
    console.log(vehicle);

    if (idVehicle > 0) {
      axios
        .put(URI + idVehicle, {
          idVehicle: idVehicle,
          idCustomer: idCustomer,
          vin: vehicle.vin,
          license: vehicle.license,
          year: vehicle.year,
          make: vehicle.make,
          model: vehicle.model,
          color: vehicle.color,
          unit: vehicle.unit,
          memo: vehicle.memo
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
          idCustomer: idCustomer,
          vin: vehicle.vin,
          license: vehicle.license,
          year: vehicle.year,
          make: vehicle.make,
          model: vehicle.model,
          color: vehicle.color,
          unit: vehicle.unit,
          memo: vehicle.memo
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
    setVehicle({ ...vehicle, [name]: value });
  };

  const handleCloseAlert = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenAlert(false);
  };
  return (
    <>
      <Card style={{ width: '100%' }}>
        <Card.Body>
          <Form onSubmit={handleSubmit(onSubmit)}>
            <Form.Group className="mb-3" controlId="vin">
              <FormInputText
                label={i18next.t('label.Vin')}
                changeHandler={onChange}
                name={'vin'}
                control={control}
                defaultValue={vehicle.vin}
              ></FormInputText>
            </Form.Group>
            <Form.Group className="mb-3" controlId="license">
              <FormInputText
                control={control}
                label={i18next.t('label.License')}
                name="license"
                changeHandler={onChange}
                defaultValue={vehicle.license}
              ></FormInputText>
            </Form.Group>
            <Row className="mb-3">
              <Form.Group as={Col} className="mb-3" controlId="year">
                <FormInputText
                  control={control}
                  label={i18next.t('label.Year')}
                  name="year"
                  changeHandler={onChange}
                  defaultValue={vehicle.year}
                ></FormInputText>
              </Form.Group>
            </Row>
            <Row className="mb-3">
              <Form.Group as={Col} className="mb-3" controlId="make">
                <FormInputText
                  control={control}
                  label={i18next.t('label.Make')}
                  name="make"
                  changeHandler={onChange}
                  defaultValue={vehicle.make}
                ></FormInputText>
              </Form.Group>
            </Row>
            <Row className="mb-3">
              <Form.Group as={Col} className="mb-3" controlId="model">
                <FormInputText
                  control={control}
                  label={i18next.t('label.Model')}
                  name="model"
                  changeHandler={onChange}
                  defaultValue={vehicle.model}
                ></FormInputText>
              </Form.Group>
            </Row>
            <Row className="mb-3">
              <Form.Group as={Col} className="mb-3" controlId="color">
                <FormInputText
                  control={control}
                  label={i18next.t('label.Color')}
                  name="color"
                  changeHandler={onChange}
                  defaultValue={vehicle.color}
                ></FormInputText>
              </Form.Group>
            </Row>
            <Row className="mb-3">
              <Form.Group as={Col} className="mb-3" controlId="unit">
                <FormInputText
                  control={control}
                  label={i18next.t('label.Unit')}
                  name="unit"
                  changeHandler={onChange}
                  defaultValue={vehicle.unit}
                ></FormInputText>
              </Form.Group>
            </Row>
            <Row className="mb-3">
              <Form.Group as={Col} className="mb-3" controlId="memo">
                <FormInputText
                  control={control}
                  label={i18next.t('label.Memo')}
                  name="memo"
                  changeHandler={onChange}
                  defaultValue={vehicle.v}
                ></FormInputText>
              </Form.Group>
            </Row>
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
      {openAlert && (
        <AlertNotification
          open={openAlert}
          handleClose={handleCloseAlert}
          type={typeAlert}
          message={alertMessage}
        />
      )}
    </>
  );
}
