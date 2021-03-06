import { useEffect, useState, useMemo } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { Button, Card, Col, Form, Row } from 'react-bootstrap';
import { ApiEndpoint } from 'utils/ApiEndPont';
import { FormInputText } from 'form-components/FormInputText';
import AlertNotification from 'form-components/AlertNotification.js';
import i18next from 'i18next';

const URI = ApiEndpoint + 'companies/';

export default function EditCompany({
  idCompany,
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
      companyName: '',
      phone: '',
      email: ''
    }
  });
  const [values, setValues] = useState({
    companyName: '',
    phone: '',
    email: ''
  });
  const [company, setCompany] = useState(values);

  useEffect(() => {
    axios.get(URI + idCompany).then(response => {
      setCompany(response.data);
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
    if (idCompany > 0) {
      axios
        .put(URI + idCompany, {
          companyName: company.companyName,
          phone: company.phone,
          email: company.email
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
          companyName: company.companyName,
          phone: company.phone,
          email: company.email
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
    setCompany({ ...company, [name]: value });
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
            <Form.Group className="mb-3" controlId="companyName">
              <FormInputText
                label={i18next.t('label.NomEmpresa')}
                changeHandler={onChange}
                name={'companyName'}
                control={control}
                defaultValue={company.companyName}
              ></FormInputText>
            </Form.Group>
            <Form.Group className="mb-3" controlId="email">
              <FormInputText
                control={control}
                label={i18next.t('label.Email')}
                name="email"
                changeHandler={onChange}
                defaultValue={company.email}
              ></FormInputText>
            </Form.Group>
            <Row className="mb-3">
              <Form.Group as={Col} className="mb-3" controlId="phone">
                <FormInputText
                  control={control}
                  label={i18next.t('label.Phone')}
                  name="phone"
                  changeHandler={onChange}
                  defaultValue={company.phone}
                ></FormInputText>
              </Form.Group>
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
