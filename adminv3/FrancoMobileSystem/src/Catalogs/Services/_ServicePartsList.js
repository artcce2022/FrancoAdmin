import axios from 'axios';
import { useContext, useEffect, useState } from 'react';
import i18next from '../../utils/locales/i18n.js';
import { ApiEndpoint } from 'utils/ApiEndPont.js';
import { Button, Card, Table } from 'react-bootstrap';
import GenericTableHeader from 'form-components/TableHeaders/GenericTableHeader.js';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import AddServiceParts from './_AddDetailServicePart.js';
import MyModal from 'shared/Modal.js';
import { EditServiceContext } from 'context/Context.js';

const ServicePartsList = ({
  idService,
  setOpenModal,
  serviceGuid,
  idVehicle
}) => {
  const [serviceParts, setServiceParts] = useState([]);
  const [refreshParts, setRefreshParts] = useState(false);
  const [openModalPart, setOpenModalPart] = useState(false);
  const URI = ApiEndpoint + 'services/parts/';

  const handleClose = () => {
    setOpenModalPart(false);
    getServiceParts();
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
        <Card.Body className="p-0" style={{ height: 350 }}>
          <div className="table-responsive fs--1">
            <Table responsive striped hover>
              <thead>
                <tr>
                  <th scope="col">{i18next.t('label.PartName')}</th>
                  <th scope="col">{i18next.t('label.Description')}</th>
                  <th scope="col">{i18next.t('label.WarehouseName')}</th>
                  <th scope="col">{i18next.t('label.Quantity')}</th>
                  <th scope="col">{i18next.t('label.Price')}</th>
                  <th scope="col">{i18next.t('label.Actions')}</th>
                </tr>
              </thead>
              <tbody>
                {serviceParts.map((part, index) => (
                  <tr>
                    <td>{part.part.partcode}</td>
                    <td>{part.part.description}</td>
                    <td>{part.part.partcode}</td>
                    <td>{part.quantity}</td>
                    <td>{part.price}</td>
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
      </Card>
      {openModalPart && (
        <MyModal
          id="id_myModal"
          title={i18next.t('label.Parts')}
          openModal={openModalPart}
          closeModal={handleClose}
        >
          <AddServiceParts
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
