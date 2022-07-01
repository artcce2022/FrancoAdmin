import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { Link } from 'react-router-dom';
import { Dropdown } from 'react-bootstrap';
import team3 from 'assets/img/team/12.jpg';
import Avatar from 'components/common/Avatar';
import i18next from 'i18next';

const ProfileDropdown = () => {
  return (
    <Dropdown navbar={true} as="li">
      <Dropdown.Toggle
        bsPrefix="toggle"
        as={Link}
        to="#!"
        className="pe-0 ps-2 nav-link"
      >
        <Avatar src={team3} />
      </Dropdown.Toggle>

      <Dropdown.Menu className="dropdown-caret dropdown-menu-card  dropdown-menu-end">
        <div className="bg-white rounded-2 py-2 dark__bg-1000">
          <Dropdown.Item className="fw-bold text-warning" href="https://nexusdigitalmkt.com.mx/">
            <FontAwesomeIcon icon="fa-solid fa-crown" className="me-1" />
            <span>ERP-NexusDIgital</span>
          </Dropdown.Item>
          <Dropdown.Divider />
         {/* <Dropdown.Item href="https://nexusdigitalmkt.com.mx/">Set status</Dropdown.Item>*/}
          <Dropdown.Item as={Link} to="/user/profile">
          {i18next.t('label.Profile')} &amp; {i18next.t('label.Account')}
          </Dropdown.Item>
          {/*<Dropdown.Item href="https://nexusdigitalmkt.com.mx/">Feedback</Dropdown.Item>*/}
          <Dropdown.Divider />
          <Dropdown.Item as={Link} to="/user/settings">
          {i18next.t('label.Settings')}
  </Dropdown.Item>
          <Dropdown.Item as={Link} to="/authentication/card/logout">
          {i18next.t('label.Logout')}
          </Dropdown.Item>
        </div>
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default ProfileDropdown;
