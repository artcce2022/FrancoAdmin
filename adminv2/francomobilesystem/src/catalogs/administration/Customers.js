import axios from 'axios'
import {  useEffect, useState} from 'react'  
import MyModal from '../../shared/Modal'; 
import EditCustomer from './_EditCustomer.js';
import { useNavigate } from "react-router-dom"; 
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button , CardHeader, IconButton } from '@mui/material';
import MainCard from '../../ui-component/cards/MainCard';
import i18next from 'i18next';


const URI = 'http://localhost:3001/customers/'
const CustomersList =() =>{
    const [customers, setCustomers] = useState([]);
    const [openModal,setOpenModal] = useState(false);
    let  [idCustomer, setIdCustomer] = useState(0);  
    let navigate = useNavigate(); 
    const routeChange = (idCustomerNew) =>{ 
        console.log(idCustomerNew);
      let path = `/CustomerDetail/` + idCustomerNew; 
      navigate(path);
    }

    const handleClose = () =>{ 
        setOpenModal(false);
        getCustomers();
    };
     
    useEffect(()=>{
        getCustomers()
    },[])

    //mostrar companies
    const getCustomers= async () =>{
        const res = await axios.get(URI);
        setCustomers(res.data);
        console.log(res.data);
    }

    return (<div>
        <MainCard title={<CardHeader action={<Button  variant="contained"  onClick={()=> {setIdCustomer(0); setOpenModal(true);}} className='btn btn-primary'>{i18next.t('label.Add')}</Button>} title={i18next.t('label.Customer')}/>} >
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} size="small" aria-label="Patios">
                    <TableHead>
                        <TableRow>
                            <TableCell>{i18next.t('label.Customer')}</TableCell>
                            <TableCell>{i18next.t('label.Company')}</TableCell>
                            <TableCell>{i18next.t('label.City')}</TableCell>
                            <TableCell>{i18next.t('label.Phone')}</TableCell>
                            <TableCell>{i18next.t('label.Actions')}</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {customers.map((customer) => (
                            <TableRow
                                key={customer.idcustomer}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell component="th" scope="row">
                                    {customer.shortname}
                                </TableCell>
                                <TableCell>{customer.company}</TableCell>
                                <TableCell>{customer.city}</TableCell>
                                <TableCell>{customer.phone}</TableCell>
                                <TableCell>
                                    <Button  variant="outlined"  onClick={() => { setIdCustomer(customer.idcustomer); setOpenModal(true); }} >{i18next.t('label.Edit')}</Button> 
                                    <Button  variant="outlined"  onClick={() => { setIdCustomer(customer.idcustomer);  routeChange(customer.idcustomer); }} >{i18next.t('label.Detalle')}</Button> 
                                </TableCell>                              
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            {openModal && <MyModal id="id_myModal" title={idCustomer > 0 ? `${i18next.t('label.EditCustomer')}` : `${i18next.t('label.AddCustomer')}` } openModal={openModal} closeModal={handleClose} >
                <EditCustomer idCustomer={idCustomer} closeModal={handleClose} />
            </MyModal>}
        </MainCard>
    </div>
    );
}

export default CustomersList