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
import GenericTableHeader from '../../form-components/TableHeaders/GenericTableHeader';
import MyModal from 'shared/Modal';
import EditCustomerContact from './_EditContactCustomer';
import { ApiEndpoint } from 'utils/ApiEndPont';
import ConfirmAction from 'form-components/ConfirmationModal';
import AlertNotification from 'form-components/AlertNotification';

const CustomerContactsList = () => {
  const [customercontacts, setCustomercontacts] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [openConfirm, setOpenConfirm] = useState(null);
  const [openAlert, setOpenAlert] = useState(false);
  const [typeAlert, setTypeAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState(false);
  const [idCustomerToDelete, setIdCustomerToDelete] = useState(0);

  let [idCustomerContact, setIdCustomerContact] = useState(0);
  let [idCustomer, setIdCustomer] = useState(0);
  let { id } = useParams();
  const handleClose = () => {
    setOpenModal(false);
    getCustomerContacts();
  };

  const handleCloseConfirm = () => {
    setOpenConfirm(false);
    getCustomerContacts();
  };

  const DeleteConfirmed = isConfirmed => {
    if (!isConfirmed) {
      return;
    }
    const URIDelete = ApiEndpoint + 'customercontacts/';
    axios
      .delete(URIDelete + idCustomerToDelete)
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
        getCustomerContacts();
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const handleCloseAlert = () => {
    setOpenAlert(false);
  };
  //mostrar companies
  const getCustomerContacts = async () => {
    setIdCustomer(id);
    const URI = ApiEndpoint + 'customercontacts/';
    const res = await axios.get(URI + id);
    setCustomercontacts(res.data);
  };

  useEffect(() => {
    getCustomerContacts();
  }, []);

  return (
    <Card className="mb-3">
      <GenericTableHeader
        label={i18next.t('label.Contacts')}
        newFunction={() => {
          setIdCustomerContact(0);
          setOpenModal(true);
        }}
      />
      <Card.Body>
        <div className="table-responsive fs--1">
          <Table striped className="border-bottom">
            <thead className="bg-200 text-900">
              <tr>
                <th className="border-0">{i18next.t('label.Customer')}</th>
                <th className="border-0 text-center">
                  {i18next.t('label.Name')}
                </th>
                <th className="border-0 text-end">
                  {i18next.t('label.Lastname')}
                </th>
                <th className="border-0 text-end">
                  {i18next.t('label.Phone')}
                </th>
                <th className="border-0 text-end">
                  {i18next.t('label.Actions')}
                </th>
              </tr>
            </thead>
            <tbody>
              {customercontacts.map(contact => (
                <tr key={contact.idcustomercontact} className="border-200">
                  <td className="align-middle">{contact.customer.shortname}</td>{' '}
                  <td className="align-middle text-center">{contact.name}</td>
                  <td className="align-middle text-center">
                    {contact.lastname}
                  </td>
                  <td className="align-middle text-center">{contact.phone}</td>
                  <td className="align-middle text-end">
                    <OverlayTrigger
                      placement="top"
                      overlay={<Tooltip>{i18next.t('label.Edit')}</Tooltip>}
                    >
                      <Button
                        variant="falcon-default"
                        size="sm"
                        onClick={() => {
                          setIdCustomerContact(contact.idcustomercontact);
                          setOpenModal(true);
                        }}
                      >
                        <FontAwesomeIcon icon="pencil-alt" />
                      </Button>
                    </OverlayTrigger>
                    <OverlayTrigger
                      placement="top"
                      overlay={<Tooltip>{i18next.t('label.delete')}</Tooltip>}
                    >
                      <Button
                        variant="falcon-default"
                        size="sm"
                        onClick={() => {
                          setIdCustomerToDelete(contact.idcustomercontact);
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
      {openModal && (
        <MyModal
          id="id_myModal"
          title={
            (idCustomerContact > 0
              ? i18next.t('label.Edit')
              : i18next.t('label.Add')) +
            ' ' +
            i18next.t('label.CustomerContact')
          }
          openModal={openModal}
          closeModal={handleClose}
        >
          <EditCustomerContact
            idContact={idCustomerContact}
            idCustomer={idCustomer}
            closeModal={handleClose}
            setOpenAlert={setOpenAlert}
            setTypeAlert={setTypeAlert}
            setAlertMessage={setAlertMessage}
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
    </Card>
  );
};
CustomerContactsList.propTypes = {};

export default CustomerContactsList;
