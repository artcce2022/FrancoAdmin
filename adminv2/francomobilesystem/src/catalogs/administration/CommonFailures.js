import axios from 'axios'
import {  useEffect, useState} from 'react'  
import MyModal from '../../shared/Modal'; 
import EditCommonFailure from './_EditCommonFailure.js'
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button , CardHeader, IconButton } from '@mui/material';
import MainCard from '../../ui-component/cards/MainCard';



const URI = 'http://localhost:3001/failures/'
const CommonFailuresList =() =>{
    const [CommonFailures, setCommonFailures] = useState([]);
    const [openModal,setOpenModal] = useState(false);
    let  [idCommonFailure, setIdCommonFailure] = useState(0); 
    const[idsymptomcategorydefault, setIdsymptomcategorydefault] = useState(0);
    const handleClose = () =>{ 
        setOpenModal(false);
        getCommonFailuresList();
    };
     
    useEffect(()=>{
        getCommonFailuresList()
    },[])

    //mostrar companies
    const getCommonFailuresList= async () =>{
        const res = await axios.get(URI);
        setCommonFailures(res.data);
        console.log(res.data);
    }


    return ( 
            <MainCard title={<CardHeader action={<Button  variant="contained"  onClick={()=> {setIdCommonFailure(0); setOpenModal(true);}} className='btn btn-primary'>Agregar</Button>} title="Fallas Comunes"/>} >
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} size="small" aria-label="Patios">
                    <TableHead>
                        <TableRow>
                            <TableCell>Descripcion</TableCell>
                            <TableCell>Categoria</TableCell> 
                            <TableCell>Acciones</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {CommonFailures.map((failure) => (
                            <TableRow
                                key={failure.idcommonfailures}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell component="th" scope="row">
                                    {failure.shortdescription}
                                </TableCell>
                                <TableCell>{failure.symptomscategory.category}</TableCell> 
                                <TableCell><Button  variant="outlined"  onClick={() => { setIdCommonFailure(failure.idcommonfailures); setOpenModal(true); }} >Editar</Button> </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            {openModal && <MyModal id="id_myModal" title={idCommonFailure > 0 ? "Editar Falla" : "Agregar Falla"} openModal={openModal} closeModal={handleClose} >
                <EditCommonFailure  idsymptomcategorydefault={idsymptomcategorydefault}  idCommonFailure={idCommonFailure} closeModal={handleClose} />
            </MyModal>}
        </MainCard> 
    )
}
export default CommonFailuresList