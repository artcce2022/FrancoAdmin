import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Content from './components/Content'
import Footer from './components/Footer'
import Header from './components/Header'
import Navigation from './components/Navigation'
import RoutesList from './helpers/Routes'


//Catalogos
 

export default function App() {
 
  return (
    <div className='wrapper'>
       
      <Header></Header>
      <Navigation>       
      </Navigation>
      <Content>  
       </Content> 
      <Footer> </Footer>
    
    </div>
  )
}
