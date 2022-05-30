import axios from 'axios'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useForm } from 'react-hook-form';
import MainCard from '../../ui-component/cards/MainCard'; 
import MyModal from '../../shared/Modal';
import i18next from 'i18next';
import {
    Paper, Button, CardHeader, IconButton, Grid, Typography, Divider, List, ListItem, ListItemText, Table,
    TableBody, TableCell, TableContainer, TableRow
} from '@mui/material';
import { IconPencil } from '@tabler/icons';
import EditCustomer from '../administration/_EditCustomer.js';
import ServiceFailuresList from './DetailServiceDetailFailures.js';
import ServiceDetailsList from './DetailServiceDetailsList';
import { FormInputFile } from '../../form-components/FileUpload';
import ServiceFilesList from './DetailServiceFiles.js';
import EditServiceFile from './_EditServiceFile';

const ServiceDetail = () => {
    const [service, setService] = useState([]);
    const [openModal, setOpenModal] = useState(false);
    const [openModalFile, setOpenModalFile]= useState(false);
    const [idService, setIdService] = useState(null);
    let { id } = useParams();
    const URI = 'http://localhost:3001/services/' + id;

    const { register, control, handleSubmit, setValue, formState: { errors } } = useForm();

    const handleClose = () => {
        setOpenModal(false);
        setOpenModalFile(false);
        getService();
    };

    //mostrar companies

    useEffect(() => {
        getService();
    }, []);


    const getService = () => { 
        axios.get(URI).then((response) => {
            let serviceNew=response.data[0];  
            console.log(serviceNew);    
            setIdService(serviceNew.idservice);      
            setService(serviceNew);
            // setIdsymptomcategory(response.data.idsymptomcategory);
        });
    }
    

    return (
        <Grid container>
            <Grid item md={6}>
                <MainCard   color="primary"  title={<CardHeader action={<IconButton  onClick={() => { setOpenModal(true); }}   aria-label="edit"><IconPencil /></IconButton>} title={"Detalle de Servicio"} />} >
                    <Paper>
                        <TableContainer component={Paper}>
                            <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
                                <TableBody>
                                    <TableRow key="Alias" sx={{ '&:last-child td, &:last-child th': { border: 0 } }} >
                                        <TableCell component="th" scope="row"><Typography  variant="h4" component="div" gutterBottom>Customer</Typography>  </TableCell>
                                        <TableCell align="left">{service.customer?.shortname}</TableCell>
                                        <TableCell sx={{ typography: 'h4' }} align="left">{i18next.t('label.Company')}</TableCell>
                                        <TableCell align="left">{service.vehicle?.vin}</TableCell>
                                    </TableRow>
                                    <TableRow key="Nombre" sx={{ '&:last-child td, &:last-child th': { border: 0 } }} >
                                        <TableCell sx={{ typography: 'h4' }}  scope="row">{i18next.t('label.Location')}</TableCell>
                                        <TableCell align="left" colSpan={3}>{service.location?.locationName}</TableCell>
                                    </TableRow>
                                    <TableRow key="DAteCreation" sx={{ '&:last-child td, &:last-child th': { border: 0 } }} >
                                        <TableCell  sx={{ typography: 'h4' }} >{i18next.t('label.Date')}</TableCell>
                                        <TableCell  colSpan={3} align="left">{service.datecreate}</TableCell>
                                    </TableRow>
                                    <TableRow key="serviceId" sx={{ '&:last-child td, &:last-child th': { border: 0 } }} >
                                        <TableCell sx={{ typography: 'h4' }}  scope="row">{i18next.t('label.ZipCode')}</TableCell>
                                        <TableCell align="left">{service.serviceid}</TableCell>
                                    </TableRow>                                   
                                </TableBody>
                            </Table>
                        </TableContainer>

                    </Paper>
                </MainCard>
            </Grid>
            <Grid item md={6}>
                <MainCard>
                    <Paper>
                       {idService && <ServiceFailuresList idService={idService} ></ServiceFailuresList>}
                    </Paper>
                </MainCard>
            </Grid>
            <Grid item md={6}>
                <MainCard>
                    <Paper>  
                        {idService && <ServiceDetailsList idService={idService} ></ServiceDetailsList>}
                    </Paper>
                </MainCard>
            </Grid>
            <Grid item md={6}>
                <MainCard>
                    <Paper>  
                        {idService && <ServiceFilesList idService={idService} setOpenModal={setOpenModalFile} ></ServiceFilesList>}
                    </Paper>
                </MainCard>
            </Grid>
            <Grid item md={6}>
                <MainCard>
                    <Paper>  
                        {idService && <FormInputFile name="ServiceFile" control={control} idService={idService} ></FormInputFile>}
                    </Paper>
                </MainCard>
            </Grid>
            {openModal && <MyModal id="id_myModal" title={i18next.t('label.EditCustomer')} openModal={openModal} closeModal={handleClose} >
                <EditCustomer idCustomer={0} closeModal={handleClose} />
            </MyModal>}
            {openModalFile && <MyModal id="id_myModalFile" title={i18next.t('label.AddFile')} openModal={openModalFile} closeModal={handleClose} >
                <EditServiceFile idService={idService} serviceGuid={id} closeModal={handleClose}  ></EditServiceFile> 
            </MyModal>}
        </Grid>
    )
}

export default ServiceDetail