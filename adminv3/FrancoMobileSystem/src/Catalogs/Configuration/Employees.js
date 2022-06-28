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
import EditEmployee from './_EditEmployee.js';
import AlertNotification from 'form-components/AlertNotification.js';
import ConfirmAction from 'form-components/ConfirmationModal.js';
import { ApiEndpoint } from 'utils/ApiEndPont.js';
// import EditCustomer from './_EditCustomer.js';

const URI = ApiEndpoint + 'employees/';

const Employees = () => {
  const [employees, setemployees] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  let [idEmployee, setIdEmployee] = useState(0);
  const [openConfirm, setOpenConfirm] = useState(null);
  const [openAlert, setOpenAlert] = useState(false);
  const [typeAlert, setTypeAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState(false);
  const [idEmployeToDelete, setIdEmployeToDelete] = useState(0);
  const handleClose = () => {
    setOpenModal(false);
    getEmployeeList();
  };
  const handleCloseConfirm = () => {
    setOpenConfirm(false);
    getEmployeeList();
  };
  useEffect(() => {
    getEmployeeList();
  }, []);
  const DeleteConfirmed = isConfirmed => {
    console.log('DElete Accepted');
  };
  const handleCloseAlert = () => {
    setOpenAlert(false);
  };
  //mostrar companies
  const getEmployeeList = async () => {
    const res = await axios.get(URI);
    setemployees(res.data);
  };

  const columns = [
    {
      accessor: 'firstname',
      Header: `${i18next.t('label.FirstName')}`,
      headerProps: { style: { minWidth: '200px' }, className: 'ps-5' },
      cellProps: { className: 'ps-5' }
    },
    {
      accessor: 'lastname',
      Header: `${i18next.t('label.LastName')}`,
      headerProps: { style: { minWidth: '200px' }, className: 'ps-5' },
      cellProps: { className: 'ps-5' }
    },
    {
      accessor: 'email',
      Header: `${i18next.t('label.Email')}`,
      headerProps: { style: { minWidth: '200px' }, className: 'ps-5' },
      cellProps: { className: 'ps-5' }
    },
    {
      accessor: 'hiredate',
      Header: `${i18next.t('label.HireDate')}`,
      headerProps: { style: { minWidth: '200px' }, className: 'ps-5' },
      cellProps: { className: 'ps-5' }
    },
    {
      accessor: 'none',
      Header: '',
      disableSortBy: true,
      cellProps: {
        className: 'text-end'
      },
      Cell: rowData => {
        let idemployee = rowData.row.original.idemployee;
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
                  setIdEmployee(idemployee);
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
                  setIdEmployeToDelete(idemployee);
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
        data={employees}
        sortable
        pagination
        perPage={10}
      >
        <Card className="mb-3">
          <Card.Header>
            <GenericTableHeader
              label={i18next.t('label.Thecnicians')}
              newFunction={() => {
                setIdEmployee(0);
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
            (idEmployee > 0
              ? i18next.t('label.Edit')
              : i18next.t('label.Add')) +
            ' ' +
            i18next.t('label.Thecnician')
          }
          openModal={openModal}
          closeModal={handleClose}
        >
          <EditEmployee idEmployee={idEmployee} closeModal={handleClose} />
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

export default Employees;
