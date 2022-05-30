import axios from 'axios'
import {  useEffect, useState} from 'react'  
import MyModal from '../../shared/Modal'; 
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button , CardHeader, IconButton } from '@mui/material';
import MainCard from '../../ui-component/cards/MainCard';
import EditFailureService from './_EditFailureService.js';
import i18next from '../../utils/locales/i18n.js'
import StepButtons from '../../form-components/Steps/StepButtons';

const URI = 'http://localhost:3001/services/failures/'
const ServiceFailuresList =({idService}) =>{    
     const[idFailure, setIdFailure] =useState(0);
    const[failuresList,setFailuresList] = useState([]);     
 
    
    useEffect(() => {
        getServiceFailures();
    }, []);


    const getServiceFailures = () => { 
        console.log(URI + idService);     
        axios.get(URI + idService).then((response) => {
            let failures=response.data;  
            console.log(failures);          
            setFailuresList(failures);
            // setIdsymptomcategory(response.data.idsymptomcategory);
        });
    }
    return ( 
            <>
            <MainCard title={<CardHeader action={<Button  variant="contained"  onClick={()=> {setIdFailure(0);}} className='btn btn-primary'>Agregar</Button>} title= {i18next.t('label.ReportedFailures')}/>} >
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
                                    {failure.commonfailure.shortdescription}
                                </TableCell>
                                <TableCell>{failure.commonfailure.symtomdescription}</TableCell> 
                                <TableCell></TableCell> 
                                <TableCell>
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
        </MainCard>     
        </>
    )
}
export default ServiceFailuresList