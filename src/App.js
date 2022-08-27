import React, { useEffect, useRef } from 'react';
import './App.css';
import { select } from "d3"
import Mapvisualizer from './components/Mapvisualizer';

function App() {
  return (
    <div className="App">
      <Mapvisualizer/>
    </div>
  );
}

export default App;
