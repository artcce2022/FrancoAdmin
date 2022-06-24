import IconButton from 'components/common/IconButton';
import i18next from 'i18next';
import PropTypes from 'prop-types';
import React from 'react';
import { Col, Form, Row, Button, Card } from 'react-bootstrap';

const GenericTableHeader = ({ label, newFunction }) => {
  return (
    <Card.Header>
      <Row className="flex-between-center">
        <Col xs={4} sm="auto" className="d-flex align-items-center pe-0">
          <h5 className="fs-0 mb-0 text-nowrap py-2 py-xl-0">{label}</h5>
        </Col>
        <Col xs={8} sm="auto" className="ms-auto text-end ps-0">
          <div id="orders-actions">
            <IconButton
              variant="falcon-default"
              size="sm"
              icon="plus"
              transform="shrink-3"
              onClick={() => {
                newFunction();
              }}
            >
              <span className="d-none d-sm-inline-block ms-1">
                {i18next.t('label.Add')}
              </span>
            </IconButton>
          </div>
        </Col>
      </Row>
    </Card.Header>
  );
};

GenericTableHeader.propTypes = {};

export default GenericTableHeader;
