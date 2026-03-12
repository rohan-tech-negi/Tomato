import {BrowserRouter, Routes, Route} from 'react-router-dom'

import React from 'react'
import Home from './pages/Home'
import Login from './pages/Login'

import {Toaster} from 'react-hot-toast'
import ProtectedRoute from './components/protectedRoute'
import PublicRoute from './components/publicRoute'
import SelectRole from './pages/SelectRole'
import Navbar from './components/navbar'
import { Account } from './pages/Account'
const App = () => {
  return (
    <BrowserRouter>
    <Navbar></Navbar>
      <Routes>
        <Route element={<PublicRoute></PublicRoute>}>
        <Route path="/login" element={<Login></Login>} />
        </Route>

        <Route element={<ProtectedRoute></ProtectedRoute>}>
         <Route path="/" element={<Home />} />
         <Route path='/select-role' element={<SelectRole></SelectRole>}></Route>
         <Route path='/account' element={<Account></Account>}></Route>
        </Route>

       
        
      </Routes>
      <Toaster />
    </BrowserRouter>
  )
}

export default App