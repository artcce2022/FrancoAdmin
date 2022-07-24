import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import { EditServiceContext } from 'context/Context';
import ConfirmAction from 'form-components/ConfirmationModal';
import GenericTableHeader from 'form-components/TableHeaders/GenericTableHeader';
import i18next from 'i18next';
import React, { useContext, useEffect, useState } from 'react';
import { Button, Card, OverlayTrigger, Table, Tooltip } from 'react-bootstrap';
import MyModal from 'shared/Modal';
import { ApiEndpoint } from 'utils/ApiEndPont';
import EditLaborService from './_EditServiceLabor';

const URI = ApiEndpoint + 'services/labors/';
const ServiceLaborsList = ({ idService }) => {
  const { setOpenAlert, setTypeAlert, setAlertMessage } =
    useContext(EditServiceContext);
  const [openModalLabor, setOpenModalLabor] = useState(false);
  const [laborsList, setLaborsList] = useState([]);
  const [idServiceLabor, setIdServiceLabor] = useState(0);
  const [idLaborToDelete, setIdLaborToDelete] = useState(0);
  const [openConfirm, setOpenConfirm] = useState(null);
  const handleClose = () => {
    setOpenModalLabor(false);
    getServiceLabors();
  };

  const handleCloseConfirm = () => {
    setOpenConfirm(false);
    getServiceLabors();
  };

  useEffect(() => {
    getServiceLabors();
  }, []);

  const getServiceLabors = () => {
    console.log(URI + idService);
    axios.get(URI + idService).then(response => {
      let labors = response.data;
      console.log('labors');
      console.log(labors);
      setLaborsList(labors);
    });
  };

  const DeleteConfirmed = isConfirmed => {
    if (!isConfirmed) {
      return;
    }
    const URIDelete = ApiEndpoint + 'services/labor/';
    axios
      .delete(URIDelete + idLaborToDelete)
      .then(function (response) {
        if (response.data.error) {
          setAlertMessage(i18next.t('label.Error'));
          setTypeAlert('warning');
          setOpenAlert(true);
          return;
        }
        setAlertMessage(i18next.t('label.SuccessfulDeletedRecord'));
        setTypeAlert('success');
        setOpenAlert(true);
        getServiceLabors();
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  return (
    <>
      <Card className="mb-3">
        <Card.Header>
          <GenericTableHeader
            label={i18next.t('label.Labors')}
            newFunction={() => {
              setIdServiceLabor(0);
              setOpenModalLabor(true);
            }}
          />
        </Card.Header>
        <Card.Body className="p-0" style={{ height: 350 }}>
          <div className="table-responsive fs--1">
            <Table responsive striped hover>
              <thead>
                <tr>
                  <th scope="col">{i18next.t('label.Description')}</th>
                  <th scope="col">{i18next.t('label.Technician')}</th>
                  <th scope="col">{i18next.t('status.IsIncluded')}</th>
                  <th scope="col">{i18next.t('label.IsVisible')}</th>
                  <th scope="col">{i18next.t('label.IsExternal')}</th>
                  <th scope="col">{i18next.t('label.Price')}</th>
                  <th scope="col">{i18next.t('label.Actions')}</th>
                </tr>
              </thead>
              <tbody>
                {laborsList.map((labor, index) => (
                  <tr className="align-middle" key={labor.idservicelabor}>
                    <td className="text-nowrap">{labor.shortdescription}</td>
                    <td className="text-nowrap">{labor.employee.firstname}</td>
                    <td className="text-nowrap">
                      {labor.isincluded ? 'Si' : 'No'}
                    </td>

                    <td className="text-nowrap">
                      {labor.visibletocustomer ? 'Si' : 'No'}
                    </td>
                    <td className="text-nowrap">
                      {labor.isexternal ? 'Si' : 'No'}
                    </td>
                    <td className="text-nowrap">{labor.price}</td>
                    <td className="text-end">
                      <Button
                        variant="falcon-default"
                        size="sm"
                        onClick={() => {
                          setIdServiceLabor(labor.idservicelabor);
                          setOpenModalLabor(true);
                        }}
                      >
                        <FontAwesomeIcon icon="pencil-alt" />
                      </Button>
                      <OverlayTrigger
                        placement="top"
                        overlay={<Tooltip>{i18next.t('label.delete')}</Tooltip>}
                      >
                        <Button
                          variant="falcon-default"
                          size="sm"
                          onClick={() => {
                            setIdLaborToDelete(labor.idservicelabor);
                            setOpenConfirm(true);
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
      </Card>
      {openModalLabor && (
        <MyModal
          id="id_myModal"
          title={i18next.t('label.FailureEdit')}
          openModal={openModalLabor}
          closeModal={handleClose}
        >
          <EditLaborService
            idservicelabor={idServiceLabor}
            closeModal={handleClose}
            idService={idService}
            setOpenAlert={setOpenAlert}
            setTypeAlert={setTypeAlert}
            setAlertMessage={setAlertMessage}
          />
        </MyModal>
      )}
      {openConfirm && (
        <ConfirmAction
          message={'Desea eliminar el registro?'}
          title={'Confirmacion'}
          handleClose={handleCloseConfirm}
          open={openConfirm}
          ConfirmAction={DeleteConfirmed}
        ></ConfirmAction>
      )}
    </>
  );
};

export default ServiceLaborsList;
