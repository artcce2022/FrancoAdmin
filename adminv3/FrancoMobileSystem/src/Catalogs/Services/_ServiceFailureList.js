import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import GenericTableHeader from 'form-components/TableHeaders/GenericTableHeader';
import i18next from 'i18next';
import React, { useEffect, useState } from 'react';
import { Button, Card, Table } from 'react-bootstrap';
import MyModal from 'shared/Modal';
import { ApiEndpoint } from 'utils/ApiEndPont';
import EditFailuresService from './_EditFailuresService';

const URI = ApiEndpoint + 'services/failures/';
const ServiceFailureList = ({ idService }) => {
  const [idFailure, setIdFailure] = useState(0);
  const [failuresList, setFailuresList] = useState([]);
  const [openModalStatus, setOpenModalStatus] = useState(false);
  const [openModalFailure, setOpenModalFailure] = useState(false);
  const [idCommonFailureService, setIdCommonFailureService] = useState(0);
  const [idCommonFailureStatus, setIdCommonFailureStatus] = useState('0');
  const handleClose = () => {
    setOpenModalStatus(false);
    getServiceFailures();
  };

  useEffect(() => {
    getServiceFailures();
  }, []);
  const getServiceFailures = () => {
    console.log(URI + idService);
    axios.get(URI + idService).then(response => {
      let failures = response.data;
      console.log('failures');
      console.log(failures);
      setFailuresList(failures);
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
              setIdFailure(0);
              setOpenModalFailure(true);
            }}
          />
        </Card.Header>
        <Card.Body className="p-0">
          <div className="table-responsive fs--1">
            <Table responsive striped hover>
              <thead>
                <tr>
                  <th scope="col">{i18next.t('label.Description')}</th>
                  <th scope="col">{i18next.t('label.Categoria')}</th>
                  <th scope="col">{i18next.t('label.Status')}</th>
                  <th scope="col">{i18next.t('label.Comments')}</th>
                  <th scope="col">{i18next.t('label.Actions')}</th>
                </tr>
              </thead>
              <tbody>
                {failuresList.map((failure, index) => (
                  <tr className="align-middle" key={failure.idcommonfailures}>
                    <td className="text-nowrap">
                      {failure.commonfailure.shortdescription}
                    </td>
                    <td className="text-nowrap">
                      {failure.commonfailure.symtomdescription}
                    </td>
                    <td className="text-nowrap">
                      {failure.commonfailuresstatus.failurestatus}
                    </td>

                    <td className="text-nowrap">{failure.comments}</td>
                    <td className="text-end">
                      {failure.idcommonfailurestatus !== 3 &&
                        failure.idcommonfailurestatus !== 2 && (
                          <Button
                            variant="falcon-default"
                            size="sm"
                            onClick={() => {
                              setIdCommonFailureService(
                                failure.idservicefailures
                              );
                              setIdCommonFailureStatus('3');
                              setOpenModalStatus(true);
                            }}
                          >
                            <FontAwesomeIcon icon="trash-alt" />
                          </Button>
                        )}
                      {failure.idcommonfailurestatus !== 4 &&
                        failure.idcommonfailurestatus !== 2 && (
                          <Button
                            variant="falcon-default"
                            size="sm"
                            onClick={() => {
                              setIdCommonFailureService(
                                failure.idservicefailures
                              );
                              setIdCommonFailureStatus('4');
                              setOpenModalStatus(true);
                            }}
                          >
                            <FontAwesomeIcon icon="clock" />
                          </Button>
                        )}
                      {failure.idcommonfailurestatus !== 4 &&
                        failure.idcommonfailurestatus !== 3 &&
                        failure.idcommonfailurestatus !== 2 && (
                          <Button
                            variant="falcon-default"
                            size="sm"
                            onClick={() => {
                              setIdCommonFailureService(
                                failure.idservicefailures
                              );
                              setIdCommonFailureStatus('4');
                              setOpenModalStatus(true);
                            }}
                          >
                            <FontAwesomeIcon icon="check" />
                          </Button>
                        )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
        </Card.Body>
      </Card>
      {openModalStatus && (
        <MyModal
          id="id_myModal"
          title={i18next.t('label.EditFailure')}
          openModal={openModalStatus}
          closeModal={handleClose}
        >
          <EditFailuresService
            idCommonFailureService={idCommonFailureService}
            idCommonFailureStatus={idCommonFailureStatus}
            closeModal={handleClose}
          />
        </MyModal>
      )}
    </>
  );
};

export default ServiceFailureList;