import React, { useContext, useEffect } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import is from 'is_js';
import MainLayout from './MainLayout';
import AppContext from 'context/Context';
import Customers from 'Catalogs/Administration/Customers';
import DetailCustomer from 'Catalogs/Administration/DetailCustomer';
import CommonFailures from 'Catalogs/Administration/CommonFailures';
import Warehouses from 'Catalogs/Configuration/warehouses';
import SymptomCategories from 'Catalogs/Configuration/SymptomesCategories';
import PartsCategories from 'Catalogs/Configuration/PartsCategories';
import Locations from 'Catalogs/Configuration/Locations';
import Employees from 'Catalogs/Configuration/Employees.js';
import Companies from 'Catalogs/Configuration/Companies';
import Vendors from 'Catalogs/Warehouse/Vendors';
import NewService from 'Catalogs/Services/NewService';
import ServicesList from 'Catalogs/Services/ListServices';
import DetailService from 'Catalogs/Services/DetailService';

const Layout = () => {
  const HTMLClassList = document.getElementsByTagName('html')[0].classList;
  useContext(AppContext);

  useEffect(() => {
    if (is.windows()) {
      HTMLClassList.add('windows');
    }
    if (is.chrome()) {
      HTMLClassList.add('chrome');
    }
    if (is.firefox()) {
      HTMLClassList.add('firefox');
    }
  }, [HTMLClassList]);

  return (
    <>
      <Routes>
        <Route element={<MainLayout />}>
          {/*Dashboard*/}
          <Route path="/" element={<Customers />} />
          <Route path="/Administration/Customers" element={<Customers />} />
          <Route
            path="/Administration/CommonFailures"
            element={<CommonFailures />}
          />
          <Route path="CustomerDetail/:id" element={<DetailCustomer />} />
          <Route path="/Configuration/warehouses" element={<Warehouses />} />
          <Route
            path="/Configuration/partscategories"
            element={<PartsCategories />}
          />
          <Route
            path="/Configuration/SymptomsCategories"
            element={<SymptomCategories />}
          />
          <Route path="/Configuration/Locations" element={<Locations />} />
          <Route path="/Configuration/Employees" element={<Employees />} />
          <Route path="/Configuration/Companies" element={<Companies />} />
          <Route path="/Configuration/Vendors" element={<Vendors />} />
          <Route path="/Services/NewService" element={<NewService />} />
          <Route path="/Services/Services" element={<ServicesList />} />
          <Route path="/ServiceDetail/:id" element={<DetailService />} />
        </Route>
      </Routes>
    </>
  );
};

export default Layout;
