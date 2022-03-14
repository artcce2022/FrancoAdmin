import axios from 'axios'
import {  useEffect, useState} from 'react' 
 import $ from 'jquery';
import MyModal from '../../shared/Modal';
import DataTable from 'datatables.net'; 
import EditLocation from './_EditLocation.js'

const URI = 'http://localhost:3001/locations/'
const LocationsList =() =>{
    const [locations, setLocation] = useState([]);
    const [openModal,setOpenModal] = useState(false);
    let  [idLocation, setIdLocation] = useState(0); 
    const handleClose = () =>{ 
        setOpenModal(false);
        getLocationsList();
    };
     
    useEffect(()=>{
        getLocationsList()
    },[])

    //mostrar companies
    const getLocationsList= async () =>{
        const res = await axios.get(URI);
        setLocation(res.data);
    }
 
    useEffect(() => {
        setTimeout(()=>{
          $("#table-locations").DataTable({
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
                        <button onClick={()=> {setIdLocation(0); setOpenModal(true);}} className='btn btn-primary'>Crear</button>
                    </div>
                    <table  id="table-locations" className="table table-bordered table-hover">
                        <thead className='table-primary'>
                            <tr>
                                <th>Patio</th>
                                <th>Direccion</th>
                                <th>Gerente</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                            locations.map((location)=> (
                                    <tr key={location.idLocation}>
                                        <td>
                                            {location.locationName}
                                        </td>
                                        <td>
                                            {location.address}
                                        </td>
                                        <td>
                                            {location.manager}
                                        </td>
                                        <td>
                                             {/* <Link to={`/${company.idCompany}`} className="btn btn-info">Editar </Link>  */}
                                              
                                            <button className='btn btn-danger' onClick={()=> {setIdLocation(location.idCompany); setOpenModal(true);} } >Editar</button>
                                        </td>
                                    </tr>
                                ))  
                            }
                        </tbody>
                    </table>
                   { openModal && <MyModal id="id_myModal" title={idLocation>0 ?  "Editar Patio"  :"Agregar Patio" }  modalContent={<EditLocation idLocation={idLocation} closeModal={handleClose}/> } openModal={openModal}  closeModal={handleClose} ></MyModal> } 
                </div>
               
            </div> 
    )
}
export default LocationsList