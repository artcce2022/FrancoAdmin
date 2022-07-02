import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Button,
  Card,
  Col,
  Dropdown,
  OverlayTrigger,
  Row,
  Tooltip
} from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import CardDropdown from 'components/common/CardDropdown';
import AdvanceTableWrapper from 'components/common/advance-table/AdvanceTableWrapper';
import GenericTableHeader from '../../form-components/TableHeaders/GenericTableHeader.js';
import AdvanceTablePagination from 'components/common/advance-table/AdvanceTablePagination';
import AdvanceTable from 'components/common/advance-table/AdvanceTable';
import MyModal from 'shared/Modal.js';
import i18next from 'i18next';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import EditCompany from './_EditCompany.js';
import AlertNotification from 'form-components/AlertNotification.js';
import ConfirmAction from 'form-components/ConfirmationModal.js';
import { ApiEndpoint } from 'utils/ApiEndPont.js';
// import EditCustomer from './_EditCustomer.js';

const URI = ApiEndpoint + 'companies/';

const Companies = () => {
  const [companies, setCompanies] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [openAlert, setOpenAlert] = useState(false);
  const [typeAlert, setTypeAlert] = useState(false);
  const [openConfirm, setOpenConfirm] = useState(null);
  const [alertMessage, setAlertMessage] = useState(false);
  const [idCompanyToDelete, setIdCompanyToDelete] = useState(0);
  let [idCompany, setIdCompany] = useState(0);
  const handleClose = () => {
    setOpenModal(false);
    getCompanyList();
  };
  const handleCloseConfirm = () => {
    setOpenConfirm(false);
    getCompanyList();
  };

  const DeleteConfirmed = isConfirmed => {
    console.log('Delete Accepted');
  };

  console.log('entre ahora a 2');
  useEffect(() => {
    getCompanyList();
  }, []);

  //mostrar companies
  const getCompanyList = async () => {
    const res = await axios.get(URI);
    setCompanies(res.data);
  };

  const handleCloseAlert = () => {
    setOpenAlert(false);
  };
  const columns = [
    {
      accessor: 'companyName',
      Header: `${i18next.t('label.Name')}`,
      headerProps: { style: { minWidth: '200px' }, className: 'ps-5' },
      cellProps: { className: 'ps-5' }
    },
    {
      accessor: 'phone',
      Header: `${i18next.t('label.Phone')}`,
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
      accessor: 'none',
      Header: '',
      disableSortBy: true,
      cellProps: {
        className: 'text-end'
      },
      Cell: rowData => {
        let idCompany = rowData.row.original.idCompany;
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
                  setIdCompany(idCompany);
                  setOpenModal(true);
                }}
              >
                <FontAwesomeIcon icon="pencil-alt" />
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
        data={companies}
        sortable
        pagination
        perPage={10}
      >
        <Card className="mb-3">
          <Card.Header>
            <Row className="flex-between-center">
              <Col xs={4} sm="auto" className="d-flex align-items-center pe-0">
                <h5 className="fs-0 mb-0 text-nowrap py-2 py-xl-0">
                  {' '}
                  label={i18next.t('label.Companies')}
                </h5>
              </Col>
              <Col xs={8} sm="auto" className="ms-auto text-end ps-0"></Col>
            </Row>
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
            (idCompany > 0 ? i18next.t('label.Edit') : i18next.t('label.Add')) +
            ' ' +
            i18next.t('label.Company')
          }
          openModal={openModal}
          closeModal={handleClose}
          setOpenAlert={setOpenAlert}
          setTypeAlert={setTypeAlert}
          setAlertMessage={setAlertMessage}
        >
          <EditCompany idCompany={idCompany} closeModal={handleClose} />
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

export default Companies;
