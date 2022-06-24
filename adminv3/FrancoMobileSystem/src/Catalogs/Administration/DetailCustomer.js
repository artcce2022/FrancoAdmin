import React, { useEffect, useState } from 'react';
import PageHeader from 'components/common/PageHeader';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import SoftBadge from 'components/common/SoftBadge';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import i18next from 'i18next';
import CustomerContactsList from './CustomerContactsList';
import CustomerVehicleList from './CustomerVehicleList';
import { ApiEndpoint } from 'utils/ApiEndPont';

const DetailCustomer = () => {
  const [Customer, setCustomer] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [idCustomer, setIdCustomer] = useState(0);
  let { id } = useParams();
  const URI = ApiEndpoint + 'customers/';

  useEffect(() => {
    setIdCustomer(id);
  }, []);

  const handleClose = () => {
    setOpenModal(false);
    getCustomer();
  };

  //mostrar companies

  useEffect(() => {
    getCustomer();
  }, []);

  const getCustomer = async () => {
    axios.get(URI + id).then(response => {
      setCustomer(response.data);
      // setIdsymptomcategory(response.data.idsymptomcategory);
    });
  };
  return (
    <>
      <PageHeader title={Customer.company} titleTag="h5" className="mb-3">
        <p className="fs--1 mt-1">{Customer.shortname}</p>
        <div>
          <strong className="me-2">{i18next.t('label.Contact')} </strong>
          <p className="fs--1 mt-1">
            {Customer.firstname + ' ' + Customer.lastname}
          </p>
        </div>
        <div>
          <strong className="me-2">{i18next.t('label.Address')} </strong>
          <p className="fs--1 mt-1">{Customer.address}</p>
        </div>
      </PageHeader>
      <CustomerVehicleList />
      <CustomerContactsList />
    </>
  );
};

export default DetailCustomer;
