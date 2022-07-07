import axios from 'axios';
import EditVehicle from 'Catalogs/Administration/_EditVehicle';
import classNames from 'classnames';
import IconButton from 'components/common/IconButton';
import { ServiceContext } from 'context/Context';
import GenericTableHeader from 'form-components/TableHeaders/GenericTableHeader';
import i18next from 'i18next';
import React, { useContext, useEffect, useState } from 'react';
import { Card, Col, Form, Row } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import MyModal from 'shared/Modal';
import createMarkup from 'helpers/createMarkup.js';
import { ApiEndpoint } from 'utils/ApiEndPont';
import VehicleDetail from './_VehicleDetail';
function EditVehicleService({ action }) {
  const [vehicles, setVehicles] = useState([]);
  const {
    customerId,
    serviceId,
    setServiceId,
    vehicleId,
    setVehicleId,
    setOpenAlert,
    setTypeAlert,
    setAlertMessage
  } = useContext(ServiceContext);
  const [openModalVehicle, setOpenModalVehicle] = useState(false);
  let [refreshData, setRefreshData] = useState(false);
  const [values, setValues] = useState({
    idVehicle: '0'
  });

  const {
    handleSubmit,
    control,
    setValue,
    formState: { errors }
  } = useForm({
    mode: 'onBlur'
  });

  const handleClose = () => {
    setOpenModalVehicle(false);
    getVehicles();
  };

  useEffect(() => {
    setRefreshData(true);
    //localStorage.setItem(currentId.id, '')
    const data = localStorage.getItem(serviceId);
    if (data != null) {
      let newIdVehicle = JSON.parse(data).idVehicle;
      setVehicleId(parseInt(newIdVehicle) || 0);
    }
  }, []); // empty array makes hook working once

  useEffect(() => {
    setVehicleId(vehicleId);
    setRefreshData(true);
  }, [vehicleId]);

  useEffect(() => {
    getVehicles();
  }, []);

  //mostrar companies
  const getVehicles = async () => {
    const UriVehicles = ApiEndpoint + 'customervehicles/';
    const res = await axios.get(UriVehicles + customerId);
    setVehicles(res.data);
  };

  return (
    <>
      <Card>
        <Card.Header>
          <Row className="flex-between-center">
            <Col xs={4} sm="auto" className="d-flex align-items-center pe-0">
              <h5 className="fs-0 mb-0 text-nowrap py-2 py-xl-0">
                {i18next.t('label.Vehicle')}
              </h5>
            </Col>
            <Col xs={8} sm="auto" className="ms-auto text-end ps-0">
              <div id="orders-actions">
                <IconButton
                  variant="falcon-default"
                  size="sm"
                  icon="plus"
                  transform="shrink-3"
                  onClick={() => {
                    setOpenModalVehicle(true);
                  }}
                >
                  <span className="d-none d-sm-inline-block ms-1">
                    {i18next.t('label.Add')}
                  </span>
                </IconButton>
              </div>
            </Col>
          </Row>{' '}
          <p
            className={classNames('mt-2', 'mb-0')}
            dangerouslySetInnerHTML={createMarkup(
              'Select the vehicle or Add new Vehicle'
            )}
          />
        </Card.Header>
      </Card>
      <Card.Body>
        <Card.Header>
          <Row>
            <Col xs={4}>
              {' '}
              <Form.Select
                aria-label="Default select"
                name="idVehicle"
                style={{ minWidth: '250px' }}
                onChange={selectedOption => {
                  setRefreshData(false);
                  setVehicleId(parseInt(selectedOption.target.value));
                }}
              >
                <option key={'vehicle_0'} value={0}>
                  {i18next.t('label.SelectVehicle')}
                </option>
                {!!vehicles?.length &&
                  vehicles.map(vehicle => (
                    <option key={vehicle.idVehicle} value={vehicle.idVehicle}>
                      {vehicle.vin}
                    </option>
                  ))}
              </Form.Select>
              <Col xs={8} sm="auto" className="ms-auto text-end ps-0"></Col>
            </Col>
          </Row>
        </Card.Header>

        <Row>{refreshData && <VehicleDetail />}</Row>
        {openModalVehicle && (
          <MyModal
            id="id_myModal"
            title={i18next.t('label.Add') + i18next.t('label.Vehicle')}
            openModal={openModalVehicle}
            closeModal={handleClose}
          >
            <EditVehicle
              closeModal={handleClose}
              setOpenAlert={setOpenAlert}
              setTypeAlert={setTypeAlert}
              setAlertMessage={setAlertMessage}
              idCustomer={customerId}
            />
          </MyModal>
        )}
      </Card.Body>
    </>
  );
}

export default EditVehicleService;
