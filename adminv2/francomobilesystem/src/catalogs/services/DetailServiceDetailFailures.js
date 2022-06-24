import axios from 'axios'
import { useEffect, useState } from 'react'
import MyModal from '../../shared/Modal';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, CardHeader, IconButton, Fab, Icon, Typography } from '@mui/material';
import MainCard from '../../ui-component/cards/MainCard';
import EditFailureService from './_EditFailureService.js';
import i18next from '../../utils/locales/i18n.js'
import StepButtons from '../../form-components/Steps/StepButtons';
import { IconCheck, IconClock, IconEraser, IconPlaylistAdd } from '@tabler/icons';
import EditServiceFailure from './_EditServiceCommonFailure';

const URI = 'http://localhost:3001/services/failures/'
const ServiceFailuresList = ({ idService }) => {
    const [idFailure, setIdFailure] = useState(0);
    const [failuresList, setFailuresList] = useState([]);
    const [openModalStatus, setOpenModalStatus] = useState(false);
    const [idCommonFailureService, setIdCommonFailureService] = useState(0);
    const [idCommonFailureStatus, setIdCommonFailureStatus] = useState("0");
 
    const handleClose = () => {
        setOpenModalStatus(false); 
        getServiceFailures();
    };

    useEffect(() => {
        getServiceFailures();
    }, []);


    const getServiceFailures = () => {
        console.log(URI + idService);
        axios.get(URI + idService).then((response) => {
            let failures = response.data;
            console.log(failures);
            setFailuresList(failures);
            // setIdsymptomcategory(response.data.idsymptomcategory);
        });
    }
    return (
        <>
            <MainCard  sx={{minHeight: 500}} title={<CardHeader action={<Button variant="contained" onClick={() => { setIdFailure(0); }} className='btn btn-primary'>Agregar</Button>} title={i18next.t('label.ReportedFailures')} />} >
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }} size="small" aria-label="Patios">
                        <TableHead>
                            <TableRow>
                                <TableCell align="center"><b> {i18next.t('label.Description')}</b></TableCell>
                                <TableCell align="center"><b> {i18next.t('label.Categoria')}</b></TableCell> 
                                <TableCell align="center"><b> {i18next.t('label.Status')}</b></TableCell> 
                                <TableCell align="center"><b> {i18next.t('label.Comments')}</b></TableCell>
                                <TableCell align="center"><b>{i18next.t('label.Actions')}</b></TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {failuresList ? failuresList.map((failure, index) => (
                                <TableRow
                                    key={failure.idcommonfailures}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    <TableCell component="th" scope="row">
                                        <Typography color={"default"} >
                                        {failure.commonfailure.shortdescription}
                                        </Typography>
                                    </TableCell>
                                    <TableCell>{failure.commonfailure.symtomdescription}</TableCell> 
                                    <TableCell>{failure.commonfailuresstatus.failurestatus}</TableCell> 
                                    <TableCell>{failure.comments}</TableCell> 
                                    <TableCell align="center">
                                       {( failure.idcommonfailurestatus!==3 && failure.idcommonfailurestatus!==2) &&  <IconButton color="primary" onClick={() => {setIdCommonFailureService(failure.idservicefailures); setIdCommonFailureStatus('3'); setOpenModalStatus(true); }} aria-label="" component="span">
                                            <IconEraser />
                                        </IconButton>   }
                                       {(failure.idcommonfailurestatus!==4  && failure.idcommonfailurestatus!==2) &&  <IconButton color="primary" onClick={() => {setIdCommonFailureService(failure.idservicefailures); setIdCommonFailureStatus('4'); setOpenModalStatus(true); }} aria-label="" component="span">
                                            <IconClock />
                                        </IconButton>}
                                        {(failure.idcommonfailurestatus!==4 && failure.idcommonfailurestatus!==3 && failure.idcommonfailurestatus!==2) &&    <IconButton color="primary" onClick={() => { setIdCommonFailureService(failure.idservicefailures); setIdCommonFailureStatus('2'); setOpenModalStatus(true);}} aria-label="" component="span">
                                            <IconCheck />
                                        </IconButton>}
                                        <IconButton color="primary" onClick={() => { }} aria-label="" component="span">
                                            <IconPlaylistAdd/>
                                        </IconButton>
                                    </TableCell>
                                </TableRow>
                            )) :
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
            {openModalStatus && <MyModal id="id_myModal" title={i18next.t('label.EditFailure')} openModal={openModalStatus} closeModal={handleClose} >
                    <EditServiceFailure idCommonFailureService={idCommonFailureService} idCommonFailureStatus={idCommonFailureStatus} closeModal={handleClose} />
                </MyModal>}
        </>
    )
}
export default ServiceFailuresList