import React from 'react'
import {NavLink, BrowserRouter, Route, Routes  } from 'react-router-dom'
import CompaniesList from '../catalogs/configuration/Companies.js'
import LocationsList from '../catalogs/configuration/Locations.js'
  
const RoutesList = ()=>{
    return (
        <BrowserRouter> 
        <Routes >
        <Route path='/companies/' element={<CompaniesList/>} />
        <Route path='/locations/' element={<LocationsList/>} />
    </Routes > 
    </BrowserRouter>
      
    )
}
 
export default RoutesList