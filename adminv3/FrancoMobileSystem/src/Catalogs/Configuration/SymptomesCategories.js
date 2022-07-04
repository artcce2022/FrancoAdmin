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
import EditSymptomCategory from './_EditSymptomCategory.js';
import ConfirmAction from 'form-components/ConfirmationModal.js';
import AlertNotification from 'form-components/AlertNotification.js';
import { ApiEndpoint } from 'utils/ApiEndPont.js';
// import EditCustomer from './_EditCustomer.js';

const URI = ApiEndpoint + 'scategories/';

const SymptomCategories = () => {
  const [symptomcategories, setSymptomCategories] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  let [idSymptomCategory, setIdSymptomCategory] = useState(0);
  const [openAlert, setOpenAlert] = useState(false);
  const [typeAlert, setTypeAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState(false);
  const [openConfirm, setOpenConfirm] = useState(null);
  const [idSymptomCategoryToDelete, setIdSymptomCategoryToDelete] = useState(0);

  const handleClose = () => {
    setOpenModal(false);
    getSymptomCategoriesList();
  };

  useEffect(() => {
    getSymptomCategoriesList();
  }, []);

  const handleCloseConfirm = () => {
    setOpenConfirm(false);
    getSymptomCategoriesList();
  };

  const DeleteConfirmed = isConfirmed => {
    if (!isConfirmed) {
      return;
    }
    axios
      .delete(URI + idSymptomCategoryToDelete)
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
        getSymptomCategoriesList();
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const handleCloseAlert = () => {
    setOpenAlert(false);
  };
  //mostrar companies
  const getSymptomCategoriesList = async () => {
    const res = await axios.get(URI);
    setSymptomCategories(res.data);
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
                  setIdSymptomCategory(idsymptomcategory);
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
                  setIdSymptomCategoryToDelete(idsymptomcategory);
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
        data={symptomcategories}
        sortable
        pagination
        perPage={10}
      >
        <Card className="mb-3">
          <Card.Header>
            <GenericTableHeader
              label={i18next.t('label.SymptomsCategories')}
              newFunction={() => {
                setIdSymptomCategory(0);
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
            (idSymptomCategory > 0
              ? i18next.t('label.Edit')
              : i18next.t('label.Add')) +
            ' ' +
            i18next.t('label.SymptomCategory')
          }
          openModal={openModal}
          closeModal={handleClose}
        >
          <EditSymptomCategory
            idSymptomCategory={idSymptomCategory}
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

export default SymptomCategories;
