import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import classNames from 'classnames';
import AdvanceTable from 'components/common/advance-table/AdvanceTable';
import AdvanceTablePagination from 'components/common/advance-table/AdvanceTablePagination';
import AdvanceTableWrapper from 'components/common/advance-table/AdvanceTableWrapper';
import SoftBadge from 'components/common/SoftBadge';
import ServicesTableHeader from 'form-components/TableHeaders/ServicesTableHeader';
import i18next from 'i18next';
import { useEffect, useState } from 'react';
import { Card } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { ApiEndpoint } from 'utils/ApiEndPont';

const URI = ApiEndpoint + 'services/';
const columns = [
  {
    accessor: 'service',
    Header: `${i18next.t('label.serviceorder')}`, //Header: 'Info'
    headerProps: { className: 'pe-1' },
    cellProps: {
      className: 'py-2'
    },
    Cell: rowData => {
      return (
        <>
          <Link to={'/ServiceDetail/' + rowData.row.original.serviceid}>
            <strong>{rowData.row.original.serviceid}</strong>
          </Link>{' '}
          <p className="mb-0 text-500">
            {rowData.row.original.datecreate || ''}
          </p>
          <strong>
            {rowData.row.original.vehicle.vin}-
            {rowData.row.original.vehicle.make}-
            {rowData.row.original.vehicle.model}
          </strong>
        </>
      );
    }
  },
  {
    accessor: 'customer',
    Header: 'Customer',
    headerProps: { className: 'pe-7' },
    Cell: rowData => {
      return (
        <>
          <strong>{rowData.row.original.customer.company}</strong>
          <p className="mb-0 text-500">
            {rowData.row.original.customer.address}-{' '}
            {rowData.row.original.customer.shortname}
          </p>
        </>
      );
    }
  },
  {
    accessor: 'locationName',
    Header: 'Location',
    headerProps: { className: 'pe-7' },
    Cell: rowData => {
      return (
        <>
          <strong>{rowData.row.original.location.locationName}</strong>
          <p className="mb-0 text-500">{rowData.row.original.recibe}</p>
        </>
      );
    }
  },
  {
    accessor: 'status',
    Header: 'Status',
    headerProps: {
      className: 'text-center'
    },
    cellProps: {
      className: 'fs-0'
    },
    Cell: rowData => {
      const status = rowData.row.original.servicestatus.idservicestatus;
      return (
        <SoftBadge
          pill
          bg={classNames({
            success: status === 1,
            primary: status === 2,
            warning: status === 3,
            secondary: status === 4,
            info: status === 5
          })}
          className="d-block"
        >
          {status === 1 && `${i18next.t('status.InProccess')}`}
          {status === 2 && `${i18next.t('status.InLocation')}`}
          {status === 3 && `${i18next.t('status.InExternalService')}`}
          {status === 4 && `${i18next.t('status.Canceled')}`}
          {status === 5 && `${i18next.t('status.Completed')}`}
          <FontAwesomeIcon
            icon={classNames({
              check: status === `${i18next.t('status.Completed')}`,
              redo: status === `${i18next.t('status.InLocation')}`,
              stream: status === `${i18next.t('status.InExternalService')}`,
              ban: status === `${i18next.t('status.Canceled')}`,
              ban: status === `${i18next.t('status.InProccess')}`
            })}
            transform="shrink-2"
            className="ms-1"
          />
        </SoftBadge>
      );
    }
  },
  {
    accessor: 'none',
    Header: '',
    disableSortBy: true,
    cellProps: {
      className: 'text-end'
    },
    Cell: rowData => {
      return (
        <>
          <strong>{rowData.row.original.location.locationName}</strong>
          <p className="mb-0 text-500">{rowData.row.original.recibe}</p>
        </>
      );
    }
  }
];

const ServicesList = () => {
  const [services, setServices] = useState([]);
  let navigate = useNavigate();
  //mostrar companies
  const getServices = async () => {
    const res = await axios.get(URI);
    setServices(res.data);
  };

  useEffect(() => {
    getServices();
  }, []);
  const routeChange = idCustomerNew => {
    console.log(idCustomerNew);
    let path = `/ServiceDetail/` + idCustomerNew;
    navigate(path);
  };
  return (
    <AdvanceTableWrapper
      columns={columns}
      data={services}
      sortable
      pagination
      perPage={10}
    >
      <Card className="mb-3">
        <Card.Header>
          <ServicesTableHeader table />
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
  );
};

export default ServicesList;
