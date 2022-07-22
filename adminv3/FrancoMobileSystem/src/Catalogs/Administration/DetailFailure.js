import axios from 'axios';
import FalconComponentCard from 'components/common/FalconComponentCard';
import IconButton from 'components/common/IconButton';
import PageHeader from 'components/common/PageHeader';
import i18next from 'i18next';
import React, { useEffect, useState } from 'react';
import { Button, Col, Row } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import MyModal from 'shared/Modal';
import { ApiEndpoint } from 'utils/ApiEndPont';
import CommonFailureLaborsList from './_CommonFailuresLabor';
import CommonFailurePartsList from './_CommonFailuresParts';
import EditCommonFailure from './_EditCommonFailure';

const DetailCommonFailure = () => {
  const [openModal, setOpenModal] = useState(false);
  const [idFailure, setIdFailure] = useState(null);
  const [commonFailure, setCommonFailure] = useState(null);
  const [openAlert, setOpenAlert] = useState(false);
  const [typeAlert, setTypeAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState(false);

  const [openModalOrder, setOpenModalOrder] = useState(false);
  let { id } = useParams();
  const URI = ApiEndpoint + 'failures/' + id;
  const handleClose = () => {
    setOpenModal(false);
    getCommonFailureD();
  };

  //mostrar companies
  useEffect(() => {
    getCommonFailureD();
  }, []);

  const getCommonFailureD = () => {
    axios.get(URI).then(response => {
      let failure = response.data;
      console.log('getCommonFailureD');
      console.log(failure);
      setIdFailure(failure.idcommonfailures);
      setCommonFailure(failure);
    });
  };

  return (
    <>
      {commonFailure && (
        <>
          <PageHeader
            title={i18next.t('label.CommonFailure')}
            titleTag="h5"
            className="mb-3"
          >
            <Row>
              <Col md>
                <p className="fs--1 mt-1">{commonFailure.shortdescription}</p>
                <div>
                  <strong className="me-2">
                    {i18next.t('label.Description')}{' '}
                  </strong>
                  <p className="fs--1 mt-1">
                    {commonFailure.symtomdescription}
                  </p>
                </div>
                <div>
                  <strong className="me-2">
                    {i18next.t('label.Category')}{' '}
                  </strong>
                  <p className="fs--1 mt-1">
                    {commonFailure.symptomscategory?.category}
                  </p>
                </div>
              </Col>{' '}
              <Col lg></Col>
              <Col xs="auto">
                <IconButton
                  variant="falcon-default"
                  size="sm"
                  icon="pencil"
                  iconClassName="me-1"
                  className="me-1 mb-2 mb-sm-0"
                  onClick={() => {
                    setOpenModal(true);
                  }}
                >
                  Edit
                </IconButton>
              </Col>
            </Row>
          </PageHeader>
          <Row className="g-3 mb-3">
            <Col lg={12}>
              <FalconComponentCard
                noGuttersBottom
                style={{ minHeight: 500, maxHeight: 500, overflow: 'auto' }}
              >
                <FalconComponentCard.Body
                  children={
                    idFailure && (
                      <CommonFailureLaborsList idCommonFailure={idFailure} />
                    )
                  }
                />
              </FalconComponentCard>
            </Col>
          </Row>
          <Row className="g-3 mb-3">
            <Col lg={12}>
              <FalconComponentCard
                noGuttersBottom
                style={{ minHeight: 500, maxHeight: 500, overflow: 'auto' }}
              >
                <FalconComponentCard.Body
                  children={
                    idFailure && (
                      <CommonFailurePartsList idCommonFailure={idFailure} />
                    )
                  }
                />
              </FalconComponentCard>
            </Col>
          </Row>
        </>
      )}
      {openModal && (
        <MyModal
          id="id_myModal"
          title={i18next.t('label.Edit') + i18next.t('label.faultCommons')}
          openModal={openModal}
          closeModal={handleClose}
        >
          <EditCommonFailure
            setOpenAlert={setOpenAlert}
            setTypeAlert={setTypeAlert}
            setAlertMessage={setAlertMessage}
            idCommonFailure={id}
            closeModal={handleClose}
          />
        </MyModal>
      )}
    </>
  );
};

export default DetailCommonFailure;
