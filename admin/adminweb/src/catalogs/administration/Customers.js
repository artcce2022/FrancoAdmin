import axios from 'axios'
import {  useEffect, useState} from 'react' 
 import $ from 'jquery';
import MyModal from '../../shared/Modal';
import DataTable from 'datatables.net';  
import EditCustomer from './_EditCustomer';
import { useNavigate } from "react-router-dom"; 

const URI = 'http://localhost:3001/customers/'
const CustomersList =() =>{
    const [customers, setCustomers] = useState([]);
    const [openModal,setOpenModal] = useState(false);
    let  [idCustomer, setIdCustomer] = useState(0);  
    let navigate = useNavigate(); 
    const routeChange = (idCustomerNew) =>{ 
        console.log(idCustomerNew);
      let path = `/CustomerDetail/` + idCustomerNew; 
      navigate(path);
    }

    const handleClose = () =>{ 
        setOpenModal(false);
        getCustomers();
    };
     
    useEffect(()=>{
        getCustomers()
    },[])

    //mostrar companies
    const getCustomers= async () =>{
        const res = await axios.get(URI);
        setCustomers(res.data);
        console.log(res.data);
    }
 
    useEffect(() => {
        setTimeout(()=>{
          $("#table-customers").DataTable({
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
                        <button onClick={()=> {setIdCustomer(0); setOpenModal(true);}} className='btn btn-primary'>Crear</button>
                    </div>
                    <table  id="table-customers" className="table table-bordered table-hover">
                        <thead className='table-primary'>
                            <tr>
                                <th>Cliente</th>
                                <th>Company</th>                                
                                <th>City</th>
                                <th>Phone</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                            customers.map((customer)=> (
                                    <tr key={customer.idcustomer}>
                                        <td>
                                            {customer.shortname}
                                        </td>
                                        <td>
                                            {customer.company}
                                        </td> 
                                        <td>
                                            {customer.city}
                                        </td> 
                                        <td>
                                            {customer.phone}
                                        </td> 
                                        <td>
                                             {/* <Link to={`/${company.idCompany}`} className="btn btn-info">Editar </Link>  */}
                                              
                                            <button className='btn btn-danger' onClick={()=> {setIdCustomer(customer.idcustomer); setOpenModal(true);} } >Editar</button>
                                            <button className='btn btn-danger' onClick={()=> {setIdCustomer(customer.idcustomer); routeChange(customer.idcustomer)} } >Detalle</button>
                                        </td>
                                    </tr>
                                ))  
                            }
                        </tbody>
                    </table>
                   { openModal && <MyModal id="id_myModal" title={idCustomer>0 ?  "Editar Cliente"  :"Agregar Cliente" }  modalContent={<EditCustomer  idCustomer={idCustomer}  closeModal={handleClose}/> } openModal={openModal}  closeModal={handleClose} ></MyModal> } 
                </div>
               
            </div> 
    )
}
export default CustomersList