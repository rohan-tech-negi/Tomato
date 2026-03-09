import {BrowserRouter, Routes, Route} from 'react-router-dom'

import React from 'react'
import Home from './pages/Home'
import Login from './pages/Login'

import {Toaster} from 'react-hot-toast'
const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login></Login>} />
      </Routes>
      <Toaster />
    </BrowserRouter>
  )
}

export default App