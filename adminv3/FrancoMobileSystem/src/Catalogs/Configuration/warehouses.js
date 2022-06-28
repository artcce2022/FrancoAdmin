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
import EditWarehouse from './_EditWarehouse.js';
import { ApiEndpoint } from 'utils/ApiEndPont.js';
import AlertNotification from 'form-components/AlertNotification.js';
import ConfirmAction from 'form-components/ConfirmationModal.js';
// import EditCustomer from './_EditCustomer.js';

const URI = ApiEndpoint + 'warehouse/';

const Warehouses = () => {
  const [warehouses, setWarehouses] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  let [idWarehouses, setIdWarehouses] = useState(0);
  const [openConfirm, setOpenConfirm] = useState(null);
  const [openAlert, setOpenAlert] = useState(false);
  const [typeAlert, setTypeAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState(false);
  const [idWarehouseToDelete, setIdWarehouseToDelete] = useState(0);

  const handleClose = () => {
    setOpenModal(false);
    getWarehouses();
  };

  useEffect(() => {
    getWarehouses();
  }, []);

  //mostrar companies
  const getWarehouses = async () => {
    const res = await axios.get(URI);
    setWarehouses(res.data);
  };

  const handleCloseConfirm = () => {
    setOpenConfirm(false);
    getWarehouses();
  };

  const DeleteConfirmed = isConfirmed => {
    console.log('DElete Accepted');
  };

  const handleCloseAlert = () => {
    setOpenAlert(false);
  };
  const columns = [
    {
      accessor: 'warehousename',
      Header: `${i18next.t('label.name')}`,
      headerProps: { style: { minWidth: '200px' }, className: 'ps-5' },
      cellProps: { className: 'ps-5' }
    },
    {
      accessor: 'address',
      Header: `${i18next.t('label.address')}`,
      headerProps: { style: { minWidth: '200px' }, className: 'ps-5' },
      cellProps: { className: 'ps-5' }
    },
    {
      accessor: 'manager',
      Header: `${i18next.t('label.manager')}`
    },
    {
      accessor: 'none',
      Header: '',
      disableSortBy: true,
      cellProps: {
        className: 'text-end'
      },
      Cell: rowData => {
        let idwarehouse = rowData.row.original.idwarehouse;
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
                  setIdWarehouses(idwarehouse);
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
                  setIdWarehouseToDelete(idwarehouse);
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
        data={warehouses}
        sortable
        pagination
        perPage={10}
      >
        <Card className="mb-3">
          <Card.Header>
            <GenericTableHeader
              label={i18next.t('label.Warehouses')}
              newFunction={() => {
                setIdWarehouses(0);
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
          title={
            (idWarehouses > 0
              ? i18next.t('label.Edit')
              : i18next.t('label.Add')) +
            ' ' +
            i18next.t('label.Warehouse')
          }
          openModal={openModal}
          closeModal={handleClose}
        >
          <EditWarehouse
            idWarehouse={idWarehouses}
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
    </>
  );
};

export default Warehouses;
