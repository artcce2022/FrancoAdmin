import axios from 'axios'
import { useEffect, useState } from 'react'
import MyModal from '../../shared/Modal';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, CardHeader, IconButton } from '@mui/material';
import MainCard from '../../ui-component/cards/MainCard';
import i18next from '../../utils/locales/i18n.js'
import StepButtons from '../../form-components/Steps/StepButtons.js'; 

const ServiceFilesList = ({ idService, setOpenModal, serviceGuid }) => {
    const [serviceFiles, setServiceFiles] = useState([]);    
const URI = 'http://localhost:3001/services/files/'
    useEffect(() => {
        getServiceFiles();
    }, []);


    const getServiceFiles = () => { 
        console.log(URI + idService);     
        axios.get(URI + idService).then((response) => {
            let details=response.data;  
            console.log(details);          
            setServiceFiles(details);
            // setIdsymptomcategory(response.data.idsymptomcategory);
        });
    }


    return (
        <>
            <MainCard title={<CardHeader action={<Button variant="contained"  onClick={() => { setOpenModal(true); }} className='btn btn-primary'>Agregar</Button>} title={i18next.t('label.Files')} />} >
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }} size="small" aria-label="Patios">
                        <TableHead>
                            <TableRow>
                                <TableCell>{i18next.t('label.Description')}</TableCell>
                                <TableCell>{i18next.t('label.FileType')}</TableCell>
                                 <TableCell>{i18next.t('label.Actions')}</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>

                            {serviceFiles.map((file, index) => (
                                <TableRow
                                    key={file.idservicefile}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    <TableCell component="th" scope="row">
                                        {file.filename}
                                    </TableCell>
                                    <TableCell component="th" scope="row">
                                        {file.filetype}
                                    </TableCell>
                                    <TableCell>
                                        {/* <Button  variant="outlined"  onClick={() => { setDetail(detail.description); setOpenModalDetail(true); }} >Editar</Button> */}
                                        {/* <Button variant="outlined" onClick={() => { deleteDetail(detail.rowId, index) }} >Eliminar</Button> */}
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>        
            </MainCard>
        </>
    )
}
export default ServiceFilesList