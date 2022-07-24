import axios from 'axios';
import { ServiceContext } from 'context/Context';
import { FormInputText } from 'form-components/FormInputText';
import i18next from 'i18next';
import React, { useContext, useEffect, useState } from 'react';
import { Button, Card, Col, Form, Row } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { ApiEndpoint } from 'utils/ApiEndPont';
import { v4 as uuidv4 } from 'uuid';
const URILabor = ApiEndpoint + 'services/labor/';
const EditLaborService = ({
  closeModal,
  idservicelabor,
  idService,
  setOpenAlert,
  setTypeAlert,
  setAlertMessage
}) => {
  const [validated, setValidated] = useState(false);
  const [isIncluded, setIsIncluded] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isExternal, setIsExternal] = useState(false);
  const [employeeList, setEmployeeList] = useState([]);
  const [idEmployee, setIdEmployee] = useState(0);
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
      shortdescription: '',
      isincluded: 'false',
      visibletocustomer: 'false',
      isdeleted: 'false',
      price: '0',
      isexternal: 'false',
      idtechnician: '0'
    }
  });
  const [values, setValues] = useState({
    shortdescription: '',
    isincluded: 'false',
    visibletocustomer: 'false',
    isdeleted: 'false',
    price: '0',
    isexternal: 'false',
    idtechnician: '0'
  });
  const [laborService, setLaborService] = useState(values);

  useEffect(() => {
    if (idservicelabor > 0) {
      axios.get(URILabor + idservicelabor).then(response => {
        setLaborService(response.data);
        setIsIncluded(response.data.isincluded);
        setIsVisible(response.data.visibletocustomer);
        setIsExternal(response.data.isexternal);
        setIdEmployee(response.data.idtechnician);
      });
    }
  }, []); // empty array makes hook working once

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
    if (idservicelabor > 0) {
      axios
        .put(URILabor, {
          idservicelabor: idservicelabor,
          idservice: idService,
          shortdescription: laborService.description,
          isincluded: isIncluded,
          visibletocustomer: isVisible,
          isdeleted: false,
          price: laborService.price,
          isexternal: isExternal,
          idtechnician: idEmployee
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
        .post(URILabor, {
          idservice: idService,
          shortdescription: laborService.description,
          isincluded: isIncluded,
          visibletocustomer: isVisible,
          isdeleted: false,
          price: laborService.price,
          isexternal: isExternal,
          idtechnician: idEmployee
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

  useEffect(() => {
    const uriEmployees = ApiEndpoint + 'employees/';
    axios(uriEmployees).then(({ data }) => {
      const employeeslist = data.map(employee => {
        return {
          value: `${employee.idemployee}`,
          label: `${employee.firstname} ${employee.lastname}`
        };
      });
      setEmployeeList(employeeslist);
    });
  }, []);
  const onChange = event => {
    console.log(event.target);
    const { name, value } = event.target;
    setLaborService({ ...laborService, [name]: value });
  };

  const onChangeIsIncluded = event => {
    setIsIncluded(!isIncluded);
  };

  const onChangeIsVisible = event => {
    setIsVisible(!isVisible);
  };

  const onChangeIsExternal = event => {
    setIsExternal(!isExternal);
  };
  return (
    <Card style={{ width: '100%' }}>
      <Card.Body>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Row>
            <Col>
              <Form.Group className="mb-3" controlId="employee">
                <Form.Label>{i18next.t('label.Thecnician')}</Form.Label>
                <Form.Select
                  aria-label="Default select"
                  name="employee"
                  style={{ minWidth: '250px' }}
                  onChange={selectedOption => {
                    onChange(selectedOption);
                    setIdEmployee(`${selectedOption.target.value}`);
                    console.log(`${selectedOption.target.value}`);
                  }}
                  value={`${idEmployee}`}
                >
                  <option key={'location_0'} value={0}>
                    {i18next.t('label.SelectSomeValue')}
                  </option>
                  {!!employeeList?.length &&
                    employeeList.map(({ label, value }) => (
                      <option key={value} value={value}>
                        {label}
                      </option>
                    ))}
                </Form.Select>
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col>
              <FormInputText
                label={i18next.t('label.Description')}
                changeHandler={onChange}
                name="description"
                control={control}
                defaultValue={laborService.shortdescription}
              ></FormInputText>
            </Col>
          </Row>
          <Row>
            <Col>
              <FormInputText
                label={i18next.t('label.Price')}
                changeHandler={onChange}
                name="price"
                control={control}
                defaultValue={laborService.price}
              ></FormInputText>
            </Col>
          </Row>
          <Row>
            <Col>
              <Form.Check
                type="switch"
                id="isIncluded"
                label={i18next.t('label.IsIncluded')}
                checked={isIncluded}
                onChange={onChangeIsIncluded}
              />
            </Col>
          </Row>{' '}
          <Row>
            <Col>
              <Form.Check
                type="switch"
                id="isVisible"
                label={i18next.t('label.Visible')}
                checked={isVisible}
                onChange={onChangeIsVisible}
              />
            </Col>
          </Row>
          <Row>
            <Col>
              <Form.Check
                type="switch"
                id="isVisible"
                label={i18next.t('label.IsExternal')}
                checked={isExternal}
                onChange={onChangeIsExternal}
              />
            </Col>
          </Row>
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

export default EditLaborService;
