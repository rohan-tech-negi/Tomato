import type { IMenuItems } from "../types"


interface MenuItemProps{
  items: IMenuItems[];
  onItemDeleted: ()=>void;
  isSeller: boolean
}

const MenuItems = ({items, onItemDeleted, isSeller}: MenuItemProps) => {
  return (
    <div className="">
      
    </div>
  )
}

export default MenuItems
