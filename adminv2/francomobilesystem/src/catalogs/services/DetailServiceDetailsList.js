import axios from 'axios'
import { useEffect, useState } from 'react'
import MyModal from '../../shared/Modal';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, CardHeader, IconButton } from '@mui/material';
import MainCard from '../../ui-component/cards/MainCard';
import EditFailureService from './_EditFailureService.js';
import i18next from '../../utils/locales/i18n.js'
import StepButtons from '../../form-components/Steps/StepButtons.js';
import EditServiceDetail from './_EditServiceDetail.js';
import { IconCheck, IconEraser, IconPlaylistAdd } from '@tabler/icons';
import { minHeight } from '@mui/system';

const ServiceDetailsList = ({ idService }) => {
    const [detailList, setDetailList] = useState([]);    
const URI = 'http://localhost:3001/services/details/'
    useEffect(() => {
        getServiceDetails();
    }, []);


    const getServiceDetails = () => { 
        console.log(URI + idService);     
        axios.get(URI + idService).then((response) => {
            let details=response.data;  
            console.log(details);          
            setDetailList(details);
            // setIdsymptomcategory(response.data.idsymptomcategory);
        });
    }


    return (
        <>
            <MainCard sx={{minHeight: 500, maxHeight: 500, overflow: 'auto'}} title={i18next.t('label.DetailsReported')} >
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 400 }} size="small" aria-label="Patios">
                        <TableBody>
                            {detailList.map((detail, index) => (
                                <TableRow
                                    key={detail.idservicedetail}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    <TableCell component="th" scope="row">
                                        {detail.detail}
                                    </TableCell>                                   
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>              
            </MainCard>
        </>
    )
}
export default ServiceDetailsList