import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Button,
  Card,
  Dropdown,
  OverlayTrigger,
  Tooltip
} from 'react-bootstrap';
import AdvanceTableWrapper from 'components/common/advance-table/AdvanceTableWrapper';
import GenericTableHeader from '../../form-components/TableHeaders/GenericTableHeader.js';
import AdvanceTablePagination from 'components/common/advance-table/AdvanceTablePagination';
import AdvanceTable from 'components/common/advance-table/AdvanceTable';
import MyModal from 'shared/Modal.js';
import i18next from 'i18next';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ApiEndpoint } from 'utils/ApiEndPont.js';
import ConfirmAction from 'form-components/ConfirmationModal.js';
import AlertNotification from 'form-components/AlertNotification.js';
import EditPart from './_EditPart.js';
// import EditCustomer from './_EditCustomer.js';

const PartsCatalog = () => {
  const URI = ApiEndpoint + 'parts/';
  const [parts, setParts] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [openConfirm, setOpenConfirm] = useState(null);
  const [openAlert, setOpenAlert] = useState(false);
  const [typeAlert, setTypeAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState(false);
  let [idPart, setIdPart] = useState(0);
  const handleClose = () => {
    setOpenModal(false);
    getParts();
  };

  const handleCloseConfirm = () => {
    setOpenConfirm(false);
    getParts();
  };

  const DeleteConfirmed = isConfirmed => {
    console.log('DElete Accepted');
  };

  const handleCloseAlert = () => {
    setOpenAlert(false);
  };
  useEffect(() => {
    console.log('openConfirm');
    console.log(openConfirm);
  }, [openConfirm]);

  useEffect(() => {
    getParts();
  }, []);
  //mostrar companies
  const getParts = async () => {
    const res = await axios.get(URI);
    setParts(res.data);
  };

  const columns = [
    {
      accessor: 'partnumber',
      Header: `${i18next.t('label.PartNumber')}`,
      headerProps: { style: { minWidth: '200px' }, className: 'ps-5' },
      cellProps: { className: 'ps-5' }
    },
    {
      accessor: 'partcode',
      Header: `${i18next.t('label.PartCode')}`,
      headerProps: { style: { minWidth: '200px' }, className: 'ps-5' },
      cellProps: { className: 'ps-5' }
    },
    {
      accessor: 'description',
      Header: `${i18next.t('label.Description')}`
    },
    {
      accessor: 'none',
      Header: '',
      disableSortBy: true,
      cellProps: {
        className: 'text-end'
      },
      Cell: rowData => {
        console.log(rowData.row.original);
        let idPart = rowData.row.original.idparts;
        return (
          <>
            <OverlayTrigger
              placement="top"
              overlay={<Tooltip>{i18next.t('label.Edit')}</Tooltip>}
            >
              <Button
                variant="falcon-default"
                size="sm"
                onClick={() => {
                  setIdPart(idPart);
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
                  setOpenConfirm(true);
                }}
              >
                <FontAwesomeIcon icon="trash-alt" />
              </Button>
            </OverlayTrigger>
          </>
        );
      }
    }
  ];

  return (
    <>
      <AdvanceTableWrapper
        columns={columns}
        data={parts}
        sortable
        pagination
        perPage={10}
      >
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
          <Card.Body className="p-0">
            <AdvanceTable
              table
              headerClassName="bg-200 text-900 text-nowrap align-middle"
              rowClassName="align-middle white-space-nowrap"
              tableProps={{
                size: 'sm',
                striped: true,
                className: 'fs--1 mb-0 overflow-hidden'
              }}
            />
          </Card.Body>
          <Card.Footer>
            <AdvanceTablePagination table />
          </Card.Footer>
        </Card>
      </AdvanceTableWrapper>
      {openModal && (
        <MyModal
          id="id_myModal"
          closeModal={handleClose}
          title={
            (idPart > 0 ? i18next.t('label.Edit') : i18next.t('label.Add')) +
            ' ' +
            i18next.t('label.Part')
          }
          openModal={openModal}
        >
          <EditPart
            idPart={idPart}
            closeModal={handleClose}
            setOpenAlert={setOpenAlert}
            setTypeAlert={setTypeAlert}
            setAlertMessage={setAlertMessage}
          />
        </MyModal>
      )}{' '}
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

export default PartsCatalog;
