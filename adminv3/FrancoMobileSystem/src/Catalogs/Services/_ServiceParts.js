import axios from 'axios';
import { useEffect, useState } from 'react';
import i18next from '../../utils/locales/i18n.js';
import { ApiEndpoint } from 'utils/ApiEndPont.js';
import { Button, Card, Table } from 'react-bootstrap';
import GenericTableHeader from 'form-components/TableHeaders/GenericTableHeader.js';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const ServicePartsList = ({ idService, setOpenModal, serviceGuid }) => {
  const [serviceParts, setServiceParts] = useState([]);
  const [refreshParts, setRefreshParts] = useState(false);
  const [openModalPart, setOpenModalPart] = useState(false);
  const URI = ApiEndpoint + 'services/parts/';
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
            label={i18next.t('label.Failures')}
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
                    <td>{part.parts.partcode}</td>
                    <td>{part.parts.description}</td>
                    <td>{part.parts.partcode}</td>
                    <td>{part.quantity}</td>
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
    </>
  );
};
export default ServicePartsList;
