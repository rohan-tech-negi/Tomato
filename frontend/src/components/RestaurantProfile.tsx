import { useState } from "react"
import type { IRestaurant } from "../types"
import axios from "axios"
import { restaurantService } from "../main"
import toast from "react-hot-toast"

interface props{
    restaurant: IRestaurant
    isSeller:boolean
}

const RestaurantProfile = ({restaurant, isSeller}:props) => {
    const[editMode, setEditMode] = useState(false)
    const[name, setName] = useState(restaurant.name)
    const[description, setDescription] = useState(restaurant.description)
    const[isOpen, setIsOpen] = useState(restaurant.isOpen)
    const[loading, setLoadin] = useState(false)

    const toggleOpenStatus  = async()=>{
        try {
            const {data} = await axios.put(`${restaurantService}/api/restaurant/my/status`),
            {status: !isOpen},
            {
                headers:{
                    Authorization: `Bearer ${localStorage.getItem("token")}`
                }
            }
            toast.success(data.message)
            setIsOpen(data.restaurant.isOpen)
            
        } catch (error:any) {
            console.log(error)
            toast.error(error.response.data.message)
        }
    }
  return (
    <div className="mx-auto max-w-xl rounded-xl bg-white shadow-sm overflow-hidden">
        {
            restaurant.image && <img src={restaurant.image} alt="" className="h-48 w-full object-cover"/>
        }
    </div>
  )
}

export default RestaurantProfile