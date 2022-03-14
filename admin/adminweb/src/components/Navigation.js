import React,{Component} from 'react' 
import { Link } from 'react-router-dom';
import {NavLink, BrowserRouter, Route, Routes  } from 'react-router-dom'
  
import CompaniesList from '../catalogs/configuration/Companies.js'
import LocationsList from '../catalogs/configuration/Locations.js'
import Content from './Content.js';

export default class Navigation extends Component { 
    render() {  return (
       
   <BrowserRouter> 
    <aside className="main-sidebar sidebar-dark-primary elevation-4">
            {/* Brand Logo */}
            <Link to="/companies/" className="brand-link">
            <img src="dist/img/AdminLTELogo.png" alt="AdminLTE Logo" className="brand-image img-circle elevation-3" style={{ opacity: '.8' }} />
                <span className="brand-text font-weight-light">AdminLTE 3</span>
            </Link> 
            {/* Sidebar */}
            <div className="sidebar">
                {/* Sidebar user panel (optional) */}
                <div className="user-panel mt-3 pb-3 mb-3 d-flex">
                    <div className="image">
                        <img src="dist/img/user2-160x160.jpg" className="img-circle elevation-2"   />
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
                                        Administracion
                                        <i className="fas fa-angle-left right" />
                                    </p>
                            </Link> 
                            <ul className="nav nav-treeview">
                                <li className="nav-item">
                                <Link  to="#" className="nav-link">
                                <i className="far fa-circle nav-icon" />
                                            <p>
                                    Clientes
                                        <i className="fas fa-angle-left right" />
                                    </p>
                            </Link>  
                                </li>                                                      
                            </ul>
                        </li>
                        <li className="nav-item">  
                        <Link to="#" className="nav-link">   <i className="nav-icon fas fa-table" />
                                <p>
                                    Configuracion
                                    <i className="fas fa-angle-left right" />
                                </p></Link>       
                            <ul className="nav nav-treeview">
                                <li className="nav-item">
                                    <Link to="/companies/" className='nav-link'> <i className="far fa-circle nav-icon" />
                                        <p>Empresa</p></Link>                                   
                                </li>                                      
                                 <li className="nav-item">
                                    <Link to="/locations/" className='nav-link'> <i className="far fa-circle nav-icon" />
                                        <p>Patios</p></Link>                                   
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
   <Route path='/companies/' element={<Content title={"Empresa"} body={<CompaniesList></CompaniesList>}></Content> } />
   <Route path='/locations/' element={<Content title={"Patios"} body={<LocationsList></LocationsList>}></Content> }  />
</Routes > 
</BrowserRouter>
    )
}}