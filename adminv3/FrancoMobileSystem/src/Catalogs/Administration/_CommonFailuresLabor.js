import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import { EditServiceContext } from 'context/Context';
import AlertNotification from 'form-components/AlertNotification';
import ConfirmAction from 'form-components/ConfirmationModal';
import GenericTableHeader from 'form-components/TableHeaders/GenericTableHeader';
import i18next from 'i18next';
import React, { useContext, useEffect, useState } from 'react';
import { Button, Card, Table } from 'react-bootstrap';
import MyModal from 'shared/Modal';
import { ApiEndpoint } from 'utils/ApiEndPont';
import EditCommonFailureLabor from './_EditLabor';

const URI = ApiEndpoint + 'failureslabors/';
const CommonFailureLaborsList = ({ idCommonFailure }) => {
  const [laborList, setLaborList] = useState([]);
  const [idLabor, setIdLabor] = useState(0);
  const [idLaborToDelete, setIdLaborToDelete] = useState(0);
  const [openModal, setOpenModal] = useState(false);
  const [openAlert, setOpenAlert] = useState(false);
  const [typeAlert, setTypeAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState(false);
  const [openConfirm, setOpenConfirm] = useState(null);

  const handleCloseConfirm = () => {
    setOpenConfirm(false);
    GetFailuresLaborList();
  };
  const handleCloseAlert = () => {
    setOpenAlert(false);
  };

  const handleClose = () => {
    GetFailuresLaborList();
    setOpenModal(false);
  };

  useEffect(() => {
    GetFailuresLaborList();
  }, []);

  const GetFailuresLaborList = () => {
    axios.get(URI + idCommonFailure).then(response => {
      let labors = response.data;
      console.log('labors');
      console.log(labors);
      setLaborList(labors);
      // setIdsymptomcategory(response.data.idsymptomcategory);
    });
  };

  const DeleteConfirmed = isConfirmed => {
    if (!isConfirmed) {
      return;
    }
    const URIDelete = ApiEndpoint + 'failureslabor/';
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
        GetFailuresLaborList();
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
            label={i18next.t('label.Labor')}
            newFunction={() => {
              setIdLabor(0);
              setOpenModal(true);
            }}
          />
        </Card.Header>
        <Card.Body className="p-0" style={{ height: 350 }}>
          <div className="table-responsive fs--1">
            <Table responsive striped hover>
              <thead>
                <tr>
                  <th scope="col">{i18next.t('label.Description')}</th>
                  <th scope="col">{i18next.t('label.IsIncluded')}</th>
                  <th scope="col">{i18next.t('label.Visible')}</th>
                  <th scope="col">{i18next.t('label.Price')}</th>
                  <th scope="col">{i18next.t('label.Actions')}</th>
                </tr>
              </thead>
              <tbody>
                {laborList &&
                  laborList.map((labor, index) => (
                    <tr
                      className="align-middle"
                      key={labor.idcommonfailurelabor}
                    >
                      <td className="text-nowrap">{labor.description}</td>
                      <td className="text-nowrap">
                        {labor.included ? 'Si' : 'No'}
                      </td>
                      <td className="text-nowrap">
                        {labor.visibletocustomer ? 'Si' : 'No'}
                      </td>
                      <td className="text-nowrap">{labor.price}</td>
                      <td className="text-end">
                        <Button
                          variant="falcon-default"
                          size="sm"
                          title={i18next.t('label.Edit')}
                          onClick={() => {
                            setIdLabor(labor.idcommonfailurelabor);
                            setOpenModal(true);
                          }}
                        >
                          <FontAwesomeIcon icon="pencil-alt" />
                        </Button>{' '}
                        <Button
                          variant="falcon-default"
                          size="sm"
                          title={i18next.t('label.DeleteLabor')}
                          onClick={() => {
                            setIdLaborToDelete(labor.idcommonfailurelabor);
                            setOpenConfirm(true);
                          }}
                        >
                          <FontAwesomeIcon icon="trash-alt" />
                        </Button>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </Table>
          </div>
        </Card.Body>
      </Card>
      {openModal && (
        <MyModal
          id="id_myModal"
          title={i18next.t('label.EditFailureLabor')}
          openModal={openModal}
          closeModal={handleClose}
        >
          <EditCommonFailureLabor
            idCommonFailure={idCommonFailure}
            idcommonfailurelabor={idLabor}
            closeModal={handleClose}
          />
        </MyModal>
      )}
      {openAlert && (
        <AlertNotification
          open={openAlert}
          handleClose={handleCloseAlert}
          type={typeAlert}
          message={alertMessage}
        />
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

export default CommonFailureLaborsList;
