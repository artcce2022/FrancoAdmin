import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import GenericTableHeader from 'form-components/TableHeaders/GenericTableHeader';
import i18next from 'i18next';
import React, { useContext, useEffect, useState } from 'react';
import { Button, Card } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import MyModal from 'shared/Modal';
import { ApiEndpoint } from 'utils/ApiEndPont';
import AddServiceFile from './_AddServiceFile';
import pdfImg from '../../assets/img/icons/pdf.png';
import genericFile from '../../assets/img/icons/genericFile.png';
import { EditServiceContext } from 'context/Context';

const ServiceFilesList = ({ idService, setOpenModal, serviceGuid }) => {
  const {
    openAlert,
    setOpenAlert,
    typeAlert,
    setTypeAlert,
    alertMessage,
    setAlertMessage,
    setHandleCloseAlert
  } = useContext(EditServiceContext);
  const [serviceFiles, setServiceFiles] = useState([]);
  const { control } = useForm();
  const [confirmOpen, setConfirmOpen] = useState(null);
  const [file, setFile] = useState(null);
  const [openModalFile, setOpenModalFile] = useState(false);
  const [refreshFiles, setRefreshFiles] = useState(false);
  const [confirmVisible, setConfirmVisible] = useState(false);
  const [idToChangeVisibility, setIdToChangeVisibility] = useState(false);
  const [idPreToChangeVisibility, setIdPreToChangeVisibility] = useState(false);
  const [fileVisibility, setFileVisibility] = useState(false);
  const URI = ApiEndpoint + 'services/files/';
  const URIFiles = ApiEndpoint + 'services/getfile';
  const handleClose = () => {
    setOpenModalFile(false);
    getServiceFiles();
    setConfirmVisible(false);
  };

  useEffect(() => {
    getServiceFiles();
  }, []);

  useEffect(() => {
    if (refreshFiles) {
      getServiceFiles();
      setRefreshFiles(false);
    }
  }, [refreshFiles]);

  const getServiceFiles = () => {
    console.log(URI + idService);
    axios.get(URI + idService).then(response => {
      let details = response.data;
      setServiceFiles(details);
    });
  };
  return (
    <>
      {/* <Card className="mb-3">
        <Card.Header>
          <GenericTableHeader
            label={i18next.t('label.AttachedFiles')}
            newFunction={() => {
              setOpenModalFile(true);
            }}
          />
        </Card.Header>
        <Card.Body className="p-0" style={{ height: 350 }}>
          <div class="table-responsive scrollbar">
            <table class="table table-hover">
              <thead>
                <tr>
                  <th scope="col"></th>
                  <th scope="col">{i18next.t('label.FileName')}</th>
                  <th scope="col">{i18next.t('label.VisibleToCustomer')}</th>
                  <th scope="col"> </th>
                </tr>
              </thead>
              <tbody>
                {serviceFiles.map((file, index) => (
                  <>
                   <div className="overflow-hidden">
          <ProductImage
            name={name}
            id={id}
            isNew={isNew}
            files={files}
            layout="grid"
          />
          <div className="p-3">
            <h5 className="fs-0">
              <Link
                className="text-dark"
                to={`/e-commerce/product/product-details/${id}`}
              >
                {name}
              </Link>
            </h5>
            <p className="fs--1 mb-3">
              <Link to="#!" className="text-500">
                {category}
              </Link>
            </p>
            <h5 className="fs-md-2 text-warning mb-0 d-flex align-items-center mb-3">
              {`$${salePrice ? salePrice : price}`}
              {salePrice && <del className="ms-2 fs--1 text-500">${price}</del>}
            </h5>
            <p className="fs--1 mb-1">
              Shipping Cost: <strong>${shippingCost}</strong>
            </p>
            <p className="fs--1 mb-1">
              Stock:{' '}
              <strong
                className={classNames({
                  'text-success': isInStock,
                  'text-danger': !isInStock
                })}
              >
                {isInStock ? 'Available' : 'Sold-Out'}
              </strong>
            </p>
          </div>
        </div>
                  </>
                ))}
              </tbody>
            </table>
          </div>{' '}
        </Card.Body>
      </Card> */}
      {confirmVisible && (
        <MyModal
          id="id_myModal"
          title={i18next.t('label.ConfirmChangeVisibility')}
          openModal={confirmVisible}
          isConfirm={true}
          closeModal={handleClose}
          onConfirm={() => {
            setIdToChangeVisibility(idPreToChangeVisibility);
          }}
        ></MyModal>
      )}
      {confirmOpen && (
        <MyModal
          id="id_myModal"
          title={i18next.t('label.ConfirmDelete')}
          openModal={confirmOpen}
          isConfirm={true}
          closeModal={handleClose}
          onConfirm={() => {
            setConfirmOpen(false);
          }}
        ></MyModal>
      )}
      {openModalFile && (
        <MyModal
          id="id_myModalFile"
          title={i18next.t('label.AddFile')}
          openModal={openModalFile}
          closeModal={handleClose}
        >
          <AddServiceFile
            idService={idService}
            serviceGuid={serviceGuid}
            closeModal={handleClose}
            setOpenAlert={setOpenAlert}
            setTypeAlert={setTypeAlert}
            setAlertMessage={setAlertMessage}
          ></AddServiceFile>
        </MyModal>
      )}
    </>
  );
};

export default ServiceFilesList;
