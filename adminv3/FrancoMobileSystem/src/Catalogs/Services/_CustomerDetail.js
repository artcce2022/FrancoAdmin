import axios from 'axios';
import PageHeader from 'components/common/PageHeader';
import { ServiceContext } from 'context/Context';
import i18next from 'i18next';
import React, { useContext, useEffect, useState } from 'react';
import { Card, Col, Row } from 'react-bootstrap';
import { ApiEndpoint } from 'utils/ApiEndPont';

function CustomerDetail() {
  const [Customer, setCustomer] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const { serviceId, customerId } = useContext(ServiceContext);
  const URI = ApiEndpoint + 'customers/';

  const handleClose = () => {
    setOpenModal(false);
    getCustomer();
  };

  useEffect(() => {
    if (customerId > 0) {
      getCustomer();
    }
  }, []);

  const getCustomer = async () => {
    axios.get(URI + customerId).then(response => {
      setCustomer(response.data);
      // setIdsymptomcategory(response.data.idsymptomcategory);
    });
  };
  return (
    <>
      <Card className="mb-3">
        <Card.Body>
          <Row>
            <Col md={6} lg={4} className="mb-4 mb-lg-0">
              <h5 className="mb-3 fs-0">{Customer.company}</h5>
              <p className="fs--1 mt-1">{Customer.shortname}</p>
              <div>
                <strong className="me-2">{i18next.t('label.Contact')} </strong>
                <p className="fs--1 mt-1">
                  {Customer.firstname + ' ' + Customer.lastname}
                </p>
              </div>
              <div>
                <strong className="me-2">{i18next.t('label.Address')} </strong>
                <p className="fs--1 mt-1">{Customer.address}</p>
              </div>
            </Col>
          </Row>
        </Card.Body>
      </Card>
    </>
  );
}

export default CustomerDetail;
