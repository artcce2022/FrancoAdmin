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
import EditCommonFailurePart from './_EditCommonFailurePart';

const URI = ApiEndpoint + 'failuresparts/';
const CommonFailurePartsList = ({ idCommonFailure }) => {
  const [partsList, setPartsList] = useState([]);
  const [idPart, setIdPart] = useState(0);
  const [idPartToDelete, setIdPartToDelete] = useState(0);
  const [openModal, setOpenModal] = useState(false);
  const [openAlert, setOpenAlert] = useState(false);
  const [typeAlert, setTypeAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState(false);
  const [openConfirm, setOpenConfirm] = useState(null);

  const handleCloseConfirm = () => {
    setOpenConfirm(false);
    GetFailuresPartsList();
  };
  const handleCloseAlert = () => {
    setOpenAlert(false);
  };

  const handleClose = () => {
    GetFailuresPartsList();
    setOpenModal(false);
  };

  useEffect(() => {
    GetFailuresPartsList();
  }, []);

  const GetFailuresPartsList = () => {
    console.log(URI + idCommonFailure);

    axios.get(URI + idCommonFailure).then(response => {
      let parts = response.data;
      console.log('parts');
      console.log(parts);
      setPartsList(parts);
      // setIdsymptomcategory(response.data.idsymptomcategory);
    });
  };

  const DeleteConfirmed = isConfirmed => {
    if (!isConfirmed) {
      return;
    }
    const URIDelete = ApiEndpoint + 'failurespart/';
    axios
      .delete(URIDelete + idPartToDelete)
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
        GetFailuresPartsList();
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
            label={i18next.t('label.Parts')}
            newFunction={() => {
              setIdPart(0);
              setOpenModal(true);
            }}
          />
        </Card.Header>
        <Card.Body className="p-0" style={{ height: 350 }}>
          <div className="table-responsive fs--1">
            <Table responsive striped hover>
              <thead>
                <tr>
                  <th scope="col">{i18next.t('label.PartCode')}</th>
                  <th scope="col">{i18next.t('label.PartName')}</th>
                  <th scope="col">{i18next.t('label.IsIncluded')}</th>
                  <th scope="col">{i18next.t('label.IsVisible')}</th>
                  <th scope="col">{i18next.t('label.Quantity')}</th>
                  <th scope="col">{i18next.t('label.Price')}</th>
                  <th scope="col">{i18next.t('label.Actions')}</th>
                </tr>
              </thead>
              <tbody>
                {partsList &&
                  partsList.map((part, index) => (
                    <tr
                      className="align-middle"
                      key={part.idcommonfailurespart}
                    >
                      <td className="text-nowrap">{part.part.partcode}</td>
                      <td className="text-nowrap">{part.part.description}</td>
                      <td className="text-nowrap">
                        {part.included ? 'Si' : 'No'}
                      </td>
                      <td className="text-nowrap">
                        {part.visibletocustomer ? 'Si' : 'No'}
                      </td>
                      <td className="text-nowrap">{part.quantity}</td>
                      <td className="text-nowrap">{part.price}</td>
                      <td className="text-end">
                        <Button
                          variant="falcon-default"
                          size="sm"
                          title={i18next.t('label.Edit')}
                          onClick={() => {
                            setIdPart(part.idcommonfailurespart);
                            setOpenModal(true);
                          }}
                        >
                          <FontAwesomeIcon icon="pencil-alt" />
                        </Button>{' '}
                        <Button
                          variant="falcon-default"
                          size="sm"
                          title={i18next.t('label.DeletePart')}
                          onClick={() => {
                            setIdPartToDelete(part.idcommonfailurespart);
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
          title={i18next.t('label.EditFailurePart')}
          openModal={openModal}
          closeModal={handleClose}
        >
          <EditCommonFailurePart
            idCommonFailure={idCommonFailure}
            idcommonfailurePart={idPart}
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

export default CommonFailurePartsList;
