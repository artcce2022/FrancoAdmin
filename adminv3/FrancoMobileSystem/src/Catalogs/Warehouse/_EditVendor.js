import { useEffect, useState, useMemo } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { Button, Card, Col, Form, Row } from 'react-bootstrap';
import { ApiEndpoint } from 'utils/ApiEndPont';
import { FormInputText } from 'form-components/FormInputText';
import i18next from 'i18next';

const URI = ApiEndpoint + 'vendors/';

export default function EditVendor({
  idVendor,
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
  const [vendor, setVendor] = useState(values);

  useEffect(() => {
    axios.get(URI + idVendor).then(response => {
      setVendor(response.data);
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

    if (idVendor > 0) {
      const URI = URI + idVendor;
      axios
        .put(URI, {
          idVendor: idVendor,
          name: vendor.name,
          contact: vendor.contact,
          address: vendor.address,
          phone: vendor.phone,
          zipcode: vendor.zipcode,
          extension: vendor.extension,
          fax: vendor.fax,
          email: vendor.email,
          terms: vendor.terms,
          limits: vendor.limits,
          comments: vendor.comments
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
          idVendor: idVendor,
          name: vendor.name,
          contact: vendor.contact,
          address: vendor.address,
          phone: vendor.phone,
          zipcode: vendor.zipcode,
          extension: vendor.extension,
          fax: vendor.fax,
          email: vendor.email,
          terms: vendor.terms,
          limits: vendor.limits,
          comments: vendor.comments
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
    setVendor({ ...vendor, [name]: value });
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
                label={i18next.t('label.Vendor')}
                changeHandler={onChange}
                name={'name'}
                control={control}
                defaultValue={vendor.name}
              ></FormInputText>
            </Form.Group>
            <Form.Group className="mb-3" controlId="address">
              <FormInputText
                control={control}
                label={i18next.t('label.Address')}
                name="address"
                changeHandler={onChange}
                defaultValue={vendor.address}
              ></FormInputText>
            </Form.Group>
            <Row className="mb-3">
              <Form.Group as={Col} className="mb-3" controlId="zipcode">
                <FormInputText
                  control={control}
                  label={i18next.t('label.ZipCode')}
                  name="zipcode"
                  changeHandler={onChange}
                  defaultValue={vendor.zipcode}
                ></FormInputText>
              </Form.Group>
              <Form.Group as={Col} className="mb-3" controlId="contact">
                <FormInputText
                  control={control}
                  label={i18next.t('label.ContactName')}
                  changeHandler={onChange}
                  defaultValue={vendor.contact}
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
                defaultValue={vendor.phone}
              ></FormInputText>
            </Form.Group>
            <Row className="mb-3">
              <Form.Group as={Col} className="mb-3" controlId="extension">
                <FormInputText
                  control={control}
                  label={i18next.t('label.Extension')}
                  changeHandler={onChange}
                  name={'extension'}
                  defaultValue={vendor.extension}
                ></FormInputText>
              </Form.Group>
              <Form.Group as={Col} className="mb-3" controlId="fax">
                <FormInputText
                  control={control}
                  label={i18next.t('label.Fax')}
                  changeHandler={onChange}
                  name={'fax'}
                  defaultValue={vendor.fax}
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
                  defaultValue={vendor.email}
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
                  defaultValue={vendor.terms}
                ></FormInputText>
              </Form.Group>
              <Form.Group as={Col} className="mb-3" controlId="limits">
                <FormInputText
                  control={control}
                  label={i18next.t('label.Limits')}
                  name={'limits'}
                  changeHandler={onChange}
                  defaultValue={vendor.limits}
                ></FormInputText>
              </Form.Group>{' '}
              <Form.Group as={Col} className="mb-3" controlId="comments">
                <FormInputText
                  control={control}
                  label={i18next.t('label.Comments')}
                  name={'comments'}
                  changeHandler={onChange}
                  defaultValue={vendor.comments}
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
    </>
  );
}
