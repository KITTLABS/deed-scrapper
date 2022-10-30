import React from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import './App.css';
import Main from './Main'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Main />} />
      </Routes>
    </BrowserRouter>
  )

}

export default App;
