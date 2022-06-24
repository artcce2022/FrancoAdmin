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
import EditCommonFailure from './_EditCommonFailure.js';
import { ApiEndpoint } from 'utils/ApiEndPont.js';
// import EditCustomer from './_EditCustomer.js';

const URI = ApiEndpoint + 'failures/';

const CommonFailures = () => {
  const [CommonFailures, setCommonFailures] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  let [idCommonFailure, setIdCommonFailure] = useState(0);
  const [idSymptomCategoryDefault, setIdSymptomCategoryDefault] = useState(0);
  const handleClose = () => {
    setOpenModal(false);
    getCommonFailuresList();
  };

  useEffect(() => {
    getCommonFailuresList();
  }, []);

  //mostrar companies
  const getCommonFailuresList = async () => {
    const res = await axios.get(URI);
    setCommonFailures(res.data);
    console.log(res.data);
  };
  const columns = [
    {
      accessor: 'shortdescription',
      Header: `${i18next.t('label.Description')}`,
      headerProps: { style: { minWidth: '200px' }, className: 'ps-5' },
      cellProps: { className: 'ps-5' }
    },
    {
      accessor: 'symptomscategory.category',
      Header: `${i18next.t('label.Categoria')}`,
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
        let idcommonfailures = rowData.row.original.idcommonfailures;
        let idsymptomcategory = rowData.row.original.idsymptomcategory;
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
                  setIdCommonFailure(idcommonfailures);
                  setIdSymptomCategoryDefault(idsymptomcategory);
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
                  setIdCommonFailure(idcommonfailures);
                  setOpenModal(true);
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
        data={CommonFailures}
        sortable
        pagination
        perPage={10}
      >
        <Card className="mb-3">
          <Card.Header>
            <GenericTableHeader
              label={i18next.t('label.CommonFailures')}
              newFunction={() => {
                setIdCommonFailure(0);
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
            (idCommonFailure > 0
              ? i18next.t('label.Edit')
              : i18next.t('label.Add')) +
            ' ' +
            i18next.t('label.CommonFailure')
          }
          openModal={openModal}
          closeModal={handleClose}
        >
          <EditCommonFailure
            idCommonFailure={idCommonFailure}
            idsymptomcategorydefault={idSymptomCategoryDefault}
            closeModal={handleClose}
          />
        </MyModal>
      )}
    </>
  );
};

export default CommonFailures;
