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
import { useAppData } from './context/AppContext'
import  Restaurant from './pages/Restaurant'
import RestaurantPage from './pages/RestaurantPage'
import Cart from './pages/Cart'
import AddAddressPage from './pages/Address'
import Checkout from './pages/Checkout'
const App = () => {

  const {user} = useAppData()

  if(user && user.role === "seller"){
    return (
      <>
        <Restaurant></Restaurant>
        <Toaster />
      </>
    )
  }
  return (
    <BrowserRouter>
    <Navbar></Navbar>
      <Routes>
        <Route element={<PublicRoute></PublicRoute>}>
        <Route path="/login" element={<Login></Login>} />
        </Route>

        <Route element={<ProtectedRoute></ProtectedRoute>}>
         <Route path="/" element={<Home />} />
         <Route path="/address" element={<AddAddressPage></AddAddressPage>} />
         <Route path="/checkout" element={<Checkout></Checkout>} />
         <Route path='/restaurant/:id' element={<RestaurantPage></RestaurantPage>}></Route>
         <Route path='/cart' element={<Cart></Cart>}></Route>
         <Route path='/select-role' element={<SelectRole></SelectRole>}></Route>
         <Route path='/account' element={<Account></Account>}></Route>
        </Route>

       
        
      </Routes>
      <Toaster />
    </BrowserRouter>
  )
}

export default App