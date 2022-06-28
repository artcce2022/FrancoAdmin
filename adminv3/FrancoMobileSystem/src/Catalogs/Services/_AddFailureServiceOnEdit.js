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
const URISaveFailures = ApiEndpoint + 'services/addfailure';
const AddFailureServiceOnEdit = ({
  closeModal,
  failuresList,
  idService,
  setOpenAlert,
  setTypeAlert,
  setAlertMessage
}) => {
  const [options, setOptions] = useState([]);
  const [idsymptomcategory, setIdsymptomcategory] = useState('');
  const [selectedFailureStr, setSelectedFailureStr] = useState('');
  const [selectedCommonFailure, setSelectedCommonFailure] = useState(null);
  const [comments, setComments] = useState('');
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

  const onSubmit = async (data, e) => {
    e.preventDefault();
    console.log('selectedCommonFailure');
    console.log(selectedCommonFailure);
    console.log(selectedCommonFailure.idcommonfailures);
    if (selectedCommonFailure.idcommonfailures > 0) {
      saveServiceCommonFailure();
      reset();
    } else {
      setAlertMessage(i18next.t('label.ErrorSelectValid'));
      setTypeAlert('warning');
      setOpenAlert(true);
    }
  };

  const onSubmitAndClose = async (data, e) => {
    e.preventDefault();
    if (selectedCommonFailure.idcommonfailures > 0) {
      saveServiceCommonFailure();
      closeModal();
    } else {
      setAlertMessage(i18next.t('label.ErrorSelectValid'));
      setTypeAlert('warning');
      setOpenAlert(true);
    }
  };

  const saveServiceCommonFailure = () => {
    axios
      .post(URISaveFailures, {
        idservice: idService,
        idcommonfailures: selectedCommonFailure.idcommonfailures,
        idcommonfailurestatus: 1,
        comments: selectedCommonFailure.comments
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
  };

  useEffect(() => {
    axios.get(URIFailures + selectedFailureStr).then(response => {
      setSelectedCommonFailure(response.data);
      setIdsymptomcategory(response.data['idsymptomcategory']);
    });
  }, [selectedFailureStr]);

  const onChange = event => {
    const { name, value } = event.target;
    setComments(value);
    setSelectedCommonFailure({ ...selectedCommonFailure, [name]: value });
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
              <option key={0} value={0}>
                {i18next.t('label.Failure')}
              </option>
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
              <p className="fs--1 mt-1">
                {selectedCommonFailure?.shortdescription}
              </p>
              <div>
                <strong className="me-2">
                  {i18next.t('label.SymtomDescription')}{' '}
                </strong>
                <p className="fs--1 mt-1">
                  {selectedCommonFailure?.symtomdescription}
                </p>
              </div>
              <div>
                <strong className="me-2">
                  {i18next.t('label.WorkRequested')}{' '}
                </strong>
                <p className="fs--1 mt-1">
                  {selectedCommonFailure?.workrequested}
                </p>
              </div>
            </Col>
            <Col md={6} lg={4} className="mb-4 mb-lg-0">
              <h5 className="mb-3 fs-0">{i18next.t('label.Hours')}</h5>
              <p className="fs--1 mt-1">{selectedCommonFailure?.hours}</p>
              <div>
                <strong className="me-2">{i18next.t('label.Price')} </strong>
                <p className="fs--1 mt-1">{selectedCommonFailure?.price}</p>
              </div>
              <div>
                <strong className="me-2">{i18next.t('label.Symptom')} </strong>
                <p className="fs--1 mt-1">
                  {selectedCommonFailure?.symptomscategory?.category}
                </p>
              </div>
            </Col>
          </Row>
          <FormInputText
            label={i18next.t('label.Comments')}
            name={'comments'}
            control={control}
            value={comments}
            changeHandler={onChange}
            defaultValue={comments}
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

export default AddFailureServiceOnEdit;
