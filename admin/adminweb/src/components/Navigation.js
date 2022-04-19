import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import {  BrowserRouter, Route, Routes } from 'react-router-dom'

import CompaniesList from '../catalogs/configuration/Companies.js'
import LocationsList from '../catalogs/configuration/Locations.js'
import EmployeesList from '../catalogs/configuration/Employees.js'
import Content from './Content.js';
import SymptomCategoriesList from '../catalogs/configuration/SymptomesCategories.js';
import CommonFailuresList from '../catalogs/administration/CommonFailures.js';
import ZipCodesList from '../catalogs/configuration/ZipCodes.js';
import CustomersList from '../catalogs/administration/Customers.js';
import WarehousesList from '../catalogs/configuration/Warehouses.js';
import DetailCustomer from '../catalogs/administration/DetailCustomer.js'
import PartsCategoriesList from '../catalogs/configuration/PartsCategories.js';
import { withTranslation } from 'react-i18next';

 class Navigation extends Component {
  
    render() {
        return (

            <BrowserRouter>
                <aside className="main-sidebar sidebar-dark-primary elevation-4">
                    {/* Brand Logo */}
                    <Link to="/companies/" className="brand-link">
                        <img src="dist/img/AdminLTELogo.png" alt="AdminLTE Logo" className="brand-image img-circle elevation-3" style={{ opacity: '.8' }} />
                        <span className="brand-text font-weight-light">Franco Mobile</span>
                    </Link>
                    {/* Sidebar */}
                    <div className="sidebar">
                        {/* Sidebar user panel (optional) */}
                        <div className="user-panel mt-3 pb-3 mb-3 d-flex">
                            <div className="image">
                                <img src="dist/img/user2-160x160.jpg" className="img-circle elevation-2" />
                            </div>
                            <div className="info">
                                <Link to="/companies/" className="d-block">Arturo Perea</Link>
                            </div>
                        </div>
                        {/* Sidebar Menu */}
                        <nav className="mt-2">
                            <ul className="nav nav-pills nav-sidebar flex-column" data-widget="treeview" role="menu" data-accordion="false">
                                {/* Add icons to the links using the .nav-icon class
         with font-awesome or any other icon font library */}
                                <li className="nav-item menu-open">

                                    <Link to="#" className="nav-link">
                                        <i className="nav-icon fas fa-tachometer-alt" />
                                        <p>
                                            Dashboard
                                            <i className="fas fa-angle-left right" />
                                        </p>
                                    </Link>
                                </li>
                                <li className="nav-item">
                                    <Link to="#" className="nav-link">
                                        <i className="nav-icon fas fa-edit" />
                                        <p>
                                        {this.props.t('Administracion')}
                                            <i className="fas fa-angle-left right" />
                                        </p>
                                    </Link>
                                    <ul className="nav nav-treeview">
                                        <li className="nav-item">
                                            <Link to="/CommonFailures/" className='nav-link'> <i className="far fa-circle nav-icon" />
                                                <p>
                                                {this.props.t('FallasComunes')}</p></Link>
                                        </li>
                                        <li className="nav-item">
                                            <Link to="/Customers/" className='nav-link'> <i className="far fa-circle nav-icon" />
                                                <p>
                                                {this.props.t('Clientes')}
                                                </p>
                                            </Link>
                                        </li>
                                    </ul>
                                </li>
                                <li className="nav-item">
                                    <Link to="#" className="nav-link">   <i className="nav-icon fas fa-table" />
                                        <p>
                                        {this.props.t('Configuracion')}
                                            <i className="fas fa-angle-left right" />
                                        </p></Link>
                                    <ul className="nav nav-treeview">
                                        <li className="nav-item">
                                            <Link to="/companies/" className='nav-link'> <i className="far fa-circle nav-icon" />
                                                <p>
                                                {this.props.t('Empresa')}
                                                    </p>
                                                    </Link>
                                        </li>
                                        <li className="nav-item">
                                            <Link to="/locations/" className='nav-link'> <i className="far fa-circle nav-icon" />
                                                <p>Patios</p></Link>
                                        </li>
                                        <li className="nav-item">
                                            <Link to="/employees/" className='nav-link'> <i className="far fa-circle nav-icon" />
                                                <p>Mecanicos</p></Link>
                                        </li>
                                        <li className="nav-item">
                                            <Link to="/sCategories/" className='nav-link'> <i className="far fa-circle nav-icon" />
                                                <p> Categorias de Fallas</p></Link>
                                        </li>
                                        <li className="nav-item">
                                            <Link to="/ZipCodes/" className='nav-link'> <i className="far fa-circle nav-icon" />
                                                <p>ZipCodes</p></Link>
                                        </li>
                                        <li className="nav-item">
                                            <Link to="/Warehouse/" className='nav-link'> <i className="far fa-circle nav-icon" />
                                                <p>Almacen</p></Link>
                                        </li>
                                        <li className="nav-item">
                                            <Link to="/partcategories/" className='nav-link'> <i className="far fa-circle nav-icon" />
                                                <p>Categorias de Refacciones</p>
                                            </Link>
                                        </li>
                                    </ul>
                                </li>
                                <li className="nav-header">Seguridad</li>
                                <li className="nav-item">
                                    <Link to="#" className="nav-link">   <i className="nav-icon fas fa-table" />
                                        <p>
                                            Usuarios
                                            <i className="fas fa-angle-left right" />
                                        </p></Link>
                                </li>
                            </ul>
                        </nav>
                        {/* /.sidebar-menu */}
                    </div>
                    {/* /.sidebar */}
                </aside>
                <Routes >
                    < Route path='/'  element={<Content title={"Empresa"} body={<CompaniesList></CompaniesList>}></Content>} exact /> 
                    <Route path='/companies/' element={<Content title={"Empresa"} body={<CompaniesList></CompaniesList>}></Content>} />
                    <Route path='/locations/' element={<Content title={"Patios"} body={<LocationsList></LocationsList>}></Content>} />
                    <Route path='/employees/' element={<Content title={"Mecanicos"} body={<EmployeesList></EmployeesList>}></Content>} />
                    <Route path='/sCategories/' element={<Content title={"Categorias de Fallas"} body={<SymptomCategoriesList></SymptomCategoriesList>}></Content>} />
                    <Route path='/CommonFailures/' element={<Content title={"Fallas Comunes"} body={<CommonFailuresList></CommonFailuresList>}></Content>} />
                    <Route path='/ZipCodes/' element={<Content title={"ZipCodes"} body={<ZipCodesList></ZipCodesList>}></Content>} />
                    <Route path='/Customers/' element={<Content title={"Customers"} body={<CustomersList></CustomersList>}></Content>} />
                    <Route path='/Warehouse/' element={<Content title={"Warehouses"} body={<WarehousesList></WarehousesList>}></Content>} />
                    <Route path='/CustomerDetail/:id' element={<Content title={"Detalle de Cliente"} body={<DetailCustomer ></DetailCustomer>}></Content>} />
                    <Route path='/partcategories/' element={<Content title={"Categoria de Refacciones"} body={<PartsCategoriesList ></PartsCategoriesList>}></Content>} />
                </Routes >
            </BrowserRouter>
        )
    }
}

export default withTranslation()(Navigation);