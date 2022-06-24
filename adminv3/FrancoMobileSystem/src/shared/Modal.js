import { Button, CloseButton, Modal } from 'react-bootstrap';

const MyModal = ({
  id,
  title,
  modalContent,
  openModal,
  closeModal,
  children,
  isConfirm,
  onConfirm
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
      >
        <Modal.Header>
          <Modal.Title id="contained-modal-title-vcenter"> {title}</Modal.Title>
          <CloseButton
            className="btn btn-circle btn-sm transition-base p-0"
            onClick={() => closeModal(false)}
          />
        </Modal.Header>
        <Modal.Body>
          {children}
          {/* {isConfirm &&  <DialogActions>
        <Button
          variant="contained"
          onClick={() =>{ handleClose()}} 
        >
          No
        </Button>
        <Button
          variant="contained"
          onClick={() => {          
            onConfirm();
            handleClose();
          }}   
        >
          Yes
        </Button>
      </DialogActions> }  */}
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={() => handleClose()}>Close</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};
export default MyModal;
