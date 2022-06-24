import axios from 'axios';
import GenericTableHeader from 'form-components/TableHeaders/GenericTableHeader';
import i18next from 'i18next';
import React, { useEffect, useState } from 'react';
import { Card } from 'react-bootstrap';
import { ApiEndpoint } from 'utils/ApiEndPont';

const ServiceDetailsList = ({ idService }) => {
  const [detailList, setDetailList] = useState([]);
  const URI = ApiEndpoint + 'services/details/';
  useEffect(() => {
    getServiceDetails();
  }, []);

  const getServiceDetails = () => {
    console.log(URI + idService);
    axios.get(URI + idService).then(response => {
      let details = response.data;
      console.log(details);
      setDetailList(details);
      // setIdsymptomcategory(response.data.idsymptomcategory);
    });
  };

  return (
    <>
      <Card className="mb-3">
        <Card.Header>
          <GenericTableHeader
            label={i18next.t('label.Details')}
            newFunction={() => {}}
          />
        </Card.Header>
        <Card.Body className="p-0">
          <ul class="list-group">
            {detailList.map((detail, index) => (
              <li
                class="list-group-item d-flex justify-content-between align-items-center"
                key={detail.idservicedetail}
              >
                {detail.detail}
              </li>
            ))}{' '}
          </ul>
        </Card.Body>
      </Card>
    </>
  );
};

export default ServiceDetailsList;
