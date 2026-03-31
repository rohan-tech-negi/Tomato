import { useState } from "react"
import type { IRestaurant } from "../types"
import axios from "axios"
import { restaurantService } from "../main"
import toast from "react-hot-toast"
import { BiEdit, BiMapPin } from "react-icons/bi"

interface props{
    restaurant: IRestaurant
    isSeller:boolean
    onUpdate:(restaurant:IRestaurant)=>void
}

const RestaurantProfile = ({restaurant, isSeller, onUpdate}:props) => {
    const[editMode, setEditMode] = useState(false)
    const[name, setName] = useState(restaurant.name)
    const[description, setDescription] = useState(restaurant.description)
    const[isOpen, setIsOpen] = useState(restaurant.isOpen)
    const[loading, setLoading] = useState(false)

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

    const saveChanges = async ()=>{
        try {
            setLoading(true)
            const {data} = await axios.put(`${restaurantService}/api/restaurant/edit`,{
                name,
                description
            },
            {
                headers:{
                    Authorization: `Bearer ${localStorage.getItem("token")}`
                }
            })
            ontimeupdate(data.restaurant)
            toast.success(data.message)
        } catch (error) {
            console.log(error)
            toast.error("Failed to update")
        }finally{
            setLoading(false)
        }
    }
  return (
    <div className="mx-auto max-w-xl rounded-xl bg-white shadow-sm overflow-hidden">
        {
            restaurant.image && <img src={restaurant.image} alt="" className="h-48 w-full object-cover"/>
        }
        <div className="p-5 space-y-4 ">
            {
                isSeller && <div className="flex items-start justify-between">
                    <div>
                        {
                            editMode ? (
                                <input value={name} onChange={e => setName(e.target.value)} className="w-full text-2xl font-bold border rounded px-2 py-1" />
                            ) : (
                                <h1 className="text-xl font-semibold">{restaurant.name}</h1>
                            )
                        }
                        <div className="mt-1 flex items-center gap-2 text-sm text-gray-500">
                            <BiMapPin className="h-4 w-4 text-red-500"/>
                            {
                                restaurant.autolocation.formattedAddress || "Location unavailable"
                            }
                        </div>
                    </div>
                    <button onClick={()=>setEditMode(!editMode)} className="text-gray-500 hover:text-black"><BiEdit size={18}></BiEdit></button>
                </div>
            }

            {
                editMode ? (
                    <div className="space-y-4">
                        <textarea value={description} onChange={e => setDescription(e.target.value)} className="w-full border rounded px-2 py-1 text-sm" />
                        
                    </div>
                ) : (
                    <p className="text-gray-600">{restaurant.description}</p>
                )
            }

        </div>
    </div>
  )
}

export default RestaurantProfile