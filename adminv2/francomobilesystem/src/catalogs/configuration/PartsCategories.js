import axios from 'axios'
import {  useEffect, useState} from 'react' 
import MyModal from '../../shared/Modal';
import EditPartCategory from './_EditPartCategory.js'
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button , CardHeader, IconButton } from '@mui/material';
import MainCard from '../../ui-component/cards/MainCard';


const URI = 'http://localhost:3001/partscategories/'
const PartsCategoriesList =() =>{
    const [partsCategories, setPartsCategories] = useState([]);
    const [openModal,setOpenModal] = useState(false);
    let  [idPartCategory, setIdPartCategory] = useState(0); 
    const handleClose = () =>{ 
        setOpenModal(false);
        getPartsCategoriesList();
    };
     
    useEffect(()=>{
        getPartsCategoriesList()
    },[])

    //mostrar companies
    const getPartsCategoriesList= async () =>{
        const res = await axios.get(URI);
        setPartsCategories(res.data);
    }
 

    return (<div>
        <MainCard title={<CardHeader action={<Button  variant="contained"  onClick={()=> {setIdPartCategory(0); setOpenModal(true);}} className='btn btn-primary'>Agregar</Button>} title="Categoria de Refacciones"/>} >
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} size="small" aria-label="Patios">
                    <TableHead>
                        <TableRow>
                            <TableCell>Categoria</TableCell>
                            <TableCell>Acciones</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {partsCategories.map((category) => (
                            <TableRow
                                key={category.idpartscategory}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell component="th" scope="row">
                                    {category.category}
                                </TableCell>
                                <TableCell><Button  variant="outlined"  onClick={() => { setIdPartCategory(category.idpartscategory); setOpenModal(true); }} >Editar</Button> </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            {openModal && <MyModal id="id_myModal" title={idPartCategory > 0 ? "Editar Categoria de Refacciones" : "Agregar  Categoria de Refacciones"} openModal={openModal} closeModal={handleClose} >
                <EditPartCategory idPartCategory={idPartCategory} closeModal={handleClose} />
            </MyModal>}
        </MainCard>
    </div>
    );
}
export default PartsCategoriesList
 