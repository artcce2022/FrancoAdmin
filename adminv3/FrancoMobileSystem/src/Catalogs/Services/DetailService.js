import axios from 'axios';
import ServiceOrder from 'Catalogs/Formatos/ServiceOrder';
import FalconComponentCard from 'components/common/FalconComponentCard';
import IconButton from 'components/common/IconButton';
import PageHeader from 'components/common/PageHeader';
import i18next from 'i18next';
import React, { useEffect, useState } from 'react';
import { Button, Col, Row } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import MyModal from 'shared/Modal';
import { ApiEndpoint } from 'utils/ApiEndPont';
import ServiceDetailsList from './_ServiceDetailsList';
import ServiceFailureList from './_ServiceFailureList';
import ServiceFilesList from './_ServiceFilesList';
import ServicePartsList from './_ServicePartsList';

const DetailService = () => {
  const [service, setService] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [idService, setIdService] = useState(null);
  const [idVehicle, setIdVehicle] = useState(null);

  const [openModalOrder, setOpenModalOrder] = useState(false);
  let { id } = useParams();
  const URI = ApiEndpoint + 'services/' + id;
  const handleClose = () => {
    setOpenModal(false);
    setOpenModalOrder(false);
    getService();
  };

  //mostrar companies

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
          <Col xs="auto">
            <IconButton
              variant="falcon-default"
              size="sm"
              icon="arrow-down"
              className="me-1 mb-2 mb-sm-0"
              iconClassName="me-1"
              onClick={() => {
                setOpenModalOrder(true);
              }}
            >
              Cotizacion
            </IconButton>
            <IconButton
              variant="falcon-default"
              size="sm"
              icon="print"
              iconClassName="me-1"
              className="me-1 mb-2 mb-sm-0"
            >
              Invoice
            </IconButton>
          </Col>
        </Row>
      </PageHeader>
      <Row className="g-3 mb-3">
        <Col lg={12}>
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
      </Row>
      <Row>
        <Col lg={12}>
          <FalconComponentCard
            noGuttersBottom
            style={{ minHeight: 500, maxHeight: 500, overflow: 'auto' }}
          >
            <FalconComponentCard.Body
              children={
                idService && (
                  <ServicePartsList
                    serviceGuid={id}
                    idService={idService}
                    idVehicle={idVehicle}
                  />
                )
              }
            />
          </FalconComponentCard>
        </Col>
      </Row>
      <Row>
        <Col lg={8}>
          <FalconComponentCard
            noGuttersBottom
            style={{ minHeight: 500, maxHeight: 500, overflow: 'auto' }}
          >
            <FalconComponentCard.Body
              children={
                idService && (
                  <ServiceFilesList serviceGuid={id} idService={idService} />
                )
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
      {openModalOrder && (
        <MyModal
          id="id_myModal"
          closeModal={handleClose}
          title={i18next.t('label.Print')}
          openModal={openModalOrder}
          isFullScreen={true}
        >
          <ServiceOrder
            service={service}
            idService={idService}
            closeModal={handleClose}
          />
        </MyModal>
      )}
    </>
  );
};

export default DetailService;
