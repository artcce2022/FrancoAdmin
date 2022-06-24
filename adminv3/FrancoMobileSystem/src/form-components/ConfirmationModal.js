import { Button, Modal, Toast } from 'react-bootstrap';

const ConfirmAction = ({
  open,
  handleClose,
  title,
  message,
  ConfirmAction
}) => {
  return (
    <>
      <Modal
        show={open}
        onHide={() => {
          handleClose(false);
        }}
      >
        <Modal.Header closeButton>
          <Modal.Title>{title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>{message}</Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => {
              ConfirmAction(false);
              handleClose(false);
            }}
          >
            Cancel
          </Button>
          <Button
            variant="primary"
            onClick={() => {
              ConfirmAction(true);
              handleClose(false);
            }}
          >
            Confirm
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};
export default ConfirmAction;
