import {BrowserRouter, Routes, Route} from 'react-router-dom'

import React from 'react'
import Home from './pages/Home'
import Login from './pages/Login'
const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login></Login>} />
      </Routes>
    </BrowserRouter>
  )
}

export default App