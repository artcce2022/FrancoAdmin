import axios from 'axios';
import AlertNotification from 'form-components/AlertNotification';
import GenericTableHeader from 'form-components/TableHeaders/GenericTableHeader';
import i18next from 'i18next';
import React, { useEffect, useState } from 'react';
import { Card } from 'react-bootstrap';
import MyModal from 'shared/Modal';
import { ApiEndpoint } from 'utils/ApiEndPont';
import AddDetailServiceOnEdit from './_AddDetailServiceOnEdit';

const ServiceDetailsList = ({ idService }) => {
  const [detailList, setDetailList] = useState([]);
  const [openModalDetail, setOpenModalDetail] = useState(0);
  const [openAlert, setOpenAlert] = useState(false);
  const [typeAlert, setTypeAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState(false);

  const URI = ApiEndpoint + 'services/details/';
  useEffect(() => {
    getServiceDetails();
  }, []);

  const getServiceDetails = () => {
    console.log(URI + idService);
    axios.get(URI + idService).then(response => {
      let details = response.data;
      console.log(details);
      setDetailList(details);
      // setIdsymptomcategory(response.data.idsymptomcategory);
    });
  };

  const handleClose = () => {
    setOpenModalDetail(false);
    getServiceDetails();
  };

  const handleCloseAlert = () => {
    setOpenAlert(false);
  };

  return (
    <>
      <Card className="mb-3">
        <Card.Header>
          <GenericTableHeader
            label={i18next.t('label.Details')}
            newFunction={() => {
              setOpenModalDetail(true);
            }}
          />
        </Card.Header>
        <Card.Body className="p-0">
          <ul class="list-group">
            {detailList.map((detail, index) => (
              <li
                class="list-group-item d-flex justify-content-between align-items-center"
                key={detail.idservicedetail}
              >
                {detail.detail}
              </li>
            ))}{' '}
          </ul>
        </Card.Body>
      </Card>
      {openModalDetail && (
        <MyModal
          id="id_myModal"
          title={i18next.t('label.EditFailure')}
          openModal={openModalDetail}
          closeModal={handleClose}
        >
          <AddDetailServiceOnEdit
            setOpenAlert={setOpenAlert}
            setTypeAlert={setTypeAlert}
            setAlertMessage={setAlertMessage}
            closeModal={handleClose}
            idService={idService}
          />
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
    </>
  );
};

export default ServiceDetailsList;
