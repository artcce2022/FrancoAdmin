import { useContext, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
import i18next from 'i18next';
import { ApiEndpoint } from 'utils/ApiEndPont';
import { Button, Card, Col, Form, Row } from 'react-bootstrap';
import { FormInputText } from 'form-components/FormInputText';

const URI = ApiEndpoint + 'scategories/';

export default function EditCommonFailurePart({
  closeModal,
  idCommonFailure,
  idcommonfailurePart
}) {
  const [selectedPartStr, setSelectedPartStr] = useState('');
  const [partsList, setPartsList] = useState([]);
  const [employeeList, setEmployeeList] = useState([]);
  const [isIncluded, setIsIncluded] = useState(0);
  const [idPart, setIdPart] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [isRequired, setIsRequired] = useState(false);
  const [validated, setValidated] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [openAlert, setOpenAlert] = useState(false);
  const [typeAlert, setTypeAlert] = useState('success');

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
      idparts: '0',
      quantity: '1',
      price: '0',
      visibletocustomer: 'true',
      included: 'true',
      required: 'true'
    }
  });
  const [values, setValues] = useState({
    idparts: '0',
    quantity: '1',
    price: '0',
    visibletocustomer: '0',
    included: 'true',
    required: 'true'
  });
  const [part, setPart] = useState(values);

  useEffect(() => {
    const uriParts = ApiEndpoint + 'failurespart/';
    console.log('idcommonfailurePart');
    console.log(idcommonfailurePart);
    if (idcommonfailurePart > 0) {
      axios.get(uriParts + idcommonfailurePart).then(response => {
        console.log('response.data');
        console.log(response.data);
        setPart(response.data);
        setIsIncluded(response.data.included);
        setIsVisible(response.data.visibletocustomer);
        setIsRequired(response.data.required);
      });
    }
  }, []);

  useEffect(() => {
    const uriParts = ApiEndpoint + 'parts/';
    axios(uriParts).then(({ data }) => {
      console.log(uriParts);
      const partList = data.map(parts => {
        return {
          value: `${parts.idparts}`,
          label: `${parts.partcode}-${parts.description}`
        };
      });
      setPartsList(partList);
    });
  }, []); // empty array makes hook working once

  const onSubmit = async (data, e) => {
    const form = e.target;
    if (form.checkValidity() === false) {
      console.log('entre a submit 123');
      setValidated(true);
      e.preventDefault();
      e.stopPropagation();
      return;
    }

    setValidated(true);
    const uriParts = ApiEndpoint + 'failuresparts/';
    console.log('partService');
    if (idcommonfailurePart > 0) {
      axios
        .put(uriParts + idcommonfailurePart, {
          idcommonfailures: idCommonFailure,
          idparts: part.idPart,
          quantity: part.quantity,
          price: part.price,
          visibletocustomer: isVisible,
          included: isIncluded,
          required: isRequired
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
          setAlertMessage(i18next.t('label.ErrorSelectValid'));
          setTypeAlert('warning');
          setOpenAlert(true);
        });
    } else {
      axios
        .post(uriParts, {
          idcommonfailures: idCommonFailure,
          idparts: part.idPart,
          quantity: part.quantity,
          price: part.price,
          visibletocustomer: isVisible,
          included: isIncluded,
          required: isRequired
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
          setAlertMessage(i18next.t('label.ErrorSelectValid'));
          setTypeAlert('warning');
          setOpenAlert(true);
        });
    }
  };

  const onChange = event => {
    const { name, value } = event.target;
    setPart({ ...part, [name]: value });
  };

  const onChangeIsIncluded = event => {
    setIsIncluded(!isIncluded);
  };

  const onChangeIsVisible = event => {
    setIsVisible(!isVisible);
  };

  const onChangeIsRequired = event => {
    setIsRequired(!isRequired);
  };
  return (
    <div>
      <Card variant="elevation">
        <Card.Body>
          <Form
            noValidate
            validated={validated}
            onSubmit={handleSubmit(onSubmit)}
          >
            <Row>
              <Col>
                <Form.Group className="mb-3" controlId="idPart">
                  <Form.Label>{i18next.t('label.Part')}</Form.Label>
                  <Form.Select
                    aria-label="Default select"
                    name="idparts"
                    style={{ minWidth: '250px' }}
                    value={part.idparts}
                    onChange={selectedOption => {
                      console.log(`${selectedOption.target.value}`);
                      onChange(selectedOption);
                    }}
                  >
                    <option key={'location_0'} value={0}>
                      {i18next.t('label.SelectSomeValue')}
                    </option>
                    {!!partsList?.length &&
                      partsList.map(({ label, value }) => (
                        <option key={value} value={value}>
                          {label}
                        </option>
                      ))}
                  </Form.Select>
                </Form.Group>
              </Col>
            </Row>{' '}
            <Row>
              <Col>
                <Form.Group className="mb-3" controlId="quantity">
                  <FormInputText
                    label={i18next.t('label.Quantity')}
                    changeHandler={onChange}
                    name={'quantity'}
                    control={control}
                    defaultValue={part.quantity}
                  ></FormInputText>
                </Form.Group>
              </Col>
              <Col>
                <Form.Group className="mb-3" controlId="price">
                  <FormInputText
                    label={i18next.t('label.Price')}
                    changeHandler={onChange}
                    name={'price'}
                    control={control}
                    defaultValue={part.price}
                  ></FormInputText>
                </Form.Group>
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
              <Col>
                <Form.Check
                  type="switch"
                  id="isVisible"
                  label={i18next.t('label.VisibleToCustomer')}
                  checked={isVisible}
                  onChange={onChangeIsVisible}
                />
              </Col>
            </Row>
            <Row>
              <Col>
                <Form.Check
                  type="switch"
                  id="isRequired"
                  label={i18next.t('label.IsRequired')}
                  checked={isRequired}
                  onChange={onChangeIsRequired}
                />
              </Col>
            </Row>
            <Row>
              <Col>
                {' '}
                <Button
                  type="submit"
                  onClick={handleSubmit(onSubmit)}
                  color="primary"
                  size="sm"
                >
                  {i18next.t('label.Save')}
                </Button>
              </Col>
            </Row>
          </Form>
        </Card.Body>
      </Card>
    </div>
  );
}
