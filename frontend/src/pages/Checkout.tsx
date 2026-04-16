import axios from "axios"
import { useAppData } from "../context/AppContext"
import { useEffect, useState } from "react"
import { restaurantService } from "../main"


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

  const[ createOrder, setCreateOrder] = useState(false)

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
  console.log(addresses)

  
  return (
    <div>Checkout</div>
  )
}

export default Checkout