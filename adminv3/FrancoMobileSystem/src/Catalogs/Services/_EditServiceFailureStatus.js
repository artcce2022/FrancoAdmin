import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import i18next from 'i18next';
import { ApiEndpoint } from 'utils/ApiEndPont';
import { Button, Card, Col, Form, Row } from 'react-bootstrap';
import { FormInputText } from 'form-components/FormInputText';
import Divider from 'components/common/Divider';

export default function EditServiceFailureStatus({
  closeModal,
  idCommonFailureService,
  idCommonFailureStatus,
  setOpenAlert,
  setTypeAlert,
  setAlertMessage
}) {
  const [comments, setComments] = useState('');
  const [validated, setValidated] = useState(false);
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
      comments: ''
    }
  });

  const onChange = event => {
    const { name, value } = event.target;
    setComments(value);
  };

  const onSubmit = async data => {
    console.log(idCommonFailureStatus);
    if (idCommonFailureService > 0) {
      const URI = ApiEndpoint + 'services/failures/' + idCommonFailureService;
      axios
        .put(URI, {
          idservicefailures: idCommonFailureService,
          idcommonfailurestatus: idCommonFailureStatus,
          comments: comments
        })
        .then(function (response) {
          console.log(response);
          setAlertMessage(i18next.t('label.SuccessfulRecord'));
          setTypeAlert('success');
          setOpenAlert(true);
          closeModal();
        })
        .catch(function (error) {
          console.log(error);
          setAlertMessage(i18next.t('label.ErrorSelectValid'));
          setTypeAlert('warning');
          setOpenAlert(true);
        });
    }
  };
  return (
    <div>
      <Card variant="elevation">
        <Form
          noValidate
          validated={validated}
          onSubmit={handleSubmit(onSubmit)}
        >
          <Row>
            <Col>
              <FormInputText
                label={i18next.t('label.Comments')}
                name={'comments'}
                control={control}
                value={comments}
                changeHandler={onChange}
                defaultValue={comments}
              ></FormInputText>
            </Col>
          </Row>

          <Divider />
          <Row>
            <Col>
              {' '}
              <Button onClick={handleSubmit(onSubmit)} variant="contained">
                {i18next.t('label.Save')}
              </Button>
            </Col>
            <Col>
              {' '}
              <Button
                variant="contained"
                color="secondary"
                onClick={closeModal}
              >
                {i18next.t('label.Cancel')}
              </Button>
            </Col>
          </Row>
        </Form>
      </Card>
    </div>
  );
}
