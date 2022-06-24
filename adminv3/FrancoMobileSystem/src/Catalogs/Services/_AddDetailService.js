import axios from 'axios';
import { ServiceContext } from 'context/Context';
import { FormInputText } from 'form-components/FormInputText';
import i18next from 'i18next';
import React, { useContext, useEffect, useState } from 'react';
import { Button, Card, Col, Form } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { ApiEndpoint } from 'utils/ApiEndPont';
import { v4 as uuidv4 } from 'uuid';
const URI = ApiEndpoint + 'scategories/';
const URIFailures = ApiEndpoint + 'failures/';
const AddDetailService = ({ closeModal }) => {
  const [alertMessage, setAlertMessage] = useState('');
  const [openAlert, setOpenAlert] = useState(false);
  const [typeAlert, setTypeAlert] = useState('success');
  const [description, setDescription] = useState('');
  const { serviceId, detailList } = useContext(ServiceContext);
  const {
    register,
    control,
    handleSubmit,
    reset,
    setValue,
    formState: { errors }
  } = useForm({
    mode: 'onBlur',
    defaultValues: {
      description: ''
    }
  });
  const handleCloseAlert = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenAlert(false);
  };

  const onChange = event => {
    const { value } = event.target;
    setDescription(value);
  };

  const onSubmit = async (data, e) => {
    e.preventDefault();
    if (data.description) {
      let newData = data;
      newData.rowId = uuidv4();
      detailList.push(newData);
      reset();

      setAlertMessage(i18next.t('SuccessfulRecord'));
      setTypeAlert('success');
      setOpenAlert(true);
    } else {
      setAlertMessage(i18next.t('label.ErrorSelectValid'));
      setTypeAlert('warning');
      setOpenAlert(true);
    }

    //action(newData);
  };
  const onSubmitAndClose = async (data, e) => {
    e.preventDefault();
    if (data.description) {
      let newData = data;
      newData.rowId = uuidv4();
      detailList.push(newData);
      // action(newData);
      closeModal();
      setAlertMessage(i18next.t('SuccessfulRecord'));
    } else {
      setAlertMessage(i18next.t('label.ErrorSelectValid'));
      setTypeAlert('warning');
      setOpenAlert(true);
    }
  };
  return (
    <Card style={{ width: '100%' }}>
      <Card.Body>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <FormInputText
            label={i18next.t('label.Description')}
            name={'description'}
            control={control}
            defaultValue={description}
            changeHandler={onChange}
          ></FormInputText>

          <Button onClick={handleSubmit(onSubmit)} variant="contained">
            {i18next.t('label.Add')}
          </Button>
          <Button onClick={handleSubmit(onSubmitAndClose)} variant="contained">
            {i18next.t('label.AddAndClose')}
          </Button>
          <Button variant="contained" color="secondary" onClick={closeModal}>
            {i18next.t('label.Cancel')}
          </Button>
        </Form>
      </Card.Body>
    </Card>
  );
};

export default AddDetailService;
