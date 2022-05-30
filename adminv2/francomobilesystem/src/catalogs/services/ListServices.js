import axios from 'axios'
import {  useEffect, useState} from 'react' 
import MyModal from '../../shared/Modal';
import { useNavigate } from "react-router-dom"; 
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button , CardHeader, IconButton } from '@mui/material';
import MainCard from '../../ui-component/cards/MainCard';
import i18next from 'i18next';

const URI = 'http://localhost:3001/services/'
const ServicesList =() =>{
    const [services, setServices] = useState([]);
    const [openModal,setOpenModal] = useState(false);
    let  [idService, setIdService] = useState(0); 
    let navigate = useNavigate(); 
    const handleClose = () =>{ 
        setOpenModal(false);
        getServices();
    };
    const routeChange = (idCustomerNew) =>{ 
        console.log(idCustomerNew);
      let path = `/ServiceDetail/` + idCustomerNew; 
      navigate(path);
    }
    useEffect(()=>{
        getServices()
    },[])

    //mostrar companies
    const getServices= async () =>{
        const res = await axios.get(URI);
        console.log(res.data);
         setServices(res.data);
    }

    return (<div>
        <MainCard title={<CardHeader action={<Button  variant="contained"  onClick={()=> {setIdService(0); setOpenModal(true);}} className='btn btn-primary'>Agregar</Button>} title="Vendedores"/>} >
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} size="small" aria-label="Patios">
                    <TableHead>
                        <TableRow>
                            <TableCell>Customer</TableCell>
                            <TableCell>Date</TableCell>
                            <TableCell>Location</TableCell>
                            <TableCell>Vehicle</TableCell>
                            <TableCell>guid</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {services.map((service) => (
                            <TableRow
                                key={service.idService}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell component="th" scope="row">
                                    {service.customer.shortname}
                                </TableCell>
                                <TableCell>{service.datecreate}</TableCell>
                                <TableCell>{service.location.locationName}</TableCell>
                                <TableCell>{service.serviceid}</TableCell>
                                <TableCell>
                                <Button  variant="outlined"  onClick={() => { setIdService(service.serviceid);  routeChange(service.serviceid); }} >{i18next.t('label.Detalle')}</Button> 
                                    </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer> 
        </MainCard>
    </div>
    );
}

export default ServicesList