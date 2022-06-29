import axios from 'axios';
import { useEffect, useState } from 'react';
import i18next from '../../utils/locales/i18n.js';
import { ApiEndpoint } from 'utils/ApiEndPont.js';
import { Button, Card, Table } from 'react-bootstrap';
import GenericTableHeader from 'form-components/TableHeaders/GenericTableHeader.js';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import AlertNotification from 'form-components/AlertNotification.js';
import AddServiceParts from './_AddDetailServicePart.js';
import MyModal from 'shared/Modal.js';

const ServicePartsList = ({
  idService,
  setOpenModal,
  serviceGuid,
  idVehicle
}) => {
  const [serviceParts, setServiceParts] = useState([]);
  const [refreshParts, setRefreshParts] = useState(false);
  const [openModalPart, setOpenModalPart] = useState(false);
  const [openAlert, setOpenAlert] = useState(false);
  const [typeAlert, setTypeAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState(false);
  const URI = ApiEndpoint + 'services/parts/';

  const handleClose = () => {
    setOpenModalPart(false);
    getServiceParts();
  };
  const handleCloseAlert = () => {
    setOpenAlert(false);
  };

  useEffect(() => {
    getServiceParts();
  }, []);

  useEffect(() => {
    if (refreshParts === true) {
      getServiceParts();
      setRefreshParts(false);
    }
  }, [refreshParts]);

  const getServiceParts = () => {
    console.log(URI + idService);
    axios.get(URI + idService).then(response => {
      let parts = response.data;
      console.log('parts');
      console.log(parts);
      setServiceParts(parts);
      // setIdsymptomcategory(response.data.idsymptomcategory);
    });
  };

  return (
    <>
      <Card className="mb-3">
        <Card.Header>
          <GenericTableHeader
            label={i18next.t('label.Parts')}
            newFunction={() => {
              setOpenModalPart(true);
            }}
          />
        </Card.Header>
        <Card.Body>
          <div className="table-responsive fs--1">
            <Table responsive striped hover>
              <thead>
                <tr>
                  <th scope="col">{i18next.t('label.PartName')}</th>
                  <th scope="col">{i18next.t('label.Descripcion')}</th>
                  <th scope="col">{i18next.t('label.Warehouse')}</th>
                  <th scope="col">{i18next.t('label.Quantity')}</th>
                  <th scope="col">{i18next.t('label.Actions')}</th>
                </tr>
              </thead>
              <tbody>
                {serviceParts.map((part, index) => (
                  <tr>
                    <td>{part.part.partcode}</td>
                    <td>{part.part.description}</td>
                    <td>{part.part.partcode}</td>
                    <td>{part.part.quantity}</td>
                    <td>
                      <Button
                        variant="falcon-default"
                        size="sm"
                        onClick={() => {
                          setOpenModalPart(true);
                        }}
                      >
                        <FontAwesomeIcon icon="clock" />
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
        </Card.Body>
      </Card>{' '}
      {openAlert && (
        <AlertNotification
          open={openAlert}
          handleClose={handleCloseAlert}
          type={typeAlert}
          message={alertMessage}
        />
      )}{' '}
      {openModalPart && (
        <MyModal
          id="id_myModal"
          title={i18next.t('label.Parts')}
          openModal={openModalPart}
          closeModal={handleClose}
        >
          <AddServiceParts
            setOpenAlert={setOpenAlert}
            setTypeAlert={setTypeAlert}
            setAlertMessage={setAlertMessage}
            closeModal={handleClose}
            idService={idService}
            idVehicle={idVehicle}
          />
        </MyModal>
      )}
    </>
  );
};
export default ServicePartsList;
