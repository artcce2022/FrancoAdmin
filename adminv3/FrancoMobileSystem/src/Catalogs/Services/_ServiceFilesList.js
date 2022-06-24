import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import GenericTableHeader from 'form-components/TableHeaders/GenericTableHeader';
import i18next from 'i18next';
import React, { useEffect, useState } from 'react';
import { Button, Card } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import MyModal from 'shared/Modal';
import { ApiEndpoint } from 'utils/ApiEndPont';

const ServiceFilesList = ({
  idService,
  setOpenModal,
  serviceGuid,
  refreshFiles,
  setRefreshFiles
}) => {
  const [serviceFiles, setServiceFiles] = useState([]);
  const [selectedTile, setSelectedTile] = useState(null);
  const { control } = useForm();
  const [confirmOpen, setConfirmOpen] = useState(null);
  const [file, setFile] = useState(null);
  const URI = ApiEndpoint + 'services/files/';
  const URIFiles = ApiEndpoint + 'services/getfile';
  useEffect(() => {
    getServiceFiles();
  }, []);
  useEffect(() => {
    if (refreshFiles === true) {
      getServiceFiles();
      setRefreshFiles(false);
    }
  }, [refreshFiles]);
  const getServiceFiles = () => {
    console.log(URI + idService);
    axios.get(URI + idService).then(response => {
      let details = response.data;
      console.log(details);
      setServiceFiles(details);
      // setIdsymptomcategory(response.data.idsymptomcategory);
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

  const handleClickOpen = tile => {
    console.log('clicked');
    console.log(tile);
    setSelectedTile(tile);
  };

  const handleClose = () => {
    setSelectedTile(null);
  };
  return (
    <>
      <Card className="mb-3">
        <Card.Header>
          <GenericTableHeader
            label={i18next.t('label.Files')}
            newFunction={() => {
              setOpenModal(true);
            }}
          />
        </Card.Header>
        <Card.Body className="p-0">
          <div class="table-responsive scrollbar">
            <table class="table table-hover">
              <thead>
                <tr>
                  <th scope="col">Name</th>
                  <th scope="col">Description</th>
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
                                  return (
                                    <img
                                      class="rounded-circle"
                                      src="../../assets/img/team/4.jpg"
                                      alt=""
                                    />
                                  );
                                case 'application/pdf':
                                  return (
                                    <img
                                      class="rounded-circle"
                                      src="../../assets/img/team/4.jpg"
                                      alt=""
                                    />
                                  );
                                default:
                                  return (
                                    <img
                                      class="rounded-circle"
                                      src="../../assets/img/team/4.jpg"
                                      alt=""
                                    />
                                  );
                              }
                            })()}
                          </div>
                          <div class="ms-2">{file.filename}</div>
                        </div>
                      </td>
                      <td class="align-middle text-nowrap">
                        {file.description}
                      </td>
                      <td class="w-auto">
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
    </>
  );
};

export default ServiceFilesList;
