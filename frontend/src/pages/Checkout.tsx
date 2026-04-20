import axios from "axios"
import { useAppData } from "../context/AppContext"
import { useEffect, useState } from "react"
import { restaurantService, utilsService } from "../main"
import { useNavigate } from "react-router-dom"
import type { ICart, IMenuItems, IRestaurant } from "../types"
import toast from "react-hot-toast"


interface Address{
  _id: string,
  formattedAddress: string,
  mobile: number
}

const Checkout = () => {
  const { cart, subtotal: subTotal, Quantity: quantity } = useAppData()
  const navigate = useNavigate()

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
        setAddresses(data.addresses || [])
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

    const{orderId, amount} = order

    const{data} = await axios.post(`${utilsService}/api/payment/create`,{
      orderId
    })

    const {razorpayOrderId, key} = data

    const options = {
      key,
      amount: amount * 100,
      currency: "INR",
    name: "Tomato",
    description: "Food order payment",
    
    order_id: razorpayOrderId, // This is a sample Order ID. Pass the `id` obtained in the response of Step 1
    
    handler: async(response: any)=>{
      try {
        await axios.post(`${utilsService}/api/payment/verify`,{
         
          razorpay_order_id : response.razorpay_order_id,
           razorpay_payment_id : response.razorpay_payment_id,
            razorpay_signature : response.razorpay_signature,
             orderId
        })

        toast.success("payment successful")
        navigate("/paymentsuccess/" + response.razorpay_payment_id)
        
      } catch (error) {
        toast.error("payment verification failed")
      }
    },
    
    theme: {
        "color": "#E23744"
    }
};

    const razorpay = new (window as any).Razorpay(options);
    razorpay.open()
   } catch (error) {
    console.log(error)
    toast.error("payment failed please refresh page")
   } finally{
    setLoadingRazorpay(false)
   } 
  }

  const payWithStripe = async()=>{
    try {
      setLoadingStripe(true)
      const order = await createOrder("stripe")

        if(!order) return;

        console.log("Stripe checkout", order)
      
    } catch (error) {

      console.log(error)
      toast.error("payment failed")
      
    }finally{
      setLoadingStripe(false)
    }
  }

  
  return (
    <div className="mx-auto max-w-4xl px-4 py-6 space-y-6">
      <h1 className="text-2xl font-bold">Checkout</h1>

      <div className="rounded-xl bg-white p-4 shadow-sm">
        <h1 className="text-lg font-semibold">
          {restaurant.name}
        </h1>

        <p className="text-sm text-gray-500">
          {
            restaurant.autoLocation.formattedAddress
          }
        </p>
      </div>
      <div className="rounded-xl bg-white p-4 shadow-sm space-y-3">
  <h3 className="font-semibold">Delivery Address</h3>

  {loadingAddress ? (
    <p className="text-sm text-gray-500">Loading addresses...</p>
  ) : addresses.length === 0 ? (
    <p className="text-sm text-gray-400">
      No address found. Please add one
    </p>
  ) : (
    addresses.map((add) => (
      <label
        key={add._id}
        className={`flex gap-3 rounded-lg border p-3 cursor-pointer transition ${
          selectedAddressId === add._id
            ? "border-red-500 bg-red-50"
            : "border-gray-200 hover:border-gray-400"
        }`}
      >
        <input
          type="radio"
          name="address"
          checked={selectedAddressId === add._id}
          onChange={() => setselectedAddressId(add._id)}
        />
        <div>
          <p className="font-medium">{add.formattedAddress}</p>
          <p className="text-sm text-gray-500">{add.mobile}</p>
        </div>
      </label>
    ))
  )}
</div>

<div className="rounded-xl bg-white p-4 shadow-sm space-y-4">
  <h3 className="font-semibold">Order Summery</h3>

  {
    cart.map((cartItem: ICart)=>{
      const item = cartItem.itemId as IMenuItems;
      return <div className="flex justify-between text-sm" key={cartItem._id}>
        <div className="flex items-center gap-3">
          <img src={item.image} alt={item.name} className="w-12 h-12 rounded-lg object-cover" />
          <div>
            <p className="font-medium">{item.name}</p>
            <p className="text-sm text-gray-500">{cartItem.quantity} x ₹{item.price}</p>
          </div>
        </div>
        <p className="font-medium">₹{item.price * cartItem.quantity}</p>
      </div>
    })
  }

  <hr />

  <div className="space-y-2">
    <div className="flex justify-between text-sm">
      <span className="text-gray-600">Items ({quantity})</span>
      <span className="font-medium">₹{subTotal}</span>
    </div>

    <div className="flex justify-between text-sm">
      <span className="text-gray-600">Delivery Fee</span>
      <span className="font-medium">{deliveryFee === 0 ? "Free" : `₹${deliveryFee}`}</span>
    </div>

    <div className="flex justify-between text-sm">
      <span className="text-gray-600">Platform Fee</span>
      <span className="font-medium">₹{platformFee}</span>
    </div>

    <hr className="my-2" />
    
    

  {subTotal < 250 && (
          <p className="text-xs text-orange-600">
            Add items worth ₹{250 - subTotal} more to get free delivery
          </p>
        )}

        
        <div className="flex justify-between text-base font-bold">
      <span>Grand Total</span>
      <span>₹{grandTotal}</span>
    </div>
  </div>


</div>
    </div>
  )
}

export default Checkout