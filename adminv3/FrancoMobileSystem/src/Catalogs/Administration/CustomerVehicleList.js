import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
// import PropTypes from 'prop-types';
import {
  Button,
  Card,
  Col,
  OverlayTrigger,
  Row,
  Table,
  Tooltip
} from 'react-bootstrap';
import i18next from 'i18next';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import IconButton from 'components/common/IconButton';
import GenericTableHeader from '../../form-components/TableHeaders/GenericTableHeader';
import MyModal from 'shared/Modal';
import EditVehicle from './_EditVehicle';
import { ApiEndpoint } from 'utils/ApiEndPont';
const URI = ApiEndpoint + 'customervehicles/';  
const CustomerVehicleList = () => {
  const [vehicles, setVehicles] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  let [idCustomer, setIdCustomer] = useState(0);
  let [idVehicle, setIdVehicle] = useState(0);
  let { id } = useParams();
  const handleClose = () => {
    setOpenModal(false);
    getVehicles();
  };

  //mostrar companies
  const getVehicles = async () => {
    setIdCustomer(id);
    const res = await axios.get(URI + id);
    setVehicles(res.data);
    console.log(res.data);
  };

  useEffect(() => {
    getVehicles();
  }, []);

  return (
    <Card className="mb-3">
      <GenericTableHeader
        label={i18next.t('label.vehicles')}
        newFunction={() => {
          setIdVehicle(0);
          setOpenModal(true);
        }}
      />

      <Card.Body>
        <div className="table-responsive fs--1">
          <Table striped className="border-bottom">
            <thead className="bg-200 text-900">
              <tr>
                <th className="border-0 text-center">
                  {i18next.t('label.Vin')}
                </th>
                <th className="border-0 text-end">
                  {i18next.t('label.License')}
                </th>
                <th className="border-0 text-end">{i18next.t('label.Year')}</th>
                <th className="border-0 text-end">
                  {i18next.t('label.Model')}
                </th>
                <th className="border-0 text-end">
                  {i18next.t('label.Actions')}
                </th>
              </tr>
            </thead>
            <tbody>
              {vehicles.map(vehicle => (
                <tr key={vehicle.idVehicle} className="border-200">
                  <td className="align-middle">{vehicle.vin}</td>
                  <td className="align-middle text-center">
                    {vehicle.license}
                  </td>
                  <td className="align-middle text-center">{vehicle.year}</td>
                  <td className="align-middle text-center">{vehicle.make}</td>
                  <td className="align-middle text-end">
                    <OverlayTrigger
                      placement="top"
                      overlay={<Tooltip>{i18next.t('label.Edit')}</Tooltip>}
                    >
                      <Button
                        variant="falcon-default"
                        size="sm"
                        onClick={() => {
                          setIdVehicle(vehicle.idVehicle);
                          setOpenModal(true);
                        }}
                      >
                        <FontAwesomeIcon icon="pencil-alt" />
                      </Button>
                    </OverlayTrigger>

                    <OverlayTrigger
                      placement="top"
                      overlay={<Tooltip>{i18next.t('label.Delete')}</Tooltip>}
                    >
                      <Button
                        variant="falcon-default"
                        size="sm"
                        onClick={() => {
                          setIdVehicle(vehicle.idVehicle);
                          setOpenModal(true);
                        }}
                      >
                        <FontAwesomeIcon icon="trash-alt" />
                      </Button>
                    </OverlayTrigger>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      </Card.Body>
      {openModal && (
        <MyModal
          id="id_myModal"
          title={
            (idVehicle > 0 ? i18next.t('label.Edit') : i18next.t('label.Add')) +
            ' ' +
            i18next.t('label.Vehicle')
          }
          openModal={openModal}
          closeModal={handleClose}
        >
          <EditVehicle
            idVehicle={idVehicle}
            idCustomer={idCustomer}
            closeModal={handleClose}
          />
        </MyModal>
      )}
    </Card>
  );
};
CustomerVehicleList.propTypes = {};

export default CustomerVehicleList;
