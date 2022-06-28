import { useEffect, useState, useMemo } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { Button, Card, Col, Form, Row } from 'react-bootstrap';
import { ApiEndpoint } from 'utils/ApiEndPont';
import { FormInputText } from 'form-components/FormInputText';
import AlertNotification from 'form-components/AlertNotification.js';
import i18next from 'i18next';

const URI = ApiEndpoint + 'customercontact/';

export default function EditCustomerContact({
  idContact,
  idCustomer,
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
      idCustomer: idCustomer,
      idcustomercontact: '',
      name: '',
      lastname: '',
      title: '',
      phone: '',
      mobile: '',
      email: '',
      password: ''
    }
  });
  const [values, setValues] = useState({
    idCustomer: idCustomer,
    idcustomercontact: '',
    name: '',
    lastname: '',
    title: '',
    phone: '',
    mobile: '',
    email: '',
    password: ''
  });
  const [contact, setContact] = useState(values);

  useEffect(() => {
    axios.get(URI + idContact).then(response => {
      setContact(response.data);
    });
  }, []); // empty array makes hook working once

  // const fields = ['warehousename', 'address',  'phone', 'manager'];
  // fields.forEach(field => setValue(field, warehouse[field]));

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

    if (idContact > 0) {
      axios
        .put(URI + idContact, {
          idcustomercontact: idContact,
          idCustomer: idCustomer,
          name: contact.name,
          lastname: contact.lastname,
          title: contact.title,
          phone: contact.phone,
          mobile: contact.mobile,
          email: contact.email,
          password: contact.password
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
          name: contact.name,
          lastname: contact.lastname,
          title: contact.title,
          phone: contact.phone,
          mobile: contact.mobile,
          email: contact.email,
          password: contact.password
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
    setContact({ ...contact, [name]: value });
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
                <Form.Group as={Col} className="mb-3" controlId="title">
                  <FormInputText
                    control={control}
                    label={i18next.t('label.title')}
                    name="title"
                    changeHandler={onChange}
                    defaultValue={contact.title}
                  ></FormInputText>
                </Form.Group>
              </Col>
              <Col>
                {' '}
                <Form.Group className="mb-3" controlId="name">
                  <FormInputText
                    label={i18next.t('label.Name')}
                    changeHandler={onChange}
                    name={'name'}
                    control={control}
                    defaultValue={contact.name}
                  ></FormInputText>
                </Form.Group>
              </Col>
              <Col>
                {' '}
                <Form.Group className="mb-3" controlId="lastname">
                  <FormInputText
                    control={control}
                    label={i18next.t('label.Lastname')}
                    name="lastname"
                    changeHandler={onChange}
                    defaultValue={contact.lastname}
                  ></FormInputText>
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col>
                <Form.Group as={Col} className="mb-3" controlId="phone">
                  <FormInputText
                    control={control}
                    label={i18next.t('label.Phone')}
                    name="phone"
                    changeHandler={onChange}
                    defaultValue={contact.phone}
                  ></FormInputText>
                </Form.Group>
              </Col>
              <Col>
                <Form.Group as={Col} className="mb-3" controlId="mobile">
                  <FormInputText
                    control={control}
                    label={i18next.t('label.Mobile')}
                    name="mobile"
                    changeHandler={onChange}
                    defaultValue={contact.mobile}
                  ></FormInputText>
                </Form.Group>
              </Col>
            </Row>
            <Form.Group as={Col} className="mb-3" controlId="email">
              <FormInputText
                control={control}
                label={i18next.t('label.Email')}
                name="email"
                type="email"
                changeHandler={onChange}
                defaultValue={contact.email}
              ></FormInputText>
            </Form.Group>
            <Form.Group as={Col} className="mb-3" controlId="password">
              <FormInputText
                control={control}
                label={i18next.t('label.password')}
                name="password"
                type="password"
                changeHandler={onChange}
                defaultValue={contact.password}
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
