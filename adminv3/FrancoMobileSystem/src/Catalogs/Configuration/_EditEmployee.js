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

export default function EditEmployee({
  idEmployee,
  closeModal,
  setOpenAlert,
  setTypeAlert,
  setAlertMessage
}) {
  //const [commonFailure] =useCommonFailures({idCommonFailure});

  const [validated, setValidated] = useState(false);

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
  const [selectedHireDate, setSelectedHireDate] = useState(null);

  useEffect(() => {
    axios.get(URI + idEmployee).then(response => {
      setEmployee(response.data);
      if (response.data.hiredate != null) {
        var timestamp = parseDate(response.data.hiredate);
        if (isNaN(timestamp) === true) {
          timestamp = new Date();
        }
        setSelectedHireDate(timestamp);
      }
      if (response.data.birthdate != null) {
        var timestamp = parseDate(response.data.birthdate);
        if (isNaN(timestamp) === true) {
          timestamp = new Date();
        }
        setSelectedBirthDate(timestamp);
      }
    });
  }, []); // empty array makes hook working once

  // const fields = ['warehousename', 'address',  'phone', 'manager'];
  // fields.forEach(field => setValue(field, warehouse[field]));
  function parseDate(input) {
    let parts = input.split('-');

    // new Date(year, month [, day [, hours[, minutes[, seconds[, ms]]]]])
    return new Date(parts[0], parts[1] - 1, parts[2]); // Note: months are 0-based
  }
  const onSubmit = (data, e) => {
    const form = e.target;
    if (form.checkValidity() === false) {
      console.log('entre a submit 123');
      setValidated(true);
      e.preventDefault();
      e.stopPropagation();
      return;
    }

    setValidated(true);
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
  return (
    <>
      <Card style={{ width: '100%' }}>
        <Card.Body>
          <Form
            noValidate
            validated={validated}
            onSubmit={handleSubmit(onSubmit)}
          >
            <Row>
              <Col>
                <FormInputText
                  label={i18next.t('label.Name')}
                  changeHandler={onChange}
                  name={'firstname'}
                  control={control}
                  defaultValue={employee.firstname}
                ></FormInputText>
              </Col>
              <Col>
                <FormInputText
                  control={control}
                  label={i18next.t('label.Lastname')}
                  name="lastname"
                  changeHandler={onChange}
                  defaultValue={employee.lastname}
                ></FormInputText>
              </Col>
            </Row>
            <Row>
              <Col>
                <Form.Group as={Col} className="mb-3" controlId="birthdate">
                  <Form.Label>{i18next.t('label.birthdate')}</Form.Label>
                  <ReactDatePicker
                    selected={selectedBirthDate}
                    onChange={date => setSelectedBirthDate(date)}
                    className="form-control"
                    placeholderText="Select Date"
                    dateFormat={'MM/dd/yyyy'}
                  />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group as={Col} className="mb-3" controlId="ssn">
                  <FormInputText
                    control={control}
                    label={i18next.t('label.ssn')}
                    name="ssn"
                    changeHandler={onChange}
                    defaultValue={employee.ssn}
                  ></FormInputText>
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col>
                <Form.Group as={Col} className="mb-3" controlId="address">
                  <FormInputText
                    control={control}
                    label={i18next.t('label.Address')}
                    name="address"
                    changeHandler={onChange}
                    defaultValue={employee.address}
                  ></FormInputText>
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col>
                <Form.Group as={Col} className="mb-3" controlId="city">
                  <FormInputText
                    control={control}
                    label={i18next.t('label.City')}
                    name="city"
                    changeHandler={onChange}
                    defaultValue={employee.city}
                  ></FormInputText>
                </Form.Group>
              </Col>
              <Col>
                <Form.Group as={Col} className="mb-3" controlId="phone">
                  <FormInputText
                    control={control}
                    label={i18next.t('label.Phone')}
                    name="phone"
                    changeHandler={onChange}
                    defaultValue={employee.phone}
                  ></FormInputText>
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col>
                <Form.Group as={Col} className="mb-3" controlId="email">
                  <FormInputText
                    control={control}
                    label={i18next.t('label.Email')}
                    name="email"
                    type="email"
                    changeHandler={onChange}
                    defaultValue={employee.email}
                  ></FormInputText>
                </Form.Group>
              </Col>
              <Col>
                <Form.Group as={Col} className="mb-3" controlId="hiredate">
                  <Form.Label>{i18next.t('label.HireDate')}</Form.Label>
                  <ReactDatePicker
                    selected={selectedHireDate}
                    value={selectedHireDate}
                    onChange={date => setSelectedHireDate(date)}
                    className="form-control"
                    placeholderText="Select Date"
                    dateFormat={'MM/dd/yyyy'}
                  />
                </Form.Group>
              </Col>
            </Row>

            <Button type="submit" color="primary" size="sm">
              {i18next.t('label.Save')}
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </>
  );
}
