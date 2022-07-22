import { useEffect, useState, useMemo } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { Button, Card, Col, Form, Row } from 'react-bootstrap';
import { ApiEndpoint } from 'utils/ApiEndPont';
import { FormInputText } from 'form-components/FormInputText';
import i18next from 'i18next';

const URI = ApiEndpoint + 'failureslabor/';

export default function EditCommonFailureLabor({
  idCommonFailure,
  idcommonfailurelabor,
  closeModal
}) {
  //const [commonFailure] =useCommonFailures({idCommonFailure});
  const [validated, setValidated] = useState(false);
  const [isIncluded, setIsIncluded] = useState(true);
  const [isVisible, setIsVisible] = useState(true);
  const [alertMessage, setAlertMessage] = useState('');
  const [openAlert, setOpenAlert] = useState(false);
  const [typeAlert, setTypeAlert] = useState('success');
  const {
    handleSubmit,
    control,
    formState: { errors }
  } = useForm();
  const [values, setValues] = useState({
    description: '',
    included: 'true',
    visibletocustomer: 'true',
    price: '0'
  });
  const [labor, setLabor] = useState(values);
  useEffect(() => {
    if (idcommonfailurelabor > 0) {
      axios.get(URI + idcommonfailurelabor).then(response => {
        console.log(response.data);
        setLabor(response.data);
        setIsIncluded(response.data.included);
        setIsVisible(response.data.visibletocustomer);
      });
    }
  }, []);

  // const fields = ['warehousename', 'address',  'phone', 'manager'];
  // fields.forEach(field => setValue(field, warehouse[field]));
  const onSubmit = (data, e) => {
    const form = e.target;
    if (form.checkValidity() === false) {
      setValidated(true);
      e.preventDefault();
      e.stopPropagation();
      return;
    }

    setValidated(true);
    if (idcommonfailurelabor > 0) {
      axios
        .put(URI + idcommonfailurelabor, {
          idcommonfailures: idCommonFailure,
          description: labor.description,
          included: isIncluded,
          visibletocustomer: isVisible,
          price: labor.price
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
          idcommonfailures: idCommonFailure,
          description: labor.description,
          included: isIncluded,
          visibletocustomer: isVisible,
          price: labor.price
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
    console.log(name);
    setLabor({ ...labor, [name]: value });
  };

  const onChangeIsIncluded = event => {
    setIsIncluded(!isIncluded);
  };

  const onChangeIsVisible = event => {
    setIsVisible(!isVisible);
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
            <Row>
              <Col>
                <FormInputText
                  label={i18next.t('label.Description')}
                  changeHandler={onChange}
                  name="description"
                  control={control}
                  defaultValue={labor.description}
                ></FormInputText>
              </Col>
            </Row>
            <Row>
              <Col>
                <Form.Check
                  type="switch"
                  id="isIncluded"
                  label={i18next.t('label.IsIncluded')}
                  value={isIncluded}
                  onChange={onChangeIsIncluded}
                />
              </Col>
            </Row>
            <Row>
              <Col>
                <Form.Check
                  type="switch"
                  id="isVisible"
                  label={i18next.t('label.Visible')}
                  value={isVisible}
                  onChange={onChangeIsVisible}
                />
              </Col>
            </Row>
            <Row>
              <Col>
                <Form.Group as={Col} className="mb-3" controlId="price">
                  <FormInputText
                    control={control}
                    label={i18next.t('label.Price')}
                    name="price"
                    errors={errors}
                    changeHandler={onChange}
                    defaultValue={labor.price}
                  ></FormInputText>
                </Form.Group>
              </Col>
            </Row>
            <Button type="submit">{i18next.t('label.Save')}</Button>
          </Form>
        </Card.Body>
      </Card>
    </>
  );
}
