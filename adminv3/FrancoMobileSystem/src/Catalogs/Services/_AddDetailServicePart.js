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

export default function EditServiceParts({
  action,
  closeModal,
  idsymptomcategorydefault,
  failureList,
  setOpenAlert,
  setTypeAlert,
  setAlertMessage
}) {
  const [selectedPartStr, setSelectedPartStr] = useState('');
  const [partsList, setPartsList] = useState([]);
  const [warehouseList, setWarehouseList] = useState([]);
  const [employeeList, setEmployeeList] = useState([]);
  const [idWarehouse, setIdWarehouse] = useState(0);
  const [idEmployee, setIdEmployee] = useState(0);
  const [chargetoCustomer, setChargetoCustomer] = useState(0);
  const [idPart, setIdPart] = useState(0);
  const [open, setOpen] = useState(false);
  const [validated, setValidated] = useState(false);
  const [part, setPart] = useState([]);

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
    e.preventDefault();
    console.log(data);
    if (data.idcommonfailures > 0) {
      let newData = data;
      newData.rowId = uuidv4();
      failureList.push(newData);
      setSelectedPartStr('');
      reset();

      setAlertMessage(i18next.t('SuccessfulRecord'));
      setTypeAlert('success');
      setOpenAlert(true);
    } else {
      setAlertMessage(i18next.t('label.ErrorSelectValid'));
      setTypeAlert('warning');
      setOpenAlert(true);
    }
    //action(newData);
  };

  const onChange = event => {
    const { name, value } = event.target;
    setPart({ ...part, [name]: value });
  };
  return (
    <div>
      <Card variant="elevation">
        <Card.Body>
          <Form
            noValidate
            validated={validated}
            onSubmit={handleSubmit(onSubmit)}
          > <Row>
          <Col>
            <Form.Group className="mb-3" controlId="companyName">
              <Form.Select
                aria-label="Default select"
                name="patio"
                style={{ minWidth: '250px' }}
                onChange={selectedOption => {
                  setIdWarehouse(`${selectedOption.target.value}`);
                  console.log(`${selectedOption.target.value}`);
                  //onChange(selectedOption);
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
                  <Form.Select
                    aria-label="Default select"
                    name="warehouse"
                    style={{ minWidth: '250px' }}
                    onChange={selectedOption => {
                      setIdWarehouse(`${selectedOption.target.value}`);
                      console.log(`${selectedOption.target.value}`);
                      //onChange(selectedOption);
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
                <Form.Group className="mb-3" controlId="patio">
                  <Form.Select
                    aria-label="Default select"
                    name="patio"
                    style={{ minWidth: '250px' }}
                    onChange={selectedOption => {
                      setIdWarehouse(`${selectedOption.target.value}`);
                      console.log(`${selectedOption.target.value}`);
                      //onChange(selectedOption);
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
                <Form.Group className="mb-3" controlId="companyName">
                  <Form.Select
                    aria-label="Default select"
                    name="patio"
                    style={{ minWidth: '250px' }}
                    onChange={selectedOption => {
                      setIdWarehouse(`${selectedOption.target.value}`);
                      console.log(`${selectedOption.target.value}`);
                      //onChange(selectedOption);
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
                <Form.Group className="mb-3" controlId="price">
                  <FormInputText
                    label={i18next.t('label.Price')}
                    changeHandler={onChange}
                    name={'price'}
                    control={control}
                    defaultValue={part.companyName}
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
                    defaultValue={part.serial}
                  ></FormInputText>
                </Form.Group>
              </Col>
            </Row>
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
            </Row>
            <Button variant="contained" color="secondary" onClick={closeModal}>
              {i18next.t('label.Cancel')}
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </div>
  );
}
