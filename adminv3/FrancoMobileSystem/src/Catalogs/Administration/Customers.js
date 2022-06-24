import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Button,
  Card,
  Dropdown,
  OverlayTrigger,
  Tooltip
} from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import CardDropdown from 'components/common/CardDropdown';
import AdvanceTableWrapper from 'components/common/advance-table/AdvanceTableWrapper';
import GenericTableHeader from '../../form-components/TableHeaders/GenericTableHeader.js';
import AdvanceTablePagination from 'components/common/advance-table/AdvanceTablePagination';
import AdvanceTable from 'components/common/advance-table/AdvanceTable';
import MyModal from 'shared/Modal.js';
import EditCustomer from './_EditCustomer.js';
import i18next from 'i18next';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ApiEndpoint } from 'utils/ApiEndPont.js';
// import EditCustomer from './_EditCustomer.js';

const URI = ApiEndpoint + 'customers/';

const Customers = () => {
  const [customers, setCustomers] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  let [idCustomer, setIdCustomer] = useState(0);
  let navigate = useNavigate();
  const routeChange = idCustomerNew => {
    console.log(idCustomerNew);
    let path = `/CustomerDetail/` + idCustomerNew;
    navigate(path);
  };
  const columns = [
    {
      accessor: 'shortname',
      Header: i18next.t('label.Name'),
      headerProps: { style: { minWidth: '200px' }, className: 'ps-5' },
      cellProps: { className: 'ps-5' }
    },
    {
      accessor: 'company',
      Header: i18next.t('label.Company'),
      headerProps: { style: { minWidth: '200px' }, className: 'ps-5' },
      cellProps: { className: 'ps-5' }
    },
    {
      accessor: 'city',
      Header: i18next.t('label.City'),
    },
    {
      accessor: 'none',
      Header: '',
      disableSortBy: true,
      cellProps: {
        className: 'text-end'
      },
      Cell: rowData => {
        let idcustomer = rowData.row.original.idcustomer;
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
                  setIdCustomer(idcustomer);
                  setOpenModal(true);
                }}
              >
                <FontAwesomeIcon icon="pencil-alt" />
              </Button>
            </OverlayTrigger>
            <OverlayTrigger
              placement="top"
              overlay={<Tooltip>{i18next.t('label.Detalle')}</Tooltip>}
            >
              <Button
                variant="falcon-default"
                size="sm"
                onClick={() => {
                  setIdCustomer(idcustomer);
                  routeChange(idcustomer);
                }}
              >
                <FontAwesomeIcon icon="info" />
              </Button>
            </OverlayTrigger>
          </>
        );
      }
    }
  ];
  const handleClose = () => {
    setOpenModal(false);
    getCustomers();
  };

  const getCustomers = () => {
    axios.get(URI).then(response => {
      setCustomers(response.data);
    });
  };

  useEffect(() => {
    getCustomers();
  }, []);
  return (
    <>
      <AdvanceTableWrapper
        columns={columns}
        data={customers}
        sortable
        pagination
        perPage={10}
      >
        <Card className="mb-3">
          <Card.Header>
            <GenericTableHeader
              label={i18next.t('label.Customers')}
              newFunction={() => {
                setIdCustomer(0);
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
            (idCustomer > 0
              ? i18next.t('label.Edit')
              : i18next.t('label.Add')) +
            ' ' +
            i18next.t('label.Customer')
          }
          openModal={openModal}
          closeModal={handleClose}
        >
          <EditCustomer idCustomer={idCustomer} closeModal={handleClose} />
        </MyModal>
      )}
    </>
  );
};

export default Customers;
