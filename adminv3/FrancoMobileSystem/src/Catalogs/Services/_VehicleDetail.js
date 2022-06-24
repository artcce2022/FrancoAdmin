import axios from 'axios';
import { ServiceContext } from 'context/Context';
import i18next from 'i18next';
import React, { useContext, useEffect, useState } from 'react';
import { Card, Col, Row } from 'react-bootstrap';
import { ApiEndpoint } from 'utils/ApiEndPont';

const VehicleDetail = () => {
  const [Vehicle, setVehicle] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const URI = ApiEndpoint + 'vehicles/';
  const { vehicleId } = useContext(ServiceContext);

  const handleClose = () => {
    setOpenModal(false);
    getVehicle();
  };

  useEffect(() => {
    getVehicle();
  }, []);

  const getVehicle = async () => {
    axios.get(URI + vehicleId).then(response => {
      console.log(response);
      setVehicle(response.data);
      // setIdsymptomcategory(response.data.idsymptomcategory);
    });
  };
  return (
    <>
      <Card className="mb-3">
        <Card.Body>
          <Row>
            <Col md={6} lg={4} className="mb-4 mb-lg-0">
              <h5 className="mb-3 fs-0">{i18next.t('label.Vin')}</h5>
              <p className="fs--1 mt-1">{Vehicle.vin}</p>
              <div>
                <strong className="me-2">{i18next.t('label.License')} </strong>
                <p className="fs--1 mt-1">{Vehicle.license}</p>
              </div>
              <div>
                <strong className="me-2">{i18next.t('label.Make')} </strong>
                <p className="fs--1 mt-1">{Vehicle.make}</p>
              </div>
            </Col>
            <Col md={6} lg={4} className="mb-4 mb-lg-0">
              <h5 className="mb-3 fs-0">{i18next.t('label.Model')}</h5>
              <p className="fs--1 mt-1">{Vehicle.model}</p>
              <div>
                <strong className="me-2">{i18next.t('label.Color')} </strong>
                <p className="fs--1 mt-1">{Vehicle.color}</p>
              </div>
              <div>
                <strong className="me-2">{i18next.t('label.Unit')} </strong>
                <p className="fs--1 mt-1">{Vehicle.unit}</p>
              </div>
            </Col>
          </Row>
        </Card.Body>
      </Card>
    </>
  );
};

export default VehicleDetail;
