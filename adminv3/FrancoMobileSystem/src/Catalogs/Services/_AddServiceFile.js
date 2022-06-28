import axios from 'axios';
import { FormInputText } from 'form-components/FormInputText';
import i18next from 'i18next';
import React, { useCallback, useState } from 'react';
import { Form } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { ApiEndpoint } from 'utils/ApiEndPont';
import FileUpload from 'utils/FileUpload';
import { v4 as uuidv4 } from 'uuid';

const AddServiceFile = ({
  action,
  closeModal,
  idService,
  serviceGuid,
  setOpenAlert,
  setTypeAlert,
  setAlertMessage
}) => {
  const [description, setDescription] = useState('');
  const [attachment, setAttachment] = useState(null);
  const [isVisibleToCustomer, setIsVisibleToCustomer] = useState(false);

  const URISaveFile = ApiEndpoint + 'service/savefile/';
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

  const onDrop = useCallback(async acceptedFiles => {
    const [file] = acceptedFiles;
    console.log('entre a file');
    console.log(acceptedFiles);
    const formData = new FormData();
    formData.append('file', file);

    setAttachment(file);
    formData.append('name', 'ServiceFile');
    formData.append('description', description);
    formData.append('uuid', serviceGuid);
    formData.append('visibilitycustomer', isVisibleToCustomer);
    formData.append('ServiceFile', file);
    formData.append('idService', idService);
    axios
      .post(URISaveFile, formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      })
      .then(res => {
        setAlertMessage(i18next.t('SuccessfulRecord'));
        setTypeAlert('success');
        setOpenAlert(true);
        closeModal();
      })
      .catch(err => alert('File Upload Error'));
  }, []);

  const handleChangeFile = event => {
    const files = Array.from(event.target.files);
    const [file] = files;
    setAttachment(file);
    const formData = new FormData();
    formData.append('name', 'ServiceFile');
    formData.append('description', description);
    formData.append('uuid', serviceGuid);
    formData.append('visibilitycustomer', isVisibleToCustomer);
    formData.append('ServiceFile', files[0]);
    formData.append('idService', idService);
    axios
      .post(URISaveFile, formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      })
      .then(res => {
        setAlertMessage(i18next.t('SuccessfulRecord'));
        setTypeAlert('success');
        setOpenAlert(true);
        closeModal();
      })
      .catch(err => alert('File Upload Error'));
  };
  // const onChangeDescription= (data) =>{
  //     setDescription(data.value);
  // }

  const onChange = event => {
    setDescription(event.target.value);
  };
  const onChangeIsVisible = event => {
    setIsVisibleToCustomer(!isVisibleToCustomer);
  };
  const onSubmit = async (data, e) => {
    e.preventDefault();
    if (data.description) {
      let newData = data;
      newData.rowId = uuidv4();
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
  return (
    <>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <FormInputText
          label={i18next.t('label.Description')}
          name={'description'}
          control={control}
          defaultValue={description}
          changeHandler={onChange}
        ></FormInputText>
        <Form.Check
          type="switch"
          id="isVisible"
          label={i18next.t('label.VisibleToCustomer')}
          value={isVisibleToCustomer}
          onChange={onChangeIsVisible}
        />
        <input
          type="file"
          onChange={handleChangeFile}
          name={'ServiceFile'}
          id={'ServiceFile'}
        />
      </Form>
    </>
  );
};

export default AddServiceFile;
