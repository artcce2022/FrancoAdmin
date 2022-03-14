import axios from 'axios'
import {  useEffect, useState} from 'react' 
 import $ from 'jquery';
import MyModal from '../../shared/Modal';
import DataTable from 'datatables.net';
import EditCompany from './_EditCompany';

const URI = 'http://localhost:3001/employees/'
const EmployeesList =() =>{
    const [employees, setemployee] = useState([]);
    const [openModal,setOpenModal] = useState(false);
    let  [idEmployee, setIdEmployee] = useState(0); 
    const handleClose = () =>{ 
        setOpenModal(false);
        getEmployeeList();
    };
     
    useEffect(()=>{
        getEmployeeList()
    },[])

    //mostrar companies
    const getEmployeeList= async () =>{
        const res = await axios.get(URI);
        setemployee(res.data);
    }
 
    useEffect(() => {
        setTimeout(()=>{
          $("#table-employee").DataTable({
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
                        <button onClick={()=> {setIdEmployee(0); setOpenModal(true);}} className='btn btn-primary'>Crear</button>
                    </div>
                    <table  id="table-companies" className="table table-bordered table-hover">
                        <thead className='table-primary'>
                            <tr>
                                <th>FirstName</th>
                                <th>LastName</th>
                                <th>Email</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                            employees.map((employee)=> (
                                    <tr key={employee.idEmployee}>
                                        <td>
                                            {employee.firstName}
                                        </td>
                                        <td>
                                            {employee.lastName}
                                        </td>
                                        <td>
                                            {employee.email}
                                        </td>
                                        <td>
                                             {/* <Link to={`/${company.idCompany}`} className="btn btn-info">Editar </Link>  */}
                                              
                                            <button className='btn btn-danger' onClick={()=> {setIdEmployee(employee.idEmployee); setOpenModal(true);} } >Editar</button>
                                        </td>
                                    </tr>
                                ))  
                            }
                        </tbody>
                    </table>
                   { openModal && <MyModal id="id_myModal" title={idEmployee>0 ?  "Editar Empleado"  :"Agregar Empleado" }  modalContent={<EditCompany idCompany={idEmployee} closeModal={handleClose}/> } openModal={openModal}  closeModal={handleClose} ></MyModal> } 
                </div>
               
            </div> 
    )
}
export default EmployeesList