import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { ServiceContext } from './Context';

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
    setComments
  };
  return (
    <ServiceContext.Provider value={value}>{children}</ServiceContext.Provider>
  );
};

ServiceContextProvider.propTypes = {
  children: PropTypes.node.isRequired
};

export default ServiceContextProvider;
