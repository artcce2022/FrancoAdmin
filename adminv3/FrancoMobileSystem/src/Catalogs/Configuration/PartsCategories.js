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
import EditPartCategory from './_EditPartCategory.js';
import AlertNotification from 'form-components/AlertNotification.js';
import ConfirmAction from 'form-components/ConfirmationModal.js';
import { ApiEndpoint } from 'utils/ApiEndPont.js';
// import EditCustomer from './_EditCustomer.js';

const URI = ApiEndpoint + 'partscategories/';

const PartsCategories = () => {
  const [partsCategories, setPartsCategories] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [openConfirm, setOpenConfirm] = useState(null);
  const [openAlert, setOpenAlert] = useState(false);
  const [typeAlert, setTypeAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState(false);
  const [idPartCategoryDelete, setIdPartCategoryToDelete] = useState(0);

  let [idPartCategory, setIdPartCategory] = useState(0);
  const handleClose = () => {
    setOpenModal(false);
    getPartsCategoriesList();
  };

  useEffect(() => {
    getPartsCategoriesList();
  }, []);
  const handleCloseConfirm = () => {
    setOpenConfirm(false);
    getPartsCategoriesList();
  };
  const DeleteConfirmed = isConfirmed => {
    if (!isConfirmed) {
      return;
    }
    axios
      .delete(URI + idPartCategoryDelete)
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
        getPartsCategoriesList();
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const handleCloseAlert = () => {
    setOpenAlert(false);
  };
  //mostrar companies
  const getPartsCategoriesList = async () => {
    const res = await axios.get(URI);
    setPartsCategories(res.data);
  };

  const columns = [
    {
      accessor: 'category',
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
        let idpartscategory = rowData.row.original.idpartscategory;
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
                  setIdPartCategory(idpartscategory);
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
                  setIdPartCategoryToDelete(idpartscategory);
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
        data={partsCategories}
        sortable
        pagination
        perPage={10}
      >
        <Card className="mb-3">
          <Card.Header>
            <GenericTableHeader
              label={i18next.t('label.PartsCategories')}
              newFunction={() => {
                setIdPartCategory(0);
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
            (idPartCategory > 0
              ? i18next.t('label.Edit')
              : i18next.t('label.Add')) +
            ' ' +
            i18next.t('label.PartCategory')
          }
          openModal={openModal}
          closeModal={handleClose}
        >
          <EditPartCategory
            idPartCategory={idPartCategory}
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

export default PartsCategories;
