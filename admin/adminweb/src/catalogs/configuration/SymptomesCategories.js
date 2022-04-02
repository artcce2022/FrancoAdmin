import axios from 'axios'
import {  useEffect, useState} from 'react' 
 import $ from 'jquery';
import MyModal from '../../shared/Modal';
import DataTable from 'datatables.net'; 
import EditSymptomCategory from './_EditSymptomCategory.js'

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
 
    useEffect(() => {
        setTimeout(()=>{
          $("#table-symptomcategories").DataTable({
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
                        <button onClick={()=> {setIdSymptomCategory(0); setOpenModal(true);}} className='btn btn-primary'>Crear</button>
                    </div>
                    <table  id="table-symptomcategories" className="table table-bordered table-hover">
                        <thead className='table-primary'>
                            <tr>
                                <th>Categoria</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                            symptomcategories.map((symptomcategory)=> (
                                    <tr key={symptomcategory.idsymptomcategory}>
                                        <td>
                                            {symptomcategory.category}
                                        </td>                                   
                                        <td>
                                             {/* <Link to={`/${company.idCompany}`} className="btn btn-info">Editar </Link>  */}
                                              
                                            <button className='btn btn-primary' onClick={()=> {setIdSymptomCategory(symptomcategory.idsymptomcategory); setOpenModal(true);} } >Editar</button>
                                        </td>
                                    </tr>
                                ))  
                            }
                        </tbody>
                    </table>
                   { openModal && <MyModal id="id_myModal" title={idSymptomCategory>0 ?  "Editar Categoria"  :"Agregar Categoria" }  modalContent={<EditSymptomCategory idSymptomCategory={idSymptomCategory} closeModal={handleClose}/> } openModal={openModal}  closeModal={handleClose} ></MyModal> } 
                </div>
               
            </div> 
    )
}
export default SymptomCategoriesList