import React, { useEffect, useRef,useState } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { select } from "d3"
import Mapvisualizer from './components/Mapvisualizer';
import Districtvisualizer from './components/Districtvisualizer';
import Statevisualizer from './components/Statevisualizer';

import { Route,Routes } from 'react-router-dom'
import Navbar from './components/Navbar';


function App() {

  
  return (
    <div className="App">

      <Navbar/>
      <Routes>
           <Route path='/' element={<Mapvisualizer/>}/> 
           <Route path='/state' element={<Statevisualizer/>}/> 
           <Route path='/state/:statename' element={<Districtvisualizer/>}/> 
      </Routes>
      
    </div>

  );
}

export default App;
