import axios from 'axios'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import MainCard from '../../ui-component/cards/MainCard';
import CustomerContactsList from '../../Components/CustomerContactsList.js';
import VehicleList from '../../Components/CustomerVehicleList.js';
import EditCustomer from './_EditCustomer.js';
import MyModal from '../../shared/Modal';
import i18next from 'i18next';
import {
    Paper, Button, CardHeader, IconButton, Grid, Typography, Divider, List, ListItem, ListItemText, Table,
    TableBody, TableCell, TableContainer, TableRow
} from '@mui/material';
import { IconPencil } from '@tabler/icons';

const CustomerDetail = () => {
    const [Customer, setCustomer] = useState([]);
    const [openModal, setOpenModal] = useState(false);
    const [idCustomer, setIdCustomer] = useState(0);
    let { id } = useParams();
    const URI = 'http://localhost:3001/customers/';

    useEffect(() => {
        setIdCustomer(id);
    }, []);

    const handleClose = () => {
        setOpenModal(false);
        getCustomer();
    };

    //mostrar companies

    useEffect(() => {
        getCustomer();
    }, []);


    const getCustomer = async () => {
        axios.get(URI + id).then((response) => {
            setCustomer(response.data);
            // setIdsymptomcategory(response.data.idsymptomcategory);
        });
    }



    return (
        <Grid container>
            <Grid item md={6}>
                <MainCard   color="primary"  title={<CardHeader action={<IconButton  onClick={() => { setOpenModal(true); }}   aria-label="edit"><IconPencil /></IconButton>} title={Customer.company} />} >
                    <Paper>
                        <TableContainer component={Paper}>
                            <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
                                <TableBody>
                                    <TableRow key="Alias" sx={{ '&:last-child td, &:last-child th': { border: 0 } }} >
                                        <TableCell component="th" scope="row"><Typography  variant="h4" component="div" gutterBottom>Alias</Typography>  </TableCell>
                                        <TableCell align="left">{Customer.shortname}</TableCell>
                                        <TableCell sx={{ typography: 'h4' }} align="left">{i18next.t('label.Company')}</TableCell>
                                        <TableCell align="left">{Customer.company}</TableCell>
                                    </TableRow>
                                    <TableRow key="Nombre" sx={{ '&:last-child td, &:last-child th': { border: 0 } }} >
                                        <TableCell sx={{ typography: 'h4' }}  scope="row">{i18next.t('label.Contact')}</TableCell>
                                        <TableCell align="left" colSpan={3}>{Customer.firstname + " " + Customer.lastname}</TableCell>
                                    </TableRow>
                                    <TableRow key="Direccion" sx={{ '&:last-child td, &:last-child th': { border: 0 } }} >
                                        <TableCell  sx={{ typography: 'h4' }} >{i18next.t('label.Address')}</TableCell>
                                        <TableCell  colSpan={3} align="left">{Customer.address}</TableCell>
                                    </TableRow>
                                    <TableRow key="zipcode" sx={{ '&:last-child td, &:last-child th': { border: 0 } }} >
                                        <TableCell sx={{ typography: 'h4' }}  scope="row">{i18next.t('label.ZipCode')}</TableCell>
                                        <TableCell align="left">{Customer.zipcode}</TableCell>
                                        <TableCell sx={{ typography: 'h4' }}  align="left">{i18next.t('label.City')}</TableCell>
                                        <TableCell align="left">{Customer.city}</TableCell>
                                    </TableRow>
                                    <TableRow key="state" sx={{ '&:last-child td, &:last-child th': { border: 0 } }} >
                                        <TableCell sx={{ typography: 'h4' }}  scope="row">{i18next.t('label.State')}</TableCell>
                                        <TableCell align="left">{Customer.state}</TableCell>
                                        <TableCell sx={{ typography: 'h4' }}  align="left">{i18next.t('label.Phone')}</TableCell>
                                        <TableCell align="left">{Customer.phone}</TableCell>
                                    </TableRow>
                                    <TableRow key="mobilephone" sx={{ '&:last-child td, &:last-child th': { border: 0 } }} >
                                        <TableCell sx={{ typography: 'h4' }}  scope="row">{i18next.t('label.Mobile')}</TableCell>
                                        <TableCell align="left">{Customer.mobilephone}</TableCell>
                                        <TableCell sx={{ typography: 'h4' }}  align="left">{i18next.t('label.Phone')}</TableCell>
                                        <TableCell align="left">{Customer.phone}</TableCell>
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
                        <CustomerContactsList CustomerId={idCustomer} />
                    </Paper>
                </MainCard>
            </Grid>
            <Grid item md={6}>
                <MainCard>
                    <Paper>
                        <VehicleList CustomerId={idCustomer} />
                    </Paper>
                </MainCard>
            </Grid>
            {openModal && <MyModal id="id_myModal" title={idCustomer > 0 ?  "Editar Cliente" : "Agregar Cliente"} openModal={openModal} closeModal={handleClose} >
                <EditCustomer idCustomer={idCustomer} closeModal={handleClose} />
            </MyModal>}
        </Grid>
    )
}

export default CustomerDetail