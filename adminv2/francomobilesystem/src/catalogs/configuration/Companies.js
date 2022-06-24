import axios from 'axios'
import { useEffect, useState } from 'react' 
import MyModal from './../../shared/Modal';
import EditCompany from './_EditCompany.js';
import * as React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button , CardHeader, IconButton } from '@mui/material';
import MainCard from './../../ui-component/cards/MainCard'; 
import i18next from 'i18next';



const URI = 'http://localhost:3001/companies/'
const CompaniesList = () => {
    const [companies, setCompany] = useState([]);
    const [openModal, setOpenModal] = useState(false);
    let [idCompany, setIdCompany] = useState(0);
    const handleClose = () => {
        setOpenModal(false);
        getCompanyList();
    };

    console.log("entre ahora a 2");
    useEffect(() => {
        getCompanyList()
    }, [])

    //mostrar companies
    const getCompanyList = async () => {
        const res = await axios.get(URI);
        setCompany(res.data);
    }



    return (<div>
        <MainCard title={<CardHeader action={<Button  variant="contained"  onClick={()=> {setIdCompany(0); setOpenModal(true);}} className='btn btn-primary'>Agregar</Button>} title="Empresas"/>} >
            <TableContainer component={Paper}>

                <Table sx={{ minWidth: 650 }} size="small" aria-label="Companies">
                    <TableHead>
                        <TableRow>
                            <TableCell>{i18next.t('label.NomEmpresa')}</TableCell>
                            <TableCell>{i18next.t('label.Phone')}</TableCell>
                            <TableCell>{i18next.t('label.Email')}</TableCell>
                            <TableCell>{i18next.t('label.Actions')}</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {companies.map((company) => (
                            <TableRow
                                key={company.idCompany}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell component="th" scope="row">
                                    {company.companyName}
                                </TableCell>
                                <TableCell>{company.phone}</TableCell>
                                <TableCell>{company.email}</TableCell>
                                <TableCell><Button  variant="outlined"  onClick={() => { setIdCompany(company.idCompany); setOpenModal(true); }} >Editar</Button> </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            {openModal && <MyModal id="id_myModal" title={idCompany > 0 ? `${i18next.t('label.editCompany')}` : `${i18next.t('label.addCompany')}` } openModal={openModal} closeModal={handleClose} >
                <EditCompany idCompany={idCompany} closeModal={handleClose} />
            </MyModal>}
        </MainCard>
    </div>
    );



    // return (
    //    <div className='row'>
    //             <div className='col'>
    //                 <div >
    //                     <button onClick={()=> {setIdCompany(0); setOpenModal(true);}} className='btn btn-primary'>Crear</button>
    //                 </div>
    //                 <table  id="table-companies" className="table table-bordered table-hover">
    //                     <thead className='table-primary'>
    //                         <tr>
    //                             <th>Empresa</th>
    //                             <th>Telefono</th>
    //                             <th>Email</th>
    //                             <th></th>
    //                         </tr>
    //                     </thead>
    //                     <tbody>
    //                         {
    //                         companies.map((company)=> (
    //                                 <tr key={company.idCompany}>
    //                                     <td>
    //                                         {company.companyName}
    //                                     </td>
    //                                     <td>
    //                                         {company.phone}
    //                                     </td>
    //                                     <td>
    //                                         {company.email}
    //                                     </td>
    //                                     <td>
    //                                          {/* <Link to={`/${company.idCompany}`} className="btn btn-info">Editar </Link>  */}

    //                                         <button className='btn btn-danger' onClick={()=> {setIdCompany(company.idCompany); setOpenModal(true);} } >Editar</button>
    //                                     </td>
    //                                 </tr>
    //                             ))  
    //                         }
    //                     </tbody>
    //                 </table>
    //                { openModal && <MyModal id="id_myModal" title={idCompany>0 ?  "Editar Empresa"  :"Agregar Empresa" }  modalContent={<EditCompany idCompany={idCompany} closeModal={handleClose}/> } openModal={openModal}  closeModal={handleClose} >
    //                     <EditCompany idCompany={idCompany} closeModal={handleClose}/> 
    //                </MyModal> } 
    //             </div>
    //         </div> 
    //)
}
export default CompaniesList