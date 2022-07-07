import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { ServiceContext } from './Context';
import AlertNotification from 'form-components/AlertNotification';

const ServiceContextProvider = ({ children }) => {
  const [step, setStep] = useState(1);
  const [serviceId, setServiceId] = useState('');
  const [customerId, setCustomerId] = useState(null);
  const [vehicleId, setVehicleId] = useState(0);
  const [failuresList, setFailuresList] = useState([]);
  const [detailList, setDetailList] = useState([]);
  const [locationId, setLocationId] = useState(0);
  const [recibe, setRecibe] = useState('');
  const [comments, setComments] = useState('');
  const [openAlert, setOpenAlert] = useState(false);
  const [typeAlert, setTypeAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState(false);

  const value = {
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
    setComments,
    openAlert,
    setOpenAlert,
    typeAlert,
    setTypeAlert,
    alertMessage,
    setAlertMessage
  };
  const handleCloseAlert = () => {
    setOpenAlert(false);
  };
  return (
    <ServiceContext.Provider value={value}>{children}{openAlert && (
        <AlertNotification
          open={openAlert}
          handleClose={handleCloseAlert}
          type={typeAlert}
          message={alertMessage}
        />
      )}</ServiceContext.Provider>
  );
};

ServiceContextProvider.propTypes = {
  children: PropTypes.node.isRequired
};

export default ServiceContextProvider;
