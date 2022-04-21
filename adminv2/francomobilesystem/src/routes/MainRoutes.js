import React,{ lazy } from 'react';

// project imports
import MainLayout from './../layout/MainLayout';
import Loadable from './../ui-component/Loadable';


// dashboard routing
const CompaniesList = Loadable(lazy(() => import('./../catalogs/configuration/Companies.js')));
const Employees = Loadable(lazy(() => import('./../catalogs/configuration/Employees.js')));
const Locations = Loadable(lazy(() => import('./../catalogs/configuration/Locations.js')));
const PartCategories = Loadable(lazy(() => import('./../catalogs/configuration/PartsCategories.js')));
const SymptomesCategories = Loadable(lazy(() => import('./../catalogs/configuration/SymptomesCategories.js')));
const Warehouses = Loadable(lazy(() => import('./../catalogs/configuration/Warehouses.js')));
const Customers = Loadable(lazy(() => import('./../catalogs/administration/Customers.js')));
const DetailCustomer = Loadable(lazy(() => import('./../catalogs/administration/DetailCustomer.js'))); 
const CommonFailures = Loadable(lazy(() => import('./../catalogs/administration/CommonFailures.js')));
const Vendors = Loadable(lazy(() => import('./../catalogs/warehouse/Vendors.js')));



// sample page routing
const SamplePage = Loadable(lazy(() => import('./../views/content/content.js')));

// ==============================|| MAIN ROUTING ||============================== //

const MainRoutes = {
    path: '/',
    element: <MainLayout />,
    children: [ 
        {
            path: 'Companies',
            element:<CompaniesList />
        },
        {
            path: 'employees',
            element: <Employees />
        },
        {
            path: 'locations',
            element: <Locations />
        },
        {
            path: 'partscategory',
            element: <PartCategories />
        },
        {
            path: 'simptomscategory',
            element: <SymptomesCategories />
        },
        {
            path: 'warehouses',
            element: <Warehouses />
        },
        {
            path: 'customers',
            element: <Customers />
        },
        {
            path: 'CustomerDetail/:id',
            element: <DetailCustomer />
        },{
            path:'CommonFailures',
            element: <CommonFailures/>
        },{
            path:'Vendors',
            element: <Vendors/>
        }
    ]
};

export default MainRoutes;
