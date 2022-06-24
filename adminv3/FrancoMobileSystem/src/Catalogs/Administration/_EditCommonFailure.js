import { useEffect, useState, useMemo } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { Button, Card, Col, Form, Row } from 'react-bootstrap';
import { ApiEndpoint } from 'utils/ApiEndPont';
import { FormInputText } from 'form-components/FormInputText';
import AlertNotification from 'form-components/AlertNotification.js';
import i18next from 'i18next';
import { FormInputDate } from 'form-components/FormInputDate';
import ReactDatePicker from 'react-datepicker';

const URI = ApiEndpoint + 'failures/';
const URICategories = ApiEndpoint + 'scategories/';

export default function EditCommonFailure({
  idCommonFailure,
  idsymptomcategorydefault,
  closeModal
}) {
  //const [commonFailure] =useCommonFailures({idCommonFailure});
  const [alertMessage, setAlertMessage] = useState('');
  const [openAlert, setOpenAlert] = useState(false);
  const [typeAlert, setTypeAlert] = useState('success');

  const {
    control,
    handleSubmit,
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
      idsymptomcategory: ''
    }
  });
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
    axios(URICategories).then(({ data }) => {
      const listCategories = data.map(category => {
        if (category.idsymptomcategory === idsymptomcategorydefault) {
          //   setValue("idsymptomcategory", { value: `${category.idsymptomcategory}`, label: category.category });
          setIdsymptomcategory({
            value: `${category.idsymptomcategory}`,
            label: category.category
          });
        }
        return {
          value: `${category.idsymptomcategory}`,
          label: category.category
        };
      });
      setcategoriesFailure(listCategories);
    });
  }, []); // empty array makes hook working once

  useEffect(() => {
    axios.get(URI + idCommonFailure).then(response => {
      setCommonFailure(response.data);
    });
  }, []); // empty array makes hook working once

  // const fields = ['warehousename', 'address',  'phone', 'manager'];
  // fields.forEach(field => setValue(field, warehouse[field]));

  const onSubmit = async data => {
    console.log(commonFailure);

    if (idCommonFailure > 0) {
      axios
        .put(URI + idCommonFailure, {
          idcommonfailures: idCommonFailure,
          shortdescription: commonFailure.shortdescription,
          symtomdescription: commonFailure.symtomdescription,
          workrequested: commonFailure.workrequested,
          hours: commonFailure.hours,
          price: commonFailure.price,
          idsymptomcategory: parseInt(idsymptomcategory)
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
          idsymptomcategory: parseInt(idsymptomcategory)
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
    console.log(event.target);
    const { name, value } = event.target;
    setCommonFailure({ ...commonFailure, [name]: value });
  };

  const handleCloseAlert = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenAlert(false);
  };
  return (
    <>
      <Card style={{ width: '100%' }}>
        <Card.Body>
          <Form onSubmit={handleSubmit(onSubmit)}>
            <FormInputText
              label={i18next.t('label.ShortDescription')}
              changeHandler={onChange}
              name={'shortdescription'}
              control={control}
              defaultValue={commonFailure.shortdescription}
            ></FormInputText>
            <FormInputText
              control={control}
              label={i18next.t('label.SymtomDescription')}
              name="symtomdescription"
              changeHandler={onChange}
              defaultValue={commonFailure.symtomdescription}
            ></FormInputText>
            <Form.Group as={Col} className="mb-3" controlId="workrequested">
              <FormInputText
                control={control}
                label={i18next.t('label.WorkRequested')}
                name="workrequested"
                changeHandler={onChange}
                defaultValue={commonFailure.workrequested}
              ></FormInputText>
            </Form.Group>
            <Form.Group as={Col} className="mb-3" controlId="hours">
              <FormInputText
                control={control}
                label={i18next.t('label.Hours')}
                name="hours"
                changeHandler={onChange}
                defaultValue={commonFailure.hours}
              ></FormInputText>
            </Form.Group>
            <Form.Group as={Col} className="mb-3" controlId="price">
              <FormInputText
                control={control}
                label={i18next.t('label.Price')}
                name="price"
                changeHandler={onChange}
                defaultValue={commonFailure.price}
              ></FormInputText>
            </Form.Group>
            <Form.Group as={Col} className="mb-3" controlId="category">
              <Form.Select aria-label={i18next.t('label.Categoria')}>
                {!!categoriesFailure?.length &&
                  categoriesFailure.map(({ label, value }) => (
                    <option key={value} value={value}>
                      {label}
                    </option>
                  ))}
              </Form.Select>
            </Form.Group>
            <Button
              type="submit"
              onClick={handleSubmit(onSubmit)}
              color="primary"
              size="sm"
            >
              {i18next.t('label.Save')}
            </Button>
          </Form>
        </Card.Body>
      </Card>
      {openAlert && (
        <AlertNotification
          open={openAlert}
          handleClose={handleCloseAlert}
          type={typeAlert}
          message={alertMessage}
        />
      )}
    </>
  );
}
