import axios from 'axios'
import {  useEffect, useState} from 'react' 
import MyModal from '../shared/Modal';
import EditVehicle from '../catalogs/administration/_EditVehicles.js'; 
import { useParams} from 'react-router-dom'
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button , CardHeader, IconButton, Typography, Divider } from '@mui/material';

const URI = 'http://localhost:3001/customervehicles/'
const CustomerVehicleList =() =>{
    const [vehicles, setVehicles] = useState([]);
    const [openModal,setOpenModal] = useState(false);
    let  [idCustomer, setIdCustomer] = useState(0);
    let  [idVehicle, setIdVehicle] = useState(0);  
    let { id } = useParams();  
    const handleClose = () =>{ 
        setOpenModal(false);
        getVehicles();
    };
     
 

    //mostrar companies
    const getVehicles= async () =>{
        setIdCustomer(id);
        const res = await axios.get(URI + id);
        setVehicles(res.data);
        console.log(res.data);
    }
 
    useEffect(()=>{
        getVehicles()
    },[])


    return (
        <Paper>
              <CardHeader title={<CardHeader action={<Button variant="contained"  onClick={() => { setIdVehicle(0); setOpenModal(true); }}  className='btn btn-primary'>Agregar</Button>} title="Vehiculos" />} >     
                        </CardHeader>
             <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} size="small" aria-label="Patios">
                    <TableHead>
                        <TableRow>
                            <TableCell>Vin</TableCell>
                            <TableCell>License</TableCell>
                            <TableCell>Year</TableCell>
                            <TableCell>Model</TableCell>
                            <TableCell>Acciones</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {vehicles.map((vehicle) => (
                            <TableRow
                                key={vehicle.idVehicle}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell component="th" scope="row">
                                    {vehicle.vin}
                                </TableCell>
                                <TableCell>{vehicle.license}</TableCell>
                                <TableCell>{vehicle.year}</TableCell>
                                <TableCell>{vehicle.make}</TableCell>
                                <TableCell>
                                    <Button  variant="outlined"  onClick={() => { setIdVehicle(vehicle.idVehicle); setOpenModal(true); }} >Editar</Button>                                     
                                </TableCell>                              
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            {openModal && <MyModal id="id_myModal" title={idCustomer > 0 ? "Editar Vehiculo" : "Agregar Vehiculo"} openModal={openModal} closeModal={handleClose} >
                    <EditVehicle  idCustomer={idCustomer} idVehicle={idVehicle} closeModal={handleClose}/> 
            </MyModal>}   
        </Paper>
       
    )
}
export default CustomerVehicleList