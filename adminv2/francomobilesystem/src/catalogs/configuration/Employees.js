import axios from 'axios'
import {  useEffect, useState} from 'react'  
import MyModal from '../../shared/Modal';
import EditEmployee from './_EditEmployee';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button , CardHeader, IconButton } from '@mui/material';
import MainCard from '../../ui-component/cards/MainCard';
import i18next from 'i18next';

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

    return (<div>
        <MainCard title={<CardHeader action={<Button  variant="contained"  onClick={()=> {setIdEmployee(0); setOpenModal(true);}} className='btn btn-primary'>{i18next.t('label.Add')}</Button>} title={i18next.t('Employees')}/>} >
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} size="small" aria-label="Empleados">
                    <TableHead>
                        <TableRow>
                            <TableCell>{i18next.t('label.Name')}</TableCell>
                            <TableCell>{i18next.t('label.Lastname')}</TableCell>
                            <TableCell>{i18next.t('label.Email')}</TableCell>
                            <TableCell>{i18next.t('label.Actions')}</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {employees.map((employee) => (
                            <TableRow
                                key={employee.idemployee}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell component="th" scope="row">
                                    {employee.firstname}
                                </TableCell>
                                <TableCell>{employee.lastname}</TableCell>
                                <TableCell>{employee.email}</TableCell>
                                <TableCell><Button  variant="outlined"  onClick={() => { setIdEmployee(employee.idemployee); setOpenModal(true); }} >{i18next.t('label.Edit')}</Button> </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            {openModal && <MyModal id="id_myModal" title={idEmployee > 0 ? `${i18next.t('label.editemployee')}` : `${i18next.t('label.addemployee')}` }
 openModal={openModal} closeModal={handleClose} >
                <EditEmployee idEmployee={idEmployee} closeModal={handleClose} />
            </MyModal>}
        </MainCard>
    </div>
    );

    // return (
    //    <div className='row'>
    //             <div className='col'>
    //                 <div >
    //                     <button onClick={()=> {setIdEmployee(0); setOpenModal(true);}} className='btn btn-primary'>Crear</button>
    //                 </div>
    //                 <table  id="table-employee" className="table table-bordered table-hover">
    //                     <thead className='table-primary'>
    //                         <tr>
    //                             <th>FirstName</th>
    //                             <th>LastName</th>
    //                             <th>Email</th>
    //                             <th></th>
    //                         </tr>
    //                     </thead>
    //                     <tbody>
    //                         {
    //                         employees.map((employee)=> (
    //                                 <tr key={employee.idemployee}>
    //                                     <td>
    //                                         {employee.firstname}
    //                                     </td>
    //                                     <td>
    //                                         {employee.lastname}
    //                                     </td>
    //                                     <td>
    //                                         {employee.email}
    //                                     </td>
    //                                     <td>
    //                                          {/* <Link to={`/${company.idCompany}`} className="btn btn-info">Editar </Link>  */}
                                              
    //                                         <button className='btn btn-danger' onClick={()=> {setIdEmployee(employee.idemployee); setOpenModal(true);} } >Editar</button>
    //                                     </td>
    //                                 </tr>
    //                             ))  
    //                         }
    //                     </tbody>
    //                 </table>
    //                { openModal && <MyModal id="id_myModal" title={idEmployee>0 ?  "Editar Empleado"  :"Agregar Empleado" }  modalContent={<EditEmployee idEmployee={idEmployee} closeModal={handleClose}/> } openModal={openModal}  closeModal={handleClose} ></MyModal> } 
    //             </div>
               
    //         </div> 
    // )
}
export default EmployeesList