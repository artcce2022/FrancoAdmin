import axios from 'axios'
import {  useEffect, useState} from 'react' 
import MyModal from '../../shared/Modal';
import EditSymptomCategory from './_EditSymptomCategory.js'
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button , CardHeader, IconButton } from '@mui/material';
import MainCard from '../../ui-component/cards/MainCard';


const URI = 'http://localhost:3001/scategories/'
const SymptomCategoriesList =() =>{
    const [symptomcategories, setSymptomCategories] = useState([]);
    const [openModal,setOpenModal] = useState(false);
    let  [idSymptomCategory, setIdSymptomCategory] = useState(0); 
    const handleClose = () =>{ 
        setOpenModal(false);
        getSymptomCategoriesList();
    };
     
    useEffect(()=>{
        getSymptomCategoriesList()
    },[])

    //mostrar companies
    const getSymptomCategoriesList= async () =>{
        const res = await axios.get(URI);
        setSymptomCategories(res.data);
    }
 

    return (<div>
        <MainCard title={<CardHeader action={<Button  variant="contained"  onClick={()=> {setIdSymptomCategory(0); setOpenModal(true);}} className='btn btn-primary'>Agregar</Button>} title="Categorias de Fallas"/>} >
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} size="small" aria-label="Patios">
                    <TableHead>
                        <TableRow>
                            <TableCell>Categoria</TableCell>
                            <TableCell>Acciones</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {symptomcategories.map((category) => (
                            <TableRow
                                key={category.idsymptomcategory}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell component="th" scope="row">
                                    {category.category}
                                </TableCell>
                                <TableCell><Button  variant="outlined"  onClick={() => { setIdSymptomCategory(category.idsymptomcategory); setOpenModal(true); }} >Editar</Button> </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            {openModal && <MyModal id="id_myModal" title={idSymptomCategory > 0 ? "Editar Categoria de Fallas" : "Agregar  Categoria de Fallas"} openModal={openModal} closeModal={handleClose} >
                <EditSymptomCategory idSymptomCategory={idSymptomCategory} closeModal={handleClose} />
            </MyModal>}
        </MainCard>
    </div>
    );
}
export default SymptomCategoriesList 
 