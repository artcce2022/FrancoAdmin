import axios from 'axios'
import {  useEffect, useState} from 'react' 
import MyModal from '../../shared/Modal';
import EditVendor from './_EditVendor.js'
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button , CardHeader, IconButton } from '@mui/material';
import MainCard from '../../ui-component/cards/MainCard';

const URI = 'http://localhost:3001/vendors/'
const VendorsList =() =>{
    const [vendors, setVendors] = useState([]);
    const [openModal,setOpenModal] = useState(false);
    let  [idVendor, setIdVendor] = useState(0); 
    const handleClose = () =>{ 
        setOpenModal(false);
        getVendors();
    };
     
    useEffect(()=>{
        getVendors()
    },[])

    //mostrar companies
    const getVendors= async () =>{
        const res = await axios.get(URI);
        setVendors(res.data);
    }

    return (<div>
        <MainCard title={<CardHeader action={<Button  variant="contained"  onClick={()=> {setIdVendor(0); setOpenModal(true);}} className='btn btn-primary'>Agregar</Button>} title="Vendedores"/>} >
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} size="small" aria-label="Patios">
                    <TableHead>
                        <TableRow>
                            <TableCell>Vendedor</TableCell>
                            <TableCell>Contacto</TableCell>
                            <TableCell>Telefono</TableCell>
                            <TableCell>Acciones</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {vendors.map((vendor) => (
                            <TableRow
                                key={vendor.idvendor}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell component="th" scope="row">
                                    {vendor.name}
                                </TableCell>
                                <TableCell>{vendor.contact}</TableCell>
                                <TableCell>{vendor.phone}</TableCell>
                                <TableCell><Button  variant="outlined"  onClick={() => { setIdVendor(vendor.idvendor); setOpenModal(true); }} >Editar</Button> </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            {openModal && <MyModal id="id_myModal" title={idVendor > 0 ? "Editar Vendedor" : "Agregar Vendedor"} openModal={openModal} closeModal={handleClose} >
                <EditVendor idVendor={idVendor} closeModal={handleClose} />
            </MyModal>}
        </MainCard>
    </div>
    );
}

export default VendorsList