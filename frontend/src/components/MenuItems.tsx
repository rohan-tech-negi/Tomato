import { useState } from "react";
import type { IMenuItems } from "../types"
import { BsCart, BsEye } from "react-icons/bs";
import { FiEyeOff } from "react-icons/fi";
import { BiTrash } from "react-icons/bi";
import toast, { LoaderIcon } from "react-hot-toast";
import { VscLoading } from "react-icons/vsc";
import { restaurantService } from "../main";
import axios from "axios";


interface MenuItemProps{
  items: IMenuItems[];
  onItemDeleted: ()=>void;
  isSeller: boolean
}

const MenuItems = ({items, onItemDeleted, isSeller}: MenuItemProps) => {
  const[loadingItemId, setLoadingItemId] = useState<string | null>(null)

  const handleDelete = async(itemId:string)=>{
    const confirm  = window.confirm("Are you sure you want to delete this item?")
    if(!confirm) return;

    try {
      await axios.delete(`${restaurantService}/api/item${itemId}`,{
        headers:{
          Authorization: `Bearer ${localStorage.getItem("token")}`
        }
      })
      toast.success("Item deleted successfully")
      onItemDeleted()
    } catch (error) {
      console.log(error)
      toast.error("Failed to delete item")
    } 
  }
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {
          items.map((item)=>{
            
            const isLoading = loadingItemId === items._id;

            return <div className={`relative flex gap-4 rounded-lg bg-white p-4 shadow-sm transition ${!item.isAvailable ? "opacity-50" : ""}`}>
              <div className="relative shrink-0">
                <img src={item.image} alt={item.name} className={`h-24 w-24 rounded-lg object-cover ${!item.isAvailable? "grayscale brightness-75" : ""}`}/>
                {
                  !item.isAvailable && (<span className="absolute inset-0 flex items-center justify-center rounded bg-black/60 text-xs font-semibold text-white">
                      Not Available
                  </span>
          )}
              </div>

              <div className="flex flex-1 flex-col justify-between ">
                <div >
                  <h3 className="font-semibold">{item.name}</h3>
                  {
                    item.description && (
                      <p className="text-sm text-gray-500 line-clamp-2">{item.description}</p>
                    )
                  }
                </div>

                <div className="flex items-center justify-between">
                    <p className="font-medium text-lg">
                      ${item.price}
                    </p>
                    {isSeller && (
                      <div>
                        <button className="flex gap-4 rounded-md bg-red-500 px-3 py-1 text-white hover:bg-red-600" onClick={()=>{}} >
                        {item.isAvailable ? <BsEye size={18}></BsEye> : <FiEyeOff size={18}></FiEyeOff>}
                      </button>

                      <button onClick={(()=>handleDelete(item._id))} className="rounded-lg p-2 text-red-500 hover: bg-red-50 ">
                        <BiTrash size={18}></BiTrash>
                      </button>
                      </div>
                      
                    )}

                    {
                      !isSeller && <button disabled={!item.isAvailable || isLoading} onClick={()=>{}} className={`flex items-center justify-center rounded-lg p-2 ${
                        !item.isAvailable || isLoading ? "cursor-not-allowed text-gray-400" : "text-red-500 hover:bg-red-50"
                      }`}>{isLoading ? <VscLoading size={18} className="animate-spin"></VscLoading> : <BsCart size={18}></BsCart>}</button>
                    }
                </div>
              </div>

            </div>
          })
        }
    </div>
  )
}

export default MenuItems
