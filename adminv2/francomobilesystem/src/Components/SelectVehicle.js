import axios from 'axios'
import { useEffect, useState } from 'react'
import MainCard from '../ui-component/cards/MainCard';
import EditCustomer from '../catalogs/administration/_EditCustomer.js';
import MyModal from '../shared/Modal';
import {
    Paper, CardHeader, IconButton, Grid, Typography, Divider, List, ListItem, ListItemText, Table,
    TableBody, TableCell, TableContainer, TableRow
} from '@mui/material';
import { IconPencil } from '@tabler/icons';
import EditVehicles from '../catalogs/administration/_EditVehicles';

const VehicleDetail = ({idVehicle}) => {
    const [vehicle, setVehicle] = useState([]);
    const [openModal, setOpenModal] = useState(false); 
    const URI = 'http://localhost:3001/vehicles/';
  
    const handleClose = () => {
        setOpenModal(false);
        getVehicle();
    };

    //mostrar companies

    useEffect(() => {
        if(idVehicle>0){
            getVehicle(); 
        }
    }, []);


    const getVehicle = async () => {
        axios.get(URI + idVehicle).then((response) => {
            setVehicle(response.data);
            // setIdsymptomcategory(response.data.idsymptomcategory);
        });
    } 

    return (
            <Grid item md={12}>
                <MainCard   color="primary"  title={<CardHeader action={<IconButton  onClick={() => { setOpenModal(true); }}   aria-label="edit"><IconPencil /></IconButton>} title={vehicle.vin} />} >
                    <Paper>
                        <TableContainer component={Paper}>
                            <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
                                <TableBody>
                                    <TableRow key="Vin" sx={{ '&:last-child td, &:last-child th': { border: 0 } }} >
                                        <TableCell component="th" scope="row"><Typography  variant="h4" component="div" gutterBottom>Vin</Typography>  </TableCell>
                                        <TableCell align="left">{vehicle.vin}</TableCell>
                                        <TableCell sx={{ typography: 'h4' }} align="left">license</TableCell>
                                        <TableCell align="left">{vehicle.license}</TableCell>
                                    </TableRow>
                                    <TableRow key="Nombre" sx={{ '&:last-child td, &:last-child th': { border: 0 } }} >
                                        <TableCell sx={{ typography: 'h4' }}  scope="row">year </TableCell>
                                        <TableCell align="left" colSpan={3}>{vehicle.year}</TableCell>
                                    </TableRow>
                                    <TableRow key="Direccion" sx={{ '&:last-child td, &:last-child th': { border: 0 } }} >
                                        <TableCell  sx={{ typography: 'h4' }} >make</TableCell>
                                        <TableCell  colSpan={3} align="left">{vehicle.make}</TableCell>
                                    </TableRow>
                                    <TableRow key="model" sx={{ '&:last-child td, &:last-child th': { border: 0 } }} >
                                        <TableCell sx={{ typography: 'h4' }}  scope="row">model </TableCell>
                                        <TableCell align="left">{vehicle.model}</TableCell>
                                        <TableCell sx={{ typography: 'h4' }}  align="left">color</TableCell>
                                        <TableCell align="left">{vehicle.color}</TableCell>
                                    </TableRow>
                                   
                                    <TableRow key="unit" sx={{ '&:last-child td, &:last-child th': { border: 0 } }} >
                                        <TableCell sx={{ typography: 'h4' }}  scope="row">unit </TableCell>
                                        <TableCell align="left">{vehicle.unit}</TableCell>
                                        <TableCell sx={{ typography: 'h4' }}  align="left">memo</TableCell>
                                        <TableCell align="left">{vehicle.memo}</TableCell>
                                    </TableRow>
                                </TableBody>
                            </Table>
                        </TableContainer> 
                    </Paper>
                </MainCard>
            {openModal && <MyModal id="id_myModal" title={idVehicle > 0 ? "Editar Vehiculo" : "Agregar Vehiculo"} openModal={openModal} closeModal={handleClose} >
                <EditVehicles idCustomer={vehicle.idCustomer} idVehicle={idVehicle} closeModal={handleClose} />
            </MyModal>}
        </Grid>
    )
}

export default VehicleDetail;