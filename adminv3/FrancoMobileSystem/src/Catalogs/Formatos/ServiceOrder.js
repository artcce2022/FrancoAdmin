import IconButton from 'components/common/IconButton';
import React, { useEffect, useState } from 'react';
import { Card, Col, Row, Table } from 'react-bootstrap';
import SimpleBarReact from 'simplebar-react';
import logoInvoice from 'assets/img/logo.png';
import axios from 'axios';
import { ApiEndpoint } from 'utils/ApiEndPont';
const ServiceOrder = ({ service, idService }) => {
  const [serviceFailures, setServiceFailures] = useState(null);
  const [serviceParts, setServiceParts] = useState(null);
  useEffect(() => {
    getServiceFailures();
  }, []);

  useEffect(() => {
    getServiceParts();
  }, []);

  const getServiceFailures = () => {
    const URI = ApiEndpoint + 'services/failures/';
    console.log(URI + idService);
    axios.get(URI + idService).then(response => {
      let failures = response.data;
      setServiceFailures(failures);
    });
  };

  const getServiceParts = () => {
    const URIParts = ApiEndpoint + 'services/parts/';
    console.log(URIParts + idService);
    axios.get(URIParts + idService).then(response => {
      let parts1 = response.data;
      console.log('parts1');
      console.log(parts1);
      setServiceParts(parts1);
      // setIdsymptomcategory(response.data.idsymptomcategory);
    });
  };
  return (
    <>
      <Card className="mb-3">
        <Card.Body>
          <Row className="justify-content-between align-items-center">
            <Col md>
              <h5 className="mb-2 mb-md-0">Order #AD20294</h5>
            </Col>
            <Col xs="auto">
              <IconButton
                variant="falcon-default"
                size="sm"
                icon="arrow-down"
                className="me-1 mb-2 mb-sm-0"
                iconClassName="me-1"
              >
                Download (.pdf)
              </IconButton>
              <IconButton
                variant="falcon-default"
                size="sm"
                icon="print"
                iconClassName="me-1"
                className="me-1 mb-2 mb-sm-0"
              >
                Print
              </IconButton>
              <IconButton
                variant="falcon-success"
                size="sm"
                icon="dollar-sign"
                className="mb-2 mb-sm-0"
              >
                Receive Payment
              </IconButton>
            </Col>
          </Row>
        </Card.Body>
      </Card>

      <Card className="mb-3">
        <Card.Body>
          <Row className="align-items-center text-center mb-3">
            <Col sm={2} className="text-sm-start">
              <img src={logoInvoice} alt="invoice" width={150} />
            </Col>
            <Col sm={6} className="text-sm-end mt-3 mt-sm-0">
              <p className="fs--1 mb-0">
                SHOP: 425 TAFT HWY /<br /> MAIL: 825 TAFT HWY
              </p>
              <p className="fs--1 mb-0">Bakersfield, CA. 93307</p>
              <p className="fs--1 mb-0">Phone: 661-377-4222 Fax: - -</p>
            </Col>
            <Col className="text-sm-end mt-3 mt-sm-0">
              <Table>
                <tbody>
                  <tr>
                    <th colSpan={2} className="text-sm-end">
                      ESTIMATE
                    </th>
                  </tr>
                  <tr style={{ border: 1, borderColor: 'Red' }}>
                    <th colSpan={2} style={{ border: 1, borderColor: 'Red' }}>
                      7777444
                    </th>
                  </tr>
                  <tr>
                    <th className="text-sm-end"></th>
                    <th className="text-sm-end">ARD00261612</th>
                  </tr>
                </tbody>
              </Table>
            </Col>
            <Col xs={12} style={{ textAlign: 'left' }}>
              <h3>ESTIMATE FOR SERVICES</h3>
            </Col>
            <Col xs={12}>
              <hr />
            </Col>
          </Row>
          <Row className="align-items-center">
            <Col>
              <h6 className="text-500">Invoice to</h6>
              <h5>{service.customer.company}</h5>
              <p className="fs--1">
                {service.customer.company}
                <br />
                {service.customer.address}
                <br />
                {service.customer.city}, {service.customer.state}
              </p>
              <p className="fs--1">
                {service.customer.email}
                <br />
                {service.customer.phone}
              </p>
            </Col>
            <Col sm="auto" className="ms-auto">
              <div className="table-responsive">
                <Table borderless size="sm" className="fs--1">
                  <tbody>
                    <tr>
                      <td colSpan={5}>
                        {' '}
                        {service.vehicle.year}-{service.vehicle.make}-
                        {service.vehicle.model}
                      </td>
                    </tr>
                    <tr>
                      <th className="text-sm-end">Lic #:</th>
                      <td>{service.vehicle.license}</td>
                      <td></td>
                      <th className="text-sm-end">Odometer In:</th>
                      <td>5</td>
                    </tr>{' '}
                    <tr>
                      <th className="text-sm-end">Unit #:</th>
                      <td>{service.vehicle.unit}</td>
                      <td></td>
                      <th className="text-sm-end"></th>
                      <td></td>
                    </tr>
                    <tr>
                      <th className="text-sm-end">Vin #:</th>
                      <td colSpan={4}>{service.vehicle.vin}</td>
                    </tr>
                  </tbody>
                </Table>
              </div>
            </Col>
          </Row>
          <Row>
            <hr />
          </Row>
          <Row>
            <Col>
              <SimpleBarReact>
                <Table striped className="border-bottom">
                  <thead className="light">
                    <tr>
                      <th colSpan={5} className="border-0">
                        <small> Part Description/Number</small>
                      </th>
                      <th className="border-0 text-center">
                        <small>Qty</small>
                      </th>
                      <th className="border-0 text-end">
                        <small>Sale</small>
                      </th>
                      <th className="border-0 text-end">
                        <small>Ext</small>{' '}
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {serviceParts &&
                      serviceParts.map(part => (
                        <tr>
                          <td colSpan={5} className="align-middle">
                            <small>{part.part.partcode}</small>
                            <p>
                              <small>{part.part.description}</small>
                            </p>
                          </td>
                          <td className="align-middle text-center">
                            <small>{part.part.quantity ?? 1}</small>
                          </td>
                          <td className="align-middle text-end">
                            <small>$65.00</small>
                          </td>
                          <td className="align-middle text-end">
                            <small>$130.00</small>{' '}
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </Table>
              </SimpleBarReact>
            </Col>
            <Col>
              <SimpleBarReact>
                <Table striped className="border-bottom">
                  <thead className="light">
                    <tr>
                      <th colSpan={5} className="border-0">
                        <small>Labor Description</small>
                      </th>
                      <th className="border-0 text-center">
                        <small>Extended</small>
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="align-middle">
                        <h6 className="mb-0 text-nowrap">
                          Platinum web hosting package
                        </h6>
                        <p className="mb-0">Down 35mb, Up 100mb</p>
                      </td>
                      <td className="align-middle text-center">2</td>
                      <td className="align-middle text-end">$65.00</td>
                      <td className="align-middle text-end">$130.00</td>
                    </tr>
                    <tr>
                      <td className="align-middle">
                        <h6 className="mb-0 text-nowrap">
                          2 Page website design
                        </h6>
                        <p className="mb-0">
                          Includes basic wireframes and responsive templates
                        </p>
                      </td>
                      <td className="align-middle text-center">1</td>
                      <td className="align-middle text-end">$2,100.00</td>
                      <td className="align-middle text-end">$2,100.00</td>
                    </tr>
                    <tr>
                      <td className="align-middle">
                        <h6 className="mb-0 text-nowrap">
                          Mobile App Development
                        </h6>
                        <p className="mb-0">Includes responsive navigation</p>
                      </td>
                      <td className="align-middle text-center">8</td>
                      <td className="align-middle text-end">$5,00.00</td>
                      <td className="align-middle text-end">$4,000.00</td>
                    </tr>
                    <tr>
                      <td className="align-middle">
                        <h6 className="mb-0 text-nowrap">
                          Web App Development
                        </h6>
                        <p className="mb-0">Includes react spa</p>
                      </td>
                      <td className="align-middle text-center">6</td>
                      <td className="align-middle text-end">$2,00.00</td>
                      <td className="align-middle text-end">$12,000.00</td>
                    </tr>
                  </tbody>
                </Table>
              </SimpleBarReact>
            </Col>
          </Row>

          <Row className="justify-content-end">
            <Col xs="auto">
              <Table borderless size="sm" className="fs--1 text-end">
                <tbody>
                  <tr>
                    <th className="text-900">Subtotal:</th>
                    <td className="fw-semi-bold">$18,230.00</td>
                  </tr>
                  <tr>
                    <th className="text-900">Tax 8%:</th>
                    <td className="fw-semi-bold">$1458.40</td>
                  </tr>
                  <tr className="border-top">
                    <th className="text-900">Total:</th>
                    <td className="fw-semi-bold">$19688.40</td>
                  </tr>
                  <tr className="border-top border-top-2 fw-bolder text-900">
                    <th>Amount Due:</th>
                    <td>$19688.40</td>
                  </tr>
                </tbody>
              </Table>
            </Col>
          </Row>
        </Card.Body>
        <Card.Footer className="bg-light">
          <p className="fs--1 mb-0">
            <strong>Notes: </strong> We really appreciate your business and if
            there’s anything else we can do, please let us know!
          </p>
        </Card.Footer>
      </Card>
    </>
  );
};

export default ServiceOrder;
