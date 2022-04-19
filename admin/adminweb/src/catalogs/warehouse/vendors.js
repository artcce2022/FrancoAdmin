import axios from 'axios'
import {  useEffect, useState} from 'react' 
 import $ from 'jquery';
import MyModal from '../../shared/Modal';
import DataTable from 'datatables.net'; 
import EditLocation from './_EditLocation.js'

const URI = 'http://localhost:3001/vendors/'
const VendorsList =() =>{
    const [vendors, setVendors] = useState([]);
    const [openModal,setOpenModal] = useState(false);
    let  [idVendor, setIdVendor] = useState(0); 
    const handleClose = () =>{ 
        setOpenModal(false);
        getVendors();
    };
     
    useEffect(()=>{
        getVendors()
    },[])

    //mostrar companies
    const getVendors= async () =>{
        const res = await axios.get(URI);
        setVendors(res.data);
    }
 
    useEffect(() => {
        setTimeout(()=>{
          $("#table-vendors").DataTable({
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
                        <button onClick={()=> {setIdVendor(0); setOpenModal(true);}} className='btn btn-primary'>Crear</button>
                    </div>
                    <table  id="table-vendors" className="table table-bordered table-hover">
                        <thead className='table-primary'>
                            <tr>
                                <th>Vendedor</th>
                                <th>Contacto</th>
                                <th>Telefono</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                            vendors.map((vendor)=> (
                                    <tr key={vendor.idVendor}>
                                        <td>
                                            {vendor.name}
                                        </td>
                                        <td>
                                            {vendor.contact}
                                        </td>
                                        <td>
                                            {vendor.phone}
                                        </td>
                                        <td>
                                             {/* <Link to={`/${company.idCompany}`} className="btn btn-info">Editar </Link>  */}
                                              
                                            <button className='btn btn-danger' onClick={()=> {setIdVendor(vendor.idVendor); setOpenModal(true);} } >Editar</button>
                                        </td>
                                    </tr>
                                ))  
                            }
                        </tbody>
                    </table>
                   { openModal && <MyModal id="id_myModal" title={idVendor>0 ?  "Editar Patio"  :"Agregar Patio" }  modalContent={<EditLocation idLocation={idVendor} closeModal={handleClose}/> } openModal={openModal}  closeModal={handleClose} ></MyModal> } 
                </div>
               
            </div> 
    )
}
export default VendorsList