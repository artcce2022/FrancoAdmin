import { useEffect, useState, useMemo } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { Button, Card, Col, Form, Row } from 'react-bootstrap';
import { AsyncTypeahead } from 'react-bootstrap-typeahead';
import { Controller } from 'react-hook-form';
import i18next from 'i18next';
import { ApiEndpoint } from 'utils/ApiEndPont';
import { FormInputText } from 'form-components/FormInputText';
import AlertNotification from 'form-components/AlertNotification';

const URI = ApiEndpoint + 'warehouse/';

export default function EditWarehouse({ idWarehouse, closeModal }) {
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
      idwarehouse: '',
      idCompany: '1',
      warehousename: '',
      address: '',
      phone: '',
      manager: ''
    }
  });
  const [values, setValues] = useState({
    idwarehouse: '',
    idCompany: '1',
    warehousename: '',
    address: '',
    phone: '',
    manager: ''
  });
  const [warehouse, setWarehouse] = useState(values);

  useEffect(() => {
    axios.get(URI + idWarehouse).then(response => {
      setWarehouse(response.data);
    });
  }, []); // empty array makes hook working once

  const onSubmit = async data => {
    console.log(warehouse);

    if (idWarehouse > 0) {
      axios
        .put(URI + idWarehouse, {
          idWarehouse: idWarehouse,
          idCompany: 1,
          warehousename: warehouse.warehousename,
          address: warehouse.address,
          phone: warehouse.phone,
          manager: warehouse.manager
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
          idCompany: 1,
          warehousename: warehouse.warehousename,
          address: warehouse.address,
          phone: warehouse.phone,
          manager: warehouse.manager
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
    setWarehouse({ ...warehouse, [name]: value });
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
            <Form.Group className="mb-3" controlId="warehousename">
              <FormInputText
                label={i18next.t('label.WarehouseName')}
                changeHandler={onChange}
                name={'warehousename'}
                control={control}
                defaultValue={warehouse.warehousename}
              ></FormInputText>
            </Form.Group>
            <Row className="mb-3">
              <Form.Group as={Col} className="mb-3" controlId="phone">
                <FormInputText
                  label={i18next.t('label.Phone')}
                  changeHandler={onChange}
                  name={'phone'}
                  control={control}
                  defaultValue={warehouse.phone}
                ></FormInputText>
              </Form.Group>
              <Form.Group as={Col} className="mb-3" controlId="manager">
                <FormInputText
                  label={i18next.t('label.Manager')}
                  changeHandler={onChange}
                  name={'manager'}
                  control={control}
                  defaultValue={warehouse.manager}
                ></FormInputText>
              </Form.Group>
            </Row>

            <Form.Group className="mb-3" controlId="address">
              <FormInputText
                label={i18next.t('label.Address')}
                changeHandler={onChange}
                name={'address'}
                control={control}
                defaultValue={warehouse.address}
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
