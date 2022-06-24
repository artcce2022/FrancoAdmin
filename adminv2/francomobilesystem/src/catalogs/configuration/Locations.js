import axios from 'axios'
import {  useEffect, useState} from 'react'  
import MyModal from '../../shared/Modal'; 
import EditLocation from './_EditLocation.js';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button , CardHeader, IconButton } from '@mui/material';
import MainCard from '../../ui-component/cards/MainCard';
import i18next from 'i18next';

const URI = 'http://localhost:3001/locations/'
const LocationsList =() =>{
    const [locations, setLocation] = useState([]);
    const [openModal,setOpenModal] = useState(false);
    let  [idLocation, setIdLocation] = useState(0); 
    const handleClose = () =>{ 
        setOpenModal(false);
        getLocationsList();
    };
     
    useEffect(()=>{
        getLocationsList()
    },[])

    //mostrar companies
    const getLocationsList= async () =>{
        const res = await axios.get(URI);
        setLocation(res.data);
    }
  
    return (<div>
        <MainCard title={<CardHeader action={<Button  variant="contained"  onClick={()=> {setIdLocation(0); setOpenModal(true);}} className='btn btn-primary'>{i18next.t('label.Add')}</Button>} title="Patios"/>} >
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} size="small" aria-label="Patios">
                    <TableHead>
                        <TableRow>
                            <TableCell>{i18next.t('label.workyard')}</TableCell>
                            <TableCell>{i18next.t('label.Address')}</TableCell>
                            <TableCell>{i18next.t('label.manager')}</TableCell>
                            <TableCell>{i18next.t('label.Actions')}</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {locations.map((location) => (
                            <TableRow
                                key={location.idLocation}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell component="th" scope="row">
                                    {location.locationName}
                                </TableCell>
                                <TableCell>{location.address}</TableCell>
                                <TableCell>{location.manager}</TableCell>
                                <TableCell><Button  variant="outlined"  onClick={() => { setIdLocation(location.idLocation); setOpenModal(true); }} >{i18next.t('label.Edit')}</Button> </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            {openModal && <MyModal id="id_myModal" title={idLocation > 0 ? `${i18next.t('label.editworkyard')}` : `${i18next.t('label.addworkyard')}` } openModal={openModal} closeModal={handleClose} >
                <EditLocation idLocation={idLocation} closeModal={handleClose} />
            </MyModal>}
        </MainCard>
    </div>
    );
}
export default LocationsList