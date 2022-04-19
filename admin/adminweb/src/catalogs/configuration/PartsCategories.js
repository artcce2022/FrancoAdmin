import axios from 'axios'
import {  useEffect, useState} from 'react' 
 import $ from 'jquery';
import MyModal from '../../shared/Modal';
import DataTable from 'datatables.net'; 
import EditPartCategory from './_EditPartCategory.js'

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
 
    useEffect(() => {
        setTimeout(()=>{
          $("#table-partscategories").DataTable({
            destroy: true,
            dom: "rBftlip",
            buttons: [
              {

              },
            ],
            lengthMenu: [
              [10, 20, 50, 100, -1],
              [10, 20, 50, 100, "All"],
            ],
            pageLength: 10,
        });
        },1000);
    }, [])


    return (
       <div className='row'>
                <div className='col'>
                    <div >
                        <button onClick={()=> {setIdPartCategory(0); setOpenModal(true);}} className='btn btn-primary'>Crear</button>
                    </div>
                    <table  id="table-partscategories" className="table table-bordered table-hover">
                        <thead className='table-primary'>
                            <tr>
                                <th>Categoria</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                            partsCategories.map((partcategory)=> (
                                    <tr key={partcategory.idpartscategory}>
                                        <td>
                                            {partcategory.category}
                                        </td>                                   
                                        <td>
                                             {/* <Link to={`/${company.idCompany}`} className="btn btn-info">Editar </Link>  */}
                                              
                                            <button className='btn btn-primary' onClick={()=> {setIdPartCategory(partcategory.idpartscategory); setOpenModal(true);} } >Editar</button>
                                        </td>
                                    </tr>
                                ))  
                            }
                        </tbody>
                    </table>
                   { openModal && <MyModal id="id_myModal" title={idPartCategory>0 ?  "Editar Categoria"  :"Agregar Categoria" }  modalContent={<EditPartCategory idPartCategory={idPartCategory} closeModal={handleClose}/> } openModal={openModal}  closeModal={handleClose} ></MyModal> } 
                </div>
               
            </div> 
    )
}
export default PartsCategoriesList