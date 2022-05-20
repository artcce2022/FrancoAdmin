import axios from 'axios'
import {  useEffect, useState} from 'react'  
import MyModal from '../../shared/Modal'; 
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button , CardHeader, IconButton } from '@mui/material';
import MainCard from '../../ui-component/cards/MainCard';
import EditFailureService from './_EditFailureService.js';
import i18next from '../../utils/locales/i18n.js'
import StepButtons from '../../form-components/Steps/StepButtons';

const URI = 'http://localhost:3001/failures/'
const ServiceCommonFailuresList =({failuresList,setFailuresList, handleBack, handleNext, isLastStep, isFirstStep }) =>{    
    const [openModalFailure,setOpenModalFailure] = useState(false);
    const[idFailure, setIdFailure] =useState(0);
    const[failure,setFailure] = useState([]);    
    const[indexToDelete,setIndexToDelete] = useState(-1); 

    const handleClose = () =>{ 
        setOpenModalFailure(false);
    }; 

    const deleteFailure = (rowId, index)=>{
      setIndexToDelete(rowId);
    };   

    useEffect(()=>{
        if(indexToDelete){
            const dataDelete = [...failuresList];
            const index =  failuresList.map(function (data) { return data.rowId; }).indexOf(indexToDelete);
            if(index<0) return; 
            dataDelete.splice(index, 1);
            setFailuresList([...dataDelete]);
        }                
    },[indexToDelete])  
    
    return ( 
            <>
            <MainCard title={<CardHeader action={<Button  variant="contained"  onClick={()=> {setIdFailure(0); setOpenModalFailure(true);}} className='btn btn-primary'>Agregar</Button>} title= {i18next.t('label.ReportedFailures')}/>} >
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} size="small" aria-label="Patios">
                    <TableHead>
                        <TableRow> 
                            <TableCell>{i18next.t('label.Description')}</TableCell>
                            <TableCell>{i18next.t('label.Categoria')}</TableCell> 
                            <TableCell>{i18next.t('label.Detalle')}</TableCell> 
                            <TableCell>{i18next.t('label.Actions')}</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>                        
                        {failuresList ? failuresList.map((failure, index) => (
                            <TableRow
                                key={failure.idcommonfailures}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell component="th" scope="row">
                                    {failure.shortdescription}
                                </TableCell>
                                <TableCell>{failure.symptomscategory?.category}</TableCell> 
                                <TableCell>{failure.symtomdescription}</TableCell> 
                                <TableCell>
                                    {/* <Button  variant="outlined"  onClick={() => { setIdFailure(failure.idfailure); setOpenModalFailure(true); }} >Editar</Button> */}
                                    <Button  variant="outlined"  onClick={() => { deleteFailure(failure.rowId, index) }} >Eliminar</Button>
                                 </TableCell>
                            </TableRow>
                        )): 
                        <TableRow >
                        <TableCell component="th" scope="row">                            
                        </TableCell>
                        <TableCell></TableCell> 
                        <TableCell></TableCell> 
                        <TableCell>
                         </TableCell>
                    </TableRow>}
                    </TableBody>
                </Table>
            </TableContainer>
            {openModalFailure && <MyModal id="id_myModal" title={idFailure > 0 ? (i18next.t('label.Edit') + " " + i18next.t('label.CommnonFailure')): (i18next.t('label.Add') + " " + i18next.t('label.CommnonFailure'))} openModal={openModalFailure} closeModal={handleClose} >
                <EditFailureService    idFailure={idFailure} closeModal={handleClose} failureList={failuresList} action={setFailure} />
            </MyModal>}
        </MainCard> 
        <StepButtons handleBack={handleBack} handleNext={()=> handleNext(failuresList)} isFirstStep={isFirstStep} isLastStep={isLastStep}></StepButtons>
  
        </>
    )
}
export default ServiceCommonFailuresList