import axios from 'axios';
import FalconComponentCard from 'components/common/FalconComponentCard';
import PageHeader from 'components/common/PageHeader';
import i18next from 'i18next';
import React, { useEffect, useState } from 'react';
import { Col, Row } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';
import MyModal from 'shared/Modal';
import { ApiEndpoint } from 'utils/ApiEndPont';
import AddServiceFile from './_AddServiceFile';
import ServiceDetailsList from './_ServiceDetailsList';
import ServiceFailureList from './_ServiceFailureList';
import ServiceFilesList from './_ServiceFilesList';

const DetailService = () => {
  const [service, setService] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [idService, setIdService] = useState(null);

  let { id } = useParams();
  const URI = ApiEndpoint + 'services/' + id;
  const handleClose = () => {
    setOpenModal(false);
    getService();
  };

  //mostrar companies

  useEffect(() => {
    getService();
  }, []);

  const getService = () => {
    axios.get(URI).then(response => {
      let serviceNew = response.data[0];
      console.log(serviceNew);
      setIdService(serviceNew.idservice);
      setService(serviceNew);
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
        <p className="fs--1 mt-1">{service.customer?.shortname}</p>
        <div>
          <strong className="me-2">{i18next.t('label.Vehicle')} </strong>
          <p className="fs--1 mt-1">{service.vehicle?.vin}</p>
        </div>
        <div>
          <strong className="me-2">{i18next.t('label.Location')} </strong>
          <p className="fs--1 mt-1">{service.location?.locationName}</p>
        </div>
      </PageHeader>
      <Row className="g-3 mb-3">
        <Col lg={8}>
          <FalconComponentCard
            noGuttersBottom
            style={{ minHeight: 500, maxHeight: 500, overflow: 'auto' }}
          >
            <FalconComponentCard.Body
              children={
                idService && <ServiceFailureList idService={idService} />
              }
            />
          </FalconComponentCard>
        </Col>
        <Col lg={4}>
          <FalconComponentCard
            noGuttersBottom
            style={{ minHeight: 500, maxHeight: 500, overflow: 'auto' }}
          >
            <FalconComponentCard.Body
              children={
                idService && <ServiceDetailsList idService={idService} />
              }
            />
          </FalconComponentCard>
        </Col>
      </Row>
      <Row>
        <Col lg={12}>
          <FalconComponentCard
            noGuttersBottom
            style={{ minHeight: 500, maxHeight: 500, overflow: 'auto' }}
          >
            {idService && (
              <ServiceFilesList serviceGuid={id} idService={idService} />
            )}
          </FalconComponentCard>
        </Col>
      </Row>
    </>
  );
};

export default DetailService;
