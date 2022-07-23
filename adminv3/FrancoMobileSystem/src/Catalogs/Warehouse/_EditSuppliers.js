import { useEffect, useState, useMemo } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { Button, Card, Col, Form, Row } from 'react-bootstrap';
import { ApiEndpoint } from 'utils/ApiEndPont';
import { FormInputText } from 'form-components/FormInputText';
import i18next from 'i18next';

const URI = ApiEndpoint + 'suppliers/';

export default function EditSuppliers({
  idSuppliers,
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
      name: '',
      contact: '',
      address: '',
      zipcode: '',
      phone: '',
      extension: '',
      fax: '',
      email: '',
      terms: '30',
      limits: '100',
      comments: ''
    }
  });
  const [values, setValues] = useState({
    name: '',
    contact: '',
    address: '',
    zipcode: '',
    phone: '',
    extension: '',
    fax: '',
    email: '',
    terms: '30',
    limits: '100',
    comments: ''
  });
  const [suppliers, setSuppliers] = useState(values);

  useEffect(() => {
    axios.get(URI + idSuppliers).then(response => {
      setSuppliers(response.data);
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

    setSuppliers(true);

    if (idSuppliers > 0) {
      const URI = URI + idSuppliers;
      axios
        .put(URI, {
          idSuppliers: idSuppliers,
          name: suppliers.name,
          contact: suppliers.contact,
          address: suppliers.address,
          phone: suppliers.phone,
          zipcode: suppliers.zipcode,
          extension: suppliers.extension,
          fax: suppliers.fax,
          email: suppliers.email,
          terms: suppliers.terms,
          limits: suppliers.limits,
          comments: suppliers.comments
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
          idSuppliers: idSuppliers ,
          name: suppliers.name,
          contact: suppliers.contact,
          address: suppliers.address,
          phone: suppliers.phone,
          zipcode: suppliers.zipcode,
          extension: suppliers.extension,
          fax: suppliers.fax,
          email: suppliers.email,
          terms: suppliers.terms,
          limits: suppliers.limits,
          comments: suppliers.comments
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
    setSuppliers({ ...suppliers, [name]: value });
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
            <Form.Group className="mb-3" controlId="name">
              <FormInputText
                label={i18next.t('label.Supplier')}
                changeHandler={onChange}
                name={'name'}
                control={control}
                defaultValue={suppliers.name}
              ></FormInputText>
            </Form.Group>
            <Form.Group className="mb-3" controlId="address">
              <FormInputText
                control={control}
                label={i18next.t('label.Address')}
                name="address"
                changeHandler={onChange}
                defaultValue={suppliers.address}
              ></FormInputText>
            </Form.Group>
            <Row className="mb-3">
              <Form.Group as={Col} className="mb-3" controlId="zipcode">
                <FormInputText
                  control={control}
                  label={i18next.t('label.ZipCode')}
                  name="zipcode"
                  changeHandler={onChange}
                  defaultValue={suppliers.zipcode}
                ></FormInputText>
              </Form.Group>
              <Form.Group as={Col} className="mb-3" controlId="contact">
                <FormInputText
                  control={control}
                  label={i18next.t('label.ContactName')}
                  changeHandler={onChange}
                  defaultValue={suppliers.contact}
                  name="contact"
                ></FormInputText>
              </Form.Group>
            </Row>

            <Form.Group className="mb-3" controlId="phone">
              <FormInputText
                control={control}
                label={i18next.t('label.Phone')}
                changeHandler={onChange}
                name="phone"
                defaultValue={suppliers.phone}
              ></FormInputText>
            </Form.Group>
            <Row className="mb-3">
              <Form.Group as={Col} className="mb-3" controlId="extension">
                <FormInputText
                  control={control}
                  label={i18next.t('label.Extension')}
                  changeHandler={onChange}
                  name={'extension'}
                  defaultValue={suppliers.extension}
                ></FormInputText>
              </Form.Group>
              <Form.Group as={Col} className="mb-3" controlId="fax">
                <FormInputText
                  control={control}
                  label={i18next.t('label.Fax')}
                  changeHandler={onChange}
                  name={'fax'}
                  defaultValue={suppliers.fax}
                ></FormInputText>
              </Form.Group>
            </Row>
            <Row className="mb-3">
              <Form.Group as={Col} className="mb-3" controlId="email">
                <FormInputText
                  control={control}
                  label={i18next.t('label.Email')}
                  name={'email'}
                  changeHandler={onChange}
                  defaultValue={suppliers.email}
                ></FormInputText>
              </Form.Group>
            </Row>
            <Row className="mb-3">
              <Form.Group as={Col} className="mb-3" controlId="terms">
                <FormInputText
                  control={control}
                  label={i18next.t('label.Terms')}
                  name={'terms'}
                  changeHandler={onChange}
                  defaultValue={suppliers.terms}
                ></FormInputText>
              </Form.Group>
              <Form.Group as={Col} className="mb-3" controlId="limits">
                <FormInputText
                  control={control}
                  label={i18next.t('label.Limits')}
                  name={'limits'}
                  changeHandler={onChange}
                  defaultValue={suppliers.limits}
                ></FormInputText>
              </Form.Group>{' '}
              <Form.Group as={Col} className="mb-3" controlId="comments">
                <FormInputText
                  control={control}
                  label={i18next.t('label.Comments')}
                  name={'comments'}
                  changeHandler={onChange}
                  defaultValue={suppliers.comments}
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
