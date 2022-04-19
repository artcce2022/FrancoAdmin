import { Box,  Dialog , DialogContent , DialogTitle, Typography    } from '@mui/material'; 

const MyModal = ({ id, title, modalContent, openModal, closeModal, children }) => {

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
      </Dialog >
    </>
  );
}
export default MyModal




