import { useEffect, useState, useMemo } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { Button, Card, Col, Form, Row } from 'react-bootstrap';
import { ApiEndpoint } from 'utils/ApiEndPont';
import { FormInputText } from 'form-components/FormInputText';
import i18next from 'i18next';

const URI = ApiEndpoint + 'failures/';
const URICategories = ApiEndpoint + 'scategories/';

export default function EditCommonFailure({
  idCommonFailure,
  idsymptomcategorydefault,
  closeModal,
  setOpenAlert,
  setTypeAlert,
  setAlertMessage
}) {
  //const [commonFailure] =useCommonFailures({idCommonFailure});
  const [validated, setValidated] = useState(false);

  const {
    handleSubmit,
    control,
    formState: { errors }
  } = useForm();
  const [values, setValues] = useState({
    idcommonfailures: '',
    shortdescription: '',
    symtomdescription: '',
    workrequested: '',
    hours: '',
    price: '',
    idsymptomcategory: ''
  });
  const [commonFailure, setCommonFailure] = useState(values);
  const [categoriesFailure, setcategoriesFailure] = useState([]);
  const [idsymptomcategory, setIdsymptomcategory] = useState('');
  useEffect(() => {
    if (idCommonFailure > 0) {
      axios.get(URI + idCommonFailure).then(response => {
        setCommonFailure(response.data);
      });
    }
  }, []);
  useEffect(() => {
    axios(URICategories).then(({ data }) => {
      const listCategories = data.map(category => {
        if (category.idsymptomcategory === idsymptomcategorydefault) {
          setIdsymptomcategory(`${category.idsymptomcategory}`);
        }
        return {
          value: `${category.idsymptomcategory}`,
          label: category.category
        };
      });
      setcategoriesFailure(listCategories);
      console.log(listCategories);
    });
  }, []); // empty array makes hook working once

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
    if (idCommonFailure > 0) {
      axios
        .put(URI + idCommonFailure, {
          idcommonfailures: idCommonFailure,
          shortdescription: commonFailure.shortdescription,
          symtomdescription: commonFailure.symtomdescription,
          workrequested: commonFailure.workrequested,
          hours: commonFailure.hours,
          price: commonFailure.price,
          idsymptomcategory: parseInt(commonFailure.idsymptomcategory)
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
          shortdescription: commonFailure.shortdescription,
          symtomdescription: commonFailure.symtomdescription,
          workrequested: commonFailure.workrequested,
          hours: commonFailure.hours,
          price: commonFailure.price,
          idsymptomcategory: parseInt(commonFailure.idsymptomcategory)
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
    setCommonFailure({ ...commonFailure, [name]: value });
    if (name === 'idsymptomcategory') {
      setIdsymptomcategory(value);
    }
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
                <Form.Group
                  as={Col}
                  className="mb-3"
                  controlId="idsymptomcategory"
                >
                  <Form.Label>{i18next.t('label.Categoria')}</Form.Label>
                  <Form.Control
                    as="select"
                    aria-label={i18next.t('label.Categoria')}
                    name="idsymptomcategory"
                    onChange={onChange}
                    value={`${idsymptomcategory}`}
                  >
                    {!!categoriesFailure?.length &&
                      categoriesFailure.map(({ label, value }) => (
                        <option key={value} value={value}>
                          {label}
                        </option>
                      ))}
                  </Form.Control>
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col>
                <FormInputText
                  label={i18next.t('label.shortDescription')}
                  changeHandler={onChange}
                  name={'shortdescription'}
                  control={control}
                  defaultValue={commonFailure.shortdescription}
                ></FormInputText>
              </Col>
            </Row>
            <Row>
              <Col>
                <FormInputText
                  control={control}
                  label={i18next.t('label.SymtomDescription')}
                  name="symtomdescription"
                  changeHandler={onChange}
                  errors={errors}
                  defaultValue={commonFailure.symtomdescription}
                ></FormInputText>
              </Col>
            </Row>
            <Row>
              <Col>
                {' '}
                <FormInputText
                  control={control}
                  label={i18next.t('label.WorkRequested')}
                  name="workrequested"
                  changeHandler={onChange}
                  errors={errors}
                  defaultValue={commonFailure.workrequested}
                ></FormInputText>
              </Col>
            </Row>
            <Row>
              <Col>
                <FormInputText
                  control={control}
                  label={i18next.t('label.Hours')}
                  name="hours"
                  errors={errors}
                  changeHandler={onChange}
                  defaultValue={commonFailure.hours}
                ></FormInputText>
              </Col>
              <Col>
                <Form.Group as={Col} className="mb-3" controlId="price">
                  <FormInputText
                    control={control}
                    label={i18next.t('label.Price')}
                    name="price"
                    errors={errors}
                    changeHandler={onChange}
                    defaultValue={commonFailure.price}
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
