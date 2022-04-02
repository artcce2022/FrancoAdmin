import axios from 'axios'
import {  useEffect, useState} from 'react' 
 import $ from 'jquery'; 
 import MyModal from '../shared/Modal';
import EditVehicles from '../catalogs/administration/_EditVehicle';
import { useParams} from 'react-router-dom'

const URI = 'http://localhost:3001/customervehicles/'
const VehiclesList =() =>{
    const [vehicles, setVehicles] = useState([]);
    const [openModal,setOpenModal] = useState(false);
    let  [idCustomer, setIdCustomer] = useState(0);
    let  [idVehicle, setIdVehicle] = useState(0);  
    let { id } = useParams();  
    const handleClose = () =>{ 
        setOpenModal(false);
        getVehicles();
    };
     
 

    //mostrar companies
    const getVehicles= async () =>{
        setIdCustomer(id);
        const res = await axios.get(URI + id);
        setVehicles(res.data);
        console.log(res.data);
    }
 
    useEffect(()=>{
        getVehicles()
    },[])

    useEffect(() => {
        setTimeout(()=>{
          $("#table-vehicles").DataTable({
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
                        <button onClick={()=> {setIdVehicle(0); setOpenModal(true);}} className='btn btn-primary'>Crear</button>
                    </div>
                    <table  id="table-vehicles" className="table table-bordered table-hover">
                        <thead className='table-primary'>
                            <tr>
                                <th>Cliente</th>
                                <th>Vin</th>                                
                                <th>License</th>
                                <th>Unit #</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                            vehicles.map((vehicle)=> (
                                    <tr key={vehicle.idVehicle}>
                                        <td>
                                            {vehicle.customer.shortname}
                                        </td>
                                        <td>
                                            {vehicle.vin}
                                        </td> 
                                        <td>
                                            {vehicle.license}
                                        </td> 
                                        <td>
                                            {vehicle.unit}
                                        </td> 
                                        <td>
                                             {/* <Link to={`/${company.idCompany}`} className="btn btn-info">Editar </Link>  */}
                                              
                                            <button className='btn btn-danger' onClick={()=> {setIdVehicle(vehicle.idVehicle); setOpenModal(true); console.log(vehicle.idVehicle);} } >Editar</button>
                                        </td>
                                    </tr>
                                ))  
                            }
                        </tbody>
                    </table>
                   { openModal && <MyModal id="id_myModal" title={idVehicle>0 ?  "Editar Vehiculo"  :"Agregar Vehiculo" }  modalContent={<EditVehicles idVehicle={idVehicle}  idCustomer={idCustomer}  closeModal={handleClose}/> } openModal={openModal}  closeModal={handleClose} ></MyModal> }   
                </div>
               
            </div> 
    )
}
export default VehiclesList