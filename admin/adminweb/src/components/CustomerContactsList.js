import axios from 'axios'
import {  useEffect, useState} from 'react' 
 import $ from 'jquery';
import DataTable from 'datatables.net';  
import MyModal from '../shared/Modal';
import EditCustomerContact from '../catalogs/administration/_EditCustomerContact.js'; 
import { useParams} from 'react-router-dom'

const CustomerContactsList = () =>{
    const [customercontacts, setCustomercontacts] = useState([]);
    const [openModal,setOpenModal] = useState(false);
    let  [idCustomerContact, setIdCustomerContact] = useState(0);   
    let  [idCustomer, setIdCustomer] = useState(0);
    let { id } = useParams();  
    const handleClose = () =>{ 
        setOpenModal(false);
        getCustomerContacts();
    };
    
    
    //mostrar companies
    const getCustomerContacts= async () =>{
        setIdCustomer(id);
        const URI = 'http://localhost:3001/customercontacts/';
        const res = await axios.get(URI + id);
        setCustomercontacts(res.data); 
    }
    
    useEffect(()=>{
       
        getCustomerContacts()
    },[])

 
    useEffect(() => {
        setTimeout(()=>{
          $("#table-contacts").DataTable({
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
            pageLength: 5,
        });
        },1000);
    }, [])


    return (
       <div className='row'>
                <div className='col'>
                    <div > 
                        <button onClick={()=> {setIdCustomerContact(0); setOpenModal(true);}} className='btn btn-primary'>Crear</button>
                    </div>
                    <table  id="table-contacts" className="table table-bordered table-hover">
                        <thead className='table-primary'>
                            <tr>
                                <th>Cliente</th>
                                <th>Name</th>                                
                                <th>LastName</th>
                                <th>Phone</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                            customercontacts.map((contact)=> (
                                    <tr key={contact.idcustomercontact}>
                                        <td>
                                            {contact.customer.shortname} 
                                        </td>
                                        <td>
                                            {contact.name}
                                        </td> 
                                        <td>
                                            {contact.lastname}
                                        </td> 
                                        <td>
                                            {contact.phone}
                                        </td> 
                                        <td>
                                             {/* <Link to={`/${company.idCompany}`} className="btn btn-info">Editar </Link>  */}
                                              
                                            <button className='btn btn-danger' onClick={()=> {setIdCustomerContact(contact.idcustomercontact); setOpenModal(true);} } >Editar</button>
                                        </td>
                                    </tr>
                                ))  
                            }
                        </tbody>
                    </table>
                      { openModal && <MyModal id="id_myModal" title={idCustomerContact>0 ?  "Editar Contacto"  :"Agregar Contacto" }  modalContent={<EditCustomerContact  idCustomer={idCustomer} idCustomerContact={idCustomerContact} closeModal={handleClose}/> } openModal={openModal}  closeModal={handleClose} ></MyModal> }  
                </div>
               
            </div> 
    )
}
export default CustomerContactsList