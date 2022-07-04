import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import GenericTableHeader from 'form-components/TableHeaders/GenericTableHeader';
import i18next from 'i18next';
import React, { useEffect, useState } from 'react';
import { Button, Card } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import MyModal from 'shared/Modal';
import { ApiEndpoint } from 'utils/ApiEndPont';
import AddServiceFile from './_AddServiceFile';
import pdfImg from '../../assets/img/icons/pdf.png';
import genericFile from '../../assets/img/icons/genericFile.png';

const ServiceFilesList = ({ idService, setOpenModal, serviceGuid }) => {
  const [serviceFiles, setServiceFiles] = useState([]);
  const { control } = useForm();
  const [confirmOpen, setConfirmOpen] = useState(null);
  const [file, setFile] = useState(null);
  const [openModalFile, setOpenModalFile] = useState(false);
  const [refreshFiles, setRefreshFiles] = useState(false);
  const [openAlert, setOpenAlert] = useState(false);
  const [typeAlert, setTypeAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState(false);
  const [idToChangeVisibility, setIdToChangeVisibility] = useState(false);
  const [fileVisibility, setFileVisibility] = useState(false);
  const URI = ApiEndpoint + 'services/files/';
  const URIFiles = ApiEndpoint + 'services/getfile';
  const handleClose = () => {
    setOpenModalFile(false);
    getServiceFiles();
  };

  useEffect(() => {
    getServiceFiles();
  }, []);

  useEffect(() => {
    if (idToChangeVisibility && idToChangeVisibility > 0) {
      const URIVis = ApiEndpoint + 'services/filevisibility/';
      axios
        .put(URIVis + idToChangeVisibility, {
          visibilitycustomer: fileVisibility
        })
        .then(response => {
          setRefreshFiles(true);
        });
    }
  }, [idToChangeVisibility]);

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

  const handleDownload = (url, filename) => {
    const config = { responseType: 'blob', path: url };
    // axios.post(URIFiles, config).then(response => {
    //     new File(response, filename);
    // });

    axios({
      url: URIFiles,
      method: 'POST',
      data: config,
      responseType: 'blob' // important
    }).then(response => {
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', filename);
      document.body.appendChild(link);
      link.click();
    });
  };

  const handleDeleteFile = (url, filename, idservicefile) => {
    // axios.post(URIFiles, config).then(response => {
    //     new File(response, filename);
    // });
    const URIDelete = ApiEndpoint + 'services/file/' + idservicefile;
    axios
      .delete(URIDelete, {
        url: url,
        filename: filename,
        idservicefile: idservicefile
      })
      .then(function (response) {
        console.log(response);
        getServiceFiles();
        setRefreshFiles(false);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  return (
    <>
      <Card className="mb-3">
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
                    <tr class="hover-actions-trigger">
                      <td class="align-middle text-nowrap">
                        <div class="d-flex align-items-center">
                          <div class="avatar avatar-xl">
                            {(() => {
                              switch (file.filetype) {
                                case 'image/png':
                                case 'image/jpeg':
                                  return (
                                    <img
                                      className="img-thumbnail"
                                      src={
                                        'http://127.0.0.1:8080/' +
                                        file.path +
                                        file.filename
                                      }
                                      alt=""
                                    />
                                  );
                                case 'application/pdf':
                                  return (
                                    <img
                                      className="img-thumbnail"
                                      src={pdfImg}
                                      alt=""
                                    />
                                  );
                                default:
                                  return (
                                    <img
                                      className="rounded-circle"
                                      src={genericFile}
                                      alt=""
                                    />
                                  );
                              }
                            })()}
                          </div>
                        </div>
                      </td>
                      <td>
                        <h6 className="mb-1">
                          <span className="  fw-semi-bold">
                            {file.filename}
                          </span>
                        </h6>
                        <div className="fs--1">
                          <span className="fw-semi-bold">
                            {file.description}
                          </span>
                        </div>
                      </td>
                      <td class="align-middle text-nowrap">
                        {file.visibilitycustomer ? 'visible' : 'No Visible'}
                      </td>
                      <td>
                        <Button
                          variant="falcon-default"
                          size="sm"
                          onClick={() => {
                            handleDownload(
                              file.path + file.filename,
                              file.filename
                            );
                          }}
                        >
                          <FontAwesomeIcon icon="cloud-download-alt" />
                        </Button>
                        <Button
                          variant="falcon-default"
                          size="sm"
                          onClick={() => {
                            setFile(file);
                            setConfirmOpen(true);
                          }}
                        >
                          <FontAwesomeIcon icon="trash-alt" />
                        </Button>
                        <Button
                          variant="falcon-default"
                          size="sm"
                          title={
                            file.visibilitycustomer
                              ? i18next.t('label.MakeHidden')
                              : i18next.t('label.MakeVisible')
                          }
                          onClick={() => {
                            setFileVisibility(file.visibilitycustomer);
                            setIdToChangeVisibility(file.idservicefile);
                          }}
                        >
                          {file.visibilitycustomer ? (
                            <FontAwesomeIcon icon={['fa', 'eye']} />
                          ) : (
                            <FontAwesomeIcon icon={['fa', 'eye']} />
                          )}
                        </Button>
                      </td>
                    </tr>
                  </>
                ))}
              </tbody>
            </table>
          </div>{' '}
        </Card.Body>
      </Card>{' '}
      {confirmOpen && (
        <MyModal
          id="id_myModal"
          title={i18next.t('label.ConfirmDelete')}
          openModal={confirmOpen}
          isConfirm={true}
          closeModal={setConfirmOpen}
          onConfirm={() => {
            handleDeleteFile(
              file.path + file.filename,
              file.filename,
              file.idservicefile
            );
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
