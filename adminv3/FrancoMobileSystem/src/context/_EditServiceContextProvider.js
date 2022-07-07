import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { EditServiceContext } from './Context';
import AlertNotification from 'form-components/AlertNotification';

const EditServiceContextProvider = ({ children }) => {
  const [openAlert, setOpenAlert] = useState(false);
  const [typeAlert, setTypeAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState(false);

  const value = {
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
    <EditServiceContext.Provider value={value}>
      {children}
      {openAlert && (
        <AlertNotification
          open={openAlert}
          handleClose={handleCloseAlert}
          type={typeAlert}
          message={alertMessage}
        />
      )}
    </EditServiceContext.Provider>
  );
};

EditServiceContextProvider.propTypes = {
  children: PropTypes.node.isRequired
};

export default EditServiceContextProvider;
