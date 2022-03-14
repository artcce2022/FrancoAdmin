import axios from 'axios'
import {  useEffect, useState} from 'react' 
 import $ from 'jquery';
import MyModal from '../../shared/Modal';
import DataTable from 'datatables.net';
import EditCompany from './_EditCompany';

const URI = 'http://localhost:3001/companies/'
const CompaniesList =() =>{
    const [companies, setCompany] = useState([]);
    const [openModal,setOpenModal] = useState(false);
    let  [idCompany, setIdCompany] = useState(0); 
    const handleClose = () =>{ 
        setOpenModal(false);
        getCompanyList();
    };
     
    useEffect(()=>{
        getCompanyList()
    },[])

    //mostrar companies
    const getCompanyList= async () =>{
        const res = await axios.get(URI);
        setCompany(res.data);
    }
 
    useEffect(() => {
        setTimeout(()=>{
          $("#table-companies").DataTable({
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
                        <button onClick={()=> {setIdCompany(0); setOpenModal(true);}} className='btn btn-primary'>Crear</button>
                    </div>
                    <table  id="table-companies" className="table table-bordered table-hover">
                        <thead className='table-primary'>
                            <tr>
                                <th>Empresa</th>
                                <th>Telefono</th>
                                <th>Email</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                            companies.map((company)=> (
                                    <tr key={company.idCompany}>
                                        <td>
                                            {company.companyName}
                                        </td>
                                        <td>
                                            {company.phone}
                                        </td>
                                        <td>
                                            {company.email}
                                        </td>
                                        <td>
                                             {/* <Link to={`/${company.idCompany}`} className="btn btn-info">Editar </Link>  */}
                                              
                                            <button className='btn btn-danger' onClick={()=> {setIdCompany(company.idCompany); setOpenModal(true);} } >Editar</button>
                                        </td>
                                    </tr>
                                ))  
                            }
                        </tbody>
                    </table>
                   { openModal && <MyModal id="id_myModal" title={idCompany>0 ?  "Editar Empresa"  :"Agregar Empresa" }  modalContent={<EditCompany idCompany={idCompany} closeModal={handleClose}/> } openModal={openModal}  closeModal={handleClose} ></MyModal> } 
                </div>
               
            </div> 
    )
}
export default CompaniesList