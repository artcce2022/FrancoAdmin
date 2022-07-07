import axios from 'axios';
import { EditServiceContext, ServiceContext } from 'context/Context';
import { FormInputText } from 'form-components/FormInputText';
import i18next from 'i18next';
import React, { useContext, useEffect, useState } from 'react';
import { resetServerContext } from 'react-beautiful-dnd';
import { Button, Card, Col, Form } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { ApiEndpoint } from 'utils/ApiEndPont';
import { v4 as uuidv4 } from 'uuid';
const URI = ApiEndpoint + 'services/adddetail';
const AddDetailServiceOnEdit = ({ closeModal, idService }) => {
  const { setOpenAlert, setTypeAlert, setAlertMessage } =
    useContext(EditServiceContext);
  const [description, setDescription] = useState('');
  const [validated, setValidated] = useState(false);
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm({
    mode: 'onBlur',
    defaultValues: {
      description: ''
    }
  });

  const onChange = event => {
    const { value } = event.target;
    setDescription(value);
  };

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
    if (data.description) {
      saveServiceDetail();
      reset();
    }

    //action(newData);
  };
  const onSubmitAndClose = async (data, e) => {
    const form = e.target;
    if (form.checkValidity() === false) {
      console.log('entre a submit 123');
      setValidated(true);
      e.preventDefault();
      e.stopPropagation();
      return;
    }

    setValidated(true);
    if (data.description) {
      saveServiceDetail();

      closeModal();
    }
  };

  const saveServiceDetail = () => {
    axios
      .post(URI, {
        idservice: idService,
        detail: description
      })
      .then(function (response) {
        setAlertMessage(i18next.t('label.SuccessfulRecord'));
        setTypeAlert('success');
        setOpenAlert(true);
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
        setAlertMessage(i18next.t('label.ErrorSelectValid'));
        setTypeAlert('warning');
        setOpenAlert(true);
      });
  };
  return (
    <Card style={{ width: '100%' }}>
      <Card.Body>
        <Form
          noValidate
          validated={validated}
          onSubmit={handleSubmit(onSubmit)}
        >
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

export default AddDetailServiceOnEdit;
