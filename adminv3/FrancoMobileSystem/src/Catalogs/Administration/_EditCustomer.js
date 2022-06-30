import { useEffect, useState, useMemo } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { Button, Card, Col, Form, Row } from 'react-bootstrap';
import FormAutoCompleteText from 'form-components/FormAutoCompleteText_V2';
import { AsyncTypeahead } from 'react-bootstrap-typeahead';
import { Controller } from 'react-hook-form';
import { FormInputText } from 'form-components/FormInputText';
import i18next from 'i18next';
import AlertNotification from 'form-components/AlertNotification';
import { ApiEndpoint } from 'utils/ApiEndPont';

const URI = ApiEndpoint + 'customers/';
const URIZipCodesFilter = ApiEndpoint + 'zipcodessearch/';

export default function EditCustomer({
  idCustomer,
  closeModal,
  idsymptomcategorydefault
}) {
  const [alertMessage, setAlertMessage] = useState('');
  const [openAlert, setOpenAlert] = useState(false);
  const [typeAlert, setTypeAlert] = useState('success');

  const [options, setOptions] = useState([]);
  const [open, setOpen] = useState(false);
  const [filterStr, setFilterStr] = useState('');
  const [email, setEmail] = useState('');
  const [selectedZipCode, setSelectedZipCode] = useState('');
  const [values, setValues] = useState({
    shortname: '',
    company: '',
    firstname: '',
    lastname: '',
    address: '',
    zipcode: '',
    city: '',
    state: '',
    phone: '',
    mobilephone: '',
    email: ''
  });
  const [loading, setLoading] = useState(false);
  const [validated, setValidated] = useState(false);
  // const [categoriesFailure] = useSymptomsCategory ();
  const {
    register,
    handleSubmit,
    setValue,
    control,
    formState: { errors }
  } = useForm({
    mode: 'onBlur',
    defaultValues: {
      shortname: '',
      company: '',
      firstname: '',
      lastname: '',
      address: '',
      zipcode: '',
      city: '',
      state: '',
      phone: '',
      mobilephone: '',
      email: ''
    }
  });
  const [customer, setCustomer] = useState(values);

  useEffect(() => {
    if (idCustomer > 0) {
      axios.get(URI + idCustomer).then(response => {
        setCustomer(response.data);
        console.log('response.data');
        console.log(response.data);
        const zipsList = [];
        zipsList.push({
          value: `${response.data['zipcode']}`,
          name: response.data['zipcode']
        });
        setOptions(zipsList);
        console.log(zipsList);
        console.log(response.data['zipcode']);
        setSelectedZipCode(`${response.data['zipcode']}`);
      });
    } else {
      setOptions([]);
      setSelectedZipCode('');
    }
  }, []);

  useEffect(() => {
    let active = true;

    console.log('loading   ' + loading);
    if (!loading) {
      return undefined;
    }

    (async () => {
      axios(URIZipCodesFilter + filterStr).then(({ data }) => {
        var zips = data.rows;
        if (active) {
          const zipsList = zips.map(key => {
            return { value: `${key.zip}`, name: key.zip };
          });
          setOptions(zipsList);
        }
      });
    })();
    return () => {
      active = false;
    };
  }, [loading]);

  useEffect(() => {
    if (!open) {
      setOptions([]);
    }
  }, [open]);

  useEffect(() => {
    if (filterStr.length > 1) {
      setOpen(true);
      setLoading(true);
    }
  }, [filterStr]);

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
    if (idCustomer > 0) {
      const URI = ApiEndpoint + 'customers/' + idCustomer;
      axios
        .put(URI, {
          idCustomer: idCustomer,
          shortname: customer.shortname,
          company: customer.company,
          firstname: customer.firstname,
          lastname: customer.lastname,
          address: customer.address,
          zipcode: customer.zipcode,
          city: customer.city,
          state: customer.state,
          phone: customer.phone,
          mobilephone: customer.mobilephone,
          email: customer.email
        })
        .then(function (response) {
          console.log(response);
          closeModal();
        })
        .catch(function (error) {
          console.log(error);
        });
    } else {
      const URI = ApiEndpoint + 'customers/';
      axios
        .post(URI, {
          idCustomer: idCustomer,
          shortname: customer.shortname,
          company: customer.company,
          firstname: customer.firstname,
          lastname: customer.lastname,
          address: customer.address,
          zipcode: customer.zipcode,
          city: customer.city,
          state: customer.state,
          phone: customer.phone,
          mobilephone: customer.mobilephone,
          email: customer.email
        })
        .then(function (response) {
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
    setCustomer({ ...customer, [name]: value });
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
            <Form.Group className="mb-3" controlId="shortname">
              <FormInputText
                label={i18next.t('label.Name')}
                changeHandler={onChange}
                name={'shortname'}
                control={control}
                defaultValue={customer.shortname}
              ></FormInputText>
            </Form.Group>
            <Form.Group className="mb-3" controlId="company">
              <FormInputText
                label={i18next.t('label.Company')}
                changeHandler={onChange}
                name={'company'}
                control={control}
                defaultValue={customer.company}
              ></FormInputText>
            </Form.Group>
            <Row className="mb-3">
              <Form.Group as={Col} className="mb-3" controlId="firstname">
                <FormInputText
                  label={i18next.t('label.ContactName')}
                  changeHandler={onChange}
                  name={'firstname'}
                  control={control}
                  defaultValue={customer.firstname}
                ></FormInputText>
              </Form.Group>
              <Form.Group as={Col} className="mb-3" controlId="lastname">
                <FormInputText
                  label={i18next.t('label.Lastname')}
                  changeHandler={onChange}
                  name={'lastname'}
                  control={control}
                  defaultValue={customer.lastname}
                ></FormInputText>
              </Form.Group>
            </Row>

            <Form.Group className="mb-3" controlId="address">
              <FormInputText
                label={i18next.t('label.Address')}
                changeHandler={onChange}
                name={'address'}
                control={control}
                defaultValue={customer.address}
              ></FormInputText>
            </Form.Group>
            <Row className="mb-3">
              <Form.Group as={Col} className="mb-3" controlId="zipcode">
                <FormInputText
                  label={i18next.t('label.ZipCode')}
                  changeHandler={onChange}
                  name={'zipcode'}
                  control={control}
                  defaultValue={customer.zipcode}
                ></FormInputText>
                {/* <FormAutoCompleteText
                  control={control}
                  setSelected={setSelectedZipCode}
                  defaultValue={selectedZipCode}
                  label={'zipcode'}
                  name={'zipcode'}
                  setFilter={data => {
                    setFilterStr(data);
                  }}
                  setLoading={setLoading}
                  loading={loading}
                  open={open}
                  setOpen={setOpen}
                  options={options}
                ></FormAutoCompleteText> */}
                {/* <AsyncTypeahead
                  filterBy={() => true}
                  id="async-example"
                  isLoading={loading}
                  labelKey="login"
                  minLength={3}
                  onSearch={data => {
                    setFilterStr(data);
                  }}
                  options={options}
                  placeholder="Search for a Github user..."
                  renderMenuItemChildren={option => <></>}
                /> */}
              </Form.Group>
              <Form.Group as={Col} className="mb-3" controlId="city">
                <FormInputText
                  label={i18next.t('label.City')}
                  changeHandler={onChange}
                  name={'city'}
                  control={control}
                  defaultValue={customer.city}
                ></FormInputText>
              </Form.Group>
            </Row>
            <Row className="mb-3">
              <Form.Group as={Col} className="mb-3" controlId="state">
                <FormInputText
                  label={i18next.t('label.State')}
                  changeHandler={onChange}
                  name={'state'}
                  control={control}
                  defaultValue={customer.state}
                ></FormInputText>
              </Form.Group>
            </Row>
            <Row className="mb-3">
              <Form.Group as={Col} className="mb-3" controlId="phone">
                <FormInputText
                  label={i18next.t('label.Phone')}
                  changeHandler={onChange}
                  name={'phone'}
                  control={control}
                  defaultValue={customer.phone}
                ></FormInputText>
              </Form.Group>
              <Form.Group as={Col} className="mb-3" controlId="mobilephone">
                <FormInputText
                  label={i18next.t('label.Mobile')}
                  changeHandler={onChange}
                  name={'mobilephone'}
                  control={control}
                  defaultValue={customer.mobilephone}
                ></FormInputText>
              </Form.Group>
            </Row>

            <Form.Group className="mb-3" controlId="email">
              <FormInputText
                label={i18next.t('label.Email')}
                changeHandler={onChange}
                name={'email'}
                control={control}
                type={'email'}
                defaultValue={customer.email}
              ></FormInputText>
            </Form.Group>
            <Button type="submit" color="primary" size="sm">
              {i18next.t('label.Save')}
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </>
  );
}
