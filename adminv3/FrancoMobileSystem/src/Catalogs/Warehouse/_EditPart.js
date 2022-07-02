import axios from 'axios';
import { FormInputText } from 'form-components/FormInputText';
import i18next from 'i18next';
import React, { useEffect, useState } from 'react';
import { Button, Card, Col, Form, Row } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { ApiEndpoint } from 'utils/ApiEndPont';
const URI = ApiEndpoint + 'parts/';
export default function EditPart({
  idPart,
  closeModal,
  setOpenAlert,
  setTypeAlert,
  setAlertMessage
}) {
  const [validated, setValidated] = useState(false);
  const [warehouseList, setWarehouseList] = useState([]);
  const [partsCategoriesList, setPartsCategoriesList] = useState([]);
  const [idWarehouse, setIdWarehouse] = useState(0);
  const [idPartCategory, setIdPartCategory] = useState(0);

  const [isTire, setIsTire] = useState(false);
  const [isTaxable, setIsTaxable] = useState(false);
  const [isNewPart, setIsNewPart] = useState(false);
  const [isRebuild, setIsRebuild] = useState(false);
  const {
    control,
    handleSubmit,
    formState: { errors }
  } = useForm({
    mode: 'onBlur',
    defaultValues: {
      partnumber: '',
      partcode: '',
      description: '',
      size: '',
      manufacturer: '',
      idpartcategory: '',
      idwarehouse: '',
      comments: '',
      istire: 'false',
      istaxable: 'true',
      isnewpart: 'true',
      isrebuild: 'true',
      lastcost: '0',
      price: '0',
      reorderpoint: '0'
    }
  });
  const [values, setValues] = useState({
    partnumber: '',
    partcode: '',
    description: '',
    size: '',
    manufacturer: '',
    idpartcategory: '',
    idwarehouse: '',
    comments: '',
    istire: 'false',
    istaxable: 'true',
    isnewpart: 'true',
    isrebuild: 'true',
    lastcost: '0',
    price: '0',
    reorderpoint: '0'
  });
  const [part, setPart] = useState(values);

  useEffect(() => {
    axios.get(URI + idPart).then(response => {
      console.log('editPart');
      console.log(URI + idPart);
      console.log(response.data);
      setPart(response.data);
      setIsNewPart(response.data.isnewpart);
      setIsTaxable(response.data.istaxable);
      setIsTire(response.data.istire);
      setIsRebuild(response.data.isrebuild);
    });
  }, []);

  useEffect(() => {
    const uriWarehouse = ApiEndpoint + 'warehouse/';
    axios(uriWarehouse).then(({ data }) => {
      const warehouseList = data.map(warehouse => {
        return {
          value: `${warehouse.idwarehouse}`,
          label: `${warehouse.warehousename}`
        };
      });
      setWarehouseList(warehouseList);
    });
  }, []); // empty array makes hook working once

  useEffect(() => {
    const uriPartCategories = ApiEndpoint + 'partscategories/';
    axios(uriPartCategories).then(({ data }) => {
      const partsCatList = data.map(category => {
        return {
          value: `${category.idpartscategory}`,
          label: `${category.category}`
        };
      });
      setPartsCategoriesList(partsCatList);
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
    console.log(part);
    const URIInsert = ApiEndpoint + 'parts/';
    if (idPart > 0) {
      axios
        .put(URIInsert + idPart, {
          idparts: idPart,
          partnumber: part.partnumber,
          partcode: part.partcode,
          description: part.description,
          size: part.size,
          manufacturer: part.manufacturer,
          idpartcategory: idPartCategory,
          idwarehouse: idWarehouse,
          comments: part.comments,
          istire: isTire,
          istaxable: isTaxable,
          isnewpart: isNewPart,
          isrebuild: isRebuild,
          lastcost: part.lastcost,
          price: part.price,
          reorderpoint: part.reorderpoint
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
        .post(URIInsert, {
          idparts: idPart,
          partnumber: part.partnumber,
          partcode: part.partcode,
          description: part.description,
          size: part.size,
          manufacturer: part.manufacturer,
          idpartcategory: idPartCategory,
          idwarehouse: idWarehouse,
          comments: part.comments,
          istire: isTire,
          istaxable: isTaxable,
          isnewpart: isNewPart,
          isrebuild: isRebuild,
          lastcost: part.lastcost,
          price: part.price,
          reorderpoint: part.reorderpoint
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
    setPart({ ...part, [name]: value });
  };
  const onChangeIsTire = event => {
    setIsTire(!isTire);
  };
  const onChangeIsNewPart = event => {
    setIsNewPart(!isNewPart);
  };
  const onChangeIsTaxable = event => {
    setIsTaxable(!isTaxable);
  };
  const onChangeIsRebuild = event => {
    setIsRebuild(!isRebuild);
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
                <Form.Group className="mb-3" controlId="warehouse">
                  <Form.Label>{i18next.t('label.Warehouse')}</Form.Label>
                  <Form.Select
                    aria-label="Default select"
                    name="warehouse"
                    value={idWarehouse}
                    style={{ minWidth: '250px' }}
                    onChange={selectedOption => {
                      setIdWarehouse(`${selectedOption.target.value}`);
                      console.log(`${selectedOption.target.value}`);
                      onChange(selectedOption);
                    }}
                  >
                    <option key={'location_0'} value={0}>
                      {i18next.t('label.SelectSomeValue')}
                    </option>
                    {!!warehouseList?.length &&
                      warehouseList.map(warehouse => (
                        <option key={warehouse.value} value={warehouse.value}>
                          {warehouse.label}
                        </option>
                      ))}
                  </Form.Select>
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col>
                <Form.Group className="mb-3" controlId="idpartcategory">
                  <Form.Label>{i18next.t('label.Category')}</Form.Label>
                  <Form.Select
                    aria-label="Default select"
                    name="idpartcategory"
                    value={idPartCategory}
                    style={{ minWidth: '250px' }}
                    onChange={selectedOption => {
                      setIdPartCategory(`${selectedOption.target.value}`);
                      console.log(`${selectedOption.target.value}`);
                      onChange(selectedOption);
                    }}
                  >
                    <option key={'location_0'} value={0}>
                      {i18next.t('label.SelectSomeValue')}
                    </option>
                    {!!partsCategoriesList?.length &&
                      partsCategoriesList.map(category => (
                        <option key={category.value} value={category.value}>
                          {category.label}
                        </option>
                      ))}
                  </Form.Select>
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col>
                <Form.Group className="mb-3" controlId="partnumber">
                  <FormInputText
                    label={i18next.t('label.PartNumber')}
                    changeHandler={onChange}
                    name={'partnumber'}
                    control={control}
                    defaultValue={part.partnumber}
                  ></FormInputText>
                </Form.Group>
              </Col>
              <Col>
                <Form.Group className="mb-3" controlId="partcode">
                  <FormInputText
                    label={i18next.t('label.PartCode')}
                    changeHandler={onChange}
                    name={'partcode'}
                    control={control}
                    defaultValue={part.partcode}
                  ></FormInputText>
                </Form.Group>
              </Col>
            </Row>{' '}
            <Row>
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
              <Col>
                <Form.Group className="mb-3" controlId="lastcost">
                  <FormInputText
                    label={i18next.t('label.LastCost')}
                    changeHandler={onChange}
                    name={'lastcost'}
                    control={control}
                    defaultValue={part.lastcost}
                  ></FormInputText>
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col>
                <Form.Group className="mb-3" controlId="description">
                  <FormInputText
                    label={i18next.t('label.Description')}
                    changeHandler={onChange}
                    name={'description'}
                    control={control}
                    defaultValue={part.description}
                  ></FormInputText>
                </Form.Group>
              </Col>
            </Row>{' '}
            <Row>
              <Col>
                <Form.Group className="mb-3" controlId="size">
                  <FormInputText
                    label={i18next.t('label.Size')}
                    changeHandler={onChange}
                    name={'size'}
                    control={control}
                    defaultValue={part.size}
                  ></FormInputText>
                </Form.Group>
              </Col>{' '}
              <Col>
                <Form.Group className="mb-3" controlId="manufacturer">
                  <FormInputText
                    label={i18next.t('label.Manufacturer')}
                    changeHandler={onChange}
                    name={'manufacturer'}
                    control={control}
                    defaultValue={part.manufacturer}
                  ></FormInputText>
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col>
                <Form.Group className="mb-3" controlId="istire">
                  <Form.Check
                    type="switch"
                    id="istire"
                    label={i18next.t('label.IsTire')}
                    value={isTire}
                    onChange={onChangeIsTire}
                  />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group className="mb-3" controlId="isnewpart">
                  <Form.Check
                    type="switch"
                    id="isnewpart"
                    label={i18next.t('label.IsNew')}
                    value={isNewPart}
                    onChange={onChangeIsNewPart}
                  />
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col>
                <Form.Group className="mb-3" controlId="istaxable">
                  <Form.Check
                    type="switch"
                    id="istaxable"
                    label={i18next.t('label.IsTaxable')}
                    value={isTaxable}
                    onChange={onChangeIsTaxable}
                  />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group className="mb-3" controlId="isrebuild">
                  <Form.Check
                    type="switch"
                    id="isrebuild"
                    label={i18next.t('label.IsRebuild')}
                    value={isRebuild}
                    onChange={onChangeIsRebuild}
                  />
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col>
                <Form.Group className="mb-3" controlId="comments">
                  <FormInputText
                    label={i18next.t('label.Comments')}
                    changeHandler={onChange}
                    name={'comments'}
                    control={control}
                    defaultValue={part.comments}
                  ></FormInputText>
                </Form.Group>
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
    </>
  );
}
