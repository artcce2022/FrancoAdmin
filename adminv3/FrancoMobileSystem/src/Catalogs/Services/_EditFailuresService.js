import axios from 'axios';
import classNames from 'classnames';
import IconButton from 'components/common/IconButton';
import { ServiceContext } from 'context/Context';
import GenericTableHeader from 'form-components/TableHeaders/GenericTableHeader';
import createMarkup from 'helpers/createMarkup';
import i18next from 'i18next';
import React, { useContext, useEffect, useState } from 'react';
import { Button, Card, Col, Row, Table } from 'react-bootstrap';
import MyModal from 'shared/Modal';
import { ApiEndpoint } from 'utils/ApiEndPont';
import AddFailureService from './_AddFailureService';
const URI = ApiEndpoint + 'failures/';
const EditFailuresService = () => {
  const [openModalFailure, setOpenModalFailure] = useState(false);
  const [idFailure, setIdFailure] = useState(0);
  const [failure, setFailure] = useState([]);
  const [indexToDelete, setIndexToDelete] = useState(-1);
  const { serviceId, failuresList, setFailuresList } =
    useContext(ServiceContext);

  const handleClose = () => {
    setOpenModalFailure(false);
  };

  const deleteFailure = rowId => {
    setIndexToDelete(rowId);
  };
  useEffect(() => {
    if (indexToDelete) {
      const dataDelete = [...failuresList];
      const index = failuresList
        .map(function (data) {
          return data.rowId;
        })
        .indexOf(indexToDelete);
      if (index < 0) return;
      dataDelete.splice(index, 1);
      setFailuresList([...dataDelete]);
    }
  }, [indexToDelete]);
  return (
    <>
      {' '}
      <Card className="mb-3">
        <Card.Header>
          <Row className="flex-between-center">
            <Col xs={4} sm="auto" className="d-flex align-items-center pe-0">
              <h5 className="fs-0 mb-0 text-nowrap py-2 py-xl-0">
                {i18next.t('label.Failures')}
              </h5>
            </Col>
            <Col xs={8} sm="auto" className="ms-auto text-end ps-0">
              <div id="orders-actions">
                <IconButton
                  variant="falcon-default"
                  size="sm"
                  icon="plus"
                  transform="shrink-3"
                  onClick={() => {
                    setIdFailure(0);
                    setOpenModalFailure(true);
                  }}
                >
                  <span className="d-none d-sm-inline-block ms-1">
                    {i18next.t('label.Add')}
                  </span>
                </IconButton>
              </div>
            </Col>
          </Row>{' '}
          <p
            className={classNames('mt-2', 'mb-0')}
            dangerouslySetInnerHTML={createMarkup(
              'Add Known Failures or Details '
            )}
          />
        </Card.Header>
        <Card.Body className="p-0">
          <Table responsive striped hover>
            <thead>
              <tr>
                <th scope="col">{i18next.t('label.Description')}</th>
                <th scope="col">{i18next.t('label.Categoria')}</th>
                <th scope="col">{i18next.t('label.Detalle')}</th>
                <th scope="col">{i18next.t('label.Price')}</th>
                <th scope="col">{i18next.t('label.Actions')}</th>
              </tr>
            </thead>
            <tbody>
              {failuresList.map(failure => (
                <tr className="align-middle">
                  <td className="text-nowrap">{failure.shortdescription}</td>
                  <td className="text-nowrap">
                    {failure.symptomscategory?.category}
                  </td>
                  <td className="text-nowrap">{failure.symtomdescription}</td>
                  <td className="text-nowrap">{failure.price}</td>
                  <td className="text-end">
                    <Button
                      variant="outlined"
                      onClick={() => {
                        deleteFailure(failure.rowId);
                      }}
                    >
                      Eliminar
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>{' '}
        </Card.Body>
      </Card>
      {openModalFailure && (
        <MyModal
          id="id_myModal"
          title={
            idFailure > 0
              ? i18next.t('label.Edit') +
                ' ' +
                i18next.t('label.CommnonFailure')
              : i18next.t('label.Add') + ' ' + i18next.t('label.CommnonFailure')
          }
          openModal={openModalFailure}
          closeModal={handleClose}
        >
          <AddFailureService
            idSymptomCategoryDefault={0}
            idFailure={idFailure}
            closeModal={handleClose}
          />
        </MyModal>
      )}
    </>
  );
};

export default EditFailuresService;
