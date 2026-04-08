// import React from 'react'

import { useNavigate } from "react-router-dom"
import { useAppData } from "../context/AppContext"
import { useState } from "react"

const Cart = () => {
  const{cart, subtotal, Quantity, fetchCart} = useAppData()
  const navigate = useNavigate()

  const[loadingItemId, setLoadingItemId] = useState<string | null>(null)

  const[clearingCart, setClearingCart] = useState<boolean>(false)

  if(!cart || cart.length === 0){
    return <div className="flex min-h-[60vh] item-center justify-center">
        <p className="text-gray-500 text-lg">
          Your cart is empty
        </p>
    </div>
  }

  const
  return (
    <div>Cart</div>
  )
}

export default Cart