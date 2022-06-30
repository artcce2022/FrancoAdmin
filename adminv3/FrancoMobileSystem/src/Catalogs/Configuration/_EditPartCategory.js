import { useEffect, useState, useMemo } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { Button, Card, Col, Form, Row } from 'react-bootstrap';
import { ApiEndpoint } from 'utils/ApiEndPont';
import { FormInputText } from 'form-components/FormInputText';
import AlertNotification from 'form-components/AlertNotification.js';
import i18next from 'i18next';

const URI = ApiEndpoint + 'partscategories/';

export default function EditPartCategory({
  idPartCategory,
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
      idPartCategory: '',
      category: ''
    }
  });
  const [values, setValues] = useState({
    idPartCategory: '',
    category: ''
  });
  const [partCategory, setPartCategory] = useState(values);

  useEffect(() => {
    axios.get(URI + idPartCategory).then(response => {
      setPartCategory(response.data);
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
    if (idPartCategory > 0) {
      axios
        .put(URI + idPartCategory, {
          idPartCategory: idPartCategory,
          category: partCategory.category
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
          idPartCategory: idPartCategory,
          category: partCategory.category
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
    setPartCategory({ ...partCategory, [name]: value });
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
          <Form
            noValidate
            validated={validated}
            onSubmit={handleSubmit(onSubmit)}
          >
            <Form.Group className="mb-3" controlId="category">
              <FormInputText
                label={i18next.t('label.Categoria')}
                changeHandler={onChange}
                name={'category'}
                control={control}
                defaultValue={partCategory.category}
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
