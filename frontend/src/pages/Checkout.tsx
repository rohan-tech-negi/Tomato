import axios from "axios"
import { useAppData } from "../context/AppContext"
import { useEffect, useState } from "react"
import { restaurantService } from "../main"
import { useNavigate } from "react-router-dom"
import type { IRestaurant } from "../types"
import toast from "react-hot-toast"


interface Address{
  _id: string,
  formatterAddress: string,
  mobile: number
}

const Checkout = () => {
  const{cart, subTotal, quantity} = useAppData()

  const [addresses, setAddresses] = useState<Address[]>([])

  const[selectedAddressId, setselectedAddressId] = useState<string| null>(null);

  const [loadingAddress, setLoadingAddress] = useState(true)

  const[ loadingRazorpay, setLoadingRazorpay] = useState(false)

  const[ loadingStripe, setLoadingStripe] = useState(false)

  const[ creatingOrder, setCreatingOrder] = useState(false)

  useEffect(()=>{
    const fetchAddresses = async()=>{
      if(!cart || cart.length === 0){
        setLoadingAddress(false)
        return;
      }
      try {
        const {data} = await axios.get(`${restaurantService}/api/address/all`,{
          headers:{
             Authorization: `Bearer ${localStorage.getItem("token")}`
          }
        })
        setAddresses(data || [])
      } catch (error) {
        console.log(error)
      }finally{
        setLoadingAddress(false)
      }
    }
    fetchAddresses()
  },[cart])
  if(!cart || cart.length === 0){
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-xl font-semibold">Your cart is empty</p>
      </div>
    )
  }
  const navigate = useNavigate()
  const restaurant = cart[0].restaurantId as IRestaurant

  const deliveryFee = subTotal < 250 ? 49 : 0

  const platformFee = 7;

  const grandTotal = subTotal + deliveryFee + platformFee;

  const createOrder = async(paymentMethod: "razorpay" | "stripe")=>{
    if(!selectedAddressId){
      alert("Please select an address")
      return;
    }
    setCreatingOrder(true)
    try {
      const {data} = await axios.post(`${restaurantService}/api/order/new`, {
        paymentMethod,
        addressId: selectedAddressId
      },{
        headers:{
          Authorization: `Bearer ${localStorage.getItem("token")}`
        }
      })
      return data;
    } catch (error) {
      toast.error("failed to creae order")
    }
    finally{
      setCreatingOrder(false)
    }

  }

  const paywithRazorpay = async()=>{
   try {
    setLoadingRazorpay(true)

    const order = await createOrder("razorpay")
    if(!order) return;

    
   } catch (error) {
    
   } 
  }

  
  return (
    <div>Checkout</div>
  )
}

export default Checkout