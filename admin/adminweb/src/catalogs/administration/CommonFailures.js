import axios from 'axios'
import {  useEffect, useState} from 'react' 
 import $ from 'jquery';
import MyModal from '../../shared/Modal';
import DataTable from 'datatables.net'; 
import EditCommonFailure from './_EditCommonFailure'

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
 
    useEffect(() => {
        setTimeout(()=>{
          $("#table-failures").DataTable({
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
                        <button onClick={()=> {setIdCommonFailure(0); setOpenModal(true);}} className='btn btn-primary'>Crear</button>
                    </div>
                    <table  id="table-failures" className="table table-bordered table-hover">
                        <thead className='table-primary'>
                            <tr>
                                <th>Descripcion</th>
                                <th>Categoria</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                            CommonFailures.map((failure)=> (
                                    <tr key={failure.idcommonfailures}>
                                        <td>
                                            {failure.shortdescription}
                                        </td>
                                        <td>
                                            {failure.symptomscategory.category}
                                        </td> 
                                        <td>
                                             {/* <Link to={`/${company.idCompany}`} className="btn btn-info">Editar </Link>  */}
                                              
                                            <button className='btn btn-danger' onClick={()=> {setIdCommonFailure(failure.idcommonfailures); setOpenModal(true); setIdsymptomcategorydefault(failure.idsymptomcategory); } } >Editar</button>
                                        </td>
                                    </tr>
                                ))  
                            }
                        </tbody>
                    </table>
                   { openModal && <MyModal id="id_myModal" title={idCommonFailure>0 ?  "Editar Falla"  :"Agregar Falla" }  modalContent={<EditCommonFailure idsymptomcategorydefault={idsymptomcategorydefault} idCommonFailure={idCommonFailure} closeModal={handleClose}/> } openModal={openModal}  closeModal={handleClose} ></MyModal> } 
                </div>
               
            </div> 
    )
}
export default CommonFailuresList