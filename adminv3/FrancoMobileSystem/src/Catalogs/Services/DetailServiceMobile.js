import axios from 'axios';
import FalconComponentCard from 'components/common/FalconComponentCard';
import PageHeader from 'components/common/PageHeader';
import i18next from 'i18next';
import React, { useEffect, useState } from 'react';
import { Button, Col, Row } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import { ApiEndpoint } from 'utils/ApiEndPont';
import ServiceDetailsList from './_ServiceDetailsList';
import ServiceFailureList from './_ServiceFailureList';
import ServiceFilesList from './_ServiceFilesList';
import ServicePartsList from './_ServicePartsList';

const DetailServiceMobile = () => {
  const [service, setService] = useState([]);
  const [idService, setIdService] = useState(null);
  const [idVehicle, setIdVehicle] = useState(null);
  let { id } = useParams();
  const URI = ApiEndpoint + 'services/' + id;

  useEffect(() => {
    getService();
  }, []);

  const getService = () => {
    axios.get(URI).then(response => {
      let serviceNew = response.data[0];
      setIdService(serviceNew.idservice);
      setService(serviceNew);
      setIdVehicle(serviceNew.idvehicle);
      // setIdsymptomcategory(response.data.idsymptomcategory);
    });
  };

  return (
    <>
      <PageHeader
        title={i18next.t('label.ServiceDetail')}
        titleTag="h5"
        className="mb-3"
      >
        <Row>
          <Col md>
            <p className="fs--1 mt-1">{service.customer?.shortname}</p>
            <div>
              <strong className="me-2">{i18next.t('label.Vehicle')} </strong>
              <p className="fs--1 mt-1">{service.vehicle?.vin}</p>
            </div>
            <div>
              <strong className="me-2">{i18next.t('label.Location')} </strong>
              <p className="fs--1 mt-1">{service.location?.locationName}</p>
            </div>
          </Col>{' '}
          <Col md></Col>
        </Row>
      </PageHeader>
      <Row className="g-3 mb-3">
        <Col lg={12}>
          <Button variant="primary">Add files</Button>
        </Col>
      </Row>
      <Row>
        <Col lg={12}>
          <Button variant="primary">Failures List</Button>
        </Col>
      </Row>
      <Row>
        <Col lg={12}>
          <Button variant="primary">Add Details</Button>
        </Col>
      </Row>
    </>
  );
};

export default DetailServiceMobile;
