import axios from 'axios';
import EditVehicle from 'Catalogs/Administration/_EditVehicle';
import classNames from 'classnames';
import IconButton from 'components/common/IconButton';
import { ServiceContext } from 'context/Context';
import i18next from 'i18next';
import React, { useContext, useEffect, useState } from 'react';
import { Form, Row } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import MyModal from 'shared/Modal';
import { ApiEndpoint } from 'utils/ApiEndPont';
import CustomerDetail from './_CustomerDetail';
import VehicleDetail from './_VehicleDetail';
function EditVehicleService({ action }) {
  const [vehicles, setVehicles] = useState([]);
  const { customerId, serviceId, setServiceId, vehicleId, setVehicleId } =
    useContext(ServiceContext);
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
      <Row>
        <Form.Group>
          <Form.Label>{i18next.t('label.Vehicle')}</Form.Label>
          <Form.Select
            aria-label="Default select"
            name="idVehicle"
            style={{ minWidth: '250px' }}
            onChange={selectedOption => {
              setRefreshData(false);
              setVehicleId(parseInt(selectedOption.target.value));
            }}
          >
            {!!vehicles?.length &&
              vehicles.map(vehicle => (
                <option key={vehicle.idVehicle} value={vehicle.idVehicle}>
                  {vehicle.vin}
                </option>
              ))}
          </Form.Select>
          <IconButton
            variant="link"
            icon="bi bi-plus-lg"
            iconAlign="left"
            transform="down-1 shrink-4"
            className={classNames('px-0 fw-semi-bold')}
            onClick={() => {}}
          >
            {i18next.t('label.Add')}
          </IconButton>
        </Form.Group>
      </Row>
      <Row>{refreshData && <VehicleDetail />}</Row>
      {openModalVehicle && (
        <MyModal
          id="id_myModal"
          title={i18next.t('label.Add') + i18next.t('label.Vehicle')}
          openModal={openModalVehicle}
          closeModal={handleClose}
        >
          <EditVehicle closeModal={handleClose} />
        </MyModal>
      )}
    </>
  );
}

export default EditVehicleService;
