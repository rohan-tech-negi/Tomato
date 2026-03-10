import {BrowserRouter, Routes, Route} from 'react-router-dom'

import React from 'react'
import Home from './pages/Home'
import Login from './pages/Login'

import {Toaster} from 'react-hot-toast'
import ProtectedRoute from './components/protectedRoute'
import PublicRoute from './components/publicRoute'
import SelectRole from './pages/SelectRole'
const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<PublicRoute></PublicRoute>}>
        <Route path="/login" element={<Login></Login>} />
        </Route>

        <Route element={<ProtectedRoute></ProtectedRoute>}>
         <Route path="/" element={<Home />} />
         <Route path='/select-role' element={<SelectRole></SelectRole>}></Route>
        </Route>

       
        
      </Routes>
      <Toaster />
    </BrowserRouter>
  )
}

export default App