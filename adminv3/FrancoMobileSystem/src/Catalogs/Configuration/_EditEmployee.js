import { useEffect, useState, useMemo } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { Button, Card, Col, Form, Row } from 'react-bootstrap';
import { ApiEndpoint } from 'utils/ApiEndPont';
import { FormInputText } from 'form-components/FormInputText';
import AlertNotification from 'form-components/AlertNotification.js';
import i18next from 'i18next';
import { FormInputDate } from 'form-components/FormInputDate';
import ReactDatePicker from 'react-datepicker';

const URI = ApiEndpoint + 'employees/';

export default function EditEmployee({ idEmployee, closeModal }) {
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
      firstname: '',
      lastname: '',
      birthdate: '',
      ssn: '',
      address: '',
      city: '',
      zipcode: '',
      phone: '',
      email: '',
      isActive: '',
      employenumber: '',
      hiredate: '',
      ismechanic: ''
    }
  });
  const [values, setValues] = useState({
    firstname: '',
    lastname: '',
    birthdate: '',
    ssn: '',
    address: '',
    city: '',
    zipcode: '',
    phone: '',
    email: '',
    isActive: '',
    employenumber: '',
    hiredate: '',
    ismechanic: ''
  });
  const [employee, setEmployee] = useState(values);
  const [selectedBirthDate, setSelectedBirthDate] = useState(new Date());
  const [selectedHireDate, setSelectedHireDate] = useState(new Date());

  useEffect(() => {
    axios.get(URI + idEmployee).then(response => {
      setEmployee(response.data);
      if (response.hiredate != null) {
        var timestamp = Date.parse(response.hiredate);
        if (isNaN(timestamp) === false) {
          timestamp = new Date();
        }
        setSelectedHireDate(timestamp);
      }
      if (response.birthdate != null) {
        var timestamp = Date.parse(response.birthdate);
        if (isNaN(timestamp) === false) {
          timestamp = new Date();
        }
        selectedBirthDate(timestamp);
      }
    });
  }, []); // empty array makes hook working once

  // const fields = ['warehousename', 'address',  'phone', 'manager'];
  // fields.forEach(field => setValue(field, warehouse[field]));

  const onSubmit = async data => {
    console.log(employee);

    if (idEmployee > 0) {
      axios
        .put(URI + idEmployee, {
          firstname: employee.firstname,
          lastname: employee.lastname,
          birthdate: selectedBirthDate,
          ssn: employee.ssn,
          address: employee.address,
          city: employee.city,
          zipcode: employee.zipcode,
          phone: employee.phone,
          email: employee.email,
          isActive: employee.isActive,
          employenumber: employee.employenumber,
          hiredate: selectedHireDate,
          ismechanic: employee.ismechanic
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
          firstname: employee.firstname,
          lastname: employee.lastname,
          birthdate: selectedBirthDate,
          ssn: employee.ssn,
          address: employee.address,
          city: employee.city,
          zipcode: employee.zipcode,
          phone: employee.phone,
          email: employee.email,
          isActive: employee.isActive,
          employenumber: employee.employenumber,
          hiredate: selectedHireDate,
          ismechanic: employee.ismechanic
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
    console.log(event.target);
    const { name, value } = event.target;
    setEmployee({ ...employee, [name]: value });
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
            <FormInputText
              label={i18next.t('label.Name')}
              changeHandler={onChange}
              name={'firstname'}
              control={control}
              defaultValue={employee.firstname}
            ></FormInputText>
            <FormInputText
              control={control}
              label={i18next.t('label.LastName')}
              name="lastname"
              changeHandler={onChange}
              defaultValue={employee.lastname}
            ></FormInputText>
            <Form.Group as={Col} className="mb-3" controlId="birthdate">
              {/* <FormInputDate
                control={control}
                label={i18next.t('label.birthdate')}
                name="birthdate"
                changeHandler={onChange}
                defaultValue={employee.birthdate}
              ></FormInputDate> */}
              <Form.Label>{i18next.t('label.BirthDate')}</Form.Label>
              <ReactDatePicker
                selected={selectedBirthDate}
                onChange={date => setSelectedBirthDate(date)}
                className="form-control"
                placeholderText="Select Date"
                dateFormat={'MM/dd/yyyy'}
              />
            </Form.Group>
            <Form.Group as={Col} className="mb-3" controlId="ssn">
              <FormInputText
                control={control}
                label={i18next.t('label.ssn')}
                name="ssn"
                changeHandler={onChange}
                defaultValue={employee.ssn}
              ></FormInputText>
            </Form.Group>
            <Form.Group as={Col} className="mb-3" controlId="address">
              <FormInputText
                control={control}
                label={i18next.t('label.Address')}
                name="address"
                changeHandler={onChange}
                defaultValue={employee.address}
              ></FormInputText>
            </Form.Group>
            <Form.Group as={Col} className="mb-3" controlId="city">
              <FormInputText
                control={control}
                label={i18next.t('label.City')}
                name="city"
                changeHandler={onChange}
                defaultValue={employee.city}
              ></FormInputText>
            </Form.Group>
            <Form.Group as={Col} className="mb-3" controlId="phone">
              <FormInputText
                control={control}
                label={i18next.t('label.Phone')}
                name="phone"
                changeHandler={onChange}
                defaultValue={employee.phone}
              ></FormInputText>
            </Form.Group>
            <Form.Group as={Col} className="mb-3" controlId="email">
              <FormInputText
                control={control}
                label={i18next.t('label.Email')}
                name="email"
                changeHandler={onChange}
                defaultValue={employee.email}
              ></FormInputText>
            </Form.Group>
            <Form.Group as={Col} className="mb-3" controlId="hiredate">
              <Form.Label>{i18next.t('label.HireDate')}</Form.Label>
              <ReactDatePicker
                selected={selectedHireDate}
                onChange={date => setSelectedHireDate(date)}
                className="form-control"
                placeholderText="Select Date"
                dateFormat={'MM/dd/yyyy'}
              />
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
