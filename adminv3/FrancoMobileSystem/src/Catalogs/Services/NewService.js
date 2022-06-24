import React from 'react';
import PropTypes from 'prop-types';
import ServiceContextProvider from 'context/_ServiceContextProvider';
import WizardService from './WizardService';

const Wizard = () => {
  return (
    <ServiceContextProvider>
      <WizardService></WizardService>
    </ServiceContextProvider>
  );
};

Wizard.propTypes = {
  variant: PropTypes.oneOf(['pills']),
  validation: PropTypes.bool,
  progressBar: PropTypes.bool
};

export default Wizard;
