import axios from 'axios'
import {  useEffect, useState} from 'react' 
import MyModal from '../../shared/Modal';
import EditVendor from './_EditVendor.js'
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button , CardHeader, IconButton } from '@mui/material';
import MainCard from '../../ui-component/cards/MainCard';
import i18next from 'i18next';

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
        <MainCard title={<CardHeader action={<Button  variant="contained"  onClick={()=> {setIdVendor(0); setOpenModal(true);}} className='btn btn-primary'>{i18next.t('label.Add')}</Button>} title="Vendedores"/>} >
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} size="small" aria-label="Patios">
                    <TableHead>
                        <TableRow>
                            <TableCell>{i18next.t('label.vendor')}</TableCell>
                            <TableCell>{i18next.t('label.Contact')}</TableCell>
                            <TableCell>{i18next.t('label.Phone')}</TableCell>
                            <TableCell>{i18next.t('label.Actions')}</TableCell>
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
            {openModal && <MyModal id="id_myModal" title={idVendor > 0 ? `${i18next.t('label.editvendor')}` : `${i18next.t('label.Addvendor')}` } openModal={openModal} closeModal={handleClose} >
                <EditVendor idVendor={idVendor} closeModal={handleClose} />
            </MyModal>}
        </MainCard>
    </div>
    );
}

export default VendorsList