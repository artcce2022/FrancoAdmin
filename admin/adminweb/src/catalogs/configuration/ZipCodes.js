import axios from 'axios'
import {  useEffect, useState, useMemo, useCallback} from 'react' 
import MyModal from '../../shared/Modal';
// import DataTable from 'datatables.net'; 
import DataTable from 'react-data-table-component';
import EditZipCode from './_EditZipCode.js'

const URI = 'http://localhost:3001/zipcodes/'



const ZipCodesList =() =>{
    const [zipCodes, setZipCodes] = useState([]);
    const [selectedRows, setSelectedRows] = useState([]);
    const [openModal,setOpenModal] = useState(false);
    let  [idZipCode, setIdZipCode] = useState(0); 
     const [page, setPage] = useState(0);
    const countPerPage = 10; 
    const handleClose = () =>{ 
        setOpenModal(false);
        getZipCodesListPage("");
    };
     
     
    
        const columns = [
            {
            name: 'ZipCode',
            selector: row => row.zip 
            },
            {
            name: 'City',
            selector: row => row.city  
            },
            {
            name: 'County',
            selector: row => row.county_name
            },
            {
            name: 'State',
            selector: row => row.state_name,
            },
            {
                        /*setIdZipCode(row=>row.zip); setOpenModal(true);*/
                cell: (row) => <button  className='btn btn-primary' id={row.idzip} onClick={(row)=> {setIdZipCode(row.target.id); setOpenModal(true);  }}>Editar</button>,
                ignoreRowClick: true,
                allowOverflow: true,
                button: true 
            },
        ];

    const getZipCodesListPage = ({filterStr}) => {
        //const res = await axios.get(URI);
        //http://localhost:3001/zipcodes/?page=1&limit=3&delay=1
        console.log(URI + `?page=${page-1}&limit=${countPerPage}&delay=1`);
        axios.get(URI + `?page=${page}&limit=${countPerPage}&delay=1`).then(res => {
            console.log(res.data);
            setZipCodes(res.data);
        }).catch(err => {
            setZipCodes({});
        });
      }
       
      useEffect(() => {
          console.log("entre a zipcodes " + page);
        getZipCodesListPage("");
      }, [page]);

    return (
       <div className='row'>
                <div className='col'>
                    <div >
                        <button onClick={()=> {setIdZipCode(0); setOpenModal(true);}} className='btn btn-primary'>Crear</button>
                    </div>
                    <DataTable
                        title=""
                        columns={columns}
                        data={zipCodes.rows}
                        highlightOnHover
                        pagination
                        paginationServer
                        paginationTotalRows={zipCodes.count}
                        paginationPerPage={countPerPage}
                         paginationComponentOptions={{
                        noRowsPerPage: true
                        }}
                        onChangePage={page => setPage(page)}
                    /> 
                    {/* <table  id="table-zipcodes" className="table table-bordered table-hover">
                        <thead className='table-primary'>
                            <tr>
                                <th>Zip Code</th>
                                <th>City</th>
                                <th>County</th>
                                <th>State</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                            zipCodes.map((zipcode)=> (
                                    <tr key={zipcode.idzip}>
                                        <td>
                                            {zipcode.zip}
                                        </td>
                                        <td>
                                            {zipcode.city}
                                        </td> 
                                        <td>
                                            {zipcode.county_name}
                                        </td> 
                                        <td>
                                            {zipcode.state_name}
                                        </td> 
                                        <td>
                                             <button className='btn btn-danger' onClick={()=> {setIdZipCode(zipcode.idzip); setOpenModal(true); } } >Editar</button>
                                        </td>
                                    </tr>
                                ))  
                            }
                        </tbody>
                    </table> */}
                   { openModal && <MyModal id="id_myModal" title={idZipCode>0 ?  "Editar ZipCode"  :"Agregar ZipCode" }  modalContent={<EditZipCode idZipCode={idZipCode} closeModal={handleClose}/> } openModal={openModal}  closeModal={handleClose} ></MyModal> } 
                </div>
               
            </div> 
    )
}
export default ZipCodesList