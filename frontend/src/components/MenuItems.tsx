import { useState } from "react";
import type { IMenuItems } from "../types"


interface MenuItemProps{
  items: IMenuItems[];
  onItemDeleted: ()=>void;
  isSeller: boolean
}

const MenuItems = ({items, onItemDeleted, isSeller}: MenuItemProps) => {
  const[loadingItemId, setLoadingItemId] = useState<string | null>(null)
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {
          items.map((item)=>{
            
            const isLoading = loadingItemId === items._id;

            return <div className={`relative flex gap-4 rounded-lg bg-white p-4 shadow-sm transition ${!item.isAvailable ? "opacity-50" : ""}`}>
              <div className="relative shrink-0">
                <img src={item.image} alt={item.name} className={`h-24 w-24 rounded-lg object-cover ${!item.isAvailable? "grayscale brightness-75" : ""}`}/>
                
              </div>

            </div>
          })
        }
    </div>
  )
}

export default MenuItems
