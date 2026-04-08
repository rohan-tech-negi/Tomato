// import React from 'react'

import { useNavigate } from "react-router-dom"
import { useAppData } from "../context/AppContext"
import { useState } from "react"
import type { IRestaurant } from "../types"
import axios from "axios"
import { restaurantService } from "../main"
import toast from "react-hot-toast"

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

  const restaurant = cart[0].restaurantId as IRestaurant;

  const deliveryFee = subtotal < 250 ? 49:0;
  const platformFee = 7;
  const grandTotal  = subtotal + deliveryFee + platformFee;

  const increaseQty = async(itemId: string)=>{
    try {
      setLoadingItemId(itemId)
      await axios.post(`${restaurantService}/api/cart/inc`, {itemId}, {
        headers:{
          Authorization: `Bearer ${localStorage.getItem("token")}`
        }
      })
      await fetchCart()
    } catch (error) {
      toast.error("Something went wrong")
    } finally{
      setLoadingItemId(null)
    }
  }

  const decreaseQty = async(itemId: string)=>{
    try {
      setLoadingItemId(itemId)
      await axios.post(`${restaurantService}/api/cart/dec`, {itemId}, {
        headers:{
          Authorization: `Bearer ${localStorage.getItem("token")}`
        }
      })
      await fetchCart()
    } catch (error) {
      toast.error("Something went wrong")
    } finally{
      setLoadingItemId(null)
    }
  }

  const clearCart = async()=>{
    try {
      setClearingCart(true)
      await axios.delete(`${restaurantService}/api/cart/clear`, {
        headers:{
          Authorization: `Bearer ${localStorage.getItem("token")}`
        }
      })
      await fetchCart()
    } catch (error) {
      toast.error("Something went wrong")
    } finally{
      setLoadingItemId(null)
    }
  }
  return (
    <div>Cart</div>
  )
}

export default Cart