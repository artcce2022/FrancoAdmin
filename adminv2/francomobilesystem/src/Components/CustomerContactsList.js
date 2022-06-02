import axios from 'axios'
import {  useEffect, useState} from 'react'  
import MyModal from '../shared/Modal';
import EditCustomerContact from '../catalogs/administration/_EditCustomerContact.js'; 
import { useParams} from 'react-router-dom' 
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button , CardHeader, IconButton, Typography, Divider } from '@mui/material';
import i18next from 'i18next';

const CustomerContactsList = () =>{
    const [customercontacts, setCustomercontacts] = useState([]);
    const [openModal,setOpenModal] = useState(false);
    let  [idCustomerContact, setIdCustomerContact] = useState(0);   
    let  [idCustomer, setIdCustomer] = useState(0);
    let { id } = useParams();  
    const handleClose = () =>{ 
        setOpenModal(false);
        getCustomerContacts();
    };
    
    
    //mostrar companies
    const getCustomerContacts= async () =>{
        setIdCustomer(id);
        const URI = 'http://localhost:3001/customercontacts/';
        const res = await axios.get(URI + id);
        setCustomercontacts(res.data); 
    }
    
    useEffect(()=>{
        getCustomerContacts()
    },[])


    return (
        <Paper>
              <CardHeader title={<CardHeader action={<Button variant="contained"  onClick={() => { setIdCustomerContact(0); setOpenModal(true); }}  className='btn btn-primary'>{i18next.t('label.Add')}</Button>} title={i18next.t('label.contacts')} />} >     
                        </CardHeader>
             <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} size="small" aria-label="Patios">
                    <TableHead>
                        <TableRow>
                            <TableCell>{i18next.t('label.Customer')}</TableCell>
                            <TableCell>{i18next.t('label.Name')}</TableCell>
                            <TableCell>{i18next.t('label.Lastname')}</TableCell>
                            <TableCell>{i18next.t('label.Phone')}</TableCell>
                            <TableCell>{i18next.t('label.Actions')}</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {customercontacts.map((contact) => (
                            <TableRow
                                key={contact.idcustomercontact}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell component="th" scope="row">
                                    {contact.customer.shortname}
                                </TableCell>
                                <TableCell>{contact.name}</TableCell>
                                <TableCell>{contact.lastname}</TableCell>
                                <TableCell>{contact.phone}</TableCell>
                                <TableCell>
                                    <Button  variant="outlined"  onClick={() => { setIdCustomerContact(contact.idcustomercontact); setOpenModal(true); }} >{i18next.t('label.Edit')}</Button>                                     
                                </TableCell>                              
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            {openModal && <MyModal id="id_myModal" title={idCustomer > 0 ? `${i18next.t('label.EditCustomer')}` : `${i18next.t('label.AddCustomer')}` } openModal={openModal} closeModal={handleClose} >
                    <EditCustomerContact  idCustomer={idCustomer} idCustomerContact={idCustomerContact} closeModal={handleClose}/> 
            </MyModal>}           
       
        </Paper>
    )
}
export default CustomerContactsList