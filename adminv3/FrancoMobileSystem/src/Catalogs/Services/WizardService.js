import React, { useContext, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import i18next from 'i18next';
import queryString from 'query-string';
import AppContext, { AuthWizardContext, ServiceContext } from 'context/Context';
import { useForm } from 'react-hook-form';
import { Button, Card, Form, Nav, ProgressBar } from 'react-bootstrap';
import classNames from 'classnames';
import IconButton from 'components/common/IconButton';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import EditCustomerService from './_EditCustomerService';
import ServiceContextProvider from 'context/_ServiceContextProvider';
import EditVehicleService from './_EditVehicleService';
import EditFailuresService from './_EditFailuresService';
import EditDetailsService from './_EditDetailsService';
import EditGeneralInfoService from './_EditGeneralService';
import axios from 'axios';
import { ApiEndpoint } from 'utils/ApiEndPont';
import { useNavigate } from 'react-router-dom';

const navItems = [
  {
    icon: 'lock',
    label: 'Customer'
  },
  {
    icon: 'user',
    label: 'Vehicle'
  },
  {
    icon: 'dollar-sign',
    label: 'Fallas'
  },
  {
    icon: 'thumbs-up',
    label: 'Detalles'
  },
  {
    icon: 'thumbs-up',
    label: 'General'
  },
  {
    icon: 'thumbs-up',
    label: 'Concluir'
  }
];

function WizardService() {
  const location = useLocation();
  let currentId = queryString.parse(location.search);
  const [completed, setCompleted] = useState({});
  const [values, setValues] = useState({});
  const [openAlert, setOpenAlert] = useState(false);
  const [typeAlert, setTypeAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState(false);

  const [validated, setValidated] = useState(false);
  const { isRTL } = useContext(AppContext);
  const {
    step,
    setStep,
    serviceId,
    setServiceId,
    customerId,
    setCustomerId,
    vehicleId,
    setVehicleId,
    failuresList,
    setFailuresList,
    detailList,
    setDetailList,
    locationId,
    setLocationId,
    recibe,
    setRecibe,
    comments,
    setComments
  } = useContext(ServiceContext);
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
    reset,
    clearErrors
  } = useForm();

  const [modal, setModal] = useState(false);
  let navigate = useNavigate();

  useEffect(() => {
    setServiceId(`${currentId.id}`);
    //localStorage.setItem(currentId.id, '')
    const data = localStorage.getItem(`${currentId.id}`);

    console.log(data);
    console.log('Data');
    if (data != null) {
      setValues(JSON.parse(data) || {});
      let newIdCustomer = JSON.parse(data).idCustomer;
      let newIdVehicle = JSON.parse(data).idVehicle;
      setCustomerId(newIdCustomer || 0);
      setVehicleId(newIdVehicle || 0);

      const newFailureList = JSON.parse(data).FailureList;
      if (newFailureList != null) {
        setFailuresList(newFailureList);
      }
      const newDetailList = JSON.parse(data).DetailList;
      if (newDetailList != null) {
        setDetailList(newDetailList);
      }
    }
  }, []); // empty array makes hook working once

  const onSubmitData = data => {
    setStep(step + 1);
  };
  const onError = () => {
    clearErrors();
    setStep(step + 1);
  };

  const toggle = () => setModal(!modal);

  const handleNavs = targetStep => {
    if (step !== 6) {
      if (targetStep < step) {
        setStep(targetStep);
      } else {
        handleSubmit(onSubmitData, onError)();
      }
    } else {
      toggle();
    }
  };

  const onSubmit = () => {
    //const data = localStorage.getItem(`${currentId.id}`)

    const dataToSubmit = {
      idCustomer: customerId,
      idVehicle: vehicleId,
      idLocation: locationId,
      comments: comments,
      recibe: recibe,
      DetailList: detailList,
      FailureList: failuresList
    };
    const URI = ApiEndpoint + 'service/save/' + currentId.id;
    axios
      .post(URI, dataToSubmit)
      .then(function (response) {
        let path = `/ServiceDetail/` + currentId.id;
        navigate(path);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  return (
    <>
      {' '}
      <Card
        as={Form}
        onSubmit={handleSubmit(onSubmitData, onError)}
        className="theme-wizard mb-5"
      >
        <Card.Header className={classNames('bg-light', 'pb-2')}>
          <Nav className="justify-content-center" variant={'validation'}>
            {navItems.map((item, index) => (
              <NavItem
                key={item.label}
                index={index + 1}
                step={step}
                handleNavs={handleNavs}
                icon={item.icon}
                label={item.label}
              />
            ))}
          </Nav>
        </Card.Header>
        {<ProgressBar now={step * 15} style={{ height: 2 }} />}
        <Card.Body className="fw-normal px-md-6 py-4">
          {step === 1 && (
            <EditCustomerService
              currentId={currentId.id}
              register={register}
              errors={errors}
            />
            //<AccountForm register={register} errors={errors} watch={watch} />
          )}
          {step === 2 && (
            <EditVehicleService
              action={setVehicleId}
              setOpenAlert={setOpenAlert}
              setTypeAlert={setTypeAlert}
              setAlertMessage={setAlertMessage}
            />
            // <PersonalForm
            //   register={register}
            //   errors={errors}
            //   setValue={setValue}
            // />
          )}
          {step === 3 && (
            <EditFailuresService />
            // <BillingForm
            //   register={register}
            //   errors={errors}
            //   setValue={setValue}
            // />
          )}
          {step === 4 && (
            <EditDetailsService />
            // <BillingForm
            //   register={register}
            //   errors={errors}
            //   setValue={setValue}
            // />
          )}
          {step === 5 && (
            <EditGeneralInfoService />
            // <BillingForm
            //   register={register}
            //   errors={errors}
            //   setValue={setValue}
            // />
          )}
          {
            step === 6 && (
              <>
                <Button onClick={onSubmit} variant="contained">
                  Guardar
                </Button>
              </>
            )
            //   <Success reset={reset}/>
          }
        </Card.Body>
        <Card.Footer
          className={classNames('px-md-6 bg-light', {
            'd-none': step === 6,
            ' d-flex': step < 6
          })}
        >
          <IconButton
            variant="link"
            icon={isRTL ? 'chevron-right' : 'chevron-left'}
            iconAlign="left"
            transform="down-1 shrink-4"
            className={classNames('px-0 fw-semi-bold', {
              'd-none': step === 1
            })}
            onClick={() => {
              setStep(step - 1);
            }}
          >
            Prev
          </IconButton>

          <IconButton
            variant="primary"
            className="ms-auto px-5"
            type="submit"
            icon={isRTL ? 'chevron-left' : 'chevron-right'}
            iconAlign="right"
            transform="down-1 shrink-4"
          >
            Next
          </IconButton>
        </Card.Footer>
      </Card>
    </>
  );
}
const NavItem = ({ index, step, handleNavs, icon, label }) => {
  return (
    <Nav.Item>
      <Nav.Link
        className={classNames('fw-semi-bold', {
          done: index < 6 ? step > index : step > 5,
          active: step === index
        })}
        onClick={() => handleNavs(index)}
      >
        <span className="nav-item-circle-parent">
          <span className="nav-item-circle">
            <FontAwesomeIcon icon={icon} />
          </span>
        </span>
        <span className="d-none d-md-block mt-1 fs--1">{label}</span>
      </Nav.Link>
    </Nav.Item>
  );
};
export default WizardService;
