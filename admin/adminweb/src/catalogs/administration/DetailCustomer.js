import axios from 'axios'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

import CustomerContactsList from '../../components/CustomerContactsList.js';
import VehicleList from '../../components/VehicleList.js';

const CustomerDetail = () => {
    const [Customer, setCustomer] = useState([]);
    const [idCustomer, setIdCustomer] = useState(0);
    let { id } = useParams();  
    useEffect(() => {
        setIdCustomer(id);
    }, []);

    const URI = 'http://localhost:3001/customers/';
    useEffect(() => {
        axios.get(URI + id).then((response) => {
            setCustomer(response.data);
            // setIdsymptomcategory(response.data.idsymptomcategory);
        });
    }, []);
    return (
        <div className="card">
           
            <div className="card-body">
           
                <div className="form-horizontal">
                    <div className='row'>
                        <div className='col col-lg-6'> 
                        <div className='card-header'> {Customer.company}</div>
                            <div className="row form-group">
                                <div className="col col-md-6">
                                    <dt>
                                        Alias
                                    </dt>
                                    <dd>
                                        {Customer.shortname}
                                    </dd>
                                </div>
                                <div className="col col-md-6">
                                    <dt>
                                        Empresa
                                    </dt>
                                    <dd>
                                        {Customer.company}
                                    </dd>
                                </div>
                            </div>
                            <div className="row form-group">
                                <div className="col col-md-6">
                                    <dt>
                                        firstname
                                    </dt>
                                    <dd>
                                        {Customer.firstname}
                                    </dd>
                                </div>
                                <div className="col col-md-6">
                                    <dt>
                                        lastname
                                    </dt>
                                    <dd>
                                        {Customer.lastname}
                                    </dd>
                                </div>
                            </div>
                            <div className="row form-group">
                                <div className="col col-md-12">
                                    <dt>
                                        address
                                    </dt>
                                    <dd>
                                        {Customer.address}
                                    </dd>
                                </div>
                            </div>
                            <div className="row form-group">
                                <div className="col col-md-6">
                                    <dt>
                                        zipcode
                                    </dt>
                                    <dd>
                                        {Customer.zipcode}
                                    </dd>
                                </div>
                                <div className="col col-md-6">
                                    <dt>
                                        city
                                    </dt>
                                    <dd>
                                        {Customer.city}
                                    </dd>
                                </div>
                            </div>
                            <div className="row form-group">
                                <div className="col col-md-6">
                                    <dt>
                                        state
                                    </dt>
                                    <dd>
                                        {Customer.state}
                                    </dd>
                                </div>
                                <div className="col col-md-6">
                                    <dt>
                                        phone
                                    </dt>
                                    <dd>
                                        {Customer.phone}
                                    </dd>
                                </div>
                            </div>
                            <div className="row form-group">
                                <div className="col col-md-6">
                                    <dt>
                                        mobilephone
                                    </dt>
                                    <dd>
                                        {Customer.mobilephone}
                                    </dd>
                                </div>
                                <div className="col col-md-6">
                                    <dt>
                                        email
                                    </dt>
                                    <dd>
                                        {Customer.email}
                                    </dd>
                                </div>
                            </div>
                            {/*detail customer*/}
                        </div>
                        <div className='col col-lg-6'> 
                            <div className='card-header'>Contactos</div>
                            <CustomerContactsList CustomerId={idCustomer} />
                        </div>
                    </div>
                    <div><hr/></div>
                    <div className='row'>
                         <div className='col col-lg-12'> 
                            <div className='card-header'>Vehiculos</div>                       
                            <VehicleList idCustomer={idCustomer} />
                        </div> 
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CustomerDetail