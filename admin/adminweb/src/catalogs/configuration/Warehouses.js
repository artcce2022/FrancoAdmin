import axios from 'axios'
import {  useEffect, useState} from 'react' 
 import $ from 'jquery';
import MyModal from '../../shared/Modal';
import DataTable from 'datatables.net'; 
import EditWarehouse from './_EditWarehouse'

const URI = 'http://localhost:3001/warehouse/'
const WarehousesList =() =>{
    const [warehouses, setWarehouses] = useState([]);
    const [openModal,setOpenModal] = useState(false);
    let  [idWarehouses, setIdWarehouses] = useState(0); 
    const handleClose = () =>{ 
        setOpenModal(false);
        getWarehouses();
    };
     
    useEffect(()=>{
        getWarehouses()
    },[])

    //mostrar companies
    const getWarehouses= async () =>{
        const res = await axios.get(URI);
        setWarehouses(res.data);
    }
 
    useEffect(() => {
        setTimeout(()=>{
          $("#table-warehouses").DataTable({
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
                        <button onClick={()=> {setIdWarehouses(0); setOpenModal(true);}} className='btn btn-primary'>Crear</button>
                    </div>
                    <table  id="table-warehouses" className="table table-bordered table-hover">
                        <thead className='table-primary'>
                            <tr>
                                <th>Almacen</th>
                                <th>Direccion</th>
                                <th>Gerente</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                            warehouses.map((warehouse)=> (
                                    <tr key={warehouse.idwarehouse}>
                                        <td>
                                            {warehouse.warehousename}
                                        </td>
                                        <td>
                                            {warehouse.address}
                                        </td>
                                        <td>
                                            {warehouse.manager}
                                        </td>
                                        <td>
                                             {/* <Link to={`/${company.idCompany}`} className="btn btn-info">Editar </Link>  */}
                                              
                                            <button className='btn btn-danger' onClick={()=> {setIdWarehouses(warehouse.idwarehouse); setOpenModal(true);} } >Editar</button>
                                        </td>
                                    </tr>
                                ))  
                            }
                        </tbody>
                    </table>
                   { openModal && <MyModal id="id_myModal" title={idWarehouses>0 ?  "Editar Almacen"  :"Agregar Almacen" }  modalContent={<EditWarehouse idWarehouse={idWarehouses} closeModal={handleClose}/> } openModal={openModal}  closeModal={handleClose} ></MyModal> } 
                </div>
               
            </div> 
    )
}
export default WarehousesList