import { faLessThanEqual } from '@fortawesome/free-solid-svg-icons';
import { Button, CloseButton, Modal } from 'react-bootstrap';

const MyModal = ({
  id,
  title,
  modalContent,
  openModal,
  closeModal,
  children,
  isConfirm,
  onConfirm,
  isFullScreen = false
}) => {
  const handleClose = () => closeModal(false);
  const style = {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  };
  return (
    <>
      <Modal
        show={openModal}
        onHide={() => closeModal(false)}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        fullscreen={isFullScreen}
      >
        <Modal.Header>
          <Modal.Title id="contained-modal-title-vcenter"> {title}</Modal.Title>
          <CloseButton
            className="btn btn-circle btn-sm transition-base p-0"
            onClick={() => closeModal(false)}
          />
        </Modal.Header>
        <Modal.Body>{children}</Modal.Body>
        <Modal.Footer>
          <Button onClick={() => handleClose()}>Close</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};
export default MyModal;
