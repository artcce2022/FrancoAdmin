import { Box,  Button,  Dialog , DialogActions, DialogContent , DialogTitle, Typography    } from '@mui/material'; 

const MyModal = ({ id, title, modalContent, openModal, closeModal, children,isConfirm, onConfirm }) => {

  const handleClose = () => closeModal(false);    
  const style = {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center', 
  };
  return (
    <>
   <Dialog open={true} style={style} onClose={handleClose} maxWidth="md" >
     <DialogTitle>
     {title}
     </DialogTitle>
        <DialogContent>
             {children}             
          </DialogContent>
          {isConfirm &&  <DialogActions>
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
      </DialogActions> }              
      </Dialog >
    </>
  );
}
export default MyModal




