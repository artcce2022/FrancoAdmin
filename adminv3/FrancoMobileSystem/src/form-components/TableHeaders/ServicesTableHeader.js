import IconButton from 'components/common/IconButton';
import React from 'react';
import { Col, Row } from 'react-bootstrap';

const ServicesTableHeader = () => {
  return (
    <Row className="flex-between-center">
      <Col xs={4} sm="auto" className="d-flex align-items-center pe-0">
        <h5 className="fs-0 mb-0 text-nowrap py-2 py-xl-0">Services</h5>
      </Col>
      <Col xs={8} sm="auto" className="ms-auto text-end ps-0">
        <div id="orders-actions">
          <IconButton
            variant="falcon-default"
            size="sm"
            icon="plus"
            transform="shrink-3"
          >
            <span className="d-none d-sm-inline-block ms-1">New</span>
          </IconButton>
          <IconButton
            variant="falcon-default"
            size="sm"
            icon="filter"
            transform="shrink-3"
            className="mx-2"
          >
            <span className="d-none d-sm-inline-block ms-1">Filter</span>
          </IconButton>
          <IconButton
            variant="falcon-default"
            size="sm"
            icon="external-link-alt"
            transform="shrink-3"
          >
            <span className="d-none d-sm-inline-block ms-1">Export</span>
          </IconButton>
        </div>
      </Col>
    </Row>
  );
};

export default ServicesTableHeader;
