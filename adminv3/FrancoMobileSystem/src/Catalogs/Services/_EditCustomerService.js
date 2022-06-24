import axios from 'axios';
import { ServiceContext } from 'context/Context';
import i18next from 'i18next';
import React, { useContext, useEffect, useState } from 'react';
import { Form, Row } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { ApiEndpoint } from 'utils/ApiEndPont';
import CustomerDetail from './_CustomerDetail';
function EditCustomerService({ currentId, register, errors }) {
  const [customers, setCustomers] = useState([]);
  let [refreshData, setRefreshData] = useState(false);
  const { serviceId, customerId, setCustomerId } = useContext(ServiceContext);

  useEffect(() => {
    setRefreshData(true);
    getCustomers();
    //localStorage.setItem(currentId.id, '')
    const data = localStorage.getItem(`${currentId}`);
    if (data != null) {
      setRefreshData(false);
      let newIdCustomer = `${JSON.parse(data).idCustomer}`;
      setCustomerId(parseInt(newIdCustomer) || 0);
      setRefreshData(true);
    }
  }, []);

  useEffect(() => {
    setRefreshData(true);
    setCustomerId(customerId);
  }, [customerId]);

  //mostrar customers
  const getCustomers = async () => {
    const URICustomers = ApiEndpoint + 'customers/';
    const res = await axios.get(URICustomers);
    setCustomers(res.data);
  };
  return (
    <>
      <Row>
        <Form.Group>
          <Form.Label>{i18next.t('label.Customer')}</Form.Label>
          <Form.Control
            as="select"
            aria-label="Default select"
            name="idCustomer"
            required
            placeholder="Select Customer"
            style={{ minWidth: '250px' }}
            isInvalid={errors['idCustomer']}
            isValid={Object.keys(errors).length > 0 && !errors['idCustomer']}
            {...register('idCustomer', {
              required: 'Customer is required',
              validate: value => value > 0 || 'Must Select'
            })}
            onChange={selectedOption => {
              setRefreshData(false);
              setCustomerId(selectedOption.target.value);
            }}
          >
            <option key={'location_0'} value={0}>
              {i18next.t('label.SelectSomeValue')}
            </option>
            {!!customers?.length &&
              customers.map(customer => (
                <option key={customer.idcustomer} value={customer.idcustomer}>
                  {customer.shortname}
                </option>
              ))}
          </Form.Control>
          <Form.Control.Feedback type="invalid">
            {errors['idCustomer']?.message}
          </Form.Control.Feedback>
        </Form.Group>
      </Row>
      <Row>{refreshData && <CustomerDetail></CustomerDetail>}</Row>
    </>
  );
}

export default EditCustomerService;
