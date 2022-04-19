import axios from 'axios'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import MainCard from '../../ui-component/cards/MainCard';
import CustomerContactsList from '../../Components/CustomerContactsList.js';
import VehicleList from '../../Components/CustomerVehicleList.js';
import EditCustomer from './_EditCustomer.js';
import MyModal from '../../shared/Modal'; 
import { Paper, Button, CardHeader, IconButton, Grid, Typography, Divider, List, ListItem, ListItemText } from '@mui/material';

const CustomerDetail = () => {
    const [Customer, setCustomer] = useState([]);
    const [openModal,setOpenModal] = useState(false);
    const [idCustomer, setIdCustomer] = useState(0);
    let { id } = useParams();
    const URI = 'http://localhost:3001/customers/';

    useEffect(() => {
        setIdCustomer(id);
    }, []);

    const handleClose = () =>{ 
        setOpenModal(false);
        getCustomer();
    };
     
     //mostrar companies
   
    useEffect(() => {
        getCustomer();
    }, []);
 

    const getCustomer= async () =>{
        axios.get(URI + id).then((response) => {
            setCustomer(response.data);
            // setIdsymptomcategory(response.data.idsymptomcategory);
        });
    }
    


    return (
        <Grid container>
            <Grid item md={6}>
                <MainCard title={<CardHeader action={<Button variant="contained" onClick={() => { setOpenModal(true); }} className='btn btn-primary'>Editar</Button>} title={Customer.company} />} >
                    <Paper>                      
                        <List>
                            <ListItem>
                                <ListItemText primary="Alias" />
                                <ListItemText primary="" secondary={Customer.shortname} />
                            </ListItem>
                            <ListItem>
                                <ListItemText primary="Empresa" />
                                <ListItemText primary="" secondary={Customer.company} />
                            </ListItem>
                            <ListItem>
                                <ListItemText primary="Nombre" />
                                <ListItemText primary="" secondary={Customer.firstname + " " + Customer.lastname} />
                            </ListItem>
                            <ListItem>
                                <ListItemText primary="Direccion" />
                                <ListItemText primary="" secondary={Customer.address} />
                            </ListItem>
                            <ListItem>
                                <ListItemText primary="zipcode" />
                                <ListItemText primary="" secondary={Customer.zipcode} />
                            </ListItem>
                            <ListItem>
                                <ListItemText primary="city" />
                                <ListItemText primary="" secondary={Customer.city} />
                            </ListItem>
                            <ListItem>
                                <ListItemText primary="state" />
                                <ListItemText primary="" secondary={Customer.state} />
                            </ListItem>
                            <ListItem>
                                <ListItemText primary="phone" />
                                <ListItemText primary="" secondary={Customer.phone} />
                            </ListItem>
                            <ListItem>
                                <ListItemText primary="mobilephone" />
                                <ListItemText primary="" secondary={Customer.mobilephone} />
                            </ListItem>
                        </List>
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
            {openModal && <MyModal id="id_myModal" title={idCustomer > 0 ? "Editar Cliente" : "Agregar Cliente"} openModal={openModal} closeModal={handleClose} >
                <EditCustomer idCustomer={idCustomer} closeModal={handleClose} />
            </MyModal>}
        </Grid>
    )
}

export default CustomerDetail