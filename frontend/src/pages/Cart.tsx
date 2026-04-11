// import React from 'react'

import { useNavigate } from "react-router-dom"
import { useAppData } from "../context/AppContext"
import { useState } from "react"
import type { ICart, IMenuItems, IRestaurant } from "../types"
import axios from "axios"
import { restaurantService } from "../main"
import toast from "react-hot-toast"
import type { VscLoading } from "react-icons/vsc"
import { BiMinus, BiPlus } from "react-icons/bi"
import { FaTruckLoading } from "react-icons/fa"

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
      await axios.put(`${restaurantService}/api/cart/inc`, {itemId}, {
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
      await axios.put(`${restaurantService}/api/cart/dec`, {itemId}, {
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
    const confirm = window.confirm("Are you sure you want to clear your cart?")
    if(!confirm) return;
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
      setClearingCart(false)
    }
  }

  const checkout = ()=>{
    navigate("/checkout")
  }
  return (
    <div className="mx-auto max-w-5xl px-4 py-6 space-y-6">
      <div className="rounded-xl bg-white p-4 shadow-sm">
        <h2 className="text-xl font-semibold">
          {restaurant.name}
        </h2>
        <p className="text-sm text-gray-500">
          {restaurant.autoLocation.formattedAddress}
        </p>
      </div>

      <div className="space-y-4 ">
{cart.map((cartItem:ICart)=>{
  const item = cartItem.itemId as IMenuItems;
  const isLoading = loadingItemId === item._id;

  return <div key={item._id} className="flex items-center gap-4 rounded-xl bg-white p-4 shadow-sm ">
    <img src={item.image} alt="" className="h-20 w-20 rounded object-cover"/>
    <div className="flex-1 space-y-2">
      <h3 className="font-semibold">{item.name}</h3>
      <p className="text-sm text-gray-500">{item.price}</p>
      <div className="flex items-center gap-2">
        <button className="hover:bg-gray-200 p-2 rounded-full border disabled:opacity-15" onClick={()=>decreaseQty(item._id)}>
          {isLoading ? <FaTruckLoading size={16} className="animate-spin" ></FaTruckLoading>: <BiMinus></BiMinus > }
        </button>


        <span>{cartItem.quantity}</span>

        <button className="hover:bg-gray-200 p-2 rounded-full border disabled:opacity-15" onClick={()=>increaseQty(item._id)}>
          {isLoading ? <FaTruckLoading size={16} className="animate-spin" ></FaTruckLoading>: <BiPlus></BiPlus > }
        </button>
      </div>

      <p className="w-20 text-right font-medium">
        ₹{item.price * cartItem.quantity}
      </p>
    </div>

  </div>
})}
      </div>
      <div className="rounded-xl bg-white p-4 shadow-sm space-y-3 ">
        <div className="flex justify-between text-sm">
          <span>
            Total item
          </span>
          <span>
            {Quantity}
          </span>
        </div>
        <div className="flex justify-between text-sm">
          <span>
            Subtotal
          </span>
          <span>
            {subtotal}
          </span>
        </div>

        <div className="flex justify-between text-sm">
          <span>
            Delivery Fee
          </span>
          <span>
            {deliveryFee === 0 ? "Free" : `${deliveryFee}` }
          </span>
        </div>

        <div className="flex justify-between text-sm">
          <span>
            Platform Fee
          </span>
          <span>
            {platformFee}
          </span>
        </div>

        {subtotal < 250 && <p className="text-xs text-gray-500">Add Item worth {250-subtotal} more to get free delivery</p>}

      </div>



    </div>
  )
}

export default Cart