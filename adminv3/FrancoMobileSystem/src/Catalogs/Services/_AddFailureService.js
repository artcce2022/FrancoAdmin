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
const AddFailureService = ({ closeModal, idSymptomCategoryDefault }) => {
  const [categoriesFailure, setcategoriesFailure] = useState([]);
  const [options, setOptions] = useState([]);
  const [idsymptomcategory, setIdsymptomcategory] = useState('');
  const [selectedFailureStr, setSelectedFailureStr] = useState('');
  const [commonFailure, setCommonFailure] = useState([]);
  const [comments, setComments] = useState('');
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

  useEffect(() => {
    axios(URIFailures).then(({ data }) => {
      const failuresList = data.map(failure => {
        return {
          value: `${failure.idcommonfailures}`,
          label: failure.shortdescription
        };
      });
      setOptions(failuresList);
    });
  }, []); // empty array makes hook working once

  // useEffect(() => {
  //   axios(URI).then(({ data }) => {
  //     const listCategories = data.map(category => {
  //       if (category.idsymptomcategory === idSymptomCategoryDefault) {
  //         setSymptom(category.category);
  //       }
  //     });
  //   });
  // }, [idsymptomcategory]); // empty array makes hook working once

  const handleCloseAlert = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
  };

  const onSubmit = async (data, e) => {
    e.preventDefault();
    console.log(commonFailure);
    if (commonFailure.idcommonfailures > 0) {
      let newData = commonFailure;
      newData.rowId = uuidv4();
      newData.comments = comments;
      failuresList.push(newData);
      console.log('newData');
      console.log(newData);
      reset();
    } else {
      //   setAlertMessage(i18next.t('label.ErrorSelectValid'));
      //   setTypeAlert('warning');
      //   setOpenAlert(true);
    }
  };

  const onSubmitAndClose = async (data, e) => {
    e.preventDefault();
    if (commonFailure.idcommonfailures > 0) {
      let newData = commonFailure;
      newData.rowId = uuidv4();
      newData.comments = comments;
      failuresList.push(newData);
      console.log('newData');
      console.log(newData);
      closeModal();
    } else {
      //   setAlertMessage(i18next.t('label.ErrorSelectValid'));
      //   setTypeAlert('warning');
      //   setOpenAlert(true);
    }
  };

  useEffect(() => {
    axios.get(URIFailures + selectedFailureStr).then(response => {
      console.log(response.data);
      setCommonFailure(response.data);
      setIdsymptomcategory(response.data['idsymptomcategory']);
    });
  }, [selectedFailureStr]);

  const onChange = event => {
    const { value } = event.target;
    setComments(value);
  };
  return (
    <Card style={{ width: '100%' }}>
      <Card.Body>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Form.Group as={Col} className="mb-3" controlId="failure">
            <Form.Select
              aria-label={i18next.t('label.Failure')}
              onChange={selectedOption => {
                setSelectedFailureStr(`${selectedOption.target.value}`);
                console.log('selectedoption');
                console.log(`${selectedOption.target.value}`);
              }}
            >
              {!!options?.length &&
                options.map(({ label, value }) => (
                  <option key={value} value={value}>
                    {label}
                  </option>
                ))}
            </Form.Select>
          </Form.Group>
          <Row>
            <Col md={6} lg={4} className="mb-4 mb-lg-0">
              <h5 className="mb-3 fs-0">
                {i18next.t('label.ShortDescription')}
              </h5>
              <p className="fs--1 mt-1">{commonFailure.shortdescription}</p>
              <div>
                <strong className="me-2">
                  {i18next.t('label.SymtomDescription')}{' '}
                </strong>
                <p className="fs--1 mt-1">{commonFailure.symtomdescription}</p>
              </div>
              <div>
                <strong className="me-2">
                  {i18next.t('label.WorkRequested')}{' '}
                </strong>
                <p className="fs--1 mt-1">{commonFailure.workrequested}</p>
              </div>
            </Col>
            <Col md={6} lg={4} className="mb-4 mb-lg-0">
              <h5 className="mb-3 fs-0">{i18next.t('label.Hours')}</h5>
              <p className="fs--1 mt-1">{commonFailure.hours}</p>
              <div>
                <strong className="me-2">{i18next.t('label.Price')} </strong>
                <p className="fs--1 mt-1">{commonFailure.price}</p>
              </div>
              <div>
                <strong className="me-2">{i18next.t('label.Symptom')} </strong>
                <p className="fs--1 mt-1">
                  {commonFailure?.symptomscategory?.category}
                </p>
              </div>
            </Col>
          </Row>
          <FormInputText
            label={i18next.t('label.Comments')}
            name={'comments'}
            control={control}
            changeHandler={onChange}
            defaultValue={commonFailure.shortdescription}
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

export default AddFailureService;
