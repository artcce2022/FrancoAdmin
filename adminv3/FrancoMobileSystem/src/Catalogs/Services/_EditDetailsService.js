import axios from 'axios';
import PageHeader from 'components/common/PageHeader';
import { ServiceContext } from 'context/Context';
import GenericTableHeader from 'form-components/TableHeaders/GenericTableHeader';
import i18next from 'i18next';
import React, { useContext, useEffect, useState } from 'react';
import { Button, Card, Col, Row, Table } from 'react-bootstrap';
import MyModal from 'shared/Modal';
import { ApiEndpoint } from 'utils/ApiEndPont';
import AddDetailService from './_AddDetailService';
import createMarkup from 'helpers/createMarkup';
import classNames from 'classnames';
const URI = ApiEndpoint + 'failures/';
const EditDetailsService = () => {
  const [openModalDetail, setOpenModalDetail] = useState(false);
  const [detail, setDetail] = useState([]);
  const [indexToDelete, setIndexToDelete] = useState(-1);
  const { serviceId, detailList, setDetailList } = useContext(ServiceContext);

  const handleClose = () => {
    setOpenModalDetail(false);
  };
  const deleteDetail = rowId => {
    setIndexToDelete(rowId);
  };

  useEffect(() => {
    const dataDelete = [...detailList];
    const index = detailList
      .map(function (data) {
        return data.rowId;
      })
      .indexOf(indexToDelete);
    if (index < 0) return;
    dataDelete.splice(index, 1);
    setDetailList([...dataDelete]);
  }, [indexToDelete]);
  return (
    <>
      {' '}
      <Card className="mb-3">
        <Card.Header>
          <GenericTableHeader
            label={i18next.t('label.Details')}
            newFunction={() => {
              setOpenModalDetail(true);
            }}
          />
          <p
            className={classNames('mt-2', 'mb-0')}
            dangerouslySetInnerHTML={createMarkup(
              'Please provide information related to the vehicle that can help the technical or administrative staff to do their best work'
            )}
          />
        </Card.Header>
        <Card.Body>
          <Row>
            <Table responsive striped hover>
              <thead>
                <tr>
                  <th scope="col">{i18next.t('label.Description')}</th>
                  <th scope="col">{i18next.t('label.Actions')}</th>
                </tr>
              </thead>
              <tbody>
                {detailList.map(detail => (
                  <tr className="align-middle">
                    <td className="text-nowrap">{detail.description}</td>
                    <td className="text-end">
                      <Button
                        variant="outlined"
                        onClick={() => {
                          deleteDetail(detail.rowId);
                        }}
                      >
                        Eliminar
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Row>
        </Card.Body>
      </Card>
      {openModalDetail && (
        <MyModal
          id="id_myModal"
          title={i18next.t('label.Add') + ' ' + i18next.t('label.Detail')}
          openModal={openModalDetail}
          closeModal={handleClose}
        >
          <AddDetailService closeModal={handleClose} />
        </MyModal>
      )}
    </>
  );
};

export default EditDetailsService;
