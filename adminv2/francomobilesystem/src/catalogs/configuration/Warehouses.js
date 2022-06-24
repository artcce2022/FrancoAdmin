import axios from 'axios'
import {  useEffect, useState} from 'react'  
import MyModal from '../../shared/Modal'; 
import EditWarehouse from './_EditWarehouse'
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button , CardHeader, IconButton } from '@mui/material';
import MainCard from '../../ui-component/cards/MainCard';
import i18next from 'i18next';


const URI = 'http://localhost:3001/warehouse/'
const WarehousesList =() =>{
    const [warehouses, setWarehouses] = useState([]);
    const [openModal,setOpenModal] = useState(false);
    let  [idWarehouses, setIdWarehouses] = useState(0); 
    const handleClose = () =>{ 
        setOpenModal(false);
        getWarehouses();
    };
     
    useEffect(()=>{
        getWarehouses()
    },[])

    //mostrar companies
    const getWarehouses= async () =>{
        const res = await axios.get(URI);
        setWarehouses(res.data);
    }
  
    
    return (<div>
        <MainCard title={<CardHeader action={<Button  variant="contained"  onClick={()=> {setIdWarehouses(0); setOpenModal(true);}} className='btn btn-primary'>{i18next.t('label.Add')}</Button>} title={i18next.t('label.warehousename')}/>} >
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} size="small" aria-label="Patios">
                    <TableHead>
                        <TableRow>
                            <TableCell>{i18next.t('label.warehousename')}</TableCell>
                            <TableCell>{i18next.t('label.Address')}</TableCell>
                            <TableCell>{i18next.t('label.manager')}</TableCell>
                            <TableCell>{i18next.t('label.Actions')}</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {warehouses.map((warehouse) => (
                            <TableRow
                                key={warehouse.idwarehouse}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell component="th" scope="row">
                                    {warehouse.warehousename}
                                </TableCell>
                                <TableCell>{warehouse.address}</TableCell>
                                <TableCell>{warehouse.manager}</TableCell>
                                <TableCell><Button  variant="outlined"  onClick={() => { setIdWarehouses(warehouse.idwarehouse); setOpenModal(true); }} >{i18next.t('label.Edit')}</Button> </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            {openModal && <MyModal id="id_myModal" title={idWarehouses > 0 ? `${i18next.t('label.Editwarehousename')}` : `${i18next.t('label.Addtwarehousename')}` } openModal={openModal} closeModal={handleClose} >
                <EditWarehouse idWarehouse={idWarehouses} closeModal={handleClose} />
            </MyModal>}
        </MainCard>
    </div>
    );
}
export default WarehousesList