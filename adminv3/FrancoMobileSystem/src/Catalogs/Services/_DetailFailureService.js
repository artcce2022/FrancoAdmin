import axios from 'axios';
import { ServiceContext } from 'context/Context';
import { FormInputText } from 'form-components/FormInputText';
import i18next from 'i18next';
import React, { useContext, useEffect, useState } from 'react';
import { Button, Card, Col, Form, Row } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { ApiEndpoint } from 'utils/ApiEndPont';
import { v4 as uuidv4 } from 'uuid';
const URI = ApiEndpoint + 'scategories/';
const URIFailures = ApiEndpoint + 'failures/';
const DetailFailureService = ({ closeModal, failure }) => {
  const [comments, setComments] = useState(failure.comments);
  const { serviceId, failuresList, setFailuresList } =
    useContext(ServiceContext);
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
      idcommonfailures: '',
      shortdescription: '',
      symtomdescription: '',
      workrequested: '',
      hours: '',
      price: '',
      idsymptom: ''
    }
  });

  useEffect(() => {}, []); // empty array makes hook working once

  const onSubmit = async (data, e) => {
    e.preventDefault();
    console.log(failure);
    if (failure.idcommonfailures > 0) {
      let newData = failure;
      newData.comments = comments;
      const index = failuresList
        .map(function (data) {
          return data.rowId;
        })
        .indexOf(failure.rowId);
      failuresList[index] = newData;
      closeModal();
    }
  };

  const onChange = event => {
    const { value } = event.target;
    setComments(value);
  };
  return (
    <Card style={{ width: '100%' }}>
      <Card.Body>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Form.Group as={Col} className="mb-3" controlId="failure">
            <Form.Label>{failure.shortdescription}</Form.Label>
          </Form.Group>
          <Row>
            <Col md={6} lg={4} className="mb-4 mb-lg-0">
              <h5 className="mb-3 fs-0">
                {i18next.t('label.shortDescription')}
              </h5>
              <p className="fs--1 mt-1">{failure.shortdescription}</p>
              <div>
                <strong className="me-2">
                  {i18next.t('label.SymtomDescription')}{' '}
                </strong>
                <p className="fs--1 mt-1">{failure.symtomdescription}</p>
              </div>
              <div>
                <strong className="me-2">
                  {i18next.t('label.WorkRequested')}{' '}
                </strong>
                <p className="fs--1 mt-1">{failure.workrequested}</p>
              </div>
            </Col>
            <Col md={6} lg={4} className="mb-4 mb-lg-0">
              <h5 className="mb-3 fs-0">{i18next.t('label.Hours')}</h5>
              <p className="fs--1 mt-1">{failure.hours}</p>
              <div>
                <strong className="me-2">{i18next.t('label.Price')} </strong>
                <p className="fs--1 mt-1">{failure.price}</p>
              </div>
              <div>
                <strong className="me-2">{i18next.t('label.Symptom')} </strong>
                <p className="fs--1 mt-1">
                  {failure?.symptomscategory?.category}
                </p>
              </div>
            </Col>
          </Row>
          <FormInputText
            label={i18next.t('label.Comments')}
            name={'comments'}
            control={control}
            changeHandler={onChange}
            defaultValue={comments}
          ></FormInputText>
          <Button onClick={handleSubmit(onSubmit)} variant="contained">
            {i18next.t('label.Add')}
          </Button>
          <Button variant="contained" color="secondary" onClick={closeModal}>
            {i18next.t('label.Cancel')}
          </Button>
        </Form>
      </Card.Body>
    </Card>
  );
};

export default DetailFailureService;
