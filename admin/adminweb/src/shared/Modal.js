import Modal from 'react-bootstrap/Modal'

const MyModal = ({id, title, modalContent, openModal, closeModal}) =>{
    const handleClose = () =>   closeModal(false);  
    return (
        <>
          {/* <Button variant="primary" onClick={handleShow}>
            Launch demo modal
          </Button> */}
          <Modal  show={openModal} id={id} onHide={handleClose} backdrop="static">
            <Modal.Header closeButton>
              <Modal.Title>
                {title}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {modalContent}
            </Modal.Body>
            <Modal.Footer>          
            </Modal.Footer>
          </Modal>
        </>
      );
   
}
export default MyModal
 