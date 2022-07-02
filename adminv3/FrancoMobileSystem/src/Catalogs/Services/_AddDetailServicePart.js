import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
import i18next from 'i18next';
import { ApiEndpoint } from 'utils/ApiEndPont';
import { Button, Card, Col, Form, Row } from 'react-bootstrap';
import { FormInputText } from 'form-components/FormInputText';

const URI = ApiEndpoint + 'scategories/';
const URIFailures = ApiEndpoint + 'failures/';

export default function AddServiceParts({
  closeModal,
  failureList,
  setOpenAlert,
  setTypeAlert,
  setAlertMessage,
  idService,
  idVehicle
}) {
  const [selectedPartStr, setSelectedPartStr] = useState('');
  const [partsList, setPartsList] = useState([]);
  const [warehouseList, setWarehouseList] = useState([]);
  const [employeeList, setEmployeeList] = useState([]);
  const [idWarehouse, setIdWarehouse] = useState(0);
  const [idEmployee, setIdEmployee] = useState(0);
  const [idLocation, setIdLocation] = useState(0);
  const [chargetoCustomer, setChargetoCustomer] = useState(0);
  const [idPart, setIdPart] = useState(0);
  const [open, setOpen] = useState(false);
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
      idWarehouse: '',
      idEmployee: '',
      idPart: '',
      price: '0',
      serialnumber: '',
      quantity: '',
      chargetoCustomer: ''
    }
  });
  const [values, setValues] = useState({
    idWarehouse: '',
    idEmployee: '',
    idPart: '',
    price: '0',
    serialnumber: '',
    quantity: '',
    chargetoCustomer: ''
  });
  const [partService, setPartService] = useState(values);

  useEffect(() => {
    const uriParts = ApiEndpoint + 'parts/';
    axios(uriParts).then(({ data }) => {
      const partList = data.map(parts => {
        return {
          value: `${parts.idparts}`,
          label: `${parts.partcode}-${parts.description}`
        };
      });
      setPartsList(partList);
    });
  }, []); // empty array makes hook working once

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
    const uriParts = ApiEndpoint + 'services/parts/' + idService;
    console.log('partService');
    console.log({
      idservice: idService,
      idwarehouse: idWarehouse,
      idemployee: idEmployee,
      idpart: idPart,
      price: partService.price,
      serialnumber: partService.serial,
      quantity: partService.quantity,
      chargetocustomer: chargetoCustomer,
      idvehicle: idVehicle
    });
    axios
      .post(uriParts, {
        idservice: idService,
        idwarehouse: idWarehouse,
        idemployee: idEmployee,
        idpart: idPart,
        price: partService.price,
        serialnumber: partService.serial,
        quantity: partService.quantity,
        chargetocustomer: chargetoCustomer,
        idvehicle: idVehicle
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
  };

  const onChange = event => {
    const { name, value } = event.target;
    setPartService({ ...partService, [name]: value });
  };

  const onChangePart = value => {
    console.log(value);
    setPartService({ ...partService, ['idPart']: value });
    setIdPart(value);
    const uriParts = ApiEndpoint + 'parts/' + value;
    console.log(uriParts);
    axios(uriParts).then(({ data }) => {
      console.log(data);
      setPartService({ ...partService, ['price']: data.price });
      setPartService({ ...partService, ['serial']: data.serial });
    });
  };

  const onChangeIsVisible = event => {
    setChargetoCustomer(!chargetoCustomer);
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
            {' '}
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
                <Form.Group className="mb-3" controlId="warehouse">
                  <Form.Label>{i18next.t('label.Warehouse')}</Form.Label>
                  <Form.Select
                    aria-label="Default select"
                    name="warehouse"
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
                <Form.Group className="mb-3" controlId="idPart">
                  <Form.Label>{i18next.t('label.Part')}</Form.Label>
                  <Form.Select
                    aria-label="Default select"
                    name="idPart"
                    style={{ minWidth: '250px' }}
                    onChange={selectedOption => {
                      onChangePart(`${selectedOption.target.value}`);
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
                    defaultValue={partService.quantity}
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
                    defaultValue={partService.price}
                  ></FormInputText>
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col>
                <Form.Group className="mb-3" controlId="serial">
                  <FormInputText
                    label={i18next.t('label.Serial')}
                    changeHandler={onChange}
                    name={'serial'}
                    control={control}
                    defaultValue={partService.serial}
                  ></FormInputText>
                </Form.Group>
              </Col>
              <Col>
                <Form.Check
                  type="switch"
                  id="isVisible"
                  label={i18next.t('label.VisibleToCustomer')}
                  value={chargetoCustomer}
                  onChange={onChangeIsVisible}
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
