import { Toast } from 'react-bootstrap';

const AlertNotification = ({ open, handleClose, type, message }) => {
  return (
    <>
      <div className="position-fixed bottom-0 end-0 p-3">
        <Toast
          onClose={() => handleClose(false)}
          show={open}
          delay={3000}
          autohide
        >
          <Toast.Header className={'bg-' + type + ' text-white'}>
            <strong className="me-auto">Aviso</strong>
            {/* <small>11 mins ago</small> */}
          </Toast.Header>
          <Toast.Body>{message}</Toast.Body>
        </Toast>
      </div>
    </>
  );
};
export default AlertNotification;
